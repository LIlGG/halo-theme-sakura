import { documentFunction, sakura } from "../main";
// TODO 待优化 Fancybox
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

export class Utils {
  @documentFunction()
  public registerHeaderClass() {
    const containerElement = document.querySelector(".container") as HTMLElement;
    if (sakura.getPageConfig("_templateId") === "index") {
      containerElement.classList.add("is-homepage");
    } else {
      containerElement.classList.remove("is-homepage");
    }
  }

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
    const contentElement = document.querySelector(".site-content") as HTMLElement;
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

  /**
   * 注册 highlight (代码高亮) 功能
   * 考虑到，此功能属于常用功能，因此将其注册到 Sakura 主题中，而不是采取插件的方式。
   * 另外，注入到主题中，将能够完全掌握 highlight 的初始化时机，这对于主题性能优化是有好处的。
   */
  @documentFunction()
  public registerHighlight() {
    const preElements = document.querySelectorAll("pre") as NodeListOf<HTMLElement>;
    preElements.forEach((preElement) => {
      preElement.classList.add("highlight-wrap");
      preElement.setAttribute("autocomplete", "off");
      preElement.setAttribute("autocorrect", "off");
      preElement.setAttribute("autocapitalize", "off");
      preElement.setAttribute("spellcheck", "false");
      preElement.setAttribute("contenteditable", "false");

      const codeElement = preElement.querySelector("code") as HTMLElement;
      import("highlight.js").then(async (highlight) => {
        let lang = "";
        codeElement.classList.forEach((className) => {
          if (className.startsWith("language-")) {
            lang = className.replace("language-", "");
          }
        });

        let language = highlight.default.getLanguage(lang);
        // 如果没有指定语言，则启用自动检测
        if (!language || !language.aliases || language.aliases.length === 0) {
          codeElement.classList.remove(`language-${lang}`);
          const autoLanguage = highlight.default.highlightAuto(codeElement.textContent || "");
          // 自定检测失败，则使用默认的 plain text
          if (!autoLanguage.language) {
            lang = "text";
          } else {
            lang = autoLanguage.language;
          }
          // 重新为 highlightElement 设置语言
          codeElement.classList.add(`language-${lang}`);
        } else {
          lang = language.aliases[0];
        }
        codeElement.setAttribute("data-rel", lang.toUpperCase());
        codeElement.classList.add(lang.toLowerCase());
        highlight.default.highlightElement(codeElement);
        const highlightLineNumber = await import("../libs/highlightjs-line-numbers")
        highlightLineNumber.registerHljsLineNumbers(highlight.default);
        highlight.default.lineNumbersBlock(codeElement);
      });
    });
  }

  /**
   * 注册代码块 copy 功能
   */
  @documentFunction()
  public registerCopyCode() {
    const codeElements = document.querySelectorAll("pre code");
    codeElements.forEach((codeElement) => {
      const copyElement = document.createElement("a");
      copyElement.classList.add("copy-code");
      copyElement.setAttribute("title", sakura.translate("common.copy_code", "复制代码"));
      copyElement.innerHTML = `<span class="iconify" data-icon="fa:clipboard"></span>`;
      codeElement.after(copyElement);
      import("clipboard").then((module) => {
        new module.default(copyElement, {
          target: () => codeElement,
        });
      });
    });
  }

  
  /**
   * 注册 Toc (目录)
   */
  @documentFunction()
  public registerToc() {
    const tocContainerElements = document.querySelectorAll(".toc-container");
    const headerOffset = 75;
    tocContainerElements?.forEach((tocContainerElement) => {
      console.log("tocbot")
      import("tocbot").then((tocbot) => {
        const tocElement = tocContainerElement.querySelector(".toc");
        const offset = tocContainerElement.getBoundingClientRect().top + window.pageYOffset;
        const collapseDepth = sakura.getThemeConfig("post", "toc_depth", Number)?.valueOf();
        if (!tocElement) {
          return;
        }
        tocbot.default.init({
          tocElement: tocElement,
          contentSelector: [".entry-content", ".links"],
          headingSelector: "h1, h2, h3, h4, h5",
          collapseDepth: collapseDepth,
          scrollSmooth: true,
          headingsOffset: -(offset - headerOffset),
          scrollSmoothOffset: -headerOffset,
          disableTocScrollSync: true,
        });
      });
    });
  }
}
