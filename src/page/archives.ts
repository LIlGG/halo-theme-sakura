import { animate, frame, inView, scopeMotion, type AnimationPlaybackControlsWithThen } from "motion";
import { documentFunction, sakura } from "../main";

interface CharacterRange {
  start: number;
  end: number;
}

interface ArchivePost {
  element: HTMLElement;
  titleElement: HTMLElement;
  title: string;
  normalizedTitle: string;
  characterRanges: CharacterRange[];
}

interface MonthNavigationItem {
  year: HTMLDetailsElement;
  month: HTMLElement | null;
  monthNumber: string;
  element: HTMLAnchorElement | HTMLSpanElement;
}

interface YearAnimation {
  animation: AnimationPlaybackControlsWithThen;
  expanded: boolean;
}

class ArchivePage {
  private readonly events = new AbortController();
  private readonly reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  private readonly mobileLayout = matchMedia("(max-width: 768px)");
  private readonly yearAnimations = new Map<HTMLDetailsElement, YearAnimation>();
  private readonly segmenter =
    typeof Intl.Segmenter === "function" ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : undefined;

  private readonly years: HTMLDetailsElement[];
  private readonly months: HTMLElement[];
  private readonly yearLinks: HTMLAnchorElement[];
  private readonly posts: ArchivePost[];
  private readonly yearIndex: HTMLElement | null;
  private readonly yearIndexList: HTMLOListElement | null;
  private readonly search: HTMLInputElement | null;
  private readonly clearButton: HTMLButtonElement | null;
  private readonly searchStatus: HTMLElement | null;
  private readonly emptyResults: HTMLElement | null;
  private readonly layout: HTMLElement | null;
  private readonly timeline: HTMLElement | null;

  private readonly monthNavigation: MonthNavigationItem[] = [];
  private expandedBeforeSearch?: Map<HTMLDetailsElement, boolean>;
  private previousQuery = "";
  private currentYear?: HTMLDetailsElement;
  private animations?: ReturnType<typeof scopeMotion>;
  private scrollFrame = 0;
  private navigationFrame = 0;

  constructor(private readonly root: HTMLElement) {
    this.years = Array.from(root.querySelectorAll<HTMLDetailsElement>("[data-archive-year]"));
    this.months = Array.from(root.querySelectorAll<HTMLElement>("[data-archive-month]"));
    this.yearLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-archive-year-link]"));
    this.yearIndex = root.querySelector<HTMLElement>(".archive-index");
    this.yearIndexList = this.yearIndex?.querySelector<HTMLOListElement>("ol") || null;
    this.search = root.querySelector<HTMLInputElement>("[data-archive-search]");
    this.clearButton = root.querySelector<HTMLButtonElement>("[data-archive-clear]");
    this.searchStatus = root.querySelector<HTMLElement>("[data-archive-status]");
    this.emptyResults = root.querySelector<HTMLElement>("[data-archive-no-results]");
    this.layout = root.querySelector<HTMLElement>(".archive-layout");
    this.timeline = root.querySelector<HTMLElement>(".archive-timeline");
    this.posts = this.collectPosts();
  }

  public initialize() {
    this.createMonthNavigation();
    this.bindSearchEvents();
    this.bindYearControls();
    this.bindPageEvents();
    this.root.querySelector<HTMLElement>("[data-archive-tools]")?.removeAttribute("hidden");
    this.updateMotionPreference();
    this.revealHashTarget();
    this.applyFilter();
  }

  public destroy() {
    this.events.abort();
    cancelAnimationFrame(this.scrollFrame);
    cancelAnimationFrame(this.navigationFrame);
    this.finishYearAnimations();
    this.animations?.cancel();
    document.documentElement.classList.remove("archives-smooth-scroll");
  }

  private collectPosts(): ArchivePost[] {
    const posts: ArchivePost[] = [];
    for (const element of this.root.querySelectorAll<HTMLElement>(".archive-post")) {
      const titleElement = element.querySelector<HTMLElement>(".archive-post-title");
      if (!titleElement) {
        continue;
      }

      const title = titleElement.textContent || "";
      posts.push({
        element,
        titleElement,
        title,
        normalizedTitle: this.normalizeText(title),
        characterRanges: this.createCharacterRanges(title),
      });
    }
    return posts;
  }

  private normalizeText(text: string): string {
    return text.normalize("NFKC").toLocaleLowerCase();
  }

  private createCharacterRanges(title: string): CharacterRange[] {
    const ranges: CharacterRange[] = [];
    if (!this.segmenter) {
      return ranges;
    }

    // Normalization can change a character's length. Keep its position in the original title for highlighting.
    for (const { segment, index } of this.segmenter.segment(title)) {
      const normalizedLength = this.normalizeText(segment).length;
      for (let i = 0; i < normalizedLength; i++) {
        ranges.push({ start: index, end: index + segment.length });
      }
    }
    return ranges;
  }

  private highlightTitle(post: ArchivePost, query: string) {
    if (!query || post.characterRanges.length !== post.normalizedTitle.length) {
      post.titleElement.textContent = post.title;
      return;
    }

    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let match = post.normalizedTitle.indexOf(query);
    while (match !== -1) {
      const start = post.characterRanges[match].start;
      const end = post.characterRanges[match + query.length - 1].end;
      if (start >= cursor) {
        fragment.append(document.createTextNode(post.title.slice(cursor, start)));
        const mark = document.createElement("mark");
        mark.textContent = post.title.slice(start, end);
        fragment.append(mark);
        cursor = end;
      }
      match = post.normalizedTitle.indexOf(query, match + query.length);
    }
    fragment.append(document.createTextNode(post.title.slice(cursor)));
    post.titleElement.replaceChildren(fragment);
  }

  private applyFilter() {
    const query = this.normalizeText(this.search?.value || "").trim();
    if (query && !this.expandedBeforeSearch) {
      this.expandedBeforeSearch = new Map();
      for (const year of this.years) {
        this.expandedBeforeSearch.set(year, this.isYearExpanded(year));
      }
    }

    const queryChanged = query !== this.previousQuery;
    const count = this.filterPosts(query, queryChanged);
    this.updateFilteredMonths();
    this.updateFilteredYears(query);
    this.updateSearchFeedback(query, count);
    this.updateMonthNavigation();
    this.animateFilterResults(queryChanged, count);

    if (!query) {
      this.expandedBeforeSearch = undefined;
    }
    this.previousQuery = query;
    this.scheduleScrollUpdate();
  }

  private filterPosts(query: string, updateHighlights: boolean): number {
    let count = 0;
    for (const post of this.posts) {
      post.element.hidden = !post.normalizedTitle.includes(query);
      if (!post.element.hidden) {
        count++;
      }
      if (updateHighlights) {
        this.highlightTitle(post, query);
      }
    }
    return count;
  }

  private visiblePostCount(element: HTMLElement | null): number {
    return element?.querySelectorAll(".archive-post:not([hidden])").length || 0;
  }

  private updateCountLabel(element: Element | null, count: number) {
    if (!element) {
      return;
    }
    element.setAttribute("i18n-options", JSON.stringify({ count }));
    element.textContent = sakura.translate("page.archives.posts", `${count} 篇`, { count });
  }

  private updateFilteredMonths() {
    for (const month of this.months) {
      const count = this.visiblePostCount(month);
      month.hidden = count === 0;
      this.updateCountLabel(month.querySelector(".archive-month-count"), count);
    }
  }

  private updateFilteredYears(query: string) {
    for (const year of this.years) {
      const count = this.visiblePostCount(year);
      let expanded = this.isYearExpanded(year);
      if (query) {
        expanded = count > 0;
      } else if (this.expandedBeforeSearch) {
        expanded = this.expandedBeforeSearch.get(year) ?? expanded;
      }
      this.setYearExpanded(year, expanded);
      year.hidden = count === 0;
      this.updateCountLabel(year.querySelector(".archive-year-count"), count);

      const link = this.yearLinks.find((item) => {
        return item.dataset.archiveYearLink === year.dataset.archiveYear;
      });
      const label = link?.querySelector(".archive-index-count");
      if (label) {
        label.textContent = String(count);
      }
      if (link?.parentElement) {
        link.parentElement.hidden = year.hidden;
      }
    }
  }

  private updateSearchFeedback(query: string, count: number) {
    if (this.clearButton) {
      this.clearButton.hidden = !this.search?.value;
    }
    if (this.searchStatus) {
      this.searchStatus.hidden = !query;
      this.searchStatus.textContent = "";
      if (query) {
        this.searchStatus.textContent = sakura.translate("page.archives.results", `找到 ${count} 篇文章`, { count });
      }
    }
    if (this.emptyResults) {
      this.emptyResults.hidden = count !== 0 || !query;
    }
    if (this.layout) {
      this.layout.hidden = count === 0;
    }
  }

  private clearSearch() {
    if (this.search) {
      this.search.value = "";
    }
    this.applyFilter();
    this.search?.focus();
  }

  private createMonthNavigation() {
    for (const year of this.years) {
      const navigation = year.querySelector<HTMLElement>(".archive-month-map");
      if (!navigation) {
        continue;
      }
      navigation.replaceChildren();
      for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
        const item = this.createMonthNavigationItem(year, String(monthNumber).padStart(2, "0"));
        navigation.append(item.element);
        this.monthNavigation.push(item);
      }
      navigation.hidden = false;
    }
  }

  private createMonthNavigationItem(year: HTMLDetailsElement, monthNumber: string): MonthNavigationItem {
    const month = year.querySelector<HTMLElement>(`[data-archive-month="${monthNumber}"]`);
    const element = document.createElement(month ? "a" : "span");
    element.className = "archive-month-slot";

    const bar = document.createElement("span");
    bar.className = "archive-month-bar";
    bar.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = monthNumber;
    label.setAttribute("aria-hidden", "true");
    element.append(bar, label);

    return { year, month, monthNumber, element };
  }

  private updateMonthNavigation() {
    for (const year of this.years) {
      const items = this.monthNavigation.filter((item) => {
        return item.year === year;
      });
      const counts = items.map((item) => {
        return this.visiblePostCount(item.month);
      });
      const maximum = Math.max(...counts, 1);
      items.forEach((item, index) => {
        this.updateMonthNavigationItem(item, counts[index], maximum);
      });
    }
  }

  private updateMonthNavigationItem(item: MonthNavigationItem, count: number, maximum: number) {
    const { year, month, monthNumber, element } = item;
    const monthName = sakura.translate(`page.archives.months.${monthNumber}`, `${Number(monthNumber)}月`);
    const label = sakura.translate(
      "page.archives.month_hint",
      `${year.dataset.archiveYear}年${monthName} · ${count} 篇文章`,
      { year: year.dataset.archiveYear, month: monthName, count }
    );
    const density = count > 0 ? 0.2 + (0.8 * count) / maximum : 0;
    element.setAttribute("aria-label", label);
    element.title = label;
    element.style.setProperty("--month-density", String(density));
    element.classList.toggle("is-empty", count === 0);

    if (!(element instanceof HTMLAnchorElement)) {
      return;
    }
    if (count > 0 && month) {
      element.href = `#${month.id}`;
      element.removeAttribute("aria-disabled");
      element.removeAttribute("tabindex");
    } else {
      element.removeAttribute("href");
      element.setAttribute("aria-disabled", "true");
      element.tabIndex = -1;
    }
  }

  private isYearExpanded(year: HTMLDetailsElement): boolean {
    return this.yearAnimations.get(year)?.expanded ?? year.open;
  }

  private isInViewport(element: HTMLElement): boolean {
    const bounds = element.getBoundingClientRect();
    return bounds.bottom > 0 && bounds.top < window.innerHeight;
  }

  private setYearExpanded(year: HTMLDetailsElement, expanded: boolean, withAnimation = false) {
    const pending = this.yearAnimations.get(year);
    if (withAnimation && pending?.expanded === expanded) {
      return;
    }

    // Read before cancelling so a reversed transition continues from its current height.
    const startHeight = year.getBoundingClientRect().height;
    this.cancelYearAnimation(year);
    if (!withAnimation || !this.animations || !this.isInViewport(year) || (!pending && year.open === expanded)) {
      year.open = expanded;
      return;
    }

    year.open = true;
    const summary = year.querySelector("summary");
    if (!summary) {
      year.open = expanded;
      return;
    }
    const endHeight = expanded ? year.getBoundingClientRect().height : summary.getBoundingClientRect().height;
    year.classList.add("is-animating");
    year.classList.toggle("is-closing", !expanded);
    const animation = this.animations.run(() => {
      return animate(year, { height: [startHeight, endHeight] }, { duration: 0.32, ease: [0.22, 1, 0.36, 1] });
    });

    this.yearAnimations.set(year, { animation, expanded });
    animation.then(() => {
      // An older animation must not overwrite a newer click or search result.
      if (this.events.signal.aborted || this.yearAnimations.get(year)?.animation !== animation) {
        return;
      }
      year.open = expanded;
      this.cancelYearAnimation(year);
      this.scheduleScrollUpdate();
    });
  }

  private cancelYearAnimation(year: HTMLDetailsElement) {
    const pending = this.yearAnimations.get(year);
    pending?.animation.stop();
    this.yearAnimations.delete(year);
    year.style.removeProperty("height");
    year.classList.remove("is-animating", "is-closing");
    if (pending) {
      // Motion can still flush the stopped height this frame. Keep a replacement animation intact.
      frame.postRender(() => {
        if (!this.yearAnimations.has(year)) {
          year.style.removeProperty("height");
        }
      });
    }
  }

  private finishYearAnimations() {
    for (const [year, state] of this.yearAnimations) {
      this.setYearExpanded(year, state.expanded);
    }
  }

  private setAllYearsExpanded(expanded: boolean) {
    for (const year of this.years) {
      if (expanded && year.hidden) {
        continue;
      }
      this.setYearExpanded(year, expanded, true);
    }
  }

  private animateFilterResults(queryChanged: boolean, count: number) {
    if (!queryChanged || !this.timeline || count === 0) {
      return;
    }
    const timeline = this.timeline;
    this.animations?.run(() => {
      animate(timeline, { opacity: [0.45, 1], transform: ["translateY(6px)", "none"] }, { duration: 0.22 });
    });
  }

  private updateMotionPreference() {
    this.finishYearAnimations();
    this.animations?.cancel();
    this.animations = undefined;
    document.documentElement.classList.toggle("archives-smooth-scroll", !this.reducedMotion.matches);
    if (!this.reducedMotion.matches) {
      this.animations = scopeMotion(this.observeMonths.bind(this));
    }
  }

  private observeMonths(scope: ReturnType<typeof scopeMotion>) {
    inView(
      this.months,
      (month) => {
        if (scope.state !== "active") {
          return;
        }
        animate(
          month,
          { opacity: [0.35, 1], transform: ["translateY(10px)", "none"] },
          { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
        );
      },
      { amount: 0.05 }
    );
  }

  private scheduleScrollUpdate() {
    if (this.scrollFrame || !this.root.isConnected) {
      return;
    }
    this.scrollFrame = requestAnimationFrame(this.updateScrollPosition.bind(this));
  }

  private updateNavigationOffset(): number {
    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 75;
    const mobile = this.mobileLayout.matches;
    this.yearIndex?.classList.toggle("is-pinned", this.root.getBoundingClientRect().top <= headerHeight);
    this.root.style.setProperty("--archive-header-offset", `${headerHeight + (mobile ? 0 : 12)}px`);

    let offset = headerHeight + 32;
    if (mobile && this.yearIndex) {
      offset += this.yearIndex.getBoundingClientRect().height;
    }
    this.root.style.setProperty("--archive-scroll-offset", `${offset}px`);
    return offset;
  }

  private isAtPageBottom(): boolean {
    return (
      window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight
    );
  }

  private updateScrollPosition() {
    this.scrollFrame = 0;
    const offset = this.updateNavigationOffset();
    const atBottom = this.isAtPageBottom();
    const visibleYears = this.years.filter((year) => {
      return !year.hidden;
    });
    let activeYear = visibleYears[0];
    for (const year of visibleYears) {
      // Native anchor positions can differ from layout coordinates by a fraction of a pixel.
      if (year.getBoundingClientRect().top <= offset + 2) {
        activeYear = year;
      }
      this.updateTimelineProgress(year, offset);
    }
    if (atBottom) {
      activeYear = visibleYears[visibleYears.length - 1];
    }
    this.updateYearIndex(activeYear);
    this.updateCurrentMonth(activeYear, offset, atBottom);
    this.currentYear = activeYear;
  }

  private updateTimelineProgress(year: HTMLDetailsElement, offset: number) {
    const content = year.querySelector<HTMLElement>(".archive-year-content");
    if (!content || !year.open) {
      return;
    }
    const bounds = content.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (offset - bounds.top) / Math.max(bounds.height, 1)));
    content.style.setProperty("--archive-progress", String(progress));
  }

  private updateYearIndex(activeYear: HTMLDetailsElement | undefined) {
    for (const link of this.yearLinks) {
      if (!activeYear || activeYear.dataset.archiveYear !== link.dataset.archiveYearLink) {
        link.removeAttribute("aria-current");
        continue;
      }
      link.setAttribute("aria-current", "location");
      this.yearIndexList?.style.setProperty("--index-y", `${link.offsetTop}px`);
      this.yearIndexList?.style.setProperty("--index-x", `${link.offsetLeft}px`);
      this.yearIndexList?.style.setProperty("--index-height", `${link.offsetHeight}px`);
      this.yearIndexList?.style.setProperty("--index-width", `${link.offsetWidth}px`);
      this.yearIndexList?.classList.add("is-tracking");
      if (activeYear !== this.currentYear) {
        this.scrollYearIndexTo(link);
      }
    }
  }

  private scrollYearIndexTo(link: HTMLAnchorElement) {
    if (!this.yearIndexList) {
      return;
    }
    let left = 0;
    let top = 0;
    if (this.mobileLayout.matches) {
      left = Math.max(0, link.offsetLeft - this.yearIndexList.clientWidth / 2 + link.offsetWidth / 2);
    } else {
      top = Math.max(0, link.offsetTop - this.yearIndexList.clientHeight / 2 + link.offsetHeight / 2);
    }
    this.yearIndexList.scrollTo({ left, top, behavior: this.reducedMotion.matches ? "auto" : "smooth" });
  }

  private updateCurrentMonth(activeYear: HTMLDetailsElement | undefined, offset: number, atBottom: boolean) {
    const visibleMonths = this.months.filter((month) => {
      return !month.hidden && month.closest("details") === activeYear && activeYear?.open;
    });
    let activeMonth = visibleMonths[0];
    for (const month of visibleMonths) {
      if (month.getBoundingClientRect().top <= offset + 2) {
        activeMonth = month;
      }
    }
    if (atBottom) {
      activeMonth = visibleMonths[visibleMonths.length - 1];
    }
    for (const month of this.months) {
      month.classList.toggle("is-current", month === activeMonth);
    }
    for (const item of this.monthNavigation) {
      if (item.month && item.month === activeMonth) {
        item.element.setAttribute("aria-current", "location");
      } else {
        item.element.removeAttribute("aria-current");
      }
    }
  }

  private prepareAnchorNavigation(event: MouseEvent) {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    if (!(event.target instanceof Element)) {
      return;
    }
    const link = event.target.closest<HTMLAnchorElement>("a[href^='#archive-']");
    if (!link) {
      return;
    }
    const year = this.years.find((item) => {
      return link.hash === `#${item.id}` || link.hash.startsWith(`#${item.id}-`);
    });
    // Expand before the native anchor jump so the target does not move during scrolling.
    if (year && !year.hidden) {
      this.setYearExpanded(year, true);
    }
  }

  private revealHashTarget() {
    const target = [...this.years, ...this.months].find((item) => {
      return `#${item.id}` === location.hash;
    });
    const year = target?.closest<HTMLDetailsElement>("details");
    if (year && !year.hidden) {
      this.setYearExpanded(year, true);
    }
    this.scheduleScrollUpdate();
    cancelAnimationFrame(this.navigationFrame);
    if (!target || !year || target.hidden || year.hidden) {
      return;
    }

    // The theme focuses hash targets. Align afterwards so a long month is not centered in the viewport.
    this.navigationFrame = requestAnimationFrame(() => {
      if (!this.root.isConnected) {
        return;
      }
      target.scrollIntoView({ block: "start", behavior: this.reducedMotion.matches ? "auto" : "smooth" });
    });
  }

  private bindSearchEvents() {
    const options = { signal: this.events.signal };
    this.search?.addEventListener("input", this.handleSearchInput.bind(this), options);
    this.search?.addEventListener("compositionend", this.applyFilter.bind(this), options);
    this.search?.addEventListener("search", this.applyFilter.bind(this), options);
    this.search?.addEventListener("keydown", this.handleSearchKeydown.bind(this), options);
    this.clearButton?.addEventListener("click", this.clearSearch.bind(this), options);
    this.root.querySelector("[data-archive-reset]")?.addEventListener("click", this.clearSearch.bind(this), options);
  }

  private handleSearchInput(event: Event) {
    if (!(event as InputEvent).isComposing) {
      this.applyFilter();
    }
  }

  private handleSearchKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && !event.isComposing && this.search?.value) {
      event.preventDefault();
      this.clearSearch();
    }
  }

  private bindYearControls() {
    const options = { signal: this.events.signal };
    for (const year of this.years) {
      year.querySelector("summary")?.addEventListener("click", this.toggleYear.bind(this, year), options);
    }
    this.root
      .querySelector("[data-archive-expand]")
      ?.addEventListener("click", this.setAllYearsExpanded.bind(this, true), options);
    this.root
      .querySelector("[data-archive-collapse]")
      ?.addEventListener("click", this.setAllYearsExpanded.bind(this, false), options);
  }

  private toggleYear(year: HTMLDetailsElement, event: Event) {
    event.preventDefault();
    this.setYearExpanded(year, !this.isYearExpanded(year), true);
  }

  private bindPageEvents() {
    const options = { signal: this.events.signal };
    this.root.addEventListener("click", this.prepareAnchorNavigation.bind(this), options);
    this.root.addEventListener("toggle", this.scheduleScrollUpdate.bind(this), { ...options, capture: true });
    window.addEventListener("scroll", this.scheduleScrollUpdate.bind(this), { ...options, passive: true });
    window.addEventListener("resize", this.scheduleScrollUpdate.bind(this), options);
    window.addEventListener("hashchange", this.revealHashTarget.bind(this), options);
    window.addEventListener("sakura:i18n", this.handleLanguageReady.bind(this), options);
    this.reducedMotion.addEventListener("change", this.updateMotionPreference.bind(this), options);
  }

  private handleLanguageReady() {
    // The translation function is assigned after the event is dispatched.
    queueMicrotask(() => {
      if (!this.events.signal.aborted) {
        this.applyFilter();
      }
    });
  }
}

export default class Archives {
  private page?: ArchivePage;

  @documentFunction()
  public registerArchives() {
    this.page?.destroy();
    this.page = undefined;

    const root = document.querySelector<HTMLElement>("[data-archives]");
    if (!root) {
      return;
    }

    this.page = new ArchivePage(root);
    this.page.initialize();
  }
}