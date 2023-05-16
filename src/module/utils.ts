import { documentFunction } from "../main";

export class Utils {
  @documentFunction()
  public wrapTableWithBox() {
    const contentElement = document.querySelector(".entry-content");
    const tableElements = contentElement?.querySelectorAll("table");
    tableElements?.forEach((tableElement) => {
      const tableWrapper = document.createElement("div");
      tableWrapper.classList.add("table-wrapper");
      tableElement.parentNode?.insertBefore(tableWrapper, tableElement);
      tableWrapper.appendChild(tableElement);
    });
  }
}