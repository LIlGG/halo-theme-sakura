import { documentFunction } from "../main";
import { WindowEventProxy } from "../utils/eventProxy";

/**
 * 全局事件模块
 */
export class Events {
  /**
   * 注册移动端导航栏事件
   *
   * @description: Register mobile navigation event
   * @param {*}
   * @return {*}
   */
  @documentFunction(false)
  public registerMobileNav() {
    const documents = document.querySelectorAll(".container, .site-nav-toggle, .site-sidebar");
    document.querySelector(".nav-toggle")?.addEventListener("click", () => {
      documents.forEach((element) => {
        element.classList.add("open");
      });
    });

    document.querySelector(".site-sidebar")?.addEventListener("click", () => {
      documents.forEach((element) => {
        element.classList.remove("open");
      });
    });
  }

  /**
   * 注册导航栏滚动事件
   *
   * @description: Register header event
   * @param {*}
   * @return {*}
   */
  @documentFunction(false)
  public registerHeaderEvent() {
    const topmostCoordinate = 0;
    let currentTopCoordinate = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    WindowEventProxy.addEventListener(
      "scroll",
      () => {
        const scrollTopCoordinate = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const siteHeaderElement = document.querySelector(".site-header");
        if (scrollTopCoordinate === topmostCoordinate) {
          siteHeaderElement?.classList.remove("yya");
        } else {
          siteHeaderElement?.classList.add("yya");
        }
        if (scrollTopCoordinate > currentTopCoordinate) {
          siteHeaderElement?.classList.remove("sabit");
        } else {
          siteHeaderElement?.classList.add("sabit");
        }
        currentTopCoordinate = scrollTopCoordinate;
      },
      200
    );
  }

  /**
   * 注册 list-pagination 分页加载事件
   *
   * @description: Register list-pagination event
   * @param {*}
   * @return {*}
   */
  @documentFunction(false)
  public registerPostListPagination() {
    const paginationElement = document.getElementById("pagination");
    if (!paginationElement) {
      return;
    }
    const listPaginationLinkElement = paginationElement.querySelector("a");
    if (!listPaginationLinkElement) {
      return;
    }
    listPaginationLinkElement.addEventListener("click", (event) => {
      event.preventDefault();
      const postListElement = document.getElementById("main");
      if (!postListElement) {
        return;
      }
      const targetElement = event.target as HTMLLinkElement;
      const url = targetElement.href;
      targetElement.classList.add("loading");
      targetElement.textContent = "";
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const postListNewElements = doc.querySelectorAll("#main .post");
          if (postListNewElements && postListNewElements.length > 0) {
            postListNewElements.forEach((element) => {
              postListElement.appendChild(element);
            });
          }
          const nextPaginationElement = doc.querySelector("#pagination a") as HTMLLinkElement;
          if (nextPaginationElement) {
            targetElement.href = nextPaginationElement.href;
          } else {
            paginationElement.innerHTML = "<span>没有更多文章了</span>";
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          targetElement.classList.remove("loading");
          targetElement.textContent = "下一页";
          //TODO 还需处理加载后文章的国际化问题
          I18N.init();
        });
    });
  }
}
