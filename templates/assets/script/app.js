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
    // 加载动态属性
    LIlGGAttachContext.LA();
    // 背景图片点击
    LIlGGAttachContext.BGEVEN();
    // 暂停背景视频
    if (Poi.headFocus && Poi.bgvideo) LIlGGAttachContext.BGV().bgPause();
    // 渲染主题
    LIlGGAttachContext.CBG().changeSkinSecter();
    try {
      $("#to-load-aplayer").on("click", function () {
        reloadAplayer();
        $("div").remove(".load-aplayer");
      });
      if ($("div").hasClass("aplayer")) {
        reloadAplayer();
      }
    } catch (e) {}

    Poi.toc && LIlGGAttachContext.TOC(); // 文章目录
    Poi._templateId === "post" && LIlGGAttachContext.POST_CONTEXT(); // 文章内容处理
    LIlGGAttachContext.CHS(); // 代码样式
    LIlGGAttachContext.PHO(); // 图库功能
    LIlGGAttachContext.SS(); // 日志功能
    // 复制提示
    LIlGGAttachContext.CPY();
    // i18n
    I18N.init();
  },
  // 背景视频
  BGV: function () {
    var $bg_video_btn = $("#video-btn"),
      $bg_video = $("#bgvideo"),
      $bg_video_stu = $(".video-stu"),
      dom = $bg_video[0],
      flvPlayer,
      mediaBlob;

    var bindBgVideoEvent = function () {
      $bg_video_btn.on("click", function () {
        if ($(this).hasClass("loadvideo")) {
          $(this).removeClass("loadvideo").hide();
          loadSource();
        } else {
          if ($(this).hasClass("video-pause")) {
            bgPause();
            $bg_video_btn.removeClass("videolive");
          } else {
            bgPlay();
            $bg_video_btn.addClass("videolive");
          }
        }
      });

      dom.oncanplay = function () {
        bgPlay();
        $bg_video_btn.addClass("videolive");
        $bg_video_btn.addClass("haslive");
      };

      dom.onended = function () {
        defaultStyle();
        flvPlayer.pause();
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
        flvPlayer = null;
      };
    };

    var defaultStyle = function () {
      $bg_video_btn.addClass("loadvideo").removeClass("video-pause");
      $bg_video_btn.removeClass("videolive");
      $bg_video_btn.removeClass("haslive");
      $(".focusinfo").css({
        top: 0,
      });
    };

    var bgPlay = function () {
      $bg_video_btn.addClass("video-pause").removeClass("video-play").show();
      $bg_video_stu.css({
        bottom: "-100px",
      });
      $(".focusinfo").css({
        top: "-999px",
      });
      $("#banner_wave_1").addClass("banner_wave_hide");
      $("#banner_wave_2").addClass("banner_wave_hide");
      flvPlayer.play();
    };

    var bgPause = function () {
      if (dom.oncanplay != undefined && $(".haslive").length > 0) {
        $bg_video_btn.addClass("video-play").removeClass("video-pause");
        $bg_video_stu
          .css({
            bottom: "0px",
          })
          .html("已暂停 ...");
        $(".focusinfo").css({
          top: 0,
        });
        $("#banner_wave_1").removeClass("banner_wave_hide");
        $("#banner_wave_2").removeClass("banner_wave_hide");

        dom.pause();
      }
    };

    try {
      var loadSource = function () {
        function handleResult(result) {
          var config;
          $bg_video_stu.html("正在载入视频 ...").css({
            bottom: "0px",
          });
          // 这里开始自定义的选项，根据不同的服务接口，处理不同的逻辑（具有较强的独特性）
          switch (result.server) {
            case "bilibili":
              switch (result.type) {
                case "mp4":
                  result["url"] = result["playUrl"][0]["url"];
                  break;
                case "m4s":
                  throw new RuntimeException("目前暂不支持m4s格式");
                default:
                  if (result.type.indexOf("flv") != -1) {
                    result.type = "flv";
                  }
                  result["segments"] = result["playUrl"];
                  for (var i = 0; i < result["segments"].length; i++) {
                    result["segments"][i]["duration"] = result["segments"][i]["length"];
                    result["segments"][i]["filesize"] = result["segments"][i]["size"];
                  }
                  var isCache = result["segments"][0]["isCached"];
                  config = isCache
                    ? {
                        enableStashBuffer: true,
                      }
                    : {
                        rangeLoadZeroStart: true,
                        enableStashBuffer: false,
                        lazyLoadMaxDuration: 8,
                        lazyLoadRecoverDuration: 5,
                      };
                  break;
              }
              break;
            case "local":
              // 获取后缀
              var urladdr = result.url.split("?")[0].split("/");
              var type = urladdr[urladdr.length - 1].split(".")[1];
              if (type != "mp4" && type != "flv") {
                throw new RuntimeException("无法解析的播放格式");
              }
              result["type"] = type;
              break;
          }
          playVideo(result, config);
        }

        function playVideo(result, config = {}) {
          var mediaDataSource = {
            type: result.type,
            url: result.url || "",
          };
          if (result.segments) {
            mediaDataSource.segments = result.segments;
          }
          // 关闭日志
          flvjs.LoggingControl.enableAll = false;
          flvjs.LoggingControl.enableError = true;
          flvPlayer = flvjs.createPlayer(mediaDataSource, config);
          flvPlayer.attachMediaElement(dom);
          flvPlayer.load();
        }

        if (mediaBlob) {
          $bg_video.attr("src", mediaBlob);
          return;
        }
        var b = "https://api.lixingyong.com/api/:server?type=urllist&id=:id&cid=:cid&qn=:qn&vtype=:vtype&r=:r";
        "undefined" != typeof bg_video_api && (b = bg_video_api);
        var dom = $bg_video[0];
        var url = dom.dataset.url;
        var id = dom.dataset.id;
        if (url) {
          var source = {
            title: dom.dataset.name || dom.dataset.title || "Video name",
            url: dom.dataset.url,
            server: "local",
          };
          handleResult(source);
        } else if (id) {
          var api = dom.dataset.api || b;
          api = api
            .replace(":server", dom.dataset.server || "bilibili")
            .replace(":id", id)
            .replace(":cid", dom.dataset.cid || "")
            .replace(":qn", dom.dataset.qn || "")
            .replace(":vtype", dom.dataset.vtype || "")
            .replace(":r", Math.random());

          var http = new XMLHttpRequest();
          (http.onreadystatechange = function () {
            if (4 === http.readyState && ((200 <= http.status && 300 > http.status) || 304 === http.status)) {
              var source = JSON.parse(http.responseText);
              source["server"] = dom.dataset.server || "bilibili";
              handleResult(source);
            }
          }),
            http.open("get", api, true),
            http.send();
        }
      };
    } catch (e) {
      Log.e("video", e.msg);
      defaultStyle();
    }

    if (
      dom != undefined &&
      dom.oncanplay == undefined &&
      document.body.clientWidth > 860 &&
      Poi.windowheight != "fixed"
    ) {
      bindBgVideoEvent();
    }

    return {
      bgPause: bgPause,
    };
  },
  // 文章列表动画
  PLSA: function () {
  },
  // 文章目录
  TOC: function () {
    if (document.body.clientWidth <= 1200) {
      return;
    }
    let $content = $(".entry-content");
    if ($content.length <= 0) {
      return;
    }
    let entryContentOffset = $content.offset().top;
    let offset = 75;
    $(".entry-content , .links")
      .children("h1,h2,h3,h4,h5")
      .each(function (index) {
        var hyphenated = "toc-head-" + index;
        $(this).attr("id", hyphenated);
      });

    tocbot.init({
      tocSelector: ".toc",
      contentSelector: [".entry-content", ".links"],
      headingSelector: "h1, h2, h3, h4, h5",
      collapseDepth: Poi.tocDepth,
      // TODO: 2.0 待适配
      // collapseDepth:
      //   !!PageAttr.metas.tocDepth && [0, 1, 2, 3, 4, 5].includes(Number(PageAttr.metas.tocDepth))
      //     ? Number(PageAttr.metas.tocDepth)
      //     : Poi.tocDepth,
      hasInnerContainers: false,
      disableTocScrollSync: true,
      headingsOffset: -(entryContentOffset - 75),
      scrollSmoothOffset: -75,
    });

    $(window).scroll(function () {
      let $toc = $(".toc-container .toc");
      let tocClientTop = $toc[0].getBoundingClientRect().top;
      $toc.css("max-height", `calc(100vh - ${tocClientTop}px - ${offset}px)`)
    })
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
  // 主题切换
  CBG: function () {
    var themeConfig = {};
    /**
     * 检查并回显主题
     */
    var checkBgImgEcho = function () {
      var configTag = Util.getLocalStorage("bgTagClass");
      var bgConfigTags = Object.keys(bgConfig);
      // 默认为bg_0
      configTag = bgConfigTags.includes(configTag) ? configTag : defaultTheme();
      // 切换主题
      changeBg(configTag);
    };
    var defaultTheme = function () {
      for (let key of Object.keys(bgConfig)) {
        if (bgConfig[key]["isDefault"]) {
          return key;
        }
      }
      return Object.keys(bgConfig)[0];
    };

    /**
     * 切换主题开关
     */
    var changeSkinGear = function () {
      //绑定主题子项点击事件
      Object.keys(bgConfig).forEach(function (currBg) {
        $(".skin-menu " + "#" + currBg).on("click", function () {
          changeBg(currBg, function () {
            // 保存tagClass, 方便下次查询
            Util.setLocalStorage("bgTagClass", currBg, 30 * 24 * 60 * 60);
            // 绑定完之后隐藏主题开关
            $(".skin-menu").removeClass("show");
            setTimeout(function () {
              $(".change-skin-gear").css("visibility", "visible");
            }, 300);
          });
        });
      });
      // 显示切换主题功能
      $(".change-skin-gear").css("visibility", "visible");
    };

    /**
     * 根据tagClass切换主题
     * @param {*} tagClass
     */
    var changeBg = function (tagClass, callback) {
      var bgAttr = bgConfig[tagClass];
      if (!bgAttr) return;
      themeConfig.bgAttr = bgAttr;

      $("body").removeAttr("style");
      $("body").css("background-image", bgAttr["url"] == "" ? "none" : "url(" + bgAttr["url"] + ")");
      changeSkinSecter();
      // 回调切换主题方法
      !callback || typeof callback == "undefined" || callback == undefined ? false : callback(bgAttr["isNight"]);
    };

    /**
     * 主题部分渲染
     */
    var changeSkinSecter = function () {
      // 渲染主题，如果配置不存在则直接返回
      if (Object.getOwnPropertyNames(themeConfig).length == 0) {
        return;
      }
      var bgAttr = themeConfig.bgAttr;
      // 删除以 theme_ 开头的 class
      Util.removeClassByPrefix($("body")[0], "theme_");
      // 增加 class
      $("body").remove("theme_" + bgAttr["id"]);
      $("body").addClass("theme_" + bgAttr["id"]);
      // 黑夜模式下
      if (bgAttr["isNight"]) {
        $("html").css("background", "#31363b");
        $(".site-content").css("background-color", "#fff");
        $("body").addClass("dark");
      } else {
        $("html").css("background", "unset");
        $("body").removeClass("dark");
        $(".site-content").css("background-color", "rgba(255, 255, 255, .8)");
      }

      switch (bgAttr["strategy"]) {
        case "no-repeat":
          $("body").css("background-repeat", "no-repeat");
          break;
        case "repeat":
          $("body").css("background-repeat", "repeat");
          break;
        case "cover":
          $("body").css("background-size", "cover");
          break;
        default:
          break;
      }
    };

    // 检查 localstore 并回显
    if (document.body.clientWidth > 860) {
      checkBgImgEcho();
      // 切换主题开关
      changeSkinGear();
    }

    $(".change-skin-gear")
      .off("click")
      .on("click", function () {
        $(".skin-menu").toggleClass("show");
      });

    $("#mobile-change-skin")
      .off("click")
      .on("click", function () {
        $(".skin-menu").toggleClass("show");
      });

    return {
      changeSkinSecter: changeSkinSecter,
    };
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

        // if (Poi.journalLikes) {
        //   // 说说是否已经点赞
        //   var $like = that.find(".moment-content .moment-like");
        //   if ($like.length > 0) {
        //     let jid = that.data("name");
        //     if (!jid) {
        //       return;
        //     }
        //     journalIds.includes(jid) ? $like.addClass("on") : "";
        //     // 说说点赞
        //     that
        //       .find(".moment-content .moment-like")
        //       .off("click")
        //       .on("click", function () {
        //         // 目前仅能前端控制是否已经点赞
        //         var $dom = $(this);
        //         var links = $dom.data("links");
        //         journalIds = Util.getLocalStorage("journalIds") || [];
        //         var flag = journalIds.includes(jid);
        //         if (flag) {
        //           return;
        //         }
        //         $.ajax({
        //           url: "/apis/api.halo.run/v1alpha1/trackers/upvote",
        //           type: "post",
        //           dataType: "json",
        //           contentType: "application/json",
        //           data: JSON.stringify({
        //             group: "moment.halo.run",
        //             plural: "moments",
        //             name: jid,
        //           }),
        //           complete(res) {
        //             if (res.status != 200) {
        //               Log.e("点赞失败，请求异常");
        //               return;
        //             }
        //             links++;
        //             journalIds.push(jid);
        //             $dom.addClass("on");
        //             Util.setLocalStorage("journalIds", journalIds, 60 * 60 * 24);
        //             $dom.children(":last-child").text(links);
        //             $dom.data("links", links);
        //           },
        //         });
        //       });
        //   }
        // }
      });
    }
  },
  // 背景视频点击切换
  BGEVEN: function () {
    function nextBG() {
      if (Poi.coverOpen == "true" && Poi.rimageUrl != "") {
        var url = new URL($(".centerbg").css("background-image").split('"')[1]);
        if (!url) {
          return;
        }
        if (Poi.coverNum == 0) {
          url.searchParams.set("t", new Date().getTime());
        } else {
          url.searchParams.set("t", (url.searchParams.get("t") % Poi.coverNum) + 1);
        }
        $(".centerbg").css("background-image", "url(" + url.href + ")");
      }
    }

    function preBG() {
      if (Poi.coverOpen == "true" && Poi.rimageUrl != "") {
        var url = new URL($(".centerbg").css("background-image").split('"')[1]);
        if (!url) {
          return;
        }
        if (Poi.coverNum == 0) {
          url.searchParams.set("t", new Date().getTime());
        } else {
          var t = url.searchParams.get("t");
          t = t - 1 || Poi.coverNum;
          url.searchParams.set("t", t);
        }
        $(".centerbg").css("background-image", "url(" + url.href + ")");
      }
    }

    $("#bg-next").on("click", function () {
      nextBG();
    });

    $("#bg-pre").on("click", function () {
      preBG();
    });
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

  LA: function () {},

  // 内容处理
  POST_CONTEXT: function () {
    const normal = "rgba(167, 210, 226, 1)";
    const medium = "rgba(255, 197, 160, 1)";
    const difficulty = "rgba(239, 206, 201, 1)";

    var msg, div, remind;
    var contentDom = document.getElementsByClassName("entry-content")[0];

    if (Poi.isPostWordCountToast) {
      var coefficient = 3;
      // TODO 后续补充元数据
      // if (!!PageAttr.metas.level) {
      //   coefficient = Number(PageAttr.metas.level);
      // }

      // TODO Halo2 不存在字数统计，进行前端统计
      var postWordCount = Util.getWordCount(document.querySelector(".entry-content"));
      if (!!postWordCount) {
        var color = "";
        var seconds = Util.caclEstimateReadTime(postWordCount, coefficient);
        var timeStr = Util.minuteToTimeString(seconds);
        // 时间段为 x 0<=10<=30<=+∞ 分钟
        if (seconds <= 60 * 10) {
          remind = Poi.postWordCountToastNormal || "文章篇幅适中，可以放心阅读。";
          color = normal;
        } else if (seconds <= 60 * 30 && seconds > 60 * 10) {
          remind = Poi.postWordCountToastMedium || "文章比较长，建议分段阅读。";
          color = medium;
        } else {
          remind = Poi.postWordCountToastDifficulty || "文章内容很长，提前准备好咖啡!!!";
          color = difficulty;
        }

        msg = `文章共 <b>${postWordCount}</b> 字，阅读完预计需要 <b>${timeStr}</b>。`;
        msg = mobileMsgProcess(msg, remind);
        div = buildToastDiv("word_count", color, msg);

        contentDom.insertAdjacentHTML("afterbegin", div);
      }
    }

    if (Poi.isPostEditTimeToast) {
      // 获取上次至今的时间差
      var editTime = new Date(PageAttr.postEditTime);
      if (!isNaN(editTime.getTime())) {
        var time = new Date().getTime() - editTime.getTime();
        var sinceLastTime = Util.timeAgo(editTime.getTime());
        // 时间段为 x 0<=1<=3<=+∞ 月
        if (time <= 1000 * 60 * 60 * 24 * 30) {
          remind = Poi.postEditTimeToastNormal || "近期有所更新，请放心阅读！";
          color = normal;
        } else if (time > 1000 * 60 * 60 * 24 * 30 && time <= 1000 * 60 * 60 * 24 * 90) {
          remind = Poi.postEditTimeToastMedium || "文章距上次编辑时间较远，部分内容可能已经过时！";
          color = medium;
        } else {
          remind = Poi.postEditTimeToastDifficulty || "文章内容已经很陈旧了，也许不再适用！";
          color = difficulty;
        }

        msg = `文章内容上次编辑时间于 <b>${sinceLastTime}</b>。`;
        msg = mobileMsgProcess(msg, remind);
        div = buildToastDiv("last_time", color, msg);

        contentDom.insertAdjacentHTML("afterbegin", div);
      }
    }

    var minicode = contentDom.getElementsByClassName("minicode");
    Array.prototype.forEach.call(minicode, (content) => {
      var hideMiniCode = content.getElementsByClassName("hide-minicode")[0];
      hideMiniCode.onclick = function () {
        content.classList.toggle("hide");
      };
    });

    function buildToastDiv(type, color, msg) {
      return `<div class="${type} minicode" style="background-color: ${color}">
                <span class="content-toast">
                  ${msg}
                </span>
                <div class="hide-minicode">
                  <span class="iconify iconify--small" data-icon="fa:times"></span>
                </div>
              </div>`;
    }

    function mobileMsgProcess(msg, remind) {
      if (window.innerWidth <= 860) {
        return msg;
      }
      return msg + `${remind}`;
    }
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
        $(".skin-menu").removeClass("show"); // 有滚动就隐藏主题选择
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
  // 背景视频点击切换
  LIlGGAttachContext.BGEVEN();
  Poi.themeChange && LIlGGAttachContext.CBG(); // 主题切换
  LIlGGAttachContext.PLSA(); // 文章列表动画
  Poi.headFocus && Poi.bgvideo && LIlGGAttachContext.BGV(); // 背景视频
  Poi.toc && LIlGGAttachContext.TOC(); // 文章目录
  Poi._templateId === "post" && LIlGGAttachContext.POST_CONTEXT(); // 文章内容处理
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
