let activeElement: HTMLElement | null = null;
let dispose: (() => void) | undefined;

/** 初始化首页介绍，并在 PJAX 替换页面时释放上一次的请求和动画。 */
export function initializeFocusText() {
  const element = document.querySelector<HTMLElement>(".focus-description");
  if (element === activeElement) {
    return;
  }
  dispose?.();
  dispose = undefined;
  activeElement = element;
  if (!element) {
    return;
  }

  const content = element.querySelector<HTMLElement>(".focus-text-value");
  const accessible = element.querySelector<HTMLElement>(".focus-text-accessible");
  if (!content || !accessible) {
    return;
  }

  const fallback = element.dataset.fallback ?? content.textContent ?? "";
  const controller = new AbortController();
  let typingTimer: number | undefined;
  let requestTimer: number | undefined;
  let disposed = false;

  dispose = () => {
    disposed = true;
    controller.abort();
    window.clearTimeout(typingTimer);
    window.clearTimeout(requestTimer);
    content.classList.remove("is-typing");
  };

  const render = (text: string) => {
    if (disposed || !element.isConnected) {
      return;
    }
    window.clearTimeout(typingTimer);
    element.classList.remove("is-loading");
    element.setAttribute("aria-busy", "false");
    accessible.textContent = text;
    content.textContent = text;
    content.classList.remove("is-typing");
    element.hidden = !text.trim();
    if (
      !text ||
      element.dataset.typewriter !== "true" ||
      typeof Intl.Segmenter !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // 按字素拆分，避免把 emoji、组合字符拆成残缺的字。
    const characters = Array.from(
      new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
      (part) => part.segment
    );
    let index = 0;
    content.textContent = "";
    content.classList.add("is-typing");
    const typeNext = () => {
      if (disposed || !element.isConnected) {
        content.classList.remove("is-typing");
        return;
      }
      content.textContent += characters[index++];
      if (index < characters.length) {
        typingTimer = window.setTimeout(typeNext, 80);
      } else {
        content.classList.remove("is-typing");
      }
    };
    typeNext();
  };

  if (element.dataset.hitokoto !== "true") {
    render(fallback);
    return;
  }

  // 模板也输出空内容，确保脚本加载前不会闪现个人介绍。
  content.textContent = "";
  accessible.textContent = "";
  element.hidden = false;
  element.classList.add("is-loading");
  element.setAttribute("aria-busy", "true");

  const configuredLength = Number(element.dataset.maxLength);
  const maxLength =
    Number.isFinite(configuredLength) && configuredLength >= 1 ? Math.min(100, Math.floor(configuredLength)) : 30;
  const params = new URLSearchParams({ encode: "json", max_length: String(maxLength) });
  const categories = new Set(
    (element.dataset.categories || "").split(",").filter((category) => /^[a-l]$/.test(category))
  );
  categories.forEach((category) => params.append("c", category));
  requestTimer = window.setTimeout(() => controller.abort(), 5000);
  void fetch(`https://v1.hitokoto.cn/?${params}`, {
    signal: controller.signal,
    credentials: "omit",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load Hitokoto");
      }
      return response.json();
    })
    .then((data: unknown) => {
      const text = data && typeof data === "object" && "hitokoto" in data ? data.hitokoto : undefined;
      if (typeof text !== "string" || !text.trim() || Array.from(text.trim()).length > maxLength) {
        throw new Error("Invalid Hitokoto response");
      }
      render(text.trim());
    })
    .catch(() => render(fallback))
    .finally(() => window.clearTimeout(requestTimer));
}
