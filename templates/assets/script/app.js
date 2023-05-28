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

    LIlGGAttachContext.SS(); // 日志功能
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
  };

/**
 * 独立功能，可拔插
 */
$(function () {
  Siren.XLS(); // Ajax文章列表
  Siren.CE(); // 点击事件

  // 新增功能
  Poi.photosStyle == "packery" && supplement();
  LIlGGAttachContext.SS(); // 日志功能
  // PJAX
  Poi.pjax && pjaxFun();
});

function imgError() {
  return (this.src = "/assets/images/default/temp.jpg");
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
