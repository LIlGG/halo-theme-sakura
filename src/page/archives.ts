import { documentFunction } from "../main";

//TODO 尝试使用 animate 来重构动画，去掉 jquery 某些过渡动画比较不方便。

export default class Archives {
  @documentFunction(false)
  public registerArchiveEvent() {
    const archiveTitleElements = document.querySelectorAll(".archives-article .archive-title h3");
    archiveTitleElements.forEach((element) => {
      element.addEventListener("click", () => {
        const archiveElement = element.parentElement?.parentElement;
        const posts = archiveElement?.querySelector(".archive-posts") as HTMLElement;
        if (archiveElement?.classList.contains("active")) {
          posts.style.maxHeight = '0';
          archiveElement.classList.remove("active");
        } else {
          var height = posts?.scrollHeight;
          archiveElement?.classList.add("active");
          posts.style.maxHeight = height + 'px';
        }
      });
    });
  }
}