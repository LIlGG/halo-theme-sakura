import { documentFunction } from "../main";

export class Utils {
  @documentFunction()
  public wrapTableWithBox() {
    const contentElement = document.querySelector(".entry-content");
    const tableElements = contentElement?.querySelectorAll("table");
    tableElements?.forEach((tableElement) => {
      if (tableElement.parentElement?.classList.contains("table-wrapper")) {
        return;
      }
      const tableWrapper = document.createElement("div");
      tableWrapper.classList.add("table-wrapper");
      tableElement.parentNode?.insertBefore(tableWrapper, tableElement);
      tableWrapper.appendChild(tableElement);
    });
  }

  @documentFunction()
  public wrapImageWithBox() {
    const contentElement = document.querySelector(".site-content");
    const imageElements = contentElement?.querySelectorAll("img:not(.avatar)");
    imageElements?.forEach((imageElement) => {
      if (imageElement.classList.contains("gallery-img")) {
        return;
      }
      imageElement.classList.add("gallery-img");
      const imageWrapper = document.createElement("a");
      imageWrapper.setAttribute("data-fancybox", "gallery");
      imageWrapper.setAttribute("href", imageElement.getAttribute("src") || "");
      imageWrapper.classList.add("image-wrapper");
      imageElement.parentNode?.insertBefore(imageWrapper, imageElement);
      imageWrapper.appendChild(imageElement);
    });
  }
}