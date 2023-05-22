import { documentFunction } from "../main";

export default class Photos {
  /**
   * 注册经典布局相册
   *
   * @see http://miromannino.github.io/Justified-Gallery
   */
  @documentFunction(false)
  public registerJustifyLayout() {}

  /**
   * 注册瀑布流布局相册
   */
  @documentFunction(false)
  public registerMasonryLayout() {
    const masonryContainerElement = document.querySelector(".masonry-container");
    if (!masonryContainerElement) {
      return;
    }
    const galleryElement = masonryContainerElement.querySelector(".gallery");
    import("isotope-layout").then((module) => {
      const galleryLayout = new module.default(galleryElement, {
        layoutMode: "masonry",
        masonry: {
          gutter: 10,
        },
        itemSelector: ".gallery-item",
      });

      galleryElement?.querySelectorAll("img.lazyload").forEach((img) => {
        img.addEventListener("load", () => {
          galleryLayout.layout();
          masonryContainerElement.querySelector(".photos-content")?.classList.remove("loading");
        });
      });

      // 过滤
      const galleryFilterbarElement = masonryContainerElement?.querySelector("#gallery-filter");
      const galleryFilterbarItemsElement = galleryFilterbarElement?.querySelectorAll("li a");
      galleryFilterbarItemsElement?.forEach((hrefElement) => {
        hrefElement.addEventListener("click", (event) => {
          event.preventDefault();
          if (hrefElement.classList.contains("active")) {
            return;
          }
          galleryFilterbarItemsElement?.forEach((item) => {
            item.classList.remove("active");
          });
          hrefElement.classList.add("active");
          const filter = hrefElement.getAttribute("data-filter");
          galleryLayout.arrange({
            filter: filter,
          });
        });
      });

      // TODO 默认组

      // TODO 尝试优化
      const gridChangeElements = masonryContainerElement?.querySelectorAll("#grid-changer a");
      gridChangeElements?.forEach((gridChangeElement) => {
        gridChangeElement?.addEventListener("click", () => {
          gridChangeElements.forEach((item) => {
            item.classList.remove("active");
          });
          gridChangeElement.classList.add("active");
          galleryElement?.querySelectorAll("[class*='col-']").forEach((item) => {
            for (let i = 0; i < item.classList.length; i++) {
              const className = item.classList[i];
              if (className.startsWith("col-")) {
                item.classList.remove(className);
                i--;
              }
            }
          });
          galleryElement?.querySelectorAll(".gallery-item").forEach((item) => {
            item.classList.add("col-" + gridChangeElement.getAttribute("data-col") || "");
          });

          galleryLayout.layout();
        });
      });
    });
  }
}
