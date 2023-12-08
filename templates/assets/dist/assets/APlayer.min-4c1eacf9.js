import { g as getDefaultExportFromCjs } from "./_commonjsHelpers-7a7fcd32.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var APlayer_min$2 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(window, function() {
    return function(e) {
      var t = {};
      function n(i) {
        if (t[i])
          return t[i].exports;
        var a = t[i] = { i, l: false, exports: {} };
        return e[i].call(a.exports, a, a.exports, n), a.l = true, a.exports;
      }
      return n.m = e, n.c = t, n.d = function(e2, t2, i) {
        n.o(e2, t2) || Object.defineProperty(e2, t2, { configurable: false, enumerable: true, get: i });
      }, n.r = function(e2) {
        Object.defineProperty(e2, "__esModule", { value: true });
      }, n.n = function(e2) {
        var t2 = e2 && e2.__esModule ? function() {
          return e2.default;
        } : function() {
          return e2;
        };
        return n.d(t2, "a", t2), t2;
      }, n.o = function(e2, t2) {
        return Object.prototype.hasOwnProperty.call(e2, t2);
      }, n.p = "/", n(n.s = 41);
    }([function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = /mobile/i.test(window.navigator.userAgent), a = { secondToTime: function(e2) {
        var t2 = Math.floor(e2 / 3600), n2 = Math.floor((e2 - 3600 * t2) / 60), i2 = Math.floor(e2 - 3600 * t2 - 60 * n2);
        return (t2 > 0 ? [t2, n2, i2] : [n2, i2]).map(function(e3) {
          return e3 < 10 ? "0" + e3 : "" + e3;
        }).join(":");
      }, getElementViewLeft: function(e2) {
        var t2 = e2.offsetLeft, n2 = e2.offsetParent, i2 = document.body.scrollLeft + document.documentElement.scrollLeft;
        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)
          for (; null !== n2 && n2 !== e2; )
            t2 += n2.offsetLeft, n2 = n2.offsetParent;
        else
          for (; null !== n2; )
            t2 += n2.offsetLeft, n2 = n2.offsetParent;
        return t2 - i2;
      }, getElementViewTop: function(e2, t2) {
        for (var n2, i2 = e2.offsetTop, a2 = e2.offsetParent; null !== a2; )
          i2 += a2.offsetTop, a2 = a2.offsetParent;
        return n2 = document.body.scrollTop + document.documentElement.scrollTop, t2 ? i2 : i2 - n2;
      }, isMobile: i, storage: { set: function(e2, t2) {
        localStorage.setItem(e2, t2);
      }, get: function(e2) {
        return localStorage.getItem(e2);
      } }, nameMap: { dragStart: i ? "touchstart" : "mousedown", dragMove: i ? "touchmove" : "mousemove", dragEnd: i ? "touchend" : "mouseup" }, randomOrder: function(e2) {
        return function(e3) {
          for (var t2 = e3.length - 1; t2 >= 0; t2--) {
            var n2 = Math.floor(Math.random() * (t2 + 1)), i2 = e3[n2];
            e3[n2] = e3[t2], e3[t2] = i2;
          }
          return e3;
        }([].concat(function(e3) {
          if (Array.isArray(e3)) {
            for (var t2 = 0, n2 = Array(e3.length); t2 < e3.length; t2++)
              n2[t2] = e3[t2];
            return n2;
          }
          return Array.from(e3);
        }(Array(e2))).map(function(e3, t2) {
          return t2;
        }));
      } };
      t.default = a;
    }, function(e, t, n) {
      var i = n(2);
      e.exports = function(e2) {
        e2 = e2 || {};
        var t2 = "", n2 = i.$each, a = e2.audio, r = (e2.$value, e2.$index, i.$escape), o = e2.theme, s = e2.index;
        return n2(a, function(e3, n3) {
          t2 += '\n<li>\n    <span class="aplayer-list-cur" style="background-color: ', t2 += r(e3.theme || o), t2 += ';"></span>\n    <span class="aplayer-list-index">', t2 += r(n3 + s), t2 += '</span>\n    <span class="aplayer-list-title">', t2 += r(e3.name), t2 += '</span>\n    <span class="aplayer-list-author">', t2 += r(e3.artist), t2 += "</span>\n</li>\n";
        }), t2;
      };
    }, function(e, t, n) {
      e.exports = n(15);
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = g(n(33)), a = g(n(32)), r = g(n(31)), o = g(n(30)), s = g(n(29)), l = g(n(28)), u = g(n(27)), c = g(n(26)), p = g(n(25)), d = g(n(24)), h = g(n(23)), y = g(n(22)), f = g(n(21)), v = g(n(20)), m = g(n(19));
      function g(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      var w = { play: i.default, pause: a.default, volumeUp: r.default, volumeDown: o.default, volumeOff: s.default, orderRandom: l.default, orderList: u.default, menu: c.default, loopAll: p.default, loopOne: d.default, loopNone: h.default, loading: y.default, right: f.default, skip: v.default, lrc: m.default };
      t.default = w;
    }, function(e, t, n) {
      var i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
        return typeof e2;
      } : function(e2) {
        return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
      };
      i = function() {
        return this;
      }();
      try {
        i = i || Function("return this")() || (0, eval)("this");
      } catch (e2) {
        "object" === ("undefined" == typeof window ? "undefined" : a(window)) && (i = window);
      }
      e.exports = i;
    }, function(e, t, n) {
      var i, a, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
        return typeof e2;
      } : function(e2) {
        return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
      };
      void 0 === (a = "function" == typeof (i = function() {
        if ("object" === ("undefined" == typeof window ? "undefined" : r(window)) && void 0 !== document.querySelectorAll && void 0 !== window.pageYOffset && void 0 !== history.pushState) {
          var e2 = function(e3, t3, n3, i2) {
            return n3 > i2 ? t3 : e3 + (t3 - e3) * ((a2 = n3 / i2) < 0.5 ? 4 * a2 * a2 * a2 : (a2 - 1) * (2 * a2 - 2) * (2 * a2 - 2) + 1);
            var a2;
          }, t2 = function(t3, n3, i2, a2) {
            n3 = n3 || 500;
            var r2 = (a2 = a2 || window).scrollTop || window.pageYOffset;
            if ("number" == typeof t3)
              var o = parseInt(t3);
            else
              var o = function(e3, t4) {
                return "HTML" === e3.nodeName ? -t4 : e3.getBoundingClientRect().top + t4;
              }(t3, r2);
            var s = Date.now(), l = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e3) {
              window.setTimeout(e3, 15);
            };
            !function u() {
              var c = Date.now() - s;
              a2 !== window ? a2.scrollTop = e2(r2, o, c, n3) : window.scroll(0, e2(r2, o, c, n3)), c > n3 ? "function" == typeof i2 && i2(t3) : l(u);
            }();
          }, n2 = function(e3) {
            if (!e3.defaultPrevented) {
              e3.preventDefault(), location.hash !== this.hash && window.history.pushState(null, null, this.hash);
              var n3 = document.getElementById(this.hash.substring(1));
              if (!n3)
                return;
              t2(n3, 500, function(e4) {
                location.replace("#" + e4.id);
              });
            }
          };
          return document.addEventListener("DOMContentLoaded", function() {
            for (var e3, t3 = document.querySelectorAll('a[href^="#"]:not([href="#"])'), i2 = t3.length; e3 = t3[--i2]; )
              e3.addEventListener("click", n2, false);
          }), t2;
        }
      }) ? i.call(t, n, t, e) : i) || (e.exports = a);
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }(), a = s(n(1)), r = s(n(0)), o = s(n(5));
      function s(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      var l = function() {
        function e2(t2) {
          !function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.player = t2, this.index = 0, this.audios = this.player.options.audio, this.bindEvents();
        }
        return i(e2, [{ key: "bindEvents", value: function() {
          var e3 = this;
          this.player.template.list.addEventListener("click", function(t2) {
            var n2 = void 0;
            n2 = "LI" === t2.target.tagName.toUpperCase() ? t2.target : t2.target.parentElement;
            var i2 = parseInt(n2.getElementsByClassName("aplayer-list-index")[0].innerHTML) - 1;
            i2 !== e3.index ? (e3.switch(i2), e3.player.play()) : e3.player.toggle();
          });
        } }, { key: "show", value: function() {
          this.player.events.trigger("listshow"), this.player.template.list.classList.remove("aplayer-list-hide"), this.player.template.listOl.scrollTop = 33 * this.index;
        } }, { key: "hide", value: function() {
          this.player.events.trigger("listhide"), this.player.template.list.classList.add("aplayer-list-hide");
        } }, { key: "toggle", value: function() {
          this.player.template.list.classList.contains("aplayer-list-hide") ? this.show() : this.hide();
        } }, { key: "add", value: function(e3) {
          this.player.events.trigger("listadd", { audios: e3 }), "[object Array]" !== Object.prototype.toString.call(e3) && (e3 = [e3]), e3.map(function(e4) {
            return e4.name = e4.name || e4.title || "Audio name", e4.artist = e4.artist || e4.author || "Audio artist", e4.cover = e4.cover || e4.pic, e4.type = e4.type || "normal", e4;
          });
          var t2 = !(this.audios.length > 1), n2 = 0 === this.audios.length;
          this.player.template.listOl.innerHTML += (0, a.default)({ theme: this.player.options.theme, audio: e3, index: this.audios.length + 1 }), this.audios = this.audios.concat(e3), t2 && this.audios.length > 1 && this.player.container.classList.add("aplayer-withlist"), this.player.randomOrder = r.default.randomOrder(this.audios.length), this.player.template.listCurs = this.player.container.querySelectorAll(".aplayer-list-cur"), this.player.template.listCurs[this.audios.length - 1].style.backgroundColor = e3.theme || this.player.options.theme, n2 && ("random" === this.player.options.order ? this.switch(this.player.randomOrder[0]) : this.switch(0));
        } }, { key: "remove", value: function(e3) {
          if (this.player.events.trigger("listremove", { index: e3 }), this.audios[e3])
            if (this.audios.length > 1) {
              var t2 = this.player.container.querySelectorAll(".aplayer-list li");
              t2[e3].remove(), this.audios.splice(e3, 1), this.player.lrc && this.player.lrc.remove(e3), e3 === this.index && (this.audios[e3] ? this.switch(e3) : this.switch(e3 - 1)), this.index > e3 && this.index--;
              for (var n2 = e3; n2 < t2.length; n2++)
                t2[n2].getElementsByClassName("aplayer-list-index")[0].textContent = n2;
              1 === this.audios.length && this.player.container.classList.remove("aplayer-withlist"), this.player.template.listCurs = this.player.container.querySelectorAll(".aplayer-list-cur");
            } else
              this.clear();
        } }, { key: "switch", value: function(e3) {
          if (this.player.events.trigger("listswitch", { index: e3 }), void 0 !== e3 && this.audios[e3]) {
            this.index = e3;
            var t2 = this.audios[this.index];
            this.player.template.pic.style.backgroundImage = t2.cover ? "url('" + t2.cover + "')" : "", this.player.theme(this.audios[this.index].theme || this.player.options.theme, this.index, false), this.player.template.title.innerHTML = t2.name, this.player.template.author.innerHTML = t2.artist ? " - " + t2.artist : "";
            var n2 = this.player.container.getElementsByClassName("aplayer-list-light")[0];
            n2 && n2.classList.remove("aplayer-list-light"), this.player.container.querySelectorAll(".aplayer-list li")[this.index].classList.add("aplayer-list-light"), (0, o.default)(33 * this.index, 500, null, this.player.template.listOl), this.player.setAudio(t2), this.player.lrc && this.player.lrc.switch(this.index), this.player.lrc && this.player.lrc.update(0), 1 !== this.player.duration && (this.player.template.dtime.innerHTML = r.default.secondToTime(this.player.duration));
          }
        } }, { key: "clear", value: function() {
          this.player.events.trigger("listclear"), this.index = 0, this.player.container.classList.remove("aplayer-withlist"), this.player.pause(), this.audios = [], this.player.lrc && this.player.lrc.clear(), this.player.audio.src = "", this.player.template.listOl.innerHTML = "", this.player.template.pic.style.backgroundImage = "", this.player.theme(this.player.options.theme, this.index, false), this.player.template.title.innerHTML = "No audio", this.player.template.author.innerHTML = "", this.player.bar.set("loaded", 0, "width"), this.player.template.dtime.innerHTML = r.default.secondToTime(0);
        } }]), e2;
      }();
      t.default = l;
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }();
      var a = function() {
        function e2() {
          !function(e3, t2) {
            if (!(e3 instanceof t2))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.events = {}, this.audioEvents = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "mozaudioavailable", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], this.playerEvents = ["destroy", "listshow", "listhide", "listadd", "listremove", "listswitch", "listclear", "noticeshow", "noticehide", "lrcshow", "lrchide"];
        }
        return i(e2, [{ key: "on", value: function(e3, t2) {
          this.type(e3) && "function" == typeof t2 && (this.events[e3] || (this.events[e3] = []), this.events[e3].push(t2));
        } }, { key: "trigger", value: function(e3, t2) {
          if (this.events[e3] && this.events[e3].length)
            for (var n2 = 0; n2 < this.events[e3].length; n2++)
              this.events[e3][n2](t2);
        } }, { key: "type", value: function(e3) {
          return -1 !== this.playerEvents.indexOf(e3) ? "player" : -1 !== this.audioEvents.indexOf(e3) ? "audio" : (console.error("Unknown event name: " + e3), null);
        } }]), e2;
      }();
      t.default = a;
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }();
      var a = function() {
        function e2(t2) {
          !function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.player = t2, window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e3) {
            window.setTimeout(e3, 1e3 / 60);
          }, this.types = ["loading"], this.init();
        }
        return i(e2, [{ key: "init", value: function() {
          var e3 = this;
          this.types.forEach(function(t2) {
            e3["init" + t2 + "Checker"]();
          });
        } }, { key: "initloadingChecker", value: function() {
          var e3 = this, t2 = 0, n2 = 0, i2 = false;
          this.loadingChecker = setInterval(function() {
            e3.enableloadingChecker && (n2 = e3.player.audio.currentTime, i2 || n2 !== t2 || e3.player.audio.paused || (e3.player.container.classList.add("aplayer-loading"), i2 = true), i2 && n2 > t2 && !e3.player.audio.paused && (e3.player.container.classList.remove("aplayer-loading"), i2 = false), t2 = n2);
          }, 100);
        } }, { key: "enable", value: function(e3) {
          this["enable" + e3 + "Checker"] = true, "fps" === e3 && this.initfpsChecker();
        } }, { key: "disable", value: function(e3) {
          this["enable" + e3 + "Checker"] = false;
        } }, { key: "destroy", value: function() {
          var e3 = this;
          this.types.forEach(function(t2) {
            e3["enable" + t2 + "Checker"] = false, e3[t2 + "Checker"] && clearInterval(e3[t2 + "Checker"]);
          });
        } }]), e2;
      }();
      t.default = a;
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }(), a = o(n(0)), r = o(n(3));
      function o(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      var s = function() {
        function e2(t2) {
          !function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.player = t2, this.initPlayButton(), this.initPlayBar(), this.initOrderButton(), this.initLoopButton(), this.initMenuButton(), a.default.isMobile || this.initVolumeButton(), this.initMiniSwitcher(), this.initSkipButton(), this.initLrcButton();
        }
        return i(e2, [{ key: "initPlayButton", value: function() {
          var e3 = this;
          this.player.template.pic.addEventListener("click", function() {
            e3.player.toggle();
          });
        } }, { key: "initPlayBar", value: function() {
          var e3 = this, t2 = function(t3) {
            var n3 = ((t3.clientX || t3.changedTouches[0].clientX) - a.default.getElementViewLeft(e3.player.template.barWrap)) / e3.player.template.barWrap.clientWidth;
            n3 = Math.max(n3, 0), n3 = Math.min(n3, 1), e3.player.bar.set("played", n3, "width"), e3.player.lrc && e3.player.lrc.update(n3 * e3.player.duration), e3.player.template.ptime.innerHTML = a.default.secondToTime(n3 * e3.player.duration);
          }, n2 = function n3(i2) {
            document.removeEventListener(a.default.nameMap.dragEnd, n3), document.removeEventListener(a.default.nameMap.dragMove, t2);
            var r2 = ((i2.clientX || i2.changedTouches[0].clientX) - a.default.getElementViewLeft(e3.player.template.barWrap)) / e3.player.template.barWrap.clientWidth;
            r2 = Math.max(r2, 0), r2 = Math.min(r2, 1), e3.player.bar.set("played", r2, "width"), e3.player.seek(e3.player.bar.get("played", "width") * e3.player.duration), e3.player.disableTimeupdate = false;
          };
          this.player.template.barWrap.addEventListener(a.default.nameMap.dragStart, function() {
            e3.player.disableTimeupdate = true, document.addEventListener(a.default.nameMap.dragMove, t2), document.addEventListener(a.default.nameMap.dragEnd, n2);
          });
        } }, { key: "initVolumeButton", value: function() {
          var e3 = this;
          this.player.template.volumeButton.addEventListener("click", function() {
            e3.player.audio.muted ? (e3.player.audio.muted = false, e3.player.switchVolumeIcon(), e3.player.bar.set("volume", e3.player.volume(), "height")) : (e3.player.audio.muted = true, e3.player.switchVolumeIcon(), e3.player.bar.set("volume", 0, "height"));
          });
          var t2 = function(t3) {
            var n3 = 1 - ((t3.clientY || t3.changedTouches[0].clientY) - a.default.getElementViewTop(e3.player.template.volumeBar, e3.player.options.fixed)) / e3.player.template.volumeBar.clientHeight;
            n3 = Math.max(n3, 0), n3 = Math.min(n3, 1), e3.player.volume(n3);
          }, n2 = function n3(i2) {
            e3.player.template.volumeBarWrap.classList.remove("aplayer-volume-bar-wrap-active"), document.removeEventListener(a.default.nameMap.dragEnd, n3), document.removeEventListener(a.default.nameMap.dragMove, t2);
            var r2 = 1 - ((i2.clientY || i2.changedTouches[0].clientY) - a.default.getElementViewTop(e3.player.template.volumeBar, e3.player.options.fixed)) / e3.player.template.volumeBar.clientHeight;
            r2 = Math.max(r2, 0), r2 = Math.min(r2, 1), e3.player.volume(r2);
          };
          this.player.template.volumeBarWrap.addEventListener(a.default.nameMap.dragStart, function() {
            e3.player.template.volumeBarWrap.classList.add("aplayer-volume-bar-wrap-active"), document.addEventListener(a.default.nameMap.dragMove, t2), document.addEventListener(a.default.nameMap.dragEnd, n2);
          });
        } }, { key: "initOrderButton", value: function() {
          var e3 = this;
          this.player.template.order.addEventListener("click", function() {
            "list" === e3.player.options.order ? (e3.player.options.order = "random", e3.player.template.order.innerHTML = r.default.orderRandom) : "random" === e3.player.options.order && (e3.player.options.order = "list", e3.player.template.order.innerHTML = r.default.orderList);
          });
        } }, { key: "initLoopButton", value: function() {
          var e3 = this;
          this.player.template.loop.addEventListener("click", function() {
            e3.player.list.audios.length > 1 ? "one" === e3.player.options.loop ? (e3.player.options.loop = "none", e3.player.template.loop.innerHTML = r.default.loopNone) : "none" === e3.player.options.loop ? (e3.player.options.loop = "all", e3.player.template.loop.innerHTML = r.default.loopAll) : "all" === e3.player.options.loop && (e3.player.options.loop = "one", e3.player.template.loop.innerHTML = r.default.loopOne) : "one" === e3.player.options.loop || "all" === e3.player.options.loop ? (e3.player.options.loop = "none", e3.player.template.loop.innerHTML = r.default.loopNone) : "none" === e3.player.options.loop && (e3.player.options.loop = "all", e3.player.template.loop.innerHTML = r.default.loopAll);
          });
        } }, { key: "initMenuButton", value: function() {
          var e3 = this;
          this.player.template.menu.addEventListener("click", function() {
            e3.player.list.toggle();
          });
        } }, { key: "initMiniSwitcher", value: function() {
          var e3 = this;
          this.player.template.miniSwitcher.addEventListener("click", function() {
            e3.player.setMode("mini" === e3.player.mode ? "normal" : "mini");
          });
        } }, { key: "initSkipButton", value: function() {
          var e3 = this;
          this.player.template.skipBackButton.addEventListener("click", function() {
            e3.player.skipBack();
          }), this.player.template.skipForwardButton.addEventListener("click", function() {
            e3.player.skipForward();
          }), this.player.template.skipPlayButton.addEventListener("click", function() {
            e3.player.toggle();
          });
        } }, { key: "initLrcButton", value: function() {
          var e3 = this;
          this.player.template.lrcButton.addEventListener("click", function() {
            e3.player.template.lrcButton.classList.contains("aplayer-icon-lrc-inactivity") ? (e3.player.template.lrcButton.classList.remove("aplayer-icon-lrc-inactivity"), e3.player.lrc && e3.player.lrc.show()) : (e3.player.template.lrcButton.classList.add("aplayer-icon-lrc-inactivity"), e3.player.lrc && e3.player.lrc.hide());
          });
        } }]), e2;
      }();
      t.default = s;
    }, function(e, t, n) {
      var i = n(2);
      e.exports = function(e2) {
        e2 = e2 || {};
        var t2 = "", n2 = i.$each, a = e2.lyrics, r = (e2.$value, e2.$index, i.$escape);
        return n2(a, function(e3, n3) {
          t2 += "\n    <p", 0 === n3 && (t2 += ' class="aplayer-lrc-current"'), t2 += ">", t2 += r(e3[1]), t2 += "</p>\n";
        }), t2;
      };
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i, a = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }(), r = n(10), o = (i = r) && i.__esModule ? i : { default: i };
      var s = function() {
        function e2(t2) {
          !function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.container = t2.container, this.async = t2.async, this.player = t2.player, this.parsed = [], this.index = 0, this.current = [];
        }
        return a(e2, [{ key: "show", value: function() {
          this.player.events.trigger("lrcshow"), this.player.template.lrcWrap.classList.remove("aplayer-lrc-hide");
        } }, { key: "hide", value: function() {
          this.player.events.trigger("lrchide"), this.player.template.lrcWrap.classList.add("aplayer-lrc-hide");
        } }, { key: "toggle", value: function() {
          this.player.template.lrcWrap.classList.contains("aplayer-lrc-hide") ? this.show() : this.hide();
        } }, { key: "update", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.player.audio.currentTime;
          if (this.index > this.current.length - 1 || e3 < this.current[this.index][0] || !this.current[this.index + 1] || e3 >= this.current[this.index + 1][0])
            for (var t2 = 0; t2 < this.current.length; t2++)
              e3 >= this.current[t2][0] && (!this.current[t2 + 1] || e3 < this.current[t2 + 1][0]) && (this.index = t2, this.container.style.transform = "translateY(" + 16 * -this.index + "px)", this.container.style.webkitTransform = "translateY(" + 16 * -this.index + "px)", this.container.getElementsByClassName("aplayer-lrc-current")[0].classList.remove("aplayer-lrc-current"), this.container.getElementsByTagName("p")[t2].classList.add("aplayer-lrc-current"));
        } }, { key: "switch", value: function(e3) {
          var t2 = this;
          if (!this.parsed[e3])
            if (this.async) {
              this.parsed[e3] = [["00:00", "Loading"]];
              var n2 = new XMLHttpRequest();
              n2.onreadystatechange = function() {
                e3 === t2.player.list.index && 4 === n2.readyState && (n2.status >= 200 && n2.status < 300 || 304 === n2.status ? t2.parsed[e3] = t2.parse(n2.responseText) : (t2.player.notice("LRC file request fails: status " + n2.status), t2.parsed[e3] = [["00:00", "Not available"]]), t2.container.innerHTML = (0, o.default)({ lyrics: t2.parsed[e3] }), t2.update(0), t2.current = t2.parsed[e3]);
              };
              var i2 = this.player.list.audios[e3].lrc;
              n2.open("get", i2, true), n2.send(null);
            } else
              this.player.list.audios[e3].lrc ? this.parsed[e3] = this.parse(this.player.list.audios[e3].lrc) : this.parsed[e3] = [["00:00", "Not available"]];
          this.container.innerHTML = (0, o.default)({ lyrics: this.parsed[e3] }), this.update(0), this.current = this.parsed[e3];
        } }, { key: "parse", value: function(e3) {
          if (e3) {
            for (var t2 = (e3 = e3.replace(/([^\]^\n])\[/g, function(e4, t3) {
              return t3 + "\n[";
            })).split("\n"), n2 = [], i2 = t2.length, a2 = 0; a2 < i2; a2++) {
              var r2 = t2[a2].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g), o2 = t2[a2].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, "").replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, "").replace(/^\s+|\s+$/g, "");
              if (r2)
                for (var s2 = r2.length, l = 0; l < s2; l++) {
                  var u = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(r2[l]), c = 60 * u[1] + parseInt(u[2]) + (u[4] ? parseInt(u[4]) / (2 === (u[4] + "").length ? 100 : 1e3) : 0);
                  n2.push([c, o2]);
                }
            }
            return (n2 = n2.filter(function(e4) {
              return e4[1];
            })).sort(function(e4, t3) {
              return e4[0] - t3[0];
            }), n2;
          }
          return [];
        } }, { key: "remove", value: function(e3) {
          this.parsed.splice(e3, 1);
        } }, { key: "clear", value: function() {
          this.parsed = [], this.container.innerHTML = "";
        } }]), e2;
      }();
      t.default = s;
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i, a = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }(), r = n(0), o = (i = r) && i.__esModule ? i : { default: i };
      var s = function() {
        function e2(t2) {
          !function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.storageName = t2.options.storageName, this.data = JSON.parse(o.default.storage.get(this.storageName)), this.data || (this.data = {}), this.data.volume = this.data.volume || t2.options.volume;
        }
        return a(e2, [{ key: "get", value: function(e3) {
          return this.data[e3];
        } }, { key: "set", value: function(e3, t2) {
          this.data[e3] = t2, o.default.storage.set(this.storageName, JSON.stringify(this.data));
        } }]), e2;
      }();
      t.default = s;
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }();
      var a = function() {
        function e2(t2) {
          !function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.elements = {}, this.elements.volume = t2.volume, this.elements.played = t2.played, this.elements.loaded = t2.loaded;
        }
        return i(e2, [{ key: "set", value: function(e3, t2, n2) {
          t2 = Math.max(t2, 0), t2 = Math.min(t2, 1), this.elements[e3].style[n2] = 100 * t2 + "%";
        } }, { key: "get", value: function(e3, t2) {
          return parseFloat(this.elements[e3].style[t2]) / 100;
        } }]), e2;
      }();
      t.default = a;
    }, function(e, t, n) {
      (function(t2) {
        e.exports = false;
        try {
          e.exports = "[object process]" === Object.prototype.toString.call(t2.process);
        } catch (e2) {
        }
      }).call(this, n(4));
    }, function(e, t, n) {
      (function(t2) {
        var i = n(14), a = Object.create(i ? t2 : window), r = /["&'<>]/;
        a.$escape = function(e2) {
          return function(e3) {
            var t3 = "" + e3, n2 = r.exec(t3);
            if (!n2)
              return e3;
            var i2 = "", a2 = void 0, o = void 0, s = void 0;
            for (a2 = n2.index, o = 0; a2 < t3.length; a2++) {
              switch (t3.charCodeAt(a2)) {
                case 34:
                  s = "&#34;";
                  break;
                case 38:
                  s = "&#38;";
                  break;
                case 39:
                  s = "&#39;";
                  break;
                case 60:
                  s = "&#60;";
                  break;
                case 62:
                  s = "&#62;";
                  break;
                default:
                  continue;
              }
              o !== a2 && (i2 += t3.substring(o, a2)), o = a2 + 1, i2 += s;
            }
            return o !== a2 ? i2 + t3.substring(o, a2) : i2;
          }(function e3(t3) {
            "string" != typeof t3 && (t3 = void 0 === t3 || null === t3 ? "" : "function" == typeof t3 ? e3(t3.call(t3)) : JSON.stringify(t3));
            return t3;
          }(e2));
        }, a.$each = function(e2, t3) {
          if (Array.isArray(e2))
            for (var n2 = 0, i2 = e2.length; n2 < i2; n2++)
              t3(e2[n2], n2);
          else
            for (var a2 in e2)
              t3(e2[a2], a2);
        }, e.exports = a;
      }).call(this, n(4));
    }, function(e, t, n) {
      var i = n(2);
      e.exports = function(e2) {
        var t2 = "", a = (e2 = e2 || {}).options, r = e2.cover, o = i.$escape, s = e2.icons, l = function(e3) {
          return t2 += e3;
        }, u = e2.getObject;
        e2.theme, e2.audio, e2.index;
        return a.fixed ? (t2 += '\n<div class="aplayer-list', a.listFolded && (t2 += " aplayer-list-hide"), t2 += '"', a.listMaxHeight && (t2 += ' style="max-height: ', t2 += o(a.listMaxHeight), t2 += '"'), t2 += ">\n    <ol", a.listMaxHeight && (t2 += ' style="max-height: ', t2 += o(a.listMaxHeight), t2 += '"'), t2 += ">\n        ", l(n(1)(u({ theme: a.theme, audio: a.audio, index: 1 }))), t2 += '\n    </ol>\n</div>\n<div class="aplayer-body">\n    <div class="aplayer-pic" style="', r && (t2 += "background-image: url(&quot;", t2 += o(r), t2 += "&quot;);"), t2 += "background-color: ", t2 += o(a.theme), t2 += ';">\n        <div class="aplayer-button aplayer-play">', t2 += s.play, t2 += '</div>\n    </div>\n    <div class="aplayer-info" style="display: none;">\n        <div class="aplayer-music">\n            <span class="aplayer-title">No audio</span>\n            <span class="aplayer-author"></span>\n        </div>\n        <div class="aplayer-controller">\n            <div class="aplayer-bar-wrap">\n                <div class="aplayer-bar">\n                    <div class="aplayer-loaded" style="width: 0"></div>\n                    <div class="aplayer-played" style="width: 0; background: ', t2 += o(a.theme), t2 += ';">\n                        <span class="aplayer-thumb" style="background: ', t2 += o(a.theme), t2 += ';">\n                            <span class="aplayer-loading-icon">', t2 += s.loading, t2 += '</span>\n                        </span>\n                    </div>\n                </div>\n            </div>\n            <div class="aplayer-time">\n                <span class="aplayer-time-inner">\n                    <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\n                </span>\n                <span class="aplayer-icon aplayer-icon-back">\n                    ', t2 += s.skip, t2 += '\n                </span>\n                <span class="aplayer-icon aplayer-icon-play">\n                    ', t2 += s.play, t2 += '\n                </span>\n                <span class="aplayer-icon aplayer-icon-forward">\n                    ', t2 += s.skip, t2 += '\n                </span>\n                <div class="aplayer-volume-wrap">\n                    <button type="button" class="aplayer-icon aplayer-icon-volume-down">\n                        ', t2 += s.volumeDown, t2 += '\n                    </button>\n                    <div class="aplayer-volume-bar-wrap">\n                        <div class="aplayer-volume-bar">\n                            <div class="aplayer-volume" style="height: 80%; background: ', t2 += o(a.theme), t2 += ';"></div>\n                        </div>\n                    </div>\n                </div>\n                <button type="button" class="aplayer-icon aplayer-icon-order">\n                    ', "list" === a.order ? t2 += s.orderList : "random" === a.order && (t2 += s.orderRandom), t2 += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-loop">\n                    ', "one" === a.loop ? t2 += s.loopOne : "all" === a.loop ? t2 += s.loopAll : "none" === a.loop && (t2 += s.loopNone), t2 += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-menu">\n                    ', t2 += s.menu, t2 += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-lrc">\n                    ', t2 += s.lrc, t2 += '\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class="aplayer-notice"></div>\n    <div class="aplayer-miniswitcher"><button class="aplayer-icon">', t2 += s.right, t2 += '</button></div>\n</div>\n<div class="aplayer-lrc">\n    <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\n</div>\n') : (t2 += '\n<div class="aplayer-body">\n    <div class="aplayer-pic" style="', r && (t2 += "background-image: url(&quot;", t2 += o(r), t2 += "&quot;);"), t2 += "background-color: ", t2 += o(a.theme), t2 += ';">\n        <div class="aplayer-button aplayer-play">', t2 += s.play, t2 += '</div>\n    </div>\n    <div class="aplayer-info">\n        <div class="aplayer-music">\n            <span class="aplayer-title">No audio</span>\n            <span class="aplayer-author"></span>\n        </div>\n        <div class="aplayer-lrc">\n            <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\n        </div>\n        <div class="aplayer-controller">\n            <div class="aplayer-bar-wrap">\n                <div class="aplayer-bar">\n                    <div class="aplayer-loaded" style="width: 0"></div>\n                    <div class="aplayer-played" style="width: 0; background: ', t2 += o(a.theme), t2 += ';">\n                        <span class="aplayer-thumb" style="background: ', t2 += o(a.theme), t2 += ';">\n                            <span class="aplayer-loading-icon">', t2 += s.loading, t2 += '</span>\n                        </span>\n                    </div>\n                </div>\n            </div>\n            <div class="aplayer-time">\n                <span class="aplayer-time-inner">\n                    <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\n                </span>\n                <span class="aplayer-icon aplayer-icon-back">\n                    ', t2 += s.skip, t2 += '\n                </span>\n                <span class="aplayer-icon aplayer-icon-play">\n                    ', t2 += s.play, t2 += '\n                </span>\n                <span class="aplayer-icon aplayer-icon-forward">\n                    ', t2 += s.skip, t2 += '\n                </span>\n                <div class="aplayer-volume-wrap">\n                    <button type="button" class="aplayer-icon aplayer-icon-volume-down">\n                        ', t2 += s.volumeDown, t2 += '\n                    </button>\n                    <div class="aplayer-volume-bar-wrap">\n                        <div class="aplayer-volume-bar">\n                            <div class="aplayer-volume" style="height: 80%; background: ', t2 += o(a.theme), t2 += ';"></div>\n                        </div>\n                    </div>\n                </div>\n                <button type="button" class="aplayer-icon aplayer-icon-order">\n                    ', "list" === a.order ? t2 += s.orderList : "random" === a.order && (t2 += s.orderRandom), t2 += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-loop">\n                    ', "one" === a.loop ? t2 += s.loopOne : "all" === a.loop ? t2 += s.loopAll : "none" === a.loop && (t2 += s.loopNone), t2 += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-menu">\n                    ', t2 += s.menu, t2 += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-lrc">\n                    ', t2 += s.lrc, t2 += '\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class="aplayer-notice"></div>\n    <div class="aplayer-miniswitcher"><button class="aplayer-icon">', t2 += s.right, t2 += '</button></div>\n</div>\n<div class="aplayer-list', a.listFolded && (t2 += " aplayer-list-hide"), t2 += '"', a.listMaxHeight && (t2 += ' style="max-height: ', t2 += o(a.listMaxHeight), t2 += '"'), t2 += ">\n    <ol", a.listMaxHeight && (t2 += ' style="max-height: ', t2 += o(a.listMaxHeight), t2 += '"'), t2 += ">\n        ", l(n(1)(u({ theme: a.theme, audio: a.audio, index: 1 }))), t2 += "\n    </ol>\n</div>\n"), t2;
      };
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }(), a = o(n(3)), r = o(n(16));
      function o(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      var s = function() {
        function e2(t2) {
          !function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.container = t2.container, this.options = t2.options, this.randomOrder = t2.randomOrder, this.init();
        }
        return i(e2, [{ key: "init", value: function() {
          var e3 = "";
          this.options.audio.length && (e3 = "random" === this.options.order ? this.options.audio[this.randomOrder[0]].cover : this.options.audio[0].cover), this.container.innerHTML = (0, r.default)({ options: this.options, icons: a.default, cover: e3, getObject: function(e4) {
            return e4;
          } }), this.lrc = this.container.querySelector(".aplayer-lrc-contents"), this.lrcWrap = this.container.querySelector(".aplayer-lrc"), this.ptime = this.container.querySelector(".aplayer-ptime"), this.info = this.container.querySelector(".aplayer-info"), this.time = this.container.querySelector(".aplayer-time"), this.barWrap = this.container.querySelector(".aplayer-bar-wrap"), this.button = this.container.querySelector(".aplayer-button"), this.body = this.container.querySelector(".aplayer-body"), this.list = this.container.querySelector(".aplayer-list"), this.listOl = this.container.querySelector(".aplayer-list ol"), this.listCurs = this.container.querySelectorAll(".aplayer-list-cur"), this.played = this.container.querySelector(".aplayer-played"), this.loaded = this.container.querySelector(".aplayer-loaded"), this.thumb = this.container.querySelector(".aplayer-thumb"), this.volume = this.container.querySelector(".aplayer-volume"), this.volumeBar = this.container.querySelector(".aplayer-volume-bar"), this.volumeButton = this.container.querySelector(".aplayer-time button"), this.volumeBarWrap = this.container.querySelector(".aplayer-volume-bar-wrap"), this.loop = this.container.querySelector(".aplayer-icon-loop"), this.order = this.container.querySelector(".aplayer-icon-order"), this.menu = this.container.querySelector(".aplayer-icon-menu"), this.pic = this.container.querySelector(".aplayer-pic"), this.title = this.container.querySelector(".aplayer-title"), this.author = this.container.querySelector(".aplayer-author"), this.dtime = this.container.querySelector(".aplayer-dtime"), this.notice = this.container.querySelector(".aplayer-notice"), this.miniSwitcher = this.container.querySelector(".aplayer-miniswitcher"), this.skipBackButton = this.container.querySelector(".aplayer-icon-back"), this.skipForwardButton = this.container.querySelector(".aplayer-icon-forward"), this.skipPlayButton = this.container.querySelector(".aplayer-icon-play"), this.lrcButton = this.container.querySelector(".aplayer-icon-lrc");
        } }]), e2;
      }();
      t.default = s;
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e2) {
        var t2 = { container: e2.element || document.getElementsByClassName("aplayer")[0], mini: e2.narrow || e2.fixed || false, fixed: false, autoplay: false, mutex: true, lrcType: e2.showlrc || e2.lrc || 0, preload: "auto", theme: "#b7daff", loop: "all", order: "list", volume: 0.7, listFolded: e2.fixed, listMaxHeight: e2.listmaxheight || "250px", audio: e2.music || [], storageName: "aplayer-setting" };
        for (var n2 in t2)
          t2.hasOwnProperty(n2) && !e2.hasOwnProperty(n2) && (e2[n2] = t2[n2]);
        return "[object Array]" !== Object.prototype.toString.call(e2.audio) && (e2.audio = [e2.audio]), e2.audio.map(function(e3) {
          return e3.name = e3.name || e3.title || "Audio name", e3.artist = e3.artist || e3.author || "Audio artist", e3.cover = e3.cover || e3.pic, e3.type = e3.type || "normal", e3;
        }), e2.audio.length <= 1 && "one" === e2.loop && (e2.loop = "all"), e2;
      };
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M25.468 6.947c-0.326-0.172-0.724-0.151-1.030 0.057l-6.438 4.38v-3.553c0-0.371-0.205-0.71-0.532-0.884-0.326-0.172-0.724-0.151-1.030 0.057l-12 8.164c-0.274 0.186-0.438 0.496-0.438 0.827s0.164 0.641 0.438 0.827l12 8.168c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-3.556l6.438 4.382c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-16.333c0-0.371-0.205-0.71-0.532-0.884z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 29 32"><path d="M2.667 7.027l1.707-1.693 22.293 22.293-1.693 1.707-4-4h-11.64v4l-5.333-5.333 5.333-5.333v4h8.973l-8.973-8.973v0.973h-2.667v-3.64l-4-4zM22.667 17.333h2.667v5.573l-2.667-2.667v-2.907zM22.667 6.667v-4l5.333 5.333-5.333 5.333v-4h-10.907l-2.667-2.667h13.573z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 33 32"><path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333zM17.333 20v-8h-1.333l-2.667 1.333v1.333h2v5.333h2z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 29 32"><path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 22 32"><path d="M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>';
    }, function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 31"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>';
    }, function(e, t, n) {
      var i, a, r = e.exports = {};
      function o() {
        throw new Error("setTimeout has not been defined");
      }
      function s() {
        throw new Error("clearTimeout has not been defined");
      }
      function l(e2) {
        if (i === setTimeout)
          return setTimeout(e2, 0);
        if ((i === o || !i) && setTimeout)
          return i = setTimeout, setTimeout(e2, 0);
        try {
          return i(e2, 0);
        } catch (t2) {
          try {
            return i.call(null, e2, 0);
          } catch (t3) {
            return i.call(this, e2, 0);
          }
        }
      }
      !function() {
        try {
          i = "function" == typeof setTimeout ? setTimeout : o;
        } catch (e2) {
          i = o;
        }
        try {
          a = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (e2) {
          a = s;
        }
      }();
      var u, c = [], p = false, d = -1;
      function h() {
        p && u && (p = false, u.length ? c = u.concat(c) : d = -1, c.length && y());
      }
      function y() {
        if (!p) {
          var e2 = l(h);
          p = true;
          for (var t2 = c.length; t2; ) {
            for (u = c, c = []; ++d < t2; )
              u && u[d].run();
            d = -1, t2 = c.length;
          }
          u = null, p = false, function(e3) {
            if (a === clearTimeout)
              return clearTimeout(e3);
            if ((a === s || !a) && clearTimeout)
              return a = clearTimeout, clearTimeout(e3);
            try {
              a(e3);
            } catch (t3) {
              try {
                return a.call(null, e3);
              } catch (t4) {
                return a.call(this, e3);
              }
            }
          }(e2);
        }
      }
      function f(e2, t2) {
        this.fun = e2, this.array = t2;
      }
      function v() {
      }
      r.nextTick = function(e2) {
        var t2 = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n2 = 1; n2 < arguments.length; n2++)
            t2[n2 - 1] = arguments[n2];
        c.push(new f(e2, t2)), 1 !== c.length || p || l(y);
      }, f.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, r.title = "browser", r.browser = true, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = v, r.addListener = v, r.once = v, r.off = v, r.removeListener = v, r.removeAllListeners = v, r.emit = v, r.prependListener = v, r.prependOnceListener = v, r.listeners = function(e2) {
        return [];
      }, r.binding = function(e2) {
        throw new Error("process.binding is not supported");
      }, r.cwd = function() {
        return "/";
      }, r.chdir = function(e2) {
        throw new Error("process.chdir is not supported");
      }, r.umask = function() {
        return 0;
      };
    }, function(e, t, n) {
      (function(e2, t2) {
        !function(e3, n2) {
          if (!e3.setImmediate) {
            var i, a, r, o, s, l = 1, u = {}, c = false, p = e3.document, d = Object.getPrototypeOf && Object.getPrototypeOf(e3);
            d = d && d.setTimeout ? d : e3, "[object process]" === {}.toString.call(e3.process) ? i = function(e4) {
              t2.nextTick(function() {
                y(e4);
              });
            } : !function() {
              if (e3.postMessage && !e3.importScripts) {
                var t3 = true, n3 = e3.onmessage;
                return e3.onmessage = function() {
                  t3 = false;
                }, e3.postMessage("", "*"), e3.onmessage = n3, t3;
              }
            }() ? e3.MessageChannel ? ((r = new MessageChannel()).port1.onmessage = function(e4) {
              y(e4.data);
            }, i = function(e4) {
              r.port2.postMessage(e4);
            }) : p && "onreadystatechange" in p.createElement("script") ? (a = p.documentElement, i = function(e4) {
              var t3 = p.createElement("script");
              t3.onreadystatechange = function() {
                y(e4), t3.onreadystatechange = null, a.removeChild(t3), t3 = null;
              }, a.appendChild(t3);
            }) : i = function(e4) {
              setTimeout(y, 0, e4);
            } : (o = "setImmediate$" + Math.random() + "$", s = function(t3) {
              t3.source === e3 && "string" == typeof t3.data && 0 === t3.data.indexOf(o) && y(+t3.data.slice(o.length));
            }, e3.addEventListener ? e3.addEventListener("message", s, false) : e3.attachEvent("onmessage", s), i = function(t3) {
              e3.postMessage(o + t3, "*");
            }), d.setImmediate = function(e4) {
              "function" != typeof e4 && (e4 = new Function("" + e4));
              for (var t3 = new Array(arguments.length - 1), n3 = 0; n3 < t3.length; n3++)
                t3[n3] = arguments[n3 + 1];
              var a2 = { callback: e4, args: t3 };
              return u[l] = a2, i(l), l++;
            }, d.clearImmediate = h;
          }
          function h(e4) {
            delete u[e4];
          }
          function y(e4) {
            if (c)
              setTimeout(y, 0, e4);
            else {
              var t3 = u[e4];
              if (t3) {
                c = true;
                try {
                  !function(e5) {
                    var t4 = e5.callback, i2 = e5.args;
                    switch (i2.length) {
                      case 0:
                        t4();
                        break;
                      case 1:
                        t4(i2[0]);
                        break;
                      case 2:
                        t4(i2[0], i2[1]);
                        break;
                      case 3:
                        t4(i2[0], i2[1], i2[2]);
                        break;
                      default:
                        t4.apply(n2, i2);
                    }
                  }(t3);
                } finally {
                  h(e4), c = false;
                }
              }
            }
          }
        }("undefined" == typeof self ? void 0 === e2 ? void 0 : e2 : self);
      }).call(this, n(4), n(34));
    }, function(e, t, n) {
      var i = Function.prototype.apply;
      function a(e2, t2) {
        this._id = e2, this._clearFn = t2;
      }
      t.setTimeout = function() {
        return new a(i.call(setTimeout, window, arguments), clearTimeout);
      }, t.setInterval = function() {
        return new a(i.call(setInterval, window, arguments), clearInterval);
      }, t.clearTimeout = t.clearInterval = function(e2) {
        e2 && e2.close();
      }, a.prototype.unref = a.prototype.ref = function() {
      }, a.prototype.close = function() {
        this._clearFn.call(window, this._id);
      }, t.enroll = function(e2, t2) {
        clearTimeout(e2._idleTimeoutId), e2._idleTimeout = t2;
      }, t.unenroll = function(e2) {
        clearTimeout(e2._idleTimeoutId), e2._idleTimeout = -1;
      }, t._unrefActive = t.active = function(e2) {
        clearTimeout(e2._idleTimeoutId);
        var t2 = e2._idleTimeout;
        t2 >= 0 && (e2._idleTimeoutId = setTimeout(function() {
          e2._onTimeout && e2._onTimeout();
        }, t2));
      }, n(35), t.setImmediate = setImmediate, t.clearImmediate = clearImmediate;
    }, function(e, t, n) {
      (function(t2) {
        var n2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
          return typeof e2;
        } : function(e2) {
          return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
        }, i = setTimeout;
        function a() {
        }
        function r(e2) {
          if (!(this instanceof r))
            throw new TypeError("Promises must be constructed via new");
          if ("function" != typeof e2)
            throw new TypeError("not a function");
          this._state = 0, this._handled = false, this._value = void 0, this._deferreds = [], c(e2, this);
        }
        function o(e2, t3) {
          for (; 3 === e2._state; )
            e2 = e2._value;
          0 !== e2._state ? (e2._handled = true, r._immediateFn(function() {
            var n3 = 1 === e2._state ? t3.onFulfilled : t3.onRejected;
            if (null !== n3) {
              var i2;
              try {
                i2 = n3(e2._value);
              } catch (e3) {
                return void l(t3.promise, e3);
              }
              s(t3.promise, i2);
            } else
              (1 === e2._state ? s : l)(t3.promise, e2._value);
          })) : e2._deferreds.push(t3);
        }
        function s(e2, t3) {
          try {
            if (t3 === e2)
              throw new TypeError("A promise cannot be resolved with itself.");
            if (t3 && ("object" === (void 0 === t3 ? "undefined" : n2(t3)) || "function" == typeof t3)) {
              var i2 = t3.then;
              if (t3 instanceof r)
                return e2._state = 3, e2._value = t3, void u(e2);
              if ("function" == typeof i2)
                return void c((a2 = i2, o2 = t3, function() {
                  a2.apply(o2, arguments);
                }), e2);
            }
            e2._state = 1, e2._value = t3, u(e2);
          } catch (t4) {
            l(e2, t4);
          }
          var a2, o2;
        }
        function l(e2, t3) {
          e2._state = 2, e2._value = t3, u(e2);
        }
        function u(e2) {
          2 === e2._state && 0 === e2._deferreds.length && r._immediateFn(function() {
            e2._handled || r._unhandledRejectionFn(e2._value);
          });
          for (var t3 = 0, n3 = e2._deferreds.length; t3 < n3; t3++)
            o(e2, e2._deferreds[t3]);
          e2._deferreds = null;
        }
        function c(e2, t3) {
          var n3 = false;
          try {
            e2(function(e3) {
              n3 || (n3 = true, s(t3, e3));
            }, function(e3) {
              n3 || (n3 = true, l(t3, e3));
            });
          } catch (e3) {
            if (n3)
              return;
            n3 = true, l(t3, e3);
          }
        }
        r.prototype.catch = function(e2) {
          return this.then(null, e2);
        }, r.prototype.then = function(e2, t3) {
          var n3 = new this.constructor(a);
          return o(this, new function(e3, t4, n4) {
            this.onFulfilled = "function" == typeof e3 ? e3 : null, this.onRejected = "function" == typeof t4 ? t4 : null, this.promise = n4;
          }(e2, t3, n3)), n3;
        }, r.prototype.finally = function(e2) {
          var t3 = this.constructor;
          return this.then(function(n3) {
            return t3.resolve(e2()).then(function() {
              return n3;
            });
          }, function(n3) {
            return t3.resolve(e2()).then(function() {
              return t3.reject(n3);
            });
          });
        }, r.all = function(e2) {
          return new r(function(t3, i2) {
            if (!e2 || void 0 === e2.length)
              throw new TypeError("Promise.all accepts an array");
            var a2 = Array.prototype.slice.call(e2);
            if (0 === a2.length)
              return t3([]);
            var r2 = a2.length;
            function o2(e3, s3) {
              try {
                if (s3 && ("object" === (void 0 === s3 ? "undefined" : n2(s3)) || "function" == typeof s3)) {
                  var l2 = s3.then;
                  if ("function" == typeof l2)
                    return void l2.call(s3, function(t4) {
                      o2(e3, t4);
                    }, i2);
                }
                a2[e3] = s3, 0 == --r2 && t3(a2);
              } catch (e4) {
                i2(e4);
              }
            }
            for (var s2 = 0; s2 < a2.length; s2++)
              o2(s2, a2[s2]);
          });
        }, r.resolve = function(e2) {
          return e2 && "object" === (void 0 === e2 ? "undefined" : n2(e2)) && e2.constructor === r ? e2 : new r(function(t3) {
            t3(e2);
          });
        }, r.reject = function(e2) {
          return new r(function(t3, n3) {
            n3(e2);
          });
        }, r.race = function(e2) {
          return new r(function(t3, n3) {
            for (var i2 = 0, a2 = e2.length; i2 < a2; i2++)
              e2[i2].then(t3, n3);
          });
        }, r._immediateFn = "function" == typeof t2 && function(e2) {
          t2(e2);
        } || function(e2) {
          i(e2, 0);
        }, r._unhandledRejectionFn = function(e2) {
          "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e2);
        }, e.exports = r;
      }).call(this, n(36).setImmediate);
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true });
      var i = function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
          }
        }
        return function(t2, n2, i2) {
          return n2 && e2(t2.prototype, n2), i2 && e2(t2, i2), t2;
        };
      }(), a = v(n(37)), r = v(n(0)), o = v(n(3)), s = v(n(18)), l = v(n(17)), u = v(n(13)), c = v(n(12)), p = v(n(11)), d = v(n(9)), h = v(n(8)), y = v(n(7)), f = v(n(6));
      function v(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      var m = [], g = function() {
        function e2(t2) {
          if (function(e3, t3) {
            if (!(e3 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e2), this.options = (0, s.default)(t2), this.container = this.options.container, this.paused = true, this.playedPromise = a.default.resolve(), this.mode = "normal", this.randomOrder = r.default.randomOrder(this.options.audio.length), this.container.classList.add("aplayer"), this.options.lrcType && !this.options.fixed && this.container.classList.add("aplayer-withlrc"), this.options.audio.length > 1 && this.container.classList.add("aplayer-withlist"), r.default.isMobile && this.container.classList.add("aplayer-mobile"), this.arrow = this.container.offsetWidth <= 300, this.arrow && this.container.classList.add("aplayer-arrow"), this.container = this.options.container, 2 === this.options.lrcType || true === this.options.lrcType)
            for (var n2 = this.container.getElementsByClassName("aplayer-lrc-content"), i2 = 0; i2 < n2.length; i2++)
              this.options.audio[i2] && (this.options.audio[i2].lrc = n2[i2].innerHTML);
          this.template = new l.default({ container: this.container, options: this.options, randomOrder: this.randomOrder }), this.options.fixed && (this.container.classList.add("aplayer-fixed"), this.template.body.style.width = this.template.body.offsetWidth - 18 + "px"), this.options.mini && (this.setMode("mini"), this.template.info.style.display = "block"), this.template.info.offsetWidth < 200 && this.template.time.classList.add("aplayer-time-narrow"), this.options.lrcType && (this.lrc = new p.default({ container: this.template.lrc, async: 3 === this.options.lrcType, player: this })), this.events = new y.default(), this.storage = new c.default(this), this.bar = new u.default(this.template), this.controller = new d.default(this), this.timer = new h.default(this), this.list = new f.default(this), this.initAudio(), this.bindEvents(), "random" === this.options.order ? this.list.switch(this.randomOrder[0]) : this.list.switch(0), this.options.autoplay && this.play(), m.push(this);
        }
        return i(e2, [{ key: "initAudio", value: function() {
          var e3 = this;
          this.audio = document.createElement("audio"), this.audio.preload = this.options.preload;
          for (var t2 = function(t3) {
            e3.audio.addEventListener(e3.events.audioEvents[t3], function(n3) {
              e3.events.trigger(e3.events.audioEvents[t3], n3);
            });
          }, n2 = 0; n2 < this.events.audioEvents.length; n2++)
            t2(n2);
          this.volume(this.storage.get("volume"), true);
        } }, { key: "bindEvents", value: function() {
          var e3 = this;
          this.on("play", function() {
            e3.paused && e3.setUIPlaying();
          }), this.on("pause", function() {
            e3.paused || e3.setUIPaused();
          }), this.on("timeupdate", function() {
            if (!e3.disableTimeupdate) {
              e3.bar.set("played", e3.audio.currentTime / e3.duration, "width"), e3.lrc && e3.lrc.update();
              var t3 = r.default.secondToTime(e3.audio.currentTime);
              e3.template.ptime.innerHTML !== t3 && (e3.template.ptime.innerHTML = t3);
            }
          }), this.on("durationchange", function() {
            1 !== e3.duration && (e3.template.dtime.innerHTML = r.default.secondToTime(e3.duration));
          }), this.on("progress", function() {
            var t3 = e3.audio.buffered.length ? e3.audio.buffered.end(e3.audio.buffered.length - 1) / e3.duration : 0;
            e3.bar.set("loaded", t3, "width");
          });
          var t2 = void 0;
          this.on("error", function() {
            e3.list.audios.length > 1 ? (e3.notice("An audio error has occurred, player will skip forward in 2 seconds."), t2 = setTimeout(function() {
              e3.skipForward(), e3.paused || e3.play();
            }, 2e3)) : 1 === e3.list.audios.length && e3.notice("An audio error has occurred.");
          }), this.events.on("listswitch", function() {
            t2 && clearTimeout(t2);
          }), this.on("ended", function() {
            "none" === e3.options.loop ? "list" === e3.options.order ? e3.list.index < e3.list.audios.length - 1 ? (e3.list.switch((e3.list.index + 1) % e3.list.audios.length), e3.play()) : (e3.list.switch((e3.list.index + 1) % e3.list.audios.length), e3.pause()) : "random" === e3.options.order && (e3.randomOrder.indexOf(e3.list.index) < e3.randomOrder.length - 1 ? (e3.list.switch(e3.nextIndex()), e3.play()) : (e3.list.switch(e3.nextIndex()), e3.pause())) : "one" === e3.options.loop ? (e3.list.switch(e3.list.index), e3.play()) : "all" === e3.options.loop && (e3.skipForward(), e3.play());
          });
        } }, { key: "setAudio", value: function(e3) {
          this.hls && (this.hls.destroy(), this.hls = null);
          var t2 = e3.type;
          this.options.customAudioType && this.options.customAudioType[t2] ? "[object Function]" === Object.prototype.toString.call(this.options.customAudioType[t2]) ? this.options.customAudioType[t2](this.audio, e3, this) : console.error("Illegal customType: " + t2) : (t2 && "auto" !== t2 || (t2 = /m3u8(#|\?|$)/i.exec(e3.url) ? "hls" : "normal"), "hls" === t2 ? Hls.isSupported() ? (this.hls = new Hls(), this.hls.loadSource(e3.url), this.hls.attachMedia(this.audio)) : this.audio.canPlayType("application/x-mpegURL") || this.audio.canPlayType("application/vnd.apple.mpegURL") ? this.audio.src = e3.url : this.notice("Error: HLS is not supported.") : "normal" === t2 && (this.audio.src = e3.url)), this.seek(0), this.paused || this.audio.play();
        } }, { key: "theme", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.list.audios[this.list.index].theme || this.options.theme, t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.list.index;
          (!(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]) && this.list.audios[t2] && (this.list.audios[t2].theme = e3), this.template.listCurs[t2] && (this.template.listCurs[t2].style.backgroundColor = e3), t2 === this.list.index && (this.template.pic.style.backgroundColor = e3, this.template.played.style.background = e3, this.template.thumb.style.background = e3, this.template.volume.style.background = e3);
        } }, { key: "seek", value: function(e3) {
          e3 = Math.max(e3, 0), e3 = Math.min(e3, this.duration), this.audio.currentTime = e3, this.bar.set("played", e3 / this.duration, "width"), this.template.ptime.innerHTML = r.default.secondToTime(e3);
        } }, { key: "setUIPlaying", value: function() {
          var e3 = this;
          if (this.paused && (this.paused = false, this.template.button.classList.remove("aplayer-play"), this.template.button.classList.add("aplayer-pause"), this.template.button.innerHTML = "", setTimeout(function() {
            e3.template.button.innerHTML = o.default.pause;
          }, 100), this.template.skipPlayButton.innerHTML = o.default.pause), this.timer.enable("loading"), this.options.mutex)
            for (var t2 = 0; t2 < m.length; t2++)
              this !== m[t2] && m[t2].pause();
        } }, { key: "play", value: function() {
          var e3 = this;
          this.setUIPlaying();
          var t2 = this.audio.play();
          t2 && t2.catch(function(t3) {
            console.warn(t3), "NotAllowedError" === t3.name && e3.setUIPaused();
          });
        } }, { key: "setUIPaused", value: function() {
          var e3 = this;
          this.paused || (this.paused = true, this.template.button.classList.remove("aplayer-pause"), this.template.button.classList.add("aplayer-play"), this.template.button.innerHTML = "", setTimeout(function() {
            e3.template.button.innerHTML = o.default.play;
          }, 100), this.template.skipPlayButton.innerHTML = o.default.play), this.container.classList.remove("aplayer-loading"), this.timer.disable("loading");
        } }, { key: "pause", value: function() {
          this.setUIPaused(), this.audio.pause();
        } }, { key: "switchVolumeIcon", value: function() {
          this.volume() >= 0.95 ? this.template.volumeButton.innerHTML = o.default.volumeUp : this.volume() > 0 ? this.template.volumeButton.innerHTML = o.default.volumeDown : this.template.volumeButton.innerHTML = o.default.volumeOff;
        } }, { key: "volume", value: function(e3, t2) {
          return e3 = parseFloat(e3), isNaN(e3) || (e3 = Math.max(e3, 0), e3 = Math.min(e3, 1), this.bar.set("volume", e3, "height"), t2 || this.storage.set("volume", e3), this.audio.volume = e3, this.audio.muted && (this.audio.muted = false), this.switchVolumeIcon()), this.audio.muted ? 0 : this.audio.volume;
        } }, { key: "on", value: function(e3, t2) {
          this.events.on(e3, t2);
        } }, { key: "toggle", value: function() {
          this.template.button.classList.contains("aplayer-play") ? this.play() : this.template.button.classList.contains("aplayer-pause") && this.pause();
        } }, { key: "switchAudio", value: function(e3) {
          this.list.switch(e3);
        } }, { key: "addAudio", value: function(e3) {
          this.list.add(e3);
        } }, { key: "removeAudio", value: function(e3) {
          this.list.remove(e3);
        } }, { key: "destroy", value: function() {
          m.splice(m.indexOf(this), 1), this.pause(), this.container.innerHTML = "", this.audio.src = "", this.timer.destroy(), this.events.trigger("destroy");
        } }, { key: "setMode", value: function() {
          var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "normal";
          this.mode = e3, "mini" === e3 ? this.container.classList.add("aplayer-narrow") : "normal" === e3 && this.container.classList.remove("aplayer-narrow");
        } }, { key: "notice", value: function(e3) {
          var t2 = this, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0.8;
          this.template.notice.innerHTML = e3, this.template.notice.style.opacity = i2, this.noticeTime && clearTimeout(this.noticeTime), this.events.trigger("noticeshow", { text: e3 }), n2 && (this.noticeTime = setTimeout(function() {
            t2.template.notice.style.opacity = 0, t2.events.trigger("noticehide");
          }, n2));
        } }, { key: "prevIndex", value: function() {
          if (!(this.list.audios.length > 1))
            return 0;
          if ("list" === this.options.order)
            return this.list.index - 1 < 0 ? this.list.audios.length - 1 : this.list.index - 1;
          if ("random" === this.options.order) {
            var e3 = this.randomOrder.indexOf(this.list.index);
            return 0 === e3 ? this.randomOrder[this.randomOrder.length - 1] : this.randomOrder[e3 - 1];
          }
        } }, { key: "nextIndex", value: function() {
          if (!(this.list.audios.length > 1))
            return 0;
          if ("list" === this.options.order)
            return (this.list.index + 1) % this.list.audios.length;
          if ("random" === this.options.order) {
            var e3 = this.randomOrder.indexOf(this.list.index);
            return e3 === this.randomOrder.length - 1 ? this.randomOrder[0] : this.randomOrder[e3 + 1];
          }
        } }, { key: "skipBack", value: function() {
          this.list.switch(this.prevIndex());
        } }, { key: "skipForward", value: function() {
          this.list.switch(this.nextIndex());
        } }, { key: "duration", get: function() {
          return isNaN(this.audio.duration) ? 0 : this.audio.duration;
        } }], [{ key: "version", get: function() {
          return "1.10.1";
        } }]), e2;
      }();
      t.default = g;
    }, , function(e, t, n) {
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", { value: true }), n(40);
      var i, a = n(38), r = (i = a) && i.__esModule ? i : { default: i };
      console.log("\n %c APlayer v1.10.1 af84efb %c http://aplayer.js.org \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;"), t.default = r.default;
    }]).default;
  });
})(APlayer_min$2);
var APlayer_minExports = APlayer_min$2.exports;
const APlayer_min = /* @__PURE__ */ getDefaultExportFromCjs(APlayer_minExports);
const APlayer_min$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: APlayer_min
}, [APlayer_minExports]);
export {
  APlayer_min$1 as A
};
