import { documentFunction, sakura } from "../main";
import "APlayer/dist/APlayer.min.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
// @ts-ignore
import commentStyle from "../css/injection/comment.css?inline";

export class Utils {

  /**
   * 自动计算子菜单位置
   * 子菜单位置为：父菜单宽度 / 2 - 子菜单宽度 / 2
   */
  @documentFunction(false)
  public autoCalculateSubmenuPosition() {
    const lowContainerElement = document.querySelector(".lower-container") as HTMLElement;
    if (!lowContainerElement) {
      return;
    }
    const subMenuElements = lowContainerElement.querySelectorAll(".sub-menu") as NodeListOf<HTMLElement>;
    if (!subMenuElements || subMenuElements.length === 0) {
      return;
    }
    subMenuElements.forEach((subMenuElement) => {
      const parentMenu = subMenuElement.parentElement as HTMLElement;
      const parentMenuWidth = parentMenu.offsetWidth;
      // 由于 subMenuElement 为隐藏元素，因此需要先显示出来，才能获取到其宽度
      subMenuElement.style.visibility = "hidden";
      subMenuElement.style.display = "block";
      const subMenuWidth = subMenuElement.offsetWidth;
      subMenuElement.style.display = "none";
      subMenuElement.style.visibility = "visible";
      console.log(parentMenuWidth, subMenuWidth)
      const subMenuLeft = parentMenuWidth / 2 - subMenuWidth / 2;
      subMenuElement.style.left = `${subMenuLeft}px`;  
    });

  }

  /**
   * 注入评论样式
   *
   * TODO 自定义评论之前，暂时使用这种方式注入样式
   */
  @documentFunction()
  public injectCommentStyle() {
    // moments 页面不需要注入
    if (sakura.getPageConfig("_templateId") === "moments") {
      return;
    }
    const commentElement = document.querySelector(".comment") as HTMLElement;
    if (!commentElement) {
      return;
    }
    commentElement.querySelectorAll("div").forEach((divElement) => {
      if (divElement.shadowRoot) {
        const commentShadowElement = divElement.shadowRoot;
        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(commentStyle);
        commentShadowElement.adoptedStyleSheets = [styleSheet];
      }
    });
  }

  /**
   * 注册吸底模式 APlayer (Fixed APlayer)
   */
  @documentFunction(false)
  public registerFixedAPlayer() {
    const aplayerFloat = sakura.getThemeConfig("additional", "aplayer_float", Boolean)?.valueOf();
    if (!aplayerFloat) {
      return;
    }

    const musicHost = sakura.getThemeConfig("additional", "aplayer_host", String)?.valueOf();
    const musicServer = sakura.getThemeConfig("additional", "aplayer_server", String)?.valueOf();
    const musicType = sakura.getThemeConfig("additional", "aplayer_type", String)?.valueOf();
    const musicId = sakura.getThemeConfig("additional", "aplayer_id", String)?.valueOf();

    // http://example.com/api.php?server=:server&type=:type&id=:id&r=:r
    const musicAPI = `${musicHost}?server=${musicServer}&type=${musicType}&id=${musicId}&r=${Math.random()}`;

    fetch(musicAPI)
      .then((response) => response.json())
      .then((data) => {
        // @ts-ignore
        import("APlayer").then(async (module) => {
          const APlayer = module.default;
          const aplayerElement = createFixedAPlayerElement();
          const flxedAplayerOptions = {
            container: aplayerElement,
            mini: true,
            fixed: true,
            autoplay: sakura.getThemeConfig("additional", "aplayer_autoplay", Boolean)?.valueOf() || false,
            mutex: true,
            lrcType: 3,
            preload: sakura.getThemeConfig("additional", "aplayer_preload", String)?.valueOf() || "auto",
            theme: sakura.getThemeConfig("additional", "aplayer_theme", String)?.valueOf() || "#2980b9",
            loop: "all",
            order: sakura.getThemeConfig("additional", "aplayer_order", String)?.valueOf() || "list",
            volume: sakura.getThemeConfig("additional", "aplayer_volume", Number)?.valueOf() || null,
            listFolded: false,
            listMaxHeight: "250px",
            customAudioType: null,
            storageName: "sakura",
            audio: {},
          };

          flxedAplayerOptions.audio = data;
          console.log(flxedAplayerOptions);
          new APlayer(flxedAplayerOptions);
          // 为按钮增加 hover
          aplayerElement.querySelector(".aplayer-body")?.classList.add("ap-hover");
        });
      })
      .catch((error) => {
        console.error("APlayer API Error: ", error);
      });

    const createFixedAPlayerElement = () => {
      if (document.querySelector("#aplayer-float")) {
        return document.querySelector("#aplayer-float") as HTMLElement;
      }
      const fixedAPlayerElement = document.createElement("div") as HTMLElement;
      fixedAPlayerElement.id = "aplayer-float";
      fixedAPlayerElement.classList.add("aplayer");
      fixedAPlayerElement.classList.add("aplayer-float");

      document.body.appendChild(fixedAPlayerElement);
      return fixedAPlayerElement;
    };
  }

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
    const contentElement = document.querySelector(".fancybox-content") as HTMLElement;
    const imageElements = contentElement?.querySelectorAll("img:not(.avatar)") as NodeListOf<HTMLElement>;
    if (!imageElements) {
      return;
    }
    imageElements.forEach((imageElement) => {
      if (imageElement.classList.contains("gallery-img")) {
        return;
      }
      imageElement.classList.add("gallery-img");
      const imageWrapper = document.createElement("a");
      imageWrapper.setAttribute("data-fancybox", "gallery");
      if (imageElement.getAttribute("data-src")) {
        imageWrapper.setAttribute("href", imageElement.getAttribute("data-src") || "");
      } else {
        imageWrapper.setAttribute("href", imageElement.getAttribute("src") || "");
      }
      imageWrapper.classList.add("image-wrapper");
      imageElement.parentNode?.insertBefore(imageWrapper, imageElement);
      imageWrapper.appendChild(imageElement);
    });
    import("@fancyapps/ui").then((module) => {
      module.Fancybox.bind(contentElement, '[data-fancybox="gallery"]');
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
        // @ts-ignore
        const highlightLineNumber = await import("../libs/highlightjs-line-numbers");
        highlightLineNumber.registerHljsLineNumbers(highlight.default);
        // @ts-ignore
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
      import("tocbot").then((tocbot) => {
        const tocElement = tocContainerElement.querySelector(".toc");
        const offset = tocContainerElement.getBoundingClientRect().top + window.pageYOffset;
        const collapseDepth = sakura.getThemeConfig("post", "toc_depth", Number)?.valueOf();
        if (!tocElement) {
          return;
        }
        tocbot.default.init({
          tocElement: tocElement,
          // @ts-ignore
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
