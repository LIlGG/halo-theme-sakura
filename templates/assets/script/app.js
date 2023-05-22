/**
 * Sakura halo分支主题, 基于Siren制作
 * @author LIlGG
 * @url https://lixingyong.com
 * @date 2020.06.01
 */
"use strict";
// 附加补充功能
var LIlGGAttachContext = {
  // 补充功能的PJAX
  PJAX: function () {
    // 渲染主题
    try {
      $("#to-load-aplayer").on("click", function () {
        $("div").remove(".load-aplayer");
      });
    } catch (e) {}

    LIlGGAttachContext.CHS(); // 代码样式
    LIlGGAttachContext.PHO(); // 图库功能
    LIlGGAttachContext.SS(); // 日志功能
    // 复制提示
    LIlGGAttachContext.CPY();
    // i18n
    I18N.init();
  },
  // 文章代码样式
  CHS: function () {
    var attributes = {
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      spellcheck: "false",
      contenteditable: "false",
      design: "by LIlGG",
    };

    $("pre").each(function (i, item) {
      var $code = $(this).children("code");
      var classNameStr = $code[0].className;
      var classNameArr = classNameStr.split(" ");

      var lang = "";
      classNameArr.some(function (className) {
        if (className.indexOf("language-") > -1) {
          lang = className.substring(className.indexOf("-") + 1, className.length);
          return true;
        }
      });

      // 检测语言是否存在，不存在则自动检测
      var language = hljs.getLanguage(lang.toLowerCase());
      if (language == undefined) {
        // 启用自动检测
        var autolanguage = hljs.highlightAuto($code.text());
        $code.removeClass("language-" + lang);
        lang = autolanguage.language;
        if (lang == undefined) {
          lang = "text";
        }
        $code.addClass("language-" + lang);
      } else {
        lang = language.name;
      }

      $(this).addClass("highlight-wrap");
      $(this).attr(attributes);
      $code.attr("data-rel", lang.toUpperCase()).addClass(lang.toLowerCase());
      // 启用代码高亮
      hljs.highlightBlock($code[0]);
      // 启用代码行号
      if (Poi.codeLine) hljs.lineNumbersBlock($code[0]);
    });
    /**
     * [#23](https://github.com/LIlGG/halo-theme-sakura/issues/23) 减少失误，将单击改为双击
     */
    $("pre").on("dblclick", function (e) {
      if (e.target !== this) return;
      $(this).toggleClass("code-block-fullscreen");
      $("html").toggleClass("code-block-fullscreen-html-scroll");
    });

    $("pre code").each(function (i, block) {
      $(block).attr({
        id: "hljs-" + i,
      });

      let copyCode = 
      `
      <a class="copy-code" href="javascript:" data-clipboard-target="#hljs-${i}" title="拷贝代码">
        <span class="iconify" data-icon="fa:clipboard"></span>
      </a>
      `;
      $(this).after(copyCode);
      new ClipboardJS(".copy-code");
    });
  },
  // 移动端回到顶部
  MGT: function () {
    var offset = 20,
      scroll_top_duration = 700,
      $m_back_to_top = $(".m-cd-top"),
      $m_changskin = $("#mobile-change-skin");
    $(window).scroll(function () {
      if ($(this).scrollTop() > offset) {
        $m_back_to_top.addClass("cd-is-visible");
        $m_changskin.addClass("cd-is-visible");
      } else {
        $m_back_to_top.removeClass("cd-is-visible");
        $m_changskin.removeClass("cd-is-visible");
      }
    });
    $m_back_to_top.on("click", function (event) {
      event.preventDefault();
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        scroll_top_duration
      );
    });
  },
  // 复制提示
  CPY: function () {
    let postDom = document.getElementsByClassName("post-article");
    Array.prototype.forEach.call(postDom, (item) => {
      item.addEventListener("copy", function (e) {
        if (Poi.copyrightNotice && window.getSelection().toString().length > 30) {
          setClipboardText(e, $(this).data());
        }

        if (toast) {
          toast.create("复制成功！<br>Copied to clipboard successfully!", 2000);
        }
      });
    });

    var setClipboardText = function (event, post) {
      event.preventDefault();
      let templateStr = `
      # 商业转载请联系作者获得授权，非商业转载请注明出处。<br>
      # For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.<br>
      # 协议(License): 署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)<br>
      # 作者(Author): ${post.owner} <br>
      # 链接(URL): ${post.url} <br>
      # 来源(Source): ${Poi.sitename} <br><br>
      `;
      let htmlStr = templateStr + window.getSelection().toString().replace(/\r\n/g, "<br>");
      let textStr = templateStr.replace(/<br>/g, "\n") + window.getSelection().toString().replace(/\r\n/g, "\n");
      if (event.clipboardData) {
        event.clipboardData.setData("text/html", htmlStr);
        event.clipboardData.setData("text/plain", textStr);
      } else if (window.clipboardData) {
        return window.clipboardData.setData("text", textStr);
      }
    };
  },
  // 图库功能
  PHO: function () {
    var $photoPage = $(".photos-container");
    // 判断当前是否为图库界面
    if ($photoPage.length == 0) {
      return;
    }
    // 渲染图库信息
    var $gallerys = $(".photos-content .gallery");

    var justify = function () {
      // http://miromannino.github.io/Justified-Gallery/options-and-events/
      $gallerys.justifiedGallery({
        margins: isNaN(Poi.photosGutter) ? 10 : Number(Poi.photosGutter),
        rowHeight: 200,
        captions: false,
      });
      
      // 默认过滤
      if (Poi.defaultGroup) {
        var filter = "." + Poi.defaultGroup;
        $("#gallery-filter li a").removeClass("active");
        $("#gallery-filter li a").each(function () {
          if ($(this).data("filter") == filter) {
            $(this).addClass("active");
            return false;
          }
        });
      }

      // 过滤
      $("#gallery-filter li a").on("click", function () {
        if ($(this).hasClass("active")) {
          return false;
        }
        $photoPage.find(".photos-content").addClass("loading");
        $("#gallery-filter li a").removeClass("active");
        $(this).addClass("active");
        var dataFilter = $(this).data("filter");
        $gallerys.justifiedGallery({
          filter: dataFilter,
        });
        return false;
      });

      $gallerys.justifiedGallery().on("jg.complete", function (e) {
        $photoPage.find(".photos-content").removeClass("loading");
      });
    };

    var masonry = function () {
      $gallerys.isotope({
        masonry: {
          gutter: 10,
        },
        percentPosition: true,
        itemSelector: ".gallery-item",
      });

      // 默认过滤
      if (Poi.defaultGroup) {
        var filter = "." + Poi.defaultGroup;
        $("#gallery-filter li a").each(function () {
          $("#gallery-filter li a").removeClass("active");
          if ($(this).data("filter") == filter) {
            $(this).addClass("active");
            var dataFilter = $(this).data("filter");
            $gallerys.isotope({
              filter: dataFilter,
            });
            return false;
          }
        });
      }

      $gallerys.find("img.lazyload").on("load", function () {
        $gallerys.isotope("layout");
        $photoPage.find(".photos-content").removeClass("loading");
      });
      
      // 过滤
      $("#gallery-filter li a").on("click", function () {
        if ($(this).hasClass("active")) {
          return false;
        }
        $("#gallery-filter li a").removeClass("active");
        $(this).addClass("active");
        var dataFilter = $(this).data("filter");
        $gallerys.isotope({
          filter: dataFilter,
        });
        return false;
      });

      if (Poi.photosStyle == "masonry") {
        // 切换风格
        $("#grid-changer a").on("click", function () {
          $("#grid-changer a").removeClass("active");
          $(this).toggleClass("active");
          for (var i = 2; i < 9; i++) {
            $gallerys.find(".gallery-item").removeClass("col-" + i);
          }
          $gallerys.find(".gallery-item").toggleClass($(this).closest("li").attr("class"));
          $gallerys.isotope("layout");
        });
      }
    };

    if ($gallerys.length > 0) {
      if (Poi.photosStyle == "masonry") {
        masonry();
      } else {
        justify();
      }
    }
  },
  // 日志
  SS: function () {
    if ($(".journal").length > 0) {
      $(".journal").each(function () {
        let that = $(this);

        // 为说说评论增加额外 class
        if (Poi.journalComment) {
          var comment = that.find("halo-comment-widget");
          if (comment.length > 0) {
            var $comment = $(comment[0].shadowRoot.getElementById("halo-comment-widget"));
            if (!$comment.hasClass("journal")) {
              $comment.addClass("journal");
            }

            // 如果是黑夜模式，还需要额外添加黑夜模式 class
            if ($("body").hasClass("dark") && !$comment.hasClass("dark")) {
              $comment.addClass("dark");
            }
          }
        }
      });
    }
  },
  /**
   * 发送 Email
   */
  TOMAIL: function () {
    if (!Poi.meEmail) {
      return;
    }

    var mail = "mailto:" + Poi.meEmail;
    window.open(mail);
  },
};

/**
 * 图片加载失败/错误后的替补方案
 * @param {Document} ele 失败的图片do
 */
var imgError = function (ele) {
  ele.src = "/themes/theme-sakura/assets/images/default/avatar.jpg";
};

/**
 * pjax功能
 */
var pjaxFun = function () {
  $(document)
    .pjax("a[target!=_top][target!=_blank]", "#page", {
      fragment: "#page",
      timeout: 8000,
    })
    .on("pjax:send", function () {
      NProgress.start();
      Siren.MNH();
    })
    .on("pjax:complete", function () {
      Siren.CE();
      // 额外加载的pjax
      LIlGGAttachContext.PJAX();
      NProgress.done();
      $("#loading").fadeOut(500);
    })
    .on("submit", ".search-form,.s-search", function (event) {
      event.preventDefault();
      $.pjax.submit(event, "#page", {
        fragment: "#page",
        timeout: 8000,
      });
    });
  window.addEventListener(
    "popstate",
    function (e) {
      Siren.CE();
    },
    false
  );
};

var home = location.href,
  Siren = {
    // 移动端菜单
    // MN: function () {
    //   $(".nav-toggle").on("click", function () {
    //     $("body").addClass("navOpen");
    //     $(".container, .site-nav-toggle, .site-sidebar").addClass("open");
    //   });

    //   $(".site-sidebar").on("click", function () {
    //     $("body").removeClass("navOpen");
    //     $(".container, .site-nav-toggle, .site-sidebar").removeClass("open");
    //   });
      
    // },

    // 移动端菜单自动隐藏
    MNH: function () {
      if ($("body").hasClass("navOpen")) {
        $("body").removeClass("navOpen");
        $(".container, .site-nav-toggle, .site-sidebar").removeClass("open");
      }
    },

    // 点击事件
    CE: function () {
      // 搜索框 TODO 后续再进行完善
      // $(".js-toggle-search").on("click", function () {
      //   $(".js-toggle-search").toggleClass("is-active");
      //   $(".js-search").toggleClass("is-visible");
      // });

      // $(".search_close").on("click", function () {
      //   if ($(".js-search").hasClass("is-visible")) {
      //     $(".js-toggle-search").toggleClass("is-active");
      //     $(".js-search").toggleClass("is-visible");
      //   }
      // });

      // $(".js-search-input").keydown(function(event) {
      //   if (event.keyCode == 13) {
      //     let keyword = $(".js-search-input").val();
      //     $.ajax({
      //       url: "/apis/api.halo.run/v1alpha1/indices/post?keyword=" + keyword + "&highlightPreTag=<mark>&highlightPostTag=</mark>",
      //       type: "get",
      //       dataType: "json",
      //       success(res) {
      //         debugger
      //       },
      //     });
      //   }
      // })

      // 过渡动画
      $("#loading").click(function () {
        $("#loading").fadeOut(500);
      });
    },

    // Ajax加载文章/说说
    XLS: function () {
      var $body = window.opera ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html,body");
      /**
       * 说说
       */
      // $body.on("click", "#moment-list-pagination a", function (e) {
      //   var tempScrollTop = $(window).scrollTop();
      //   $(this).addClass("loading").text("");
      //   $.ajax({
      //     type: "GET",
      //     url: $(this).attr("href"),
      //     success: function (data) {
      //       var result = $(data).find(".moments-container .moments-item");
      //       var nextHref = $(data).find("#moment-list-pagination a").attr("href");
      //       // 添加新的内容
      //       $(".moments-inner").append(result.fadeIn(500));
      //       $("#moment-list-pagination a").removeClass("loading").text("加载更多...");
      //       // 加载完成不改变位置
      //       $(window).scrollTop(tempScrollTop);
            LIlGGAttachContext.SS();
      //       if (nextHref != undefined) {
      //         $("#moment-list-pagination a").attr("href", nextHref);
      //       } else {
      //         $("#moment-list-pagination a").remove();
      //       }
      //     },
      //   });
      //   e.stopPropagation();
      //   e.preventDefault();
      //   return false;
      // });
    },

    // 返回顶部
    GT: function () {
      var offset = 100,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $(".cd-top");
      $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
          $back_to_top.addClass("cd-is-visible");
          $(".change-skin-gear").css("bottom", "0"); // 显示主题
          if ($(window).height() > 950) {
            $(".cd-top.cd-is-visible").css("top", "0");
          } else {
            $(".cd-top.cd-is-visible").css("top", $(window).height() - 950 + "px");
          }
        } else {
          $(".change-skin-gear").css("bottom", "-999px"); // 隐藏主题
          $(".cd-top.cd-is-visible").css("top", "-900px");
          $back_to_top.removeClass("cd-is-visible cd-fade-out");
        }
        if ($(this).scrollTop() > offset_opacity) {
          $back_to_top.addClass("cd-fade-out");
        }
      });
      //smooth scroll to top
      $back_to_top.on("click", function (event) {
        event.preventDefault();
        $("body,html").animate(
          {
            scrollTop: 0,
          },
          scroll_top_duration
        );
      });
    },
  };

var toast = null;

/**
 * 独立功能，可拔插
 */
$(function () {
  Siren.GT(); // 返回顶部
  Siren.XLS(); // Ajax文章列表
  Siren.CE(); // 点击事件
  // Siren.MN(); // 移动端菜单

  // 新增功能
  LIlGGAttachContext.CHS(); // 代码类Mac样式、高亮
  LIlGGAttachContext.MGT(); // 移动端回到顶部
  Poi.photosStyle == "packery" && supplement();
  LIlGGAttachContext.PHO(); // 图库功能
  LIlGGAttachContext.SS(); // 日志功能
  // 复制提示
  LIlGGAttachContext.CPY();
  // PJAX
  Poi.pjax && pjaxFun();
  I18N.init();
  // 全局提示组件
  if (Poi.openToast && window.outerWidth > 860) {
    toast = new Toast();
    toast.init({
      width: Poi.toastWidth,
      height: Poi.toastHeight,
      top: Poi.toastTop,
      background: Poi.toastBackground,
      color: Poi.toastColor,
      "font-size": Poi.toastFontSize,
    });
  }
  // 点赞
  $.fn.postLike = function () {
    if ($(this).hasClass("done")) {
      return false;
    } else {
      $(this).addClass("done");
      var id = $(this).data("id"),
        action = $(this).data("action"),
        rateHolder = $(this).children(".count");
      var ajax_data = {
        action: "specs_zan",
        um_id: id,
        um_action: action,
      };
      $.post(Poi.ajaxurl, ajax_data, function (data) {
        $(rateHolder).html(data);
      });
      return false;
    }
  };

  $(document).on("click", ".specsZan", function () {
    $(this).postLike();
  });

  console.log("%c Github %c", "background:#24272A; color:#ffffff", "", "https://github.com/LIlGG/halo-theme-Sakura");
});

/* 首页下拉箭头 */
function headertop_down() {
  var coverOffset = $("#content").offset().top;
  $("html,body").animate(
    {
      scrollTop: coverOffset,
    },
    600
  );
}

function imgError() {
  return (this.src = "/assets/images/default/temp.jpg");
}

/*
 * File skip-link-focus-fix.js.
 * Helps with accessibility for keyboard only users.
 * Learn more: https://git.io/vWdr2
 */
var isWebkit = navigator.userAgent.toLowerCase().indexOf("webkit") > -1,
  isOpera = navigator.userAgent.toLowerCase().indexOf("opera") > -1,
  isIe = navigator.userAgent.toLowerCase().indexOf("msie") > -1;

if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
  window.addEventListener(
    "hashchange",
    function (e) {
      var id = location.hash.substring(1),
        element;

      // fix #221 图库展示结束后禁止重新跳转
      if (e.oldURL.indexOf("#gallery-") !== -1) {
        return;
      }

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      element = document.getElementById(id);

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    },
    false
  );
}

var IllegalStateException = function (message) {
  IllegalStateException.prototype = new RuntimeException();
  IllegalStateException.prototype = {
    get name() {
      return "IllegalStateException";
    },
  };
};

var InvalidArgumentException = function (message) {
  InvalidArgumentException.prototype = new RuntimeException();
  InvalidArgumentException.prototype = {
    get name() {
      return "InvalidArgumentException";
    },
  };
};

var NotImplementedException = function (message) {
  NotImplementedException.prototype = new RuntimeException();
  NotImplementedException.prototype = {
    get name() {
      return "NotImplementedException";
    },
  };
};

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
