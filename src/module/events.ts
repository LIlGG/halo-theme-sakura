import { documentFunction } from "../main";
import { WindowEventProxy } from "../utils/WindowEventProxy";

export class Events {
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

  @documentFunction(false)
  public registerScrollEvent() {
    WindowEventProxy.addEventListener("scroll", () => {
      //TODO 考虑是否使用注解来获取所有需要在滚动时执行的函数
    }, 200);
  }
}

