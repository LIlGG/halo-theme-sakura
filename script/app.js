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
    // 暂停背景视频
    if (Poi.headFocus && Poi.bgvideo) LIlGGAttachContext.BGV().bgPause();
    // 渲染主题
    LIlGGAttachContext.CBG().changeSkinSecter();
    // 延迟加载图片
    lazyload(undefined, {
      rootMargin: "150px",
    });
    try {
      $("#to-load-aplayer").on("click", function () {
        reloadAplayer();
        $("div").remove(".load-aplayer");
      });
      if ($("div").hasClass("aplayer")) {
        reloadAplayer();
      }
    } catch (e) { }

    if (Poi.toc) LIlGGAttachContext.TOC(); // 文章目录
    LIlGGAttachContext.CHS(); // 代码样式
    LIlGGAttachContext.PHO(); // 图库功能
    LIlGGAttachContext.CMN(); // 评论组件
    // i18n
    I18N();
  },
  // 背景视频
  BGV: function () {
    var $bg_video_btn = $("#video-btn"),
      $bg_video = $("#bgvideo"),
      $bg_video_stu = $(".video-stu"),
      $bg_video_add = $("#video-add"),
      dom = $bg_video[0],
      diskTime = 20 * 1000,
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
        $bg_video_add.show();
        $bg_video_btn.addClass("videolive");
        $bg_video_btn.addClass("haslive");
      };

      dom.onended = function () {
        defaultStyle();
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer.destroy()
        flvPlayer = null
      };

      $bg_video_add.on("click", function () {
        loadSource();
      });
    };

    var defaultStyle = function () {
      $bg_video_add.hide();
      $bg_video_btn.addClass("loadvideo").removeClass("video-pause");
      $bg_video_btn.removeClass("videolive");
      $bg_video_btn.removeClass("haslive");
      $(".focusinfo").css({
        top: "49.3%",
      });
    }

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
          top: "49.3%",
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
                  }

                  config = {
                    rangeLoadZeroStart: true,
                    lazyLoadMaxDuration: 10,
                    lazyLoadRecoverDuration: 10,
                    enableStashBuffer: false
                  }
                  break;
              }
              break;
            case "local":
              // 获取后缀
              var urladdr = result.url.split('?')[0].split('/');
              var type = urladdr[urladdr.length - 1].split('.')[1];
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
            url: result.url || ''
          };
          if (result.segments) {
            // 对视频进行物理分片
            for (var i = 0; i < result.segments.length; i++) {
              var bitRate = parseInt(Math.round((result.segments[i].size / result.segments[i].length) * 1000) / 1000);
              result.segments[i].url = result.segments[i].url + "&bitRate=" + bitRate * diskTime + "&size=" + result.segments[i].size
            }
            mediaDataSource.segments = result.segments;
          }
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
            server: "local"
          };
          handleResult(source);
        } else if (id) {
          var api = dom.dataset.api || b;
          api = api
            .replace(":server", dom.dataset.server || 'bilibili')
            .replace(":id", id)
            .replace(":cid", dom.dataset.cid || '')
            .replace(":qn", dom.dataset.qn || '')
            .replace(":vtype", dom.dataset.vtype || '')
            .replace(":r", Math.random());

          var http = new XMLHttpRequest();
          (http.onreadystatechange = function () {
            if (
              4 === http.readyState &&
              ((200 <= http.status && 300 > http.status) || 304 === http.status)
            ) {
              var source = JSON.parse(http.responseText);
              source["server"] = dom.dataset.server || 'bilibili';
              handleResult(source);
            }
          }),
            http.open("get", api, true),
            http.send();
        }
      };
    } catch (e) {
      Log.e("video", e.msg)
      defaultStyle();
    }

    if (
      dom != undefined &&
      dom.oncanplay == undefined &&
      document.body.clientWidth > 860
    ) {
      bindBgVideoEvent();
    }

    return {
      bgPause: bgPause,
    };
  },
  // 文章列表动画
  PLSA: function () {
    // 首次加载时判断图片是否足够显示完整
    $("article.post-list-thumb:not(.post-list-show)").each(function (
      index,
      item
    ) {
      var pTop = item.getBoundingClientRect().top;
      var window_height = $(window).height();
      if (pTop <= window_height) {
        $(item).addClass("post-list-show");
      } else {
        return false;
      }
    });

    $(window).scroll(function () {
      var window_height = $(window).height();
      var hide_post_thumb_first = $(
        "article.post-list-thumb:not(.post-list-show):first"
      );
      if (hide_post_thumb_first.length > 0) {
        var pTop = hide_post_thumb_first[0].getBoundingClientRect().top;
        if (pTop <= window_height)
          hide_post_thumb_first.addClass("post-list-show");
      }
    });
  },
  // 文章目录
  TOC: function () {
    if (document.body.clientWidth <= 1200) {
      return;
    }
    var baseTopPadding = 240,
      maxToppadding = 134,
      offset = 100,
      bottomOffset = 30;
    if ($("div").hasClass("toc")) {
      $(".toc-container").css("height", $(".site-content").outerHeight());
    } else {
      // 纠正TOC为空时，警告问题
      return;
    }

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
      hasInnerContainers: false,
      headingsOffset:
        $("#page").find(".pattern-center").length > 0 ? -500 : -230,
      scrollEndCallback: function (e) {
        if ($(".is-active-link").length == 0) {
          return;
        }
        if ($(window).scrollTop() == 0) {
          $(".toc").animate({
            scrollTop: 0,
          });
          return;
        }
        var activeLikeOffset =
          $(".is-active-link").offset().top - $(window).scrollTop();
        // 当前可视高度小于100，则滚动时toc向上偏移一个li的高度
        if (activeLikeOffset < offset) {
          $(".toc").animate({
            scrollTop:
              $(".toc").scrollTop() -
              (offset - activeLikeOffset + $(".is-active-link").height()),
          });
        } else if (activeLikeOffset > $(window).height() - bottomOffset) {
          $(".toc").animate({
            scrollTop: $(".toc").scrollTop() + (activeLikeOffset - offset),
          });
        }
      },
    });

    (function () {
      $(".toc").css(
        "max-height",
        $(document).scrollTop() + ($(window).height() - baseTopPadding) + "px"
      );

      $(window).scroll(function () {
        var s = $(document).scrollTop();
        if (s == 0) {
          $(".toc").css(
            "max-height",
            $(document).scrollTop() +
            ($(window).height() - baseTopPadding) +
            "px"
          );
        } else if (s > offset) {
          $(".toc").css(
            "max-height",
            $(window).height() - maxToppadding + "px"
          );
        } else {
          $(".toc").css(
            "max-height",
            $(document).scrollTop() +
            ($(window).height() - baseTopPadding) +
            "px"
          );
        }
      });
    })();
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
          lang = className.substring(
            className.indexOf("-") + 1,
            className.length
          );
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
     * [#23](https://github.com/LIlGG/halo-theme-sakura/issues/23) 减少失误，将双击改为单击
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

      $(this).after(
        '<a class="copy-code" href="javascript:" data-clipboard-target="#hljs-' +
        i +
        '" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a>'
      );
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
      var configTag = utils.getCookie("bgTagClass");
      if (!configTag) return;
      var bgConfigTags = Object.keys(bgConfig);
      // 默认为bg_0
      bgConfigTags.includes(configTag) ? configTag : (configTag = "bg_0");
      // 切换主题
      changeBg(configTag);
    };

    /**
     * 切换主题开关
     */
    var changeSkinGear = function () {
      // 这里使用off来解决匿名空间的问题
      $(".changeSkin-gear")
        .off("click")
        .on("click", function () {
          $(".skin-menu").toggleClass("show");
        });

      //绑定主题子项点击事件
      Object.keys(bgConfig).forEach(function (currBg) {
        $(".skin-menu " + "#" + currBg).on("click", function () {
          changeBg(currBg, function () {
            // 保存tagClass, 方便下次查询
            utils.setCookie("bgTagClass", currBg, 30);
            // 绑定完之后隐藏主题开关
            $(".skin-menu").removeClass("show");
            setTimeout(function () {
              $(".changeSkin-gear").css("visibility", "visible");
            }, 300);
          });
        });
      });
      // 显示切换主题功能
      $(".changeSkin-gear").css("visibility", "visible");
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
      $("body").css(
        "background-image",
        bgAttr["url"] == "" ? "none" : "url(" + bgAttr["url"] + ")"
      );
      changeSkinSecter();
      // 回调切换主题方法
      !callback || typeof callback == "undefined" || callback == undefined
        ? false
        : callback(bgAttr["isNight"]);
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
      // 如果为黑夜模式，也会影响到评论组件
      var comments = document.getElementsByTagName("halo-comment");
      // 黑夜模式下
      if (bgAttr["isNight"]) {
        $("html").css("background", "#31363b");
        $(".site-content").css("background-color", "#fff");
        $("body").addClass("dark");
        for (var i = 0; i < comments.length; i++) {
          var shadowDom = comments[i].shadowRoot.getElementById("halo-comment");
          $(shadowDom).addClass("dark")
        }
      } else {
        $("html").css("background", "unset");
        $("body").removeClass("dark");
        $(".site-content").css("background-color", "rgba(255, 255, 255, .8)");
        for (var i = 0; i < comments.length; i++) {
          var shadowDom = comments[i].shadowRoot.getElementById("halo-comment");
          $(shadowDom).removeClass("dark")
        }
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

    // 检查cookie并回显
    if (document.body.clientWidth > 860) {
      checkBgImgEcho();
      // 切换主题开关
      changeSkinGear();
    }

    return {
      changeSkinSecter: changeSkinSecter,
    };
  },
  // 移动端回到顶部
  MGT: function () {
    var offset = 20,
      scroll_top_duration = 700,
      $m_back_to_top = $(".m-cd-top");
    $(window).scroll(function () {
      if ($(this).scrollTop() > offset) {
        $m_back_to_top.addClass("cd-is-visible");
      } else {
        $m_back_to_top.removeClass("cd-is-visible");
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
    document.body.addEventListener("copy", function (e) {
      if (Poi.copyrightNotice && window.getSelection().toString().length > 30) {
        setClipboardText(e);
      }
      if (toast) {
        toast.create("复制成功！<br>Copied to clipboard successfully!", 2000);
      }
    });

    var setClipboardText = function (event) {
      event.preventDefault();
      var htmlData =
        "# 商业转载请联系作者获得授权，非商业转载请注明出处。<br>" +
        "# For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.<br>" +
        "# 协议(License)：署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)<br>" +
        "# 作者(Author)：" +
        Poi.nickname +
        "<br>" +
        "# 链接(URL)：" +
        window.location.href +
        "<br>" +
        "# 来源(Source)：" +
        Poi.sitename +
        "<br><br>" +
        window.getSelection().toString().replace(/\r\n/g, "<br>");
      var textData =
        "# 商业转载请联系作者获得授权，非商业转载请注明出处。\n" +
        "# For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.\n" +
        "# 协议(License)：署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)\n" +
        "# 作者(Author)：" +
        Poi.nickname +
        "\n" +
        "# 链接(URL)：" +
        window.location.href +
        "\n" +
        "# 来源(Source)：" +
        Poi.sitename +
        "\n\n" +
        window.getSelection().toString().replace(/\r\n/g, "\n");
      if (event.clipboardData) {
        event.clipboardData.setData("text/html", htmlData);
        event.clipboardData.setData("text/plain", textData);
      } else if (window.clipboardData) {
        return window.clipboardData.setData("text", textData);
      }
    };
  },
  // 图库功能
  PHO: function () {
    var $photoPage = $(".photo-page");
    // 判断当前是否为图库界面
    if ($photoPage.length == 0) {
      return;
    }
    // 渲染图库信息
    var $masonrys = $(".masonry-gallery.gallery");

    var justify = function () {
      $masonrys.justifiedGallery({
        margins: isNaN(Poi.photosGutter) ? 10 : Number(Poi.photosGutter),
        rowHeight: 200,
      });

      // 过滤
      $("#gallery-filter li a").on("click", function () {
        $("#gallery-filter li a").removeClass("active");
        $(this).addClass("active");
        var dataFilter = $(this).data("filter");
        $masonrys.justifiedGallery({
          filter: dataFilter,
        });
        return false;
      });
    };

    var masonry = function () {
      var option =
        Poi.photosStyle == "masonry"
          ? {
            masonry: {
              gutter: isNaN(Poi.photosGutter) ? 10 : Number(Poi.photosGutter),
            },
            itemSelector: ".gallery-item",
          }
          : {
            layoutMode: "packery",
            packery: {
              columnWidth: 100,
              gutter: isNaN(Poi.photosGutter) ? 10 : Number(Poi.photosGutter),
            },
            itemSelector: ".gallery-item",
          };

      $masonrys.find("img.lazyload").on('load', function () {
        $(this).parents(".gallery-item").css("background", "#222")
        $masonrys.isotope(option);
      })

      // 过滤
      $("#gallery-filter li a").on("click", function () {
        $("#gallery-filter li a").removeClass("active");
        $(this).addClass("active");
        var dataFilter = $(this).data("filter");
        $masonrys.isotope({
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
            $masonrys.find(".gallery-item").removeClass("col-" + i);
          }
          $masonrys.find(".gallery-item").toggleClass($(this).closest("li").attr("class"));
          $masonrys.isotope(option);
        });
      }
    };

    if ($masonrys.length > 0) {
      if (Poi.photosStyle == "masonry" || Poi.photosStyle == "packery") {
        masonry();
      } else {
        justify();
      }
    }
  },
  // 日志
  SS: function () {
    /**
     * 根据日期时间，获取对应的图标
     * @param {*} time
     */
    var getTimeIcon = function (time) {
      var ICON_DAY = "kaiqitaiyangguangshezhi",
        ICON_MORN = "gengzaotubiao_tianqi-qingchen",
        ICON_NIGHT = "yueliang";
      var date = new Date(time);
      var hours = date.getHours();
      if (isNaN(hours)) {
        return ICON_DAY;
      }

      if (5 <= hours && hours < 12) {
        return ICON_MORN;
      } else if (12 <= hours && hours < 18) {
        return ICON_DAY;
      } else {
        return ICON_NIGHT;
      }
    };

    return function () {
      if ($(".journal").length > 0) {
        $(".journal").each(function () {
          // 为日志设置时间图标
          var $firstSpan = $(this).find(".journal-time>span").first();
          if ($firstSpan.find("i").length == 0) {
            $firstSpan.prepend(
              '<i class="iconfont icon-' +
              getTimeIcon($firstSpan.text()) +
              '"></i> '
            );
          }
          // 为所有图片增加box
          var $imgs = $(this).find(".journal-label img");
          $imgs.each(function () {
            if (!$(this).hasClass("journal-img")) {
              $(this)
                .addClass("journal-img")
                .wrap(
                  '<a data-fancybox="gallery" href="' +
                  $(this).attr("src") +
                  '">'
                );
            }
          });
        });
      }
    };
  },
  // 评论组件
  CMN: function () {
    // 复制一个css副本
    var commentStyle = $("#comment-style").clone();
    commentStyle.attr("media", "all");
    var comments = $("halo-comment");
    for (var i = 0; i < comments.length; i++) {
      // 注入外部css
      comments[i].shadowRoot.appendChild(commentStyle[0]);
    }
  }
};

// 图片错误类型
var IMG_Type = {
  DEFAULT: {
    id: 0,
    url:
      "https://cdn.lixingyong.com/2020/07/18/98fca04416944b282a558b98b2131879.png",
  },
};
/**
 * 图片加载失败/错误后的替补方案
 * @param {Document} ele 失败的图片dom
 * @param {Number} type 加载的图片类型
 */
var imgError = function (ele, type) {
  ele.src = type.url;
};

/**
 * 获取随机颜色值
 * 当获取的值越小，色调越偏冷
 * @param {*} min 色调值，0 - 1 之间的值
 * @param {*} max 色调值，需要大于min且为0 - 1之间的值
 */
var getRandomColor = function (min, max) {
  if (!min || min === undefined || min === "null" || min === "undefined") {
    min = 0;
  }
  if (!max || max === undefined || max === "null" || max === "undefined") {
    max = 0;
  }
  min = isNaN(min) ? 0 : Number(min);
  max = isNaN(max) ? 1 : Number(max);
  min = min < 0 ? 0 : min > 1 ? 1 : min;
  max = max < min ? 1 : max > 1 ? 1 : max;
  return (
    "#" +
    (function (h) {
      return new Array(7 - h.length).join("0") + h;
    })((((Math.random() * (max - min) + min) * 0x1000000) << 0).toString(16))
  );
};

/**
 * pjax功能
 */
var pjaxFun = function () {
  $(document)
    .pjax("a[target!=_top]", "#page", {
      fragment: "#page",
      timeout: 8000,
    })
    .on("pjax:send", function () {
      NProgress.start();
      Siren.MNH();
    })
    .on("pjax:complete", function () {
      Siren.AH();
      Siren.PE();
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
      if ($(".js-search.is-visible").length > 0) {
        $(".js-toggle-search").toggleClass("is-active");
        $(".js-search").toggleClass("is-visible");
      }
    });
  window.addEventListener(
    "popstate",
    function (e) {
      Siren.AH();
      Siren.PE();
      Siren.CE();
    },
    false
  );
};

var home = location.href,
  Siren = {
    // 移动端菜单
    MN: function () {
      $(".iconflat").on("click", function () {
        $("body").toggleClass("navOpen");
        $("#main-container,#mo-nav,.openNav").toggleClass("open");
      });
    },

    // 移动端菜单自动隐藏
    MNH: function () {
      if ($("body").hasClass("navOpen")) {
        $("body").toggleClass("navOpen");
        $("#main-container,#mo-nav,.openNav").toggleClass("open");
      }
    },

    // 自适应窗口高度
    AH: function () {
      if (Poi.windowheight == "auto") {
        if (window.outerWidth <= 860) {
          $("#centerbg").css({ height: 300 });
          $(".headertop").addClass("headertop-bar");
          return;
        }
        $(".headertop").removeClass("headertop-bar");
        if ($("h1.main-title").length > 0) {
          var _height = $(window).height();
          $("#centerbg").css({ height: _height });
          $("#bgvideo").css({ "min-height": _height });
          $(window).resize(function () {
            Siren.AH();
          });
        }
      } else {
        $(".headertop").addClass("headertop-bar");
      }
    },

    // 进程
    PE: function () {
      if ($(".headertop").length > 0) {
        if ($("h1.main-title").length > 0) {
          $(".blank").css({ "padding-top": "0px" });
          $(".headertop").css({ height: "auto" }).show();
        } else {
          $(".blank").css({ "padding-top": "5.2%" });
          $(".headertop").css({ height: "0px" }).hide();
        }
      }

      // table
      if ($(".entry-content").children("table").length > 0) {
        $(".entry-content")
          .children("table")
          .wrap("<div class='table-wrapper'></div>");
      }

      // 为文章中的图片增加灯箱设置
      if (
        $(".entry-content").length > 0 &&
        $(".entry-content").find("img").length > 0
      ) {
        $(".entry-content")
          .find("img")
          .each(function () {
            if (!$(this).hasClass("gallery-img")) {
              $(this)
                .addClass("gallery-img")
                .wrap(
                  '<a data-fancybox="gallery" href="' +
                  $(this).attr("src") +
                  '"></a>'
                );
            }
          });
      }

      // 标签云
      if (
        $("#tag-wordcloud").length > 0 &&
        $("#tag-wordcloud").children().length == 0
      ) {
        $("#tag-wordcloud").jQCloud(wordcloud, {
          autoResize: true,
          delayedMode: true,
        });
      }
      // 标签
      if ($(".chip").length > 0) {
        $(".chip").each(function () {
          $(this).css(
            "background-color",
            getRandomColor(Poi.tagRandomColorMin, Poi.tagRandomColorMax)
          );
        });
      }
      // 分类雷达
      if (
        $("#category-echarts").length > 0 &&
        $("#category-echarts").children().length == 0
      ) {
        var values = Object.values(categoryRadar),
          keys = Object.keys(categoryRadar);
        // 这里向上取5的倍数，例如100则取100 101则取105]
        if (keys.length < 3) {
          $("#category-echarts").remove();
          return;
        }
        var maxNum =
          Math.ceil(Math.max.apply(Math, _toConsumableArray(values)) / 5) * 5;
        var categoryChart = echarts.init(
          document.getElementById("category-echarts")
        );
        var option = {
          title: {
            text: "文章分类雷达图",
            left: "center",
            top: "25px",
            textStyle: {
              fontSize: 22,
              fontWeight: "normal",
            },
          },
          tooltip: {
            trigger: "item",
            textStyle: {
              align: "left",
            },
          },
          radar: [
            {
              indicator: (function () {
                var indicators = [];
                for (var i = 0; i < keys.length; i++) {
                  indicators.push({ text: keys[i], max: maxNum });
                }
                return indicators;
              })(),
              name: {
                textStyle: {
                  color: $(".dark").length > 0 ? "#bebebe" : "black"
                },
              },
              center: ["50%", "60%"],
              radius: "60%",
            },
          ],
          series: [
            {
              type: "radar",
              itemStyle: {
                color: "rgb(123,234,185)",
              },
              lineStyle: {
                color: "rgb(123,234,185)",
              },
              areaStyle: {
                color: "rgb(123,234,185)",
              },
              data: [
                {
                  value: values,
                  name: "文章分类数量",
                },
              ],
            },
          ],
        };
        categoryChart.setOption(option);
      }
      // 微信二维码
      if ($("#qrcode").length > 0 && $("#qrcode").children().length == 0) {
        new QRCode(document.getElementById("qrcode"), {
          text: $("#qrcode").data("url"),
          width: 128,
          height: 128,
          colorDark: "#000000",
          colorLight: "#ffffff",
        });
      }
      // 日志所需渲染方法
      LIlGGAttachContext.SS()();
    },

    // 点击事件
    CE: function () {
      // 显示&隐藏评论
      // $('.comments-hidden').show();
      // $('.comments-main').hide();
      // $('.comments-hidden').click(function () {
      //     $('.comments-main').slideDown(500);
      //     $('.comments-hidden').hide();
      // });

      // 归档页
      $(".archives").hide();
      $(".archives:first").show();
      $("#archives-temp h3").click(function () {
        $(this).next().slideToggle("fast");
        return false;
      });

      // 搜索框
      $(".js-toggle-search").on("click", function () {
        $(".js-toggle-search").toggleClass("is-active");
        $(".js-search").toggleClass("is-visible");
      });
      $(".search_close").on("click", function () {
        if ($(".js-search").hasClass("is-visible")) {
          $(".js-toggle-search").toggleClass("is-active");
          $(".js-search").toggleClass("is-visible");
        }
      });

      // 导航菜单
      $("#show-nav").on("click", function () {
        if ($("#show-nav").hasClass("showNav")) {
          $("#show-nav").removeClass("showNav").addClass("hideNav");
          $(".site-top .lower nav").addClass("navbar");
        } else {
          $("#show-nav").removeClass("hideNav").addClass("showNav");
          $(".site-top .lower nav").removeClass("navbar");
        }
      });

      // 过渡动画
      $("#loading").click(function () {
        $("#loading").fadeOut(500);
      });
    },

    // 显示&隐藏导航栏
    NH: function () {
      var h1 = 0,
        h2 = 50,
        ss = $(document).scrollTop();
      $(window).scroll(function () {
        var s = $(document).scrollTop();
        // 屏幕剩余的高度
        var surplus =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        // 当前位置小数
        var coorY = s / surplus;
        NProgress.set(coorY);
        if (s == h1) {
          $(".site-header").removeClass("yya");
        }
        if (s > h1) {
          $(".site-header").addClass("yya");
        }
        if (s > h2) {
          $(".site-header").addClass("gizle");
          if (s > ss) {
            $(".site-header").removeClass("sabit");
          } else {
            $(".site-header").addClass("sabit");
          }
          ss = s;
        }
      });
    },

    // Ajax加载文章/说说
    XLS: function () {
      var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
      $body.on("click", "#pagination a", function () {
        var tempScrollTop = $(window).scrollTop();
        $(this).addClass("loading").text("");
        $.ajax({
          type: "GET",
          url: $(this).attr("href") + "#main",
          success: function (data) {
            var result = $(data).find("#main .post");
            var nextHref = $(data).find("#pagination a").attr("href");
            // 添加新的内容
            $("#main").append(result.fadeIn(500));
            $("#pagination a").removeClass("loading").text("下一页");
            lazyload(undefined, {
              rootMargin: "150px",
            });
            // 加载完成不改变位置
            $(window).scrollTop(tempScrollTop);
            LIlGGAttachContext.PLSA();
            if (nextHref != undefined) {
              $("#pagination a").attr("href", nextHref);
            } else {
              $("#pagination").html("<span>没有更多文章了</span>");
            }
          },
        });
        return false;
      });
      /**
       * 说说
       */
      $body.on("click", "#journals-pagination a", function () {
        $(this).addClass("loading").text("");
        var tempScrollTop = $(window).scrollTop();
        $.ajax({
          type: "GET",
          url: $(this).attr("href") + "#main",
          success: function (data) {
            var result = $(data).find("#main .journal");
            var nextHref = $(data).find("#journals-pagination a").attr("href");
            // 添加新的内容
            $("#main").append(result.fadeIn(500));
            $("#journals-pagination a")
              .removeClass("loading")
              .text("加载更多...");
            lazyload(undefined, {
              rootMargin: "150px",
            });
            LIlGGAttachContext.SS()();
            // 加载完成不改变位置
            $(window).scrollTop(tempScrollTop);
            if (nextHref != undefined) {
              $("#journals-pagination a").attr("href", nextHref);
            } else {
              $("#journals-pagination a").remove();
            }
          },
        });
        return false;
      });
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
          $(".changeSkin-gear").css("bottom", "0"); // 显示主题
          if ($(window).height() > 950) {
            $(".cd-top.cd-is-visible").css("top", "0");
          } else {
            $(".cd-top.cd-is-visible").css(
              "top",
              $(window).height() - 950 + "px"
            );
          }
        } else {
          $(".changeSkin-gear").css("bottom", "-999px"); // 隐藏主题
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
  Siren.AH(); // 自适应窗口高度
  Siren.PE(); // 进程
  Siren.NH(); // 显示&隐藏导航栏
  Siren.GT(); // 返回顶部
  Siren.XLS(); // Ajax文章列表
  Siren.CE(); // 点击事件
  Siren.MN(); // 移动端菜单

  // 新增功能
  Poi.themeChange && LIlGGAttachContext.CBG(); // 主题切换
  LIlGGAttachContext.PLSA(); // 文章列表动画
  (Poi.headFocus && Poi.bgvideo) && LIlGGAttachContext.BGV(); // 背景视频
  Poi.toc && LIlGGAttachContext.TOC(); // 文章目录
  LIlGGAttachContext.CHS(); // 代码类Mac样式、高亮
  LIlGGAttachContext.MGT(); // 移动端回到顶部
  (Poi.photosStyle == "packery") && supplement();
  LIlGGAttachContext.PHO(); // 图库功能
  // 复制提示
  Poi.copyMonitor && LIlGGAttachContext.CPY();
  // 延迟加载图片
  lazyload(undefined, {
    rootMargin: "150px",
  });
  // 评论组件
  LIlGGAttachContext.CMN();
  // PJAX
  Poi.pjax && pjaxFun();
  I18N();
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

  console.log(
    "%c Github %c",
    "background:#24272A; color:#ffffff",
    "",
    "https://github.com/LIlGG/halo-theme-Sakura"
  );
});

/* 首页下拉箭头 */
function headertop_down() {
  var coverOffset = $('#content').offset().top;
  $('html,body').animate({
    scrollTop: coverOffset
  },
    600);
}

var supplement = function () {
  var PackeryMode = Isotope.LayoutMode.modes.packery;
  var __resetLayout = PackeryMode.prototype._resetLayout;
  PackeryMode.prototype._resetLayout = function () {
    __resetLayout.call(this);
    // 重置packer
    var parentSize = getSize(this.element.parentNode);
    var colW = this.columnWidth + this.gutter;
    this.fitWidth =
      Math.floor((parentSize.innerWidth + this.gutter) / colW) * colW;
    this.packer.width = this.fitWidth;
    this.packer.height = Number.POSITIVE_INFINITY;
    this.packer.reset();
  };

  PackeryMode.prototype._getContainerSize = function () {
    // 删除空白
    var emptyWidth = 0;
    for (var i = 0, len = this.packer.spaces.length; i < len; i++) {
      var space = this.packer.spaces[i];
      if (space.y === 0 && space.height === Number.POSITIVE_INFINITY) {
        emptyWidth += space.width;
      }
    }

    return {
      width: this.fitWidth - this.gutter,
      height: this.maxY - this.gutter,
    };
  };

  // 始终调整大小
  PackeryMode.prototype.needsResizeLayout = function () {
    return true;
  };
};

/*
 * File skip-link-focus-fix.js.
 * Helps with accessibility for keyboard only users.
 * Learn more: https://git.io/vWdr2
 */
var isWebkit = navigator.userAgent.toLowerCase().indexOf("webkit") > -1,
  isOpera = navigator.userAgent.toLowerCase().indexOf("opera") > -1,
  isIe = navigator.userAgent.toLowerCase().indexOf("msie") > -1;

if (
  (isWebkit || isOpera || isIe) &&
  document.getElementById &&
  window.addEventListener
) {
  window.addEventListener(
    "hashchange",
    function () {
      var id = location.hash.substring(1),
        element;

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

// 自定义工具包
var utils = {
  setCookie: function (name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "v1.0.0" + "=" + (value || "") + expires + "; path=/";
  },

  getCookie: function (name) {
    var nameEQ = name + "v1.0.0" + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  removeCookie: function (name) {
    document.cookie =
      name + mashiro_option.cookie_version + "=; Max-Age=-99999999;";
  },
  /**
   * 视频流关键帧搜索
   * @param {*} keyframesIndex 关键帧索引
   * @param {*} milliseconds 秒
   */
  getNearestKeyframe: function (keyframesIndex, milliseconds) {
    var keyframeIdx = this._search(keyframesIndex.times, milliseconds);

    return {
      index: keyframeIdx,
      milliseconds: table.times[keyframeIdx],
      fileposition: table.filepositions[keyframeIdx]
    };
  },
  /**
   * 搜索方式
   * @param {*} list 
   * @param {*} value 
   */
  _search: function (list, value) {
    var idx = 0;

    var last = list.length - 1;
    var mid = 0;
    var lbound = 0;
    var ubound = last;

    if (value < list[0]) {
      idx = 0;
      lbound = ubound + 1;
    }

    while (lbound <= ubound) {
      mid = lbound + Math.floor((ubound - lbound) / 2);
      if (mid === last || (value >= list[mid] && value < list[mid + 1])) {
        idx = mid;
        break;
      } else if (list[mid] < value) {
        lbound = mid + 1;
      } else {
        ubound = mid - 1;
      }
    }

    return idx;
  },
};

/**
 * 封装的toast组件（使用纯js，可以单独拿出去使用）
 * @author LIlGG
 */
var Toast = function Toast() {
  _classCallCheck(this, Toast);

  this._t = null;
  this._timeOut = null;
  this._settings = {
    duration: 2000,
    width: 260,
    height: 60,
    top: "top",
    background: "#fe9600",
    color: "#fff",
    "font-size": 14,
  };

  Toast.prototype.init = function (opt) {
    _extend(this._settings, opt);
  };
  /**
   * 创建Toast
   * @param {*} text 显示的文本
   * @param {*} duration 持续时间
   */

  Toast.prototype.create = function (text, duration) {
    // 清除原有的Toast
    if (this._timeOut) {
      clearTimeout(this._timeOut);
      document.body.removeChild(this._t);
      this._t = null;
    }

    if (!text) {
      console.error("提示文本不能为空");
      return;
    }

    this._t = document.createElement("div");
    this._t.className = "t-toast";
    this._t.innerHTML = '<p class="message"><span>' + text + "</span></p>";
    document.body.appendChild(this._t);
    this.setStyle();

    var _that = this;

    this._timeOut = setTimeout(function () {
      // 移除
      document.body.removeChild(_that._t);
      _that._timeOut = null;
      _that._t = null;
    }, duration || this._settings.duration);
  };

  Toast.prototype.setStyle = function () {
    this._t.style.width = this._settings.width + "px";
    this._t.style.height = this._settings.height + "px";
    this._t.style.position = "fixed";
    this._t.style["text-align"] = "center";
    this._t.style["z-index"] = "20200531";

    if (isNaN(Number(this._settings.top))) {
      if (this._settings.top == "centent") {
        this._t.style.top = _viewHeight() / 2 + "px";
      } else if (this._settings.top == "top") {
        this._t.style.top = "0px";
      }
    } else {
      this._t.style.top = this._settings.top + "px";
    }

    this._t.style.left = "50%";
    this._t.style["margin-left"] = "-" + this._settings.width / 2 + "px";
    this._t.style.background = this._settings.background;
    this._t.style.color = this._settings.color;
    this._t.style["border-bottom-left-radius"] = "4px";
    this._t.style["border-bottom-right-radius"] = "4px";
    this._t.style["font-size"] = this._settings["font-size"] + "px";
    this._t.style.display = "flex";
    this._t.style["justify-content"] = "center";
    this._t.style["align-items"] = "center";
  };

  function _viewHeight() {
    return document.documentElement.clientHeight;
  }

  function _extend(o1, o2) {
    for (var attr in o2) {
      o1[attr] = o2[attr];
    }
  }

};

/**
 * 自定义日志
 */
var Log = function () {
  return {
    e: function (tag, msg) {
      if (!tag || Log.FORCE_GLOBAL_TAG)
        tag = Log.GLOBAL_TAG;

      let str = `[${tag}] > ${msg}`;

      if (!Log.ENABLE_ERROR) {
        return;
      }

      if (console.error) {
        console.error(str);
      } else if (console.warn) {
        console.warn(str);
      } else {
        console.log(str);
      }
    },

    i: function (tag, msg) {
      if (!tag || Log.FORCE_GLOBAL_TAG)
        tag = Log.GLOBAL_TAG;

      let str = `[${tag}] > ${msg}`;

      if (!Log.ENABLE_INFO) {
        return;
      }

      if (console.info) {
        console.info(str);
      } else {
        console.log(str);
      }
    },

    w: function (tag, msg) {
      if (!tag || Log.FORCE_GLOBAL_TAG)
        tag = Log.GLOBAL_TAG;

      let str = `[${tag}] > ${msg}`;

      if (!Log.ENABLE_WARN) {
        return;
      }

      if (console.warn) {
        console.warn(str);
      } else {
        console.log(str);
      }
    },

    d: function (tag, msg) {
      if (!tag || Log.FORCE_GLOBAL_TAG)
        tag = Log.GLOBAL_TAG;

      let str = `[${tag}] > ${msg}`;

      if (!Log.ENABLE_DEBUG) {
        return;
      }

      if (console.debug) {
        console.debug(str);
      } else {
        console.log(str);
      }
    },

    v: function (tag, msg) {
      if (!tag || Log.FORCE_GLOBAL_TAG)
        tag = Log.GLOBAL_TAG;

      let str = `[${tag}] > ${msg}`;

      if (!Log.ENABLE_VERBOSE) {
        return;
      }

      console.log(str);
    }
  }
}();

Log.GLOBAL_TAG = 'Sakura';
Log.FORCE_GLOBAL_TAG = false;
Log.ENABLE_ERROR = true;
Log.ENABLE_INFO = true;
Log.ENABLE_WARN = true;
Log.ENABLE_DEBUG = true;
Log.ENABLE_VERBOSE = true;

/**
 * 自定义异常
 * @param {*} message 
 */
var RuntimeException = function (message) {
  this._message = message;

  RuntimeException.prototype = {
    get name() {
      return 'RuntimeException';
    },

    get message() {
      return this._message;
    },

    toString() {
      return this.name + ': ' + this.message;
    }
  }
}

var IllegalStateException = function (message) {
  IllegalStateException.prototype = new RuntimeException();
  IllegalStateException.prototype = {
    get name() {
      return 'IllegalStateException';
    }
  }
}

var InvalidArgumentException = function (message) {
  InvalidArgumentException.prototype = new RuntimeException();
  InvalidArgumentException.prototype = {
    get name() {
      return 'InvalidArgumentException';
    }
  }
}

var NotImplementedException = function (message) {
  NotImplementedException.prototype = new RuntimeException();
  NotImplementedException.prototype = {
    get name() {
      return 'NotImplementedException';
    }
  }
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
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
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
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
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
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
