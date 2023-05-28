import { documentFunction, sakura } from "../main";
import { WindowEventProxy } from "../utils/eventProxy";

/**
 * 全局事件模块
 */
export class Events {
  /**
   * 注册滚动事件
   *
   */
  @documentFunction(false)
  public registerScrollEvent() {
    // TODO 导航栏高度，可统一处理
    const offset = 75;
    const backToTopElement = document.querySelector(".cd-top") as HTMLElement;
    const mobileBackToTopElement = document.querySelector(".m-cd-top") as HTMLElement;
    const changeSkinElement = document.querySelector(".change-skin-gear") as HTMLDivElement;
    const mobileChangeSkinElement = document.querySelector(".mobile-change-skin") as HTMLDivElement;
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > offset) {
        backToTopElement?.classList.add("cd-is-visible");
        changeSkinElement.style.bottom = "0";
        if (backToTopElement.offsetHeight > window.innerHeight) {
          backToTopElement.style.top = `${window.innerHeight - backToTopElement.offsetHeight - offset}px`;
        } else {
          backToTopElement.style.top = "0";
        }
      } else {
        backToTopElement.style.top = "-900px";
        backToTopElement?.classList.remove("cd-is-visible");
        changeSkinElement.style.bottom = "-100px";
      }

      if (document.documentElement.scrollTop > 0) {
        mobileBackToTopElement.classList.add("cd-is-visible");
        mobileChangeSkinElement.classList.add("cd-is-visible");
      } else {
        mobileBackToTopElement.classList.remove("cd-is-visible");
        mobileChangeSkinElement.classList.remove("cd-is-visible");
      }
    });
  }

  /**
   * 注册回到顶部点击事件
   */

  @documentFunction(false)
  public registerBackToTopEvent() {
    const backToTopElements = document.querySelectorAll(".cd-top, .m-cd-top");
    backToTopElements.forEach((backToTopElement) => {
      backToTopElement.addEventListener("click", (event) => {
        event.preventDefault();
        if (window.pageYOffset > 0) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      });
    });
  }

  /**
   * 注册监听复制事件
   */
  @documentFunction(false)
  public registerCopyEvent() {
    WindowEventProxy.addEventListener(
      "copy",
      () => {
        if (sakura.$toast) {
          sakura.$toast.create(sakura.translate("common.events.copy", "复制成功！<br>Copied to clipboard successfully!"), 2000);
        }
      },
      2000
    );
  }

  /**
   * 注册代码块双击放大事件
   */
  @documentFunction()
  public registerCodeBlockZoomEvent() {
    const preElements = document.querySelectorAll("pre") as NodeListOf<HTMLElement>;
    preElements.forEach((preElement) => {
      // TODO 需保证每个元素只注册一次事件，等待 pjax 功能完成后验证
      preElement.addEventListener("dblclick", (event) => {
        if (event.target !== preElement) {
          return;
        }
        preElement.classList.toggle("code-block-fullscreen");
        document.querySelector("html")?.classList.toggle("code-block-fullscreen-html-scroll");
      });
    });
  }

  /**
   * 注册 hashchange 事件
   */
  @documentFunction(false)
  public registerNavigationChangeEvent() {
    window.addEventListener(
      "hashchange",
      (event: Event) => {
        const hashchangeEvent = event as HashChangeEvent;
        if (hashchangeEvent.oldURL.includes("#gallery-")) {
          return;
        }
        const id = location.hash.substring(1);
        if (!id.match(/^[A-z0-9_-]+$/)) {
          return;
        }
        const targetElement = document.getElementById(id);
        if (!targetElement) {
          return;
        }
        if (!targetElement.tagName.match(/^(?:a|select|input|button|textarea)$/i)) {
          targetElement.tabIndex = -1;
        }
        targetElement.focus();
      },
      false
    );
  }

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
  public registerPostListPaginationEvent() {
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
            paginationElement.innerHTML = `<span>${sakura.translate("page.theend", "没有更多文章了")}</span>`;
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          targetElement.classList.remove("loading");
          targetElement.textContent = sakura.translate("page.next", "下一页");
          if (sakura.$localize) {
            sakura.$localize(".post");
          }
        });
    });
  }

  /**
   * 注册主题切换事件
   */
  @documentFunction(false)
  public registerThemeChangeEvent() {
    const themeChangeButtonElements = document.querySelectorAll(".theme-change-js");
    themeChangeButtonElements.forEach((element) => {
      element.addEventListener("click", () => {
        document.querySelector(".skin-menu")?.classList.toggle("show");
      });
    });
  }

  /**
   * 注册每项主题点击事件及默认主题
   */
  @documentFunction(false)
  public registerThemeItemClickEventAndDefaultTheme() {
    const themeModelElement = document.querySelector(".skin-menu") as HTMLElement;
    const themeItemElements = themeModelElement?.querySelectorAll(".skin-menu .menu-item");
    themeItemElements?.forEach((element) => {
      const themeData: ThemeItemOptions = JSON.parse(element.getAttribute("data-item") || "{}");
      if (themeData.bg_isdefault) {
        this.registerThemeRevert(themeData);
      }
      element.addEventListener("click", () => {
        this.registerThemeRevert(themeData);
        localStorage.setItem("sakuraTheme", JSON.stringify(themeData));
        // 隐藏主题开关
        themeModelElement?.classList.remove("show");
      });
    });

    WindowEventProxy.addEventListener(
      "scroll",
      () => {
        themeModelElement?.classList.remove("show");
      },
      200
    );
  }

  /**
   * 注册主题回显功能
   */
  @documentFunction(false)
  public registerThemeRevert(themeData?: ThemeItemOptions) {
    if (!themeData) {
      const localThemeData = localStorage.getItem("sakuraTheme");
      if (!localThemeData) {
        return;
      }
      themeData = JSON.parse(localThemeData);
    }
    const bodyElement = document.querySelector("body") as HTMLBodyElement;
    if (themeData?.bg_url) {
      bodyElement.style.backgroundImage = `url(${themeData?.bg_url})`;
    } else {
      bodyElement.style.backgroundImage = "";
    }
    if (themeData?.bg_night) {
      bodyElement.classList.add("dark");
    } else {
      bodyElement.classList.remove("dark");
    }

    switch (themeData?.bg_img_strategy) {
      case "cover":
        bodyElement.style.backgroundSize = "cover";
        break;
      case "no-repeat":
      case "repeat":
        bodyElement.style.backgroundRepeat = themeData.bg_img_strategy;
        break;
      default:
        bodyElement.style.backgroundSize = "auto";
        bodyElement.style.backgroundRepeat = "auto";
        break;
    }
  }
}

interface ThemeItemOptions {
  bg_name: string;
  bg_url?: string;
  bg_img_strategy: string;
  bg_icon: string;
  bg_night: boolean;
  bg_isdefault: boolean;
}
