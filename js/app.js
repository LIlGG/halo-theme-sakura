/*
 * Siren application js
 * @author Louie
 * @url http://i94.me
 * @date 2016.11.19
 */

// baguetteBox Libs
var baguetteBox = function () {
    function t(t, n) {
        H.transforms = f(), H.svg = g(), e(), j = document.querySelectorAll(t), [].forEach.call(j, function (t) {
            n && n.filter && (A = n.filter);
            var e = t.getElementsByTagName("a");
            e = [].filter.call(e, function (t) {
                return A.test(t.href)
            });
            var o = D.length;
            D.push(e), D[o].options = n, [].forEach.call(D[o], function (t, e) {
                m(t, "click", function (t) {
                    t.preventDefault ? t.preventDefault() : t.returnValue = !1, i(o), a(e)
                })
            })
        })
    }

    function e() {
        return (b = v("baguetteBox-overlay")) ? (k = v("baguetteBox-slider"), w = v("previous-button"), C = v("next-button"), T = v("close-button"), void 0) : (b = y("div"), b.id = "baguetteBox-overlay", document.getElementsByTagName("body")[0].appendChild(b), k = y("div"), k.id = "baguetteBox-slider", b.appendChild(k), w = y("button"), w.id = "previous-button", w.innerHTML = H.svg ? E : "&lt;", b.appendChild(w), C = y("button"), C.id = "next-button", C.innerHTML = H.svg ? x : "&gt;", b.appendChild(C), T = y("button"), T.id = "close-button", T.innerHTML = H.svg ? B : "X", b.appendChild(T), w.className = C.className = T.className = "baguetteBox-button", n(), void 0)
    }

    function n() {
        m(b, "click", function (t) {
            t.target && "IMG" !== t.target.nodeName && "FIGCAPTION" !== t.target.nodeName && r()
        }), m(w, "click", function (t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, c()
        }), m(C, "click", function (t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, u()
        }), m(T, "click", function (t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, r()
        }), m(b, "touchstart", function (t) {
            N = t.changedTouches[0].pageX
        }), m(b, "touchmove", function (t) {
            S || (t.preventDefault ? t.preventDefault() : t.returnValue = !1, touch = t.touches[0] || t.changedTouches[0], touch.pageX - N > 40 ? (S = !0, c()) : touch.pageX - N < -40 && (S = !0, u()))
        }), m(b, "touchend", function () {
            S = !1
        }), m(document, "keydown", function (t) {
            switch (t.keyCode) {
                case 37:
                    c();
                    break;
                case 39:
                    u();
                    break;
                case 27:
                    r()
            }
        })
    }

    function i(t) {
        if (M !== t) {
            for (M = t, o(D[t].options); k.firstChild;) k.removeChild(k.firstChild);
            X.length = 0;
            for (var e, n = 0; n < D[t].length; n++) e = y("div"), e.className = "full-image", e.id = "baguette-img-" + n, X.push(e), k.appendChild(X[n])
        }
    }

    function o(t) {
        t || (t = {});
        for (var e in P) I[e] = P[e], "undefined" != typeof t[e] && (I[e] = t[e]);
        k.style.transition = k.style.webkitTransition = "fadeIn" === I.animation ? "opacity .4s ease" : "slideIn" === I.animation ? "" : "none", "auto" === I.buttons && ("ontouchstart" in window || 1 === D[M].length) && (I.buttons = !1), w.style.display = C.style.display = I.buttons ? "" : "none"
    }

    function a(t) {
        "block" !== b.style.display && (L = t, s(L, function () {
            p(L), h(L)
        }), d(), b.style.display = "block", setTimeout(function () {
            b.className = "visible", I.afterShow && I.afterShow()
        }, 50), I.onChange && I.onChange(L, X.length))
    }

    function r() {
        "none" !== b.style.display && (b.className = "", setTimeout(function () {
            b.style.display = "none", I.afterHide && I.afterHide()
        }, 500))
    }

    function s(t, e) {
        var n = X[t];
        if ("undefined" != typeof n) {
            if (n.getElementsByTagName("img")[0]) return e && e(), void 0;
            imageElement = D[M][t], imageCaption = "function" == typeof I.captions ? I.captions.call(D[M], imageElement) : imageElement.getAttribute("data-caption") || imageElement.title, imageSrc = l(imageElement);
            var i = y("figure"),
                o = y("img"),
                a = y("figcaption");
            n.appendChild(i), i.innerHTML = '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>', o.onload = function () {
                var n = document.querySelector("#baguette-img-" + t + " .spinner");
                i.removeChild(n), !I.async && e && e()
            }, o.setAttribute("src", imageSrc), i.appendChild(o), I.captions && imageCaption && (a.innerHTML = imageCaption, i.appendChild(a)), I.async && e && e()
        }
    }

    function l(t) {
        var e = imageElement.href;
        if (t.dataset) {
            var n = [];
            for (var i in t.dataset) "at-" !== i.substring(0, 3) || isNaN(i.substring(3)) || (n[i.replace("at-", "")] = t.dataset[i]);
            keys = Object.keys(n).sort(function (t, e) {
                return parseInt(t) < parseInt(e) ? -1 : 1
            });
            for (var o = window.innerWidth * window.devicePixelRatio, a = 0; a < keys.length - 1 && keys[a] < o;) a++;
            e = n[keys[a]] || e
        }
        return e
    }

    function u() {
        var t;
        return L <= X.length - 2 ? (L++, d(), p(L), t = !0) : I.animation && (k.className = "bounce-from-right", setTimeout(function () {
            k.className = ""
        }, 400), t = !1), I.onChange && I.onChange(L, X.length), t
    }

    function c() {
        var t;
        return L >= 1 ? (L--, d(), h(L), t = !0) : I.animation && (k.className = "bounce-from-left", setTimeout(function () {
            k.className = ""
        }, 400), t = !1), I.onChange && I.onChange(L, X.length), t
    }

    function d() {
        var t = 100 * -L + "%";
        "fadeIn" === I.animation ? (k.style.opacity = 0, setTimeout(function () {
            H.transforms ? k.style.transform = k.style.webkitTransform = "translate3d(" + t + ",0,0)" : k.style.left = t, k.style.opacity = 1
        }, 400)) : H.transforms ? k.style.transform = k.style.webkitTransform = "translate3d(" + t + ",0,0)" : k.style.left = t
    }

    function f() {
        var t = y("div");
        return "undefined" != typeof t.style.perspective || "undefined" != typeof t.style.webkitPerspective
    }

    function g() {
        var t = y("div");
        return t.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == (t.firstChild && t.firstChild.namespaceURI)
    }

    function p(t) {
        t - L >= I.preload || s(t + 1, function () {
            p(t + 1)
        })
    }

    function h(t) {
        L - t >= I.preload || s(t - 1, function () {
            h(t - 1)
        })
    }

    function m(t, e, n) {
        t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent("on" + e, n)
    }

    function v(t) {
        return document.getElementById(t)
    }

    function y(t) {
        return document.createElement(t)
    }

    var b, k, w, C, T, N,
        E = '<svg width="44" height="60"><polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,.8)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>',
        x = '<svg width="44" height="60"><polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,.8)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>',
        B = '<svg width="30" height="30"><g stroke="rgba(255,255,255,.8)" stroke-width="4"><line x1="5" y1="5" x2="25" y2="25"/><line x1="5" y1="25" x2="25" y2="5"/></g></svg>',
        I = {},
        P = {
            captions: !0,
            buttons: "auto",
            async: !1,
            preload: 2,
            animation: "slideIn",
            afterShow: null,
            afterHide: null,
            onChange: null
        },
        H = {},
        L = 0,
        M = -1,
        S = !1,
        A = /.+\.(gif|jpe?g|png|webp)/i,
        j = [],
        D = [],
        X = [];
    return [].forEach || (Array.prototype.forEach = function (t, e) {
        for (var n = 0; n < this.length; n++) t.call(e, this[n], n, this)
    }), [].filter || (Array.prototype.filter = function (t, e, n, i, o) {
        for (n = this, i = [], o = 0; o < n.length; o++) t.call(e, n[o], o, n) && i.push(n[o]);
        return i
    }), {
        run: t,
        showNext: u,
        showPrevious: c
    }
}();

var home = location.href,
    Siren = {

        // 移动端菜单
        MN: function () {
            $('.iconflat').on('click', function () {
                $('body').toggleClass('navOpen');
                $('#main-container,#mo-nav,.openNav').toggleClass('open');
            });
        },

        // 移动端菜单自动隐藏
        MNH: function () {
            if ($('body').hasClass('navOpen')) {
                $('body').toggleClass('navOpen');
                $('#main-container,#mo-nav,.openNav').toggleClass('open');
            }
        },

        // 自适应窗口高度
        AH: function () {
            if (Poi.windowheight == 'auto') {
                if ($('h1.main-title').length > 0) {
                    var _height = $(window).height();
                    $('#centerbg').css({'height': _height});
                    $(window).resize(function () {
                        Siren.AH();
                    });
                }
            } else {
                $('.headertop').addClass('headertop-bar');
            }
        },

        // 进程
        PE: function () {
            if ($('.headertop').length > 0) {
                if ($('h1.main-title').length > 0) {
                    $('.blank').css({"padding-top": "0px"});
                    $('.headertop').css({"height": "auto"}).show();
                } else {
                    $('.blank').css({"padding-top": "80px"});
                    $('.headertop').css({"height": "0px"}).hide();
                }
            }
        },

        // 点击事件
        CE: function () {
            // 显示&隐藏评论
            $('.comments-hidden').show();
            $('.comments-main').hide();
            $('.comments-hidden').click(function () {
                $('.comments-main').slideDown(500);
                $('.comments-hidden').hide();
            });

            // 归档页
            $('.archives').hide();
            $('.archives:first').show();
            $('#archives-temp h3').click(function () {
                $(this).next().slideToggle('fast');
                return false;
            });

            // 灯箱
            baguetteBox.run('.entry-content', {
                captions: function (element) {
                    return element.getElementsByTagName('img')[0].alt;
                }
            });

            // 搜索框
            $('.js-toggle-search').on('click', function () {
                $('.js-toggle-search').toggleClass('is-active');
                $('.js-search').toggleClass('is-visible');
            });
            $('.search_close').on('click', function () {
                if ($('.js-search').hasClass('is-visible')) {
                    $('.js-toggle-search').toggleClass('is-active');
                    $('.js-search').toggleClass('is-visible');
                }
            });

            // 导航菜单
            $('#show-nav').on('click', function () {
                if ($('#show-nav').hasClass('showNav')) {
                    $('#show-nav').removeClass('showNav').addClass('hideNav');
                    $('.site-top .lower nav').addClass('navbar');
                } else {
                    $('#show-nav').removeClass('hideNav').addClass('showNav');
                    $('.site-top .lower nav').removeClass('navbar');
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
                if (s == h1) {
                    $('.site-header').removeClass('yya');
                }
                if (s > h1) {
                    $('.site-header').addClass('yya');
                }
                if (s > h2) {
                    $('.site-header').addClass('gizle');
                    if (s > ss) {
                        $('.site-header').removeClass('sabit');
                    } else {
                        $('.site-header').addClass('sabit');
                    }
                    ss = s;
                }
            });
        },

        // Ajax加载文章
        XLS: function () {
            $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $('body').on('click', '#pagination a', function () {
                $(this).addClass("loading").text("");
                $.ajax({
                    type: "GET",
                    url: $(this).attr("href") + "#main",
                    success: function (data) {
                        result = $(data).find("#main .post");
                        nextHref = $(data).find("#pagination a").attr("href");
                        // In the new content
                        $("#main").append(result.fadeIn(500));
                        $("#pagination a").removeClass("loading").text("下一页");
                        if (nextHref != undefined) {
                            $("#pagination a").attr("href", nextHref);
                        } else {
                            // If there is no link, that is the last page, then remove the navigation
                            $("#pagination").html("<span>没有更多文章了</span>");
                        }
                    }
                });
                return false;
            });
        },

        // 输入框特效
        IA: function () {
            POWERMODE.colorful = true; // make power mode colorful
            POWERMODE.shake = false; // turn off shake
            document.body.addEventListener('input', POWERMODE)
        },

        // 返回顶部
        GT: function () {
            var offset = 100,
                offset_opacity = 1200,
                scroll_top_duration = 700,
                $back_to_top = $('.cd-top');
            $(window).scroll(function () {
                ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
                if ($(this).scrollTop() > offset_opacity) {
                    $back_to_top.addClass('cd-fade-out');
                }
            });
            //smooth scroll to top
            $back_to_top.on('click', function (event) {
                event.preventDefault();
                $('body,html').animate({
                        scrollTop: 0,
                    }, scroll_top_duration
                );
            });
        }

    };

// Executive function
$(function () {

    Siren.AH(); // 自适应窗口高度
    Siren.PE(); // 进程
    Siren.NH(); // 显示&隐藏导航栏
    Siren.GT(); // 返回顶部
    Siren.XLS(); // Ajax文章列表
    Siren.CE(); // 点击事件
    Siren.MN(); // 移动端菜单
    Siren.IA(); // 输入框特效

    if (Poi.pjax) {
        $(document).pjax('a[target!=_top]', '#page', {
            fragment: '#page',
            timeout: 8000,
        }).on('pjax:send', function () {
            NProgress.start();
            Siren.MNH();
        }).on('pjax:complete', function () {
            Siren.AH();
            Siren.PE();
            Siren.CE();
            NProgress.done();
            $("#loading").fadeOut(500);
            if (Poi.codelamp == 'open') {
                self.Prism.highlightAll(event)
            }
        }).on('submit', '.search-form,.s-search', function (event) {
            event.preventDefault();
            $.pjax.submit(event, '#page', {
                fragment: '#page',
                timeout: 8000,
            });
            if ($('.js-search.is-visible').length > 0) {
                $('.js-toggle-search').toggleClass('is-active');
                $('.js-search').toggleClass('is-visible');
            }
        });
        window.addEventListener('popstate', function (e) {
            Siren.AH();
            Siren.PE();
            Siren.CE();
        }, false);
    }

    // 点赞
    $.fn.postLike = function () {
        if ($(this).hasClass('done')) {
            return false;
        } else {
            $(this).addClass('done');
            var id = $(this).data("id"),
                action = $(this).data('action'),
                rateHolder = $(this).children('.count');
            var ajax_data = {
                action: "specs_zan",
                um_id: id,
                um_action: action
            };
            $.post(Poi.ajaxurl, ajax_data,
                function (data) {
                    $(rateHolder).html(data);
                });
            return false;
        }
    };
    $(document).on("click", ".specsZan", function () {
        $(this).postLike();
    });

    console.log("%c Github %c", "background:#24272A; color:#ffffff", "", "https://github.com/louie-senpai");

});

/*
 * File skip-link-focus-fix.js.
 * Helps with accessibility for keyboard only users.
 * Learn more: https://git.io/vWdr2
*/
var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
        var id = location.hash.substring(1),
            element;

        if (!(/^[A-z0-9_-]+$/.test(id))) {
            return;
        }

        element = document.getElementById(id);

        if (element) {
            if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
                element.tabIndex = -1;
            }

            element.focus();
        }
    }, false);
}
