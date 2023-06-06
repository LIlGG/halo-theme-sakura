const t = (t2, e2 = 1e4) => (t2 = parseFloat(t2 + "") || 0, Math.round((t2 + Number.EPSILON) * e2) / e2), e = function(t2) {
  if (!(t2 && t2 instanceof Element && t2.offsetParent))
    return false;
  const e2 = t2.scrollHeight > t2.clientHeight, i2 = window.getComputedStyle(t2).overflowY, n2 = -1 !== i2.indexOf("hidden"), s2 = -1 !== i2.indexOf("visible");
  return e2 && !n2 && !s2;
}, i = function(t2, n2) {
  return !(!t2 || t2 === document.body || n2 && t2 === n2) && (e(t2) ? t2 : i(t2.parentElement, n2));
}, n = function(t2) {
  var e2 = new DOMParser().parseFromString(t2, "text/html").body;
  if (e2.childElementCount > 1) {
    for (var i2 = document.createElement("div"); e2.firstChild; )
      i2.appendChild(e2.firstChild);
    return i2;
  }
  return e2.firstChild;
}, s = (t2) => `${t2 || ""}`.split(" ").filter((t3) => !!t3), o = (t2, e2, i2) => {
  s(e2).forEach((e3) => {
    t2 && t2.classList.toggle(e3, i2 || false);
  });
};
class a {
  constructor(t2) {
    Object.defineProperty(this, "pageX", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "pageY", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "clientX", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "clientY", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "id", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "time", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "nativePointer", { enumerable: true, configurable: true, writable: true, value: void 0 }), this.nativePointer = t2, this.pageX = t2.pageX, this.pageY = t2.pageY, this.clientX = t2.clientX, this.clientY = t2.clientY, this.id = self.Touch && t2 instanceof Touch ? t2.identifier : -1, this.time = Date.now();
  }
}
const r = { passive: false };
class l {
  constructor(t2, { start: e2 = () => true, move: i2 = () => {
  }, end: n2 = () => {
  } }) {
    Object.defineProperty(this, "element", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "startCallback", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "moveCallback", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "endCallback", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "currentPointers", { enumerable: true, configurable: true, writable: true, value: [] }), Object.defineProperty(this, "startPointers", { enumerable: true, configurable: true, writable: true, value: [] }), this.element = t2, this.startCallback = e2, this.moveCallback = i2, this.endCallback = n2;
    for (const t3 of ["onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur"])
      this[t3] = this[t3].bind(this);
    this.element.addEventListener("mousedown", this.onPointerStart, r), this.element.addEventListener("touchstart", this.onTouchStart, r), this.element.addEventListener("touchmove", this.onMove, r), this.element.addEventListener("touchend", this.onTouchEnd), this.element.addEventListener("touchcancel", this.onTouchEnd);
  }
  onPointerStart(t2) {
    if (!t2.buttons || 0 !== t2.button)
      return;
    const e2 = new a(t2);
    this.currentPointers.some((t3) => t3.id === e2.id) || this.triggerPointerStart(e2, t2) && (window.addEventListener("mousemove", this.onMove), window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur));
  }
  onTouchStart(t2) {
    for (const e2 of Array.from(t2.changedTouches || []))
      this.triggerPointerStart(new a(e2), t2);
    window.addEventListener("blur", this.onWindowBlur);
  }
  onMove(t2) {
    const e2 = this.currentPointers.slice(), i2 = "changedTouches" in t2 ? Array.from(t2.changedTouches || []).map((t3) => new a(t3)) : [new a(t2)], n2 = [];
    for (const t3 of i2) {
      const e3 = this.currentPointers.findIndex((e4) => e4.id === t3.id);
      e3 < 0 || (n2.push(t3), this.currentPointers[e3] = t3);
    }
    n2.length && this.moveCallback(t2, this.currentPointers.slice(), e2);
  }
  onPointerEnd(t2) {
    t2.buttons > 0 && 0 !== t2.button || (this.triggerPointerEnd(t2, new a(t2)), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur));
  }
  onTouchEnd(t2) {
    for (const e2 of Array.from(t2.changedTouches || []))
      this.triggerPointerEnd(t2, new a(e2));
  }
  triggerPointerStart(t2, e2) {
    return !!this.startCallback(e2, t2, this.currentPointers.slice()) && (this.currentPointers.push(t2), this.startPointers.push(t2), true);
  }
  triggerPointerEnd(t2, e2) {
    const i2 = this.currentPointers.findIndex((t3) => t3.id === e2.id);
    i2 < 0 || (this.currentPointers.splice(i2, 1), this.startPointers.splice(i2, 1), this.endCallback(t2, e2, this.currentPointers.slice()));
  }
  onWindowBlur() {
    this.clear();
  }
  clear() {
    for (; this.currentPointers.length; ) {
      const t2 = this.currentPointers[this.currentPointers.length - 1];
      this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), this.endCallback(new Event("touchend", { bubbles: true, cancelable: true, clientX: t2.clientX, clientY: t2.clientY }), t2, this.currentPointers.slice());
    }
  }
  stop() {
    this.element.removeEventListener("mousedown", this.onPointerStart, r), this.element.removeEventListener("touchstart", this.onTouchStart, r), this.element.removeEventListener("touchmove", this.onMove, r), this.element.removeEventListener("touchend", this.onTouchEnd), this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur);
  }
}
function c(t2, e2) {
  return e2 ? Math.sqrt(Math.pow(e2.clientX - t2.clientX, 2) + Math.pow(e2.clientY - t2.clientY, 2)) : 0;
}
function h(t2, e2) {
  return e2 ? { clientX: (t2.clientX + e2.clientX) / 2, clientY: (t2.clientY + e2.clientY) / 2 } : t2;
}
const d = (t2) => "object" == typeof t2 && null !== t2 && t2.constructor === Object && "[object Object]" === Object.prototype.toString.call(t2), u = (t2, ...e2) => {
  const i2 = e2.length;
  for (let n2 = 0; n2 < i2; n2++) {
    const i3 = e2[n2] || {};
    Object.entries(i3).forEach(([e3, i4]) => {
      const n3 = Array.isArray(i4) ? [] : {};
      t2[e3] || Object.assign(t2, { [e3]: n3 }), d(i4) ? Object.assign(t2[e3], u(n3, i4)) : Array.isArray(i4) ? Object.assign(t2, { [e3]: [...i4] }) : Object.assign(t2, { [e3]: i4 });
    });
  }
  return t2;
}, p = function(t2, e2) {
  return t2.split(".").reduce((t3, e3) => "object" == typeof t3 ? t3[e3] : void 0, e2);
};
class f {
  constructor(t2 = {}) {
    Object.defineProperty(this, "options", { enumerable: true, configurable: true, writable: true, value: t2 }), Object.defineProperty(this, "events", { enumerable: true, configurable: true, writable: true, value: /* @__PURE__ */ new Map() }), this.setOptions(t2);
    for (const t3 of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      t3.startsWith("on") && "function" == typeof this[t3] && (this[t3] = this[t3].bind(this));
  }
  setOptions(t2) {
    this.options = t2 ? u({}, this.constructor.defaults, t2) : {};
    for (const [t3, e2] of Object.entries(this.option("on") || {}))
      this.on(t3, e2);
  }
  option(t2, ...e2) {
    let i2 = p(t2, this.options);
    return i2 && "function" == typeof i2 && (i2 = i2.call(this, this, ...e2)), i2;
  }
  optionFor(t2, e2, i2, ...n2) {
    let s2 = p(e2, t2);
    var o2;
    "string" != typeof (o2 = s2) || isNaN(o2) || isNaN(parseFloat(o2)) || (s2 = parseFloat(s2)), "true" === s2 && (s2 = true), "false" === s2 && (s2 = false), s2 && "function" == typeof s2 && (s2 = s2.call(this, this, t2, ...n2));
    let a2 = p(e2, this.options);
    return a2 && "function" == typeof a2 ? s2 = a2.call(this, this, t2, ...n2, s2) : void 0 === s2 && (s2 = a2), void 0 === s2 ? i2 : s2;
  }
  cn(t2) {
    const e2 = this.options.classes;
    return e2 && e2[t2] || "";
  }
  localize(t2, e2 = []) {
    t2 = String(t2).replace(/\{\{(\w+).?(\w+)?\}\}/g, (t3, e3, i2) => {
      let n2 = "";
      return i2 ? n2 = this.option(`${e3[0] + e3.toLowerCase().substring(1)}.l10n.${i2}`) : e3 && (n2 = this.option(`l10n.${e3}`)), n2 || (n2 = t3), n2;
    });
    for (let i2 = 0; i2 < e2.length; i2++)
      t2 = t2.split(e2[i2][0]).join(e2[i2][1]);
    return t2 = t2.replace(/\{\{(.*?)\}\}/g, (t3, e3) => e3);
  }
  on(t2, e2) {
    let i2 = [];
    "string" == typeof t2 ? i2 = t2.split(" ") : Array.isArray(t2) && (i2 = t2), this.events || (this.events = /* @__PURE__ */ new Map()), i2.forEach((t3) => {
      let i3 = this.events.get(t3);
      i3 || (this.events.set(t3, []), i3 = []), i3.includes(e2) || i3.push(e2), this.events.set(t3, i3);
    });
  }
  off(t2, e2) {
    let i2 = [];
    "string" == typeof t2 ? i2 = t2.split(" ") : Array.isArray(t2) && (i2 = t2), i2.forEach((t3) => {
      const i3 = this.events.get(t3);
      if (Array.isArray(i3)) {
        const t4 = i3.indexOf(e2);
        t4 > -1 && i3.splice(t4, 1);
      }
    });
  }
  emit(t2, ...e2) {
    [...this.events.get(t2) || []].forEach((t3) => t3(this, ...e2)), "*" !== t2 && this.emit("*", t2, ...e2);
  }
}
Object.defineProperty(f, "version", { enumerable: true, configurable: true, writable: true, value: "5.0.19" }), Object.defineProperty(f, "defaults", { enumerable: true, configurable: true, writable: true, value: {} });
class m extends f {
  constructor(t2 = {}) {
    super(t2), Object.defineProperty(this, "plugins", { enumerable: true, configurable: true, writable: true, value: {} });
  }
  attachPlugins(t2 = {}) {
    const e2 = /* @__PURE__ */ new Map();
    for (const [i2, n2] of Object.entries(t2)) {
      const t3 = this.option(i2), s2 = this.plugins[i2];
      s2 || false === t3 ? s2 && false === t3 && (s2.detach(), delete this.plugins[i2]) : e2.set(i2, new n2(this, t3 || {}));
    }
    for (const [t3, i2] of e2)
      this.plugins[t3] = i2, i2.attach();
    this.emit("attachPlugins");
  }
  detachPlugins(t2) {
    t2 = t2 || Object.keys(this.plugins);
    for (const e2 of t2) {
      const t3 = this.plugins[e2];
      t3 && t3.detach(), delete this.plugins[e2];
    }
    return this.emit("detachPlugins"), this;
  }
}
var g;
!function(t2) {
  t2[t2.Init = 0] = "Init", t2[t2.Error = 1] = "Error", t2[t2.Ready = 2] = "Ready", t2[t2.Panning = 3] = "Panning", t2[t2.Mousemove = 4] = "Mousemove", t2[t2.Destroy = 5] = "Destroy";
}(g || (g = {}));
const b = ["a", "b", "c", "d", "e", "f"], v = { PANUP: "Move up", PANDOWN: "Move down", PANLEFT: "Move left", PANRIGHT: "Move right", ZOOMIN: "Zoom in", ZOOMOUT: "Zoom out", TOGGLEZOOM: "Toggle zoom level", TOGGLE1TO1: "Toggle zoom level", ITERATEZOOM: "Toggle zoom level", ROTATECCW: "Rotate counterclockwise", ROTATECW: "Rotate clockwise", FLIPX: "Flip horizontally", FLIPY: "Flip vertically", FITX: "Fit horizontally", FITY: "Fit vertically", RESET: "Reset", TOGGLEFS: "Toggle fullscreen" }, y = { content: null, width: "auto", height: "auto", panMode: "drag", touch: true, dragMinThreshold: 3, lockAxis: false, mouseMoveFactor: 1, mouseMoveFriction: 0.12, zoom: true, pinchToZoom: true, panOnlyZoomed: "auto", minScale: 1, maxScale: 2, friction: 0.25, dragFriction: 0.35, decelFriction: 0.05, click: "toggleZoom", dblClick: false, wheel: "zoom", wheelLimit: 7, spinner: true, bounds: "auto", infinite: false, rubberband: true, bounce: true, maxVelocity: 75, transformParent: false, classes: { content: "f-panzoom__content", isLoading: "is-loading", canZoomIn: "can-zoom_in", canZoomOut: "can-zoom_out", isDraggable: "is-draggable", isDragging: "is-dragging", inFullscreen: "in-fullscreen", htmlHasFullscreen: "with-panzoom-in-fullscreen" }, l10n: v }, w = '<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>', x = (t2) => t2 && null !== t2 && t2 instanceof Element && "nodeType" in t2, S = (t2, e2) => {
  t2 && s(e2).forEach((e3) => {
    t2.classList.remove(e3);
  });
}, E = (t2, e2) => {
  t2 && s(e2).forEach((e3) => {
    t2.classList.add(e3);
  });
}, P = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
let C = null, M = null;
class T extends m {
  get isTouchDevice() {
    return null === M && (M = window.matchMedia("(hover: none)").matches), M;
  }
  get isMobile() {
    return null === C && (C = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), C;
  }
  get panMode() {
    return "mousemove" !== this.options.panMode || this.isTouchDevice ? "drag" : "mousemove";
  }
  get panOnlyZoomed() {
    const t2 = this.options.panOnlyZoomed;
    return "auto" === t2 ? this.isTouchDevice : t2;
  }
  get isInfinite() {
    return this.option("infinite");
  }
  get angle() {
    return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0;
  }
  get targetAngle() {
    return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0;
  }
  get scale() {
    const { a: t2, b: e2 } = this.current;
    return Math.sqrt(t2 * t2 + e2 * e2) || 1;
  }
  get targetScale() {
    const { a: t2, b: e2 } = this.target;
    return Math.sqrt(t2 * t2 + e2 * e2) || 1;
  }
  get minScale() {
    return this.option("minScale") || 1;
  }
  get fullScale() {
    const { contentRect: t2 } = this;
    return t2.fullWidth / t2.fitWidth || 1;
  }
  get maxScale() {
    return this.fullScale * (this.option("maxScale") || 1) || 1;
  }
  get coverScale() {
    const { containerRect: t2, contentRect: e2 } = this, i2 = Math.max(t2.height / e2.fitHeight, t2.width / e2.fitWidth) || 1;
    return Math.min(this.fullScale, i2);
  }
  get isScaling() {
    return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting;
  }
  get isContentLoading() {
    const t2 = this.content;
    return !!(t2 && t2 instanceof HTMLImageElement) && !t2.complete;
  }
  get isResting() {
    if (this.isBouncingX || this.isBouncingY)
      return false;
    for (const t2 of b) {
      const e2 = "e" == t2 || "f" === t2 ? 1e-3 : 1e-5;
      if (Math.abs(this.target[t2] - this.current[t2]) > e2)
        return false;
    }
    return !(!this.ignoreBounds && !this.checkBounds().inBounds);
  }
  constructor(t2, e2 = {}, i2 = {}) {
    var s2;
    if (super(e2), Object.defineProperty(this, "pointerTracker", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "resizeObserver", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "updateTimer", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "clickTimer", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "rAF", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "isTicking", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "friction", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "ignoreBounds", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "isBouncingX", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "isBouncingY", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "clicks", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "trackingPoints", { enumerable: true, configurable: true, writable: true, value: [] }), Object.defineProperty(this, "pwt", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "cwd", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "pmme", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "state", { enumerable: true, configurable: true, writable: true, value: g.Init }), Object.defineProperty(this, "isDragging", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "container", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "content", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "spinner", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "containerRect", { enumerable: true, configurable: true, writable: true, value: { width: 0, height: 0, innerWidth: 0, innerHeight: 0 } }), Object.defineProperty(this, "contentRect", { enumerable: true, configurable: true, writable: true, value: { top: 0, right: 0, bottom: 0, left: 0, fullWidth: 0, fullHeight: 0, fitWidth: 0, fitHeight: 0, width: 0, height: 0 } }), Object.defineProperty(this, "dragStart", { enumerable: true, configurable: true, writable: true, value: { x: 0, y: 0, top: 0, left: 0, time: 0 } }), Object.defineProperty(this, "dragOffset", { enumerable: true, configurable: true, writable: true, value: { x: 0, y: 0, time: 0 } }), Object.defineProperty(this, "current", { enumerable: true, configurable: true, writable: true, value: Object.assign({}, P) }), Object.defineProperty(this, "target", { enumerable: true, configurable: true, writable: true, value: Object.assign({}, P) }), Object.defineProperty(this, "velocity", { enumerable: true, configurable: true, writable: true, value: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 } }), Object.defineProperty(this, "lockedAxis", { enumerable: true, configurable: true, writable: true, value: false }), !t2)
      throw new Error("Container Element Not Found");
    this.container = t2, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, T.Plugins), i2)), this.emit("init");
    const o2 = this.content;
    if (o2.addEventListener("load", this.onLoad), o2.addEventListener("error", this.onError), this.isContentLoading) {
      if (this.option("spinner")) {
        t2.classList.add(this.cn("isLoading"));
        const e3 = n(w);
        !t2.contains(o2) || o2.parentElement instanceof HTMLPictureElement ? this.spinner = t2.appendChild(e3) : this.spinner = (null === (s2 = o2.parentElement) || void 0 === s2 ? void 0 : s2.insertBefore(e3, o2)) || null;
      }
      this.emit("beforeLoad");
    } else
      queueMicrotask(() => {
        this.enable();
      });
  }
  initContent() {
    const { container: t2 } = this, e2 = this.cn("content");
    let i2 = this.option("content") || t2.querySelector(`.${e2}`);
    if (i2 || (i2 = t2.querySelector("img,picture") || t2.firstElementChild, i2 && E(i2, e2)), i2 instanceof HTMLPictureElement && (i2 = i2.querySelector("img")), !i2)
      throw new Error("No content found");
    this.content = i2;
  }
  onLoad() {
    this.spinner && (this.spinner.remove(), this.spinner = null), this.option("spinner") && this.container.classList.remove(this.cn("isLoading")), this.emit("afterLoad"), this.state === g.Init ? this.enable() : this.updateMetrics();
  }
  onError() {
    this.state !== g.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), this.stop(), this.detachEvents(), this.state = g.Error, this.emit("error"));
  }
  attachObserver() {
    var t2;
    const e2 = () => Math.abs(this.containerRect.width - this.container.getBoundingClientRect().width) > 0.1 || Math.abs(this.containerRect.height - this.container.getBoundingClientRect().height) > 0.1;
    this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver(() => {
      this.updateTimer || (e2() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout(() => {
        e2() && this.onResize(), this.updateTimer = null;
      }, 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null));
    })), null === (t2 = this.resizeObserver) || void 0 === t2 || t2.observe(this.container);
  }
  detachObserver() {
    var t2;
    null === (t2 = this.resizeObserver) || void 0 === t2 || t2.disconnect();
  }
  attachEvents() {
    const { container: t2 } = this;
    t2.addEventListener("click", this.onClick, { passive: false, capture: false }), t2.addEventListener("wheel", this.onWheel, { passive: false }), this.pointerTracker = new l(t2, { start: this.onPointerDown, move: this.onPointerMove, end: this.onPointerUp }), document.addEventListener("mousemove", this.onMouseMove);
  }
  detachEvents() {
    var t2;
    const { container: e2 } = this;
    e2.removeEventListener("click", this.onClick, { passive: false, capture: false }), e2.removeEventListener("wheel", this.onWheel, { passive: false }), null === (t2 = this.pointerTracker) || void 0 === t2 || t2.stop(), this.pointerTracker = null, document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, true), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null);
  }
  animate() {
    const t2 = this.friction;
    this.setTargetForce();
    const e2 = this.option("maxVelocity");
    for (const i2 of b)
      t2 ? (this.velocity[i2] *= 1 - t2, e2 && !this.isScaling && (this.velocity[i2] = Math.max(Math.min(this.velocity[i2], e2), -1 * e2)), this.current[i2] += this.velocity[i2]) : this.current[i2] = this.target[i2];
    this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame(() => this.animate()) : this.stop("current");
  }
  setTargetForce() {
    for (const t2 of b)
      "e" === t2 && this.isBouncingX || "f" === t2 && this.isBouncingY || (this.velocity[t2] = (1 / (1 - this.friction) - 1) * (this.target[t2] - this.current[t2]));
  }
  checkBounds(t2 = 0, e2 = 0) {
    const { current: i2 } = this, n2 = i2.e + t2, s2 = i2.f + e2, o2 = this.getBounds(), { x: a2, y: r2 } = o2, l2 = a2.min, c2 = a2.max, h2 = r2.min, d2 = r2.max;
    let u2 = 0, p2 = 0;
    return l2 !== 1 / 0 && n2 < l2 ? u2 = l2 - n2 : c2 !== 1 / 0 && n2 > c2 && (u2 = c2 - n2), h2 !== 1 / 0 && s2 < h2 ? p2 = h2 - s2 : d2 !== 1 / 0 && s2 > d2 && (p2 = d2 - s2), Math.abs(u2) < 1e-3 && (u2 = 0), Math.abs(p2) < 1e-3 && (p2 = 0), Object.assign(Object.assign({}, o2), { xDiff: u2, yDiff: p2, inBounds: !u2 && !p2 });
  }
  clampTargetBounds() {
    const { target: t2 } = this, { x: e2, y: i2 } = this.getBounds();
    e2.min !== 1 / 0 && (t2.e = Math.max(t2.e, e2.min)), e2.max !== 1 / 0 && (t2.e = Math.min(t2.e, e2.max)), i2.min !== 1 / 0 && (t2.f = Math.max(t2.f, i2.min)), i2.max !== 1 / 0 && (t2.f = Math.min(t2.f, i2.max));
  }
  calculateContentDim(t2 = this.current) {
    const { content: e2, contentRect: i2 } = this, { fitWidth: n2, fitHeight: s2, fullWidth: o2, fullHeight: a2 } = i2;
    let r2 = o2, l2 = a2;
    if (this.option("zoom") || 0 !== this.angle) {
      const i3 = !(e2 instanceof HTMLImageElement) && ("none" === window.getComputedStyle(e2).maxWidth || "none" === window.getComputedStyle(e2).maxHeight), c2 = i3 ? o2 : n2, h2 = i3 ? a2 : s2, d2 = this.getMatrix(t2), u2 = new DOMPoint(0, 0).matrixTransform(d2), p2 = new DOMPoint(0 + c2, 0).matrixTransform(d2), f2 = new DOMPoint(0 + c2, 0 + h2).matrixTransform(d2), m2 = new DOMPoint(0, 0 + h2).matrixTransform(d2), g2 = Math.abs(f2.x - u2.x), b2 = Math.abs(f2.y - u2.y), v2 = Math.abs(m2.x - p2.x), y2 = Math.abs(m2.y - p2.y);
      r2 = Math.max(g2, v2), l2 = Math.max(b2, y2);
    }
    return { contentWidth: r2, contentHeight: l2 };
  }
  setEdgeForce() {
    if (this.ignoreBounds || this.isDragging || "mousemove" === this.panMode || this.targetScale < this.scale)
      return this.isBouncingX = false, void (this.isBouncingY = false);
    const { target: t2 } = this, { x: e2, y: i2, xDiff: n2, yDiff: s2 } = this.checkBounds();
    const o2 = this.option("maxVelocity");
    let a2 = this.velocity.e, r2 = this.velocity.f;
    0 !== n2 ? (this.isBouncingX = true, n2 * a2 <= 0 ? a2 += 0.14 * n2 : (a2 = 0.14 * n2, e2.min !== 1 / 0 && (this.target.e = Math.max(t2.e, e2.min)), e2.max !== 1 / 0 && (this.target.e = Math.min(t2.e, e2.max))), o2 && (a2 = Math.max(Math.min(a2, o2), -1 * o2))) : this.isBouncingX = false, 0 !== s2 ? (this.isBouncingY = true, s2 * r2 <= 0 ? r2 += 0.14 * s2 : (r2 = 0.14 * s2, i2.min !== 1 / 0 && (this.target.f = Math.max(t2.f, i2.min)), i2.max !== 1 / 0 && (this.target.f = Math.min(t2.f, i2.max))), o2 && (r2 = Math.max(Math.min(r2, o2), -1 * o2))) : this.isBouncingY = false, this.isBouncingX && (this.velocity.e = a2), this.isBouncingY && (this.velocity.f = r2);
  }
  enable() {
    const { content: t2 } = this, e2 = new DOMMatrixReadOnly(window.getComputedStyle(t2).transform);
    for (const t3 of b)
      this.current[t3] = this.target[t3] = e2[t3];
    this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = g.Ready, this.emit("ready");
  }
  onClick(t2) {
    var e2;
    this.isDragging && (null === (e2 = this.pointerTracker) || void 0 === e2 || e2.clear(), this.trackingPoints = [], this.startDecelAnim());
    const i2 = t2.target;
    if (!i2 || t2.defaultPrevented)
      return;
    if (i2 && i2.hasAttribute("disabled"))
      return t2.preventDefault(), void t2.stopPropagation();
    if ((() => {
      const t3 = window.getSelection();
      return t3 && "Range" === t3.type;
    })() && !i2.closest("button"))
      return;
    const n2 = i2.closest("[data-panzoom-action]"), s2 = i2.closest("[data-panzoom-change]"), o2 = n2 || s2, a2 = o2 && x(o2) ? o2.dataset : null;
    if (a2) {
      const e3 = a2.panzoomChange, i3 = a2.panzoomAction;
      if ((e3 || i3) && t2.preventDefault(), e3) {
        let t3 = {};
        try {
          t3 = JSON.parse(e3);
        } catch (t4) {
          console && console.warn("The given data was not valid JSON");
        }
        return void this.applyChange(t3);
      }
      if (i3)
        return void (this[i3] && this[i3]());
    }
    if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3)
      return t2.preventDefault(), void t2.stopPropagation();
    const r2 = this.content.getBoundingClientRect();
    if (this.dragStart.time && !this.canZoomOut() && (Math.abs(r2.x - this.dragStart.x) > 2 || Math.abs(r2.y - this.dragStart.y) > 2))
      return;
    this.dragStart.time = 0;
    const l2 = (e3) => {
      this.option("zoom") && e3 && "string" == typeof e3 && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e3) && "function" == typeof this[e3] && (t2.preventDefault(), this[e3]({ event: t2 }));
    }, c2 = this.option("click", t2), h2 = this.option("dblClick", t2);
    h2 ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout(() => {
      1 === this.clicks ? (this.emit("click", t2), !t2.defaultPrevented && c2 && l2(c2)) : (this.emit("dblClick", t2), t2.defaultPrevented || l2(h2)), this.clicks = 0, this.clickTimer = null;
    }, 350))) : (this.emit("click", t2), !t2.defaultPrevented && c2 && l2(c2));
  }
  addTrackingPoint(t2) {
    const e2 = this.trackingPoints.filter((t3) => t3.time > Date.now() - 100);
    e2.push(t2), this.trackingPoints = e2;
  }
  onPointerDown(t2, e2, i2) {
    var n2;
    this.pwt = 0, this.dragOffset = { x: 0, y: 0, time: 0 }, this.trackingPoints = [];
    const s2 = this.content.getBoundingClientRect();
    if (this.dragStart = { x: s2.x, y: s2.y, top: s2.top, left: s2.left, time: Date.now() }, this.clickTimer)
      return false;
    if ("mousemove" === this.panMode && this.targetScale > 1)
      return t2.preventDefault(), t2.stopPropagation(), false;
    if (!i2.length) {
      const e3 = t2.composedPath()[0];
      if (["A", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(e3.nodeName) || e3.closest("[contenteditable]") || e3.closest("[data-selectable]") || e3.closest("[data-draggable]") || e3.closest("[data-panzoom-change]") || e3.closest("[data-panzoom-action]"))
        return false;
      null === (n2 = window.getSelection()) || void 0 === n2 || n2.removeAllRanges();
    }
    if ("mousedown" === t2.type)
      t2.preventDefault();
    else if (Math.abs(this.velocity.a) > 0.3)
      return false;
    return this.target.e = this.current.e, this.target.f = this.current.f, this.stop(), this.isDragging || (this.isDragging = true, this.addTrackingPoint(e2), this.emit("touchStart", t2)), true;
  }
  onPointerMove(e2, n2, s2) {
    if (false === this.option("touch", e2))
      return;
    if (!this.isDragging)
      return;
    if (n2.length < 2 && this.panOnlyZoomed && t(this.targetScale) <= t(this.minScale))
      return;
    if (this.emit("touchMove", e2), e2.defaultPrevented)
      return;
    this.addTrackingPoint(n2[0]);
    const { content: o2 } = this, a2 = h(s2[0], s2[1]), r2 = h(n2[0], n2[1]);
    let l2 = 0, d2 = 0;
    if (n2.length > 1) {
      const t2 = o2.getBoundingClientRect();
      l2 = a2.clientX - t2.left - 0.5 * t2.width, d2 = a2.clientY - t2.top - 0.5 * t2.height;
    }
    const u2 = c(s2[0], s2[1]), p2 = c(n2[0], n2[1]);
    let f2 = u2 ? p2 / u2 : 1, m2 = r2.clientX - a2.clientX, g2 = r2.clientY - a2.clientY;
    this.dragOffset.x += m2, this.dragOffset.y += g2, this.dragOffset.time = Date.now() - this.dragStart.time;
    let b2 = t(this.targetScale) === t(this.minScale) && this.option("lockAxis");
    if (b2 && !this.lockedAxis)
      if ("xy" === b2 || "y" === b2 || "touchmove" === e2.type) {
        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6)
          return void e2.preventDefault();
        const t2 = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
        this.lockedAxis = t2 > 45 && t2 < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, m2 = 0, g2 = 0;
      } else
        this.lockedAxis = b2;
    if (i(e2.target, this.content) && (b2 = "x", this.dragOffset.y = 0), b2 && "xy" !== b2 && this.lockedAxis !== b2 && t(this.targetScale) === t(this.minScale))
      return;
    e2.cancelable && e2.preventDefault(), this.container.classList.add(this.cn("isDragging"));
    const v2 = this.checkBounds(m2, g2);
    this.option("rubberband") ? ("x" !== this.isInfinite && (v2.xDiff > 0 && m2 < 0 || v2.xDiff < 0 && m2 > 0) && (m2 *= Math.max(0, 0.5 - Math.abs(0.75 / this.contentRect.fitWidth * v2.xDiff))), "y" !== this.isInfinite && (v2.yDiff > 0 && g2 < 0 || v2.yDiff < 0 && g2 > 0) && (g2 *= Math.max(0, 0.5 - Math.abs(0.75 / this.contentRect.fitHeight * v2.yDiff)))) : (v2.xDiff && (m2 = 0), v2.yDiff && (g2 = 0));
    const y2 = this.targetScale, w2 = this.minScale, x2 = this.maxScale;
    y2 < 0.5 * w2 && (f2 = Math.max(f2, w2)), y2 > 1.5 * x2 && (f2 = Math.min(f2, x2)), "y" === this.lockedAxis && t(y2) === t(w2) && (m2 = 0), "x" === this.lockedAxis && t(y2) === t(w2) && (g2 = 0), this.applyChange({ originX: l2, originY: d2, panX: m2, panY: g2, scale: f2, friction: this.option("dragFriction"), ignoreBounds: true });
  }
  onPointerUp(t2, e2, n2) {
    if (n2.length)
      return this.dragOffset.x = 0, this.dragOffset.y = 0, void (this.trackingPoints = []);
    this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e2), this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), i(t2.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), this.emit("touchEnd", t2), this.isDragging = false, this.lockedAxis = false, this.state !== g.Destroy && (t2.defaultPrevented || this.startDecelAnim()));
  }
  startDecelAnim() {
    var e2;
    const i2 = this.isScaling;
    this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = false, this.isBouncingY = false;
    for (const t2 of b)
      this.velocity[t2] = 0;
    this.target.e = this.current.e, this.target.f = this.current.f, S(this.container, "is-scaling"), S(this.container, "is-animating"), this.isTicking = false;
    const { trackingPoints: n2 } = this, s2 = n2[0], o2 = n2[n2.length - 1];
    let a2 = 0, r2 = 0, l2 = 0;
    o2 && s2 && (a2 = o2.clientX - s2.clientX, r2 = o2.clientY - s2.clientY, l2 = o2.time - s2.time);
    const c2 = (null === (e2 = window.visualViewport) || void 0 === e2 ? void 0 : e2.scale) || 1;
    1 !== c2 && (a2 *= c2, r2 *= c2);
    let h2 = 0, d2 = 0, u2 = 0, p2 = 0, f2 = this.option("decelFriction");
    const m2 = this.targetScale;
    if (l2 > 0) {
      u2 = Math.abs(a2) > 3 ? a2 / (l2 / 30) : 0, p2 = Math.abs(r2) > 3 ? r2 / (l2 / 30) : 0;
      const t2 = this.option("maxVelocity");
      t2 && (u2 = Math.max(Math.min(u2, t2), -1 * t2), p2 = Math.max(Math.min(p2, t2), -1 * t2));
    }
    u2 && (h2 = u2 / (1 / (1 - f2) - 1)), p2 && (d2 = p2 / (1 / (1 - f2) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && t(m2) === this.minScale) && (h2 = u2 = 0), ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && t(m2) === this.minScale) && (d2 = p2 = 0);
    const g2 = this.dragOffset.x, v2 = this.dragOffset.y, y2 = this.option("dragMinThreshold") || 0;
    Math.abs(g2) < y2 && Math.abs(v2) < y2 && (h2 = d2 = 0, u2 = p2 = 0), (m2 < this.minScale - 1e-5 || m2 > this.maxScale + 1e-5 || i2 && !h2 && !d2) && (f2 = 0.35), this.applyChange({ panX: h2, panY: d2, friction: f2 }), this.emit("decel", u2, p2, g2, v2);
  }
  onWheel(t2) {
    var e2 = [-t2.deltaX || 0, -t2.deltaY || 0, -t2.detail || 0].reduce(function(t3, e3) {
      return Math.abs(e3) > Math.abs(t3) ? e3 : t3;
    });
    const i2 = Math.max(-1, Math.min(1, e2));
    if (this.emit("wheel", t2, i2), "mousemove" === this.panMode)
      return;
    if (t2.defaultPrevented)
      return;
    const n2 = this.option("wheel");
    "pan" === n2 ? (t2.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({ panX: 2 * -t2.deltaX, panY: 2 * -t2.deltaY, bounce: false })) : "zoom" === n2 && false !== this.option("zoom") && this.zoomWithWheel(t2);
  }
  onMouseMove(t2) {
    this.panWithMouse(t2);
  }
  onKeydown(t2) {
    "Escape" === t2.key && this.toggleFS();
  }
  onResize() {
    this.updateMetrics(), this.checkBounds().inBounds || this.requestTick();
  }
  setTransform() {
    this.emit("beforeTransform");
    const { current: e2, target: i2, content: n2, contentRect: s2 } = this, o2 = Object.assign({}, P);
    for (const n3 of b) {
      const s3 = "e" == n3 || "f" === n3 ? 1e3 : 1e5;
      o2[n3] = t(e2[n3], s3), Math.abs(i2[n3] - e2[n3]) < ("e" == n3 || "f" === n3 ? 0.51 : 1e-3) && (e2[n3] = i2[n3]);
    }
    let { a: a2, b: r2, c: l2, d: c2, e: h2, f: d2 } = o2, u2 = `matrix(${a2}, ${r2}, ${l2}, ${c2}, ${h2}, ${d2})`, p2 = n2.parentElement instanceof HTMLPictureElement ? n2.parentElement : n2;
    if (this.option("transformParent") && (p2 = p2.parentElement || p2), p2.style.transform === u2)
      return;
    p2.style.transform = u2;
    const { contentWidth: f2, contentHeight: m2 } = this.calculateContentDim();
    s2.width = f2, s2.height = m2, this.emit("afterTransform");
  }
  updateMetrics(e2 = false) {
    var i2;
    if (!this || this.state === g.Destroy)
      return;
    if (this.isContentLoading)
      return;
    const n2 = Math.max(1, (null === (i2 = window.visualViewport) || void 0 === i2 ? void 0 : i2.scale) || 1), { container: s2, content: o2 } = this, a2 = o2 instanceof HTMLImageElement, r2 = s2.getBoundingClientRect(), l2 = getComputedStyle(this.container);
    let c2 = r2.width * n2, h2 = r2.height * n2;
    const d2 = parseFloat(l2.paddingTop) + parseFloat(l2.paddingBottom), u2 = c2 - (parseFloat(l2.paddingLeft) + parseFloat(l2.paddingRight)), p2 = h2 - d2;
    this.containerRect = { width: c2, height: h2, innerWidth: u2, innerHeight: p2 };
    let f2 = this.option("width") || "auto", m2 = this.option("height") || "auto";
    "auto" === f2 && (f2 = parseFloat(o2.dataset.width || "") || ((t2) => {
      let e3 = 0;
      return e3 = t2 instanceof HTMLImageElement ? t2.naturalWidth : t2 instanceof SVGElement ? t2.width.baseVal.value : Math.max(t2.offsetWidth, t2.scrollWidth), e3 || 0;
    })(o2)), "auto" === m2 && (m2 = parseFloat(o2.dataset.height || "") || ((t2) => {
      let e3 = 0;
      return e3 = t2 instanceof HTMLImageElement ? t2.naturalHeight : t2 instanceof SVGElement ? t2.height.baseVal.value : Math.max(t2.offsetHeight, t2.scrollHeight), e3 || 0;
    })(o2));
    let b2 = o2.parentElement instanceof HTMLPictureElement ? o2.parentElement : o2;
    this.option("transformParent") && (b2 = b2.parentElement || b2);
    const v2 = b2.getAttribute("style") || "";
    b2.style.setProperty("transform", "none", "important"), a2 && (b2.style.width = "", b2.style.height = ""), b2.offsetHeight;
    const y2 = o2.getBoundingClientRect();
    let w2 = y2.width * n2, x2 = y2.height * n2, S2 = 0, E2 = 0;
    a2 && (Math.abs(f2 - w2) > 1 || Math.abs(m2 - x2) > 1) && ({ width: w2, height: x2, top: S2, left: E2 } = ((t2, e3, i3, n3) => {
      const s3 = i3 / n3;
      return s3 > t2 / e3 ? (i3 = t2, n3 = t2 / s3) : (i3 = e3 * s3, n3 = e3), { width: i3, height: n3, top: 0.5 * (e3 - n3), left: 0.5 * (t2 - i3) };
    })(w2, x2, f2, m2)), this.contentRect = Object.assign(Object.assign({}, this.contentRect), { top: y2.top - r2.top + S2, bottom: r2.bottom - y2.bottom + S2, left: y2.left - r2.left + E2, right: r2.right - y2.right + E2, fitWidth: w2, fitHeight: x2, width: w2, height: x2, fullWidth: f2, fullHeight: m2 }), b2.style.cssText = v2, a2 && (b2.style.width = `${w2}px`, b2.style.height = `${x2}px`), this.setTransform(), true !== e2 && this.emit("refresh"), this.ignoreBounds || (t(this.targetScale) < t(this.minScale) ? this.zoomTo(this.minScale, { friction: 0 }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, { friction: 0 }) : this.state === g.Init || this.checkBounds().inBounds || this.requestTick()), this.updateControls();
  }
  getBounds() {
    const e2 = this.option("bounds");
    if ("auto" !== e2)
      return e2;
    const { contentWidth: i2, contentHeight: n2 } = this.calculateContentDim(this.target);
    let s2 = 0, o2 = 0, a2 = 0, r2 = 0;
    const l2 = this.option("infinite");
    if (true === l2 || this.lockedAxis && l2 === this.lockedAxis)
      s2 = -1 / 0, a2 = 1 / 0, o2 = -1 / 0, r2 = 1 / 0;
    else {
      let { containerRect: e3, contentRect: l3 } = this, c2 = t(this.contentRect.fitWidth * this.targetScale, 1e3), h2 = t(this.contentRect.fitHeight * this.targetScale, 1e3), { innerWidth: d2, innerHeight: u2 } = e3;
      if (this.containerRect.width === c2 && (d2 = e3.width), this.containerRect.width === h2 && (u2 = e3.height), i2 > d2) {
        a2 = 0.5 * (i2 - d2), s2 = -1 * a2;
        let t2 = 0.5 * (l3.right - l3.left);
        s2 += t2, a2 += t2;
      }
      if (this.contentRect.fitWidth > d2 && i2 < d2 && (s2 -= 0.5 * (this.contentRect.fitWidth - d2), a2 -= 0.5 * (this.contentRect.fitWidth - d2)), n2 > u2) {
        r2 = 0.5 * (n2 - u2), o2 = -1 * r2;
        let t2 = 0.5 * (l3.bottom - l3.top);
        o2 += t2, r2 += t2;
      }
      this.contentRect.fitHeight > u2 && n2 < u2 && (s2 -= 0.5 * (this.contentRect.fitHeight - u2), a2 -= 0.5 * (this.contentRect.fitHeight - u2));
    }
    return { x: { min: s2, max: a2 }, y: { min: o2, max: r2 } };
  }
  updateControls() {
    const e2 = this, i2 = e2.container, { panMode: n2, contentRect: s2, fullScale: a2, targetScale: r2, coverScale: l2, maxScale: c2, minScale: h2 } = e2;
    let d2 = { toggleMax: r2 - h2 < 0.5 * (c2 - h2) ? c2 : h2, toggleCover: r2 - h2 < 0.5 * (l2 - h2) ? l2 : h2, toggleZoom: r2 - h2 < 0.5 * (a2 - h2) ? a2 : h2 }[e2.option("click") || ""] || h2, u2 = e2.canZoomIn(), p2 = e2.canZoomOut(), f2 = p2 && "drag" === n2;
    t(r2) < t(h2) && !this.panOnlyZoomed && (f2 = true), (t(s2.width, 1) > t(s2.fitWidth, 1) || t(s2.height, 1) > t(s2.fitHeight, 1)) && (f2 = true), t(s2.width * r2, 1) < t(s2.fitWidth, 1) && (f2 = false), "mousemove" === n2 && (f2 = false);
    let m2 = u2 && t(d2) > t(r2), g2 = !m2 && !f2 && p2 && t(d2) < t(r2);
    o(i2, this.cn("canZoomIn"), m2), o(i2, this.cn("canZoomOut"), g2), o(i2, this.cn("isDraggable"), f2);
    for (const t2 of i2.querySelectorAll('[data-panzoom-action="zoomIn"]'))
      u2 ? (t2.removeAttribute("disabled"), t2.removeAttribute("tabindex")) : (t2.setAttribute("disabled", ""), t2.setAttribute("tabindex", "-1"));
    for (const t2 of i2.querySelectorAll('[data-panzoom-action="zoomOut"]'))
      p2 ? (t2.removeAttribute("disabled"), t2.removeAttribute("tabindex")) : (t2.setAttribute("disabled", ""), t2.setAttribute("tabindex", "-1"));
    for (const t2 of i2.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
      u2 || p2 ? (t2.removeAttribute("disabled"), t2.removeAttribute("tabindex")) : (t2.setAttribute("disabled", ""), t2.setAttribute("tabindex", "-1"));
      const e3 = t2.querySelector("g");
      e3 && (e3.style.display = u2 ? "" : "none");
    }
  }
  panTo({ x: t2 = this.target.e, y: e2 = this.target.f, scale: i2 = this.targetScale, friction: n2 = this.option("friction"), angle: s2 = 0, originX: o2 = 0, originY: a2 = 0, flipX: r2 = false, flipY: l2 = false, ignoreBounds: c2 = false }) {
    this.state !== g.Destroy && this.applyChange({ panX: t2 - this.target.e, panY: e2 - this.target.f, scale: i2 / this.targetScale, angle: s2, originX: o2, originY: a2, friction: n2, flipX: r2, flipY: l2, ignoreBounds: c2 });
  }
  applyChange({ panX: e2 = 0, panY: i2 = 0, scale: n2 = 1, angle: s2 = 0, originX: o2 = -this.current.e, originY: a2 = -this.current.f, friction: r2 = this.option("friction"), flipX: l2 = false, flipY: c2 = false, ignoreBounds: h2 = false, bounce: d2 = this.option("bounce") }) {
    if (this.state === g.Destroy)
      return;
    this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.friction = r2 || 0, this.ignoreBounds = h2;
    const { current: u2 } = this, p2 = u2.e, f2 = u2.f, m2 = this.getMatrix(this.target);
    let v2 = new DOMMatrix().translate(p2, f2).translate(o2, a2).translate(e2, i2);
    if (this.option("zoom")) {
      if (!h2) {
        const t2 = this.targetScale, e3 = this.minScale, i3 = this.maxScale;
        t2 * n2 < e3 && (n2 = e3 / t2), t2 * n2 > i3 && (n2 = i3 / t2);
      }
      v2 = v2.scale(n2);
    }
    v2 = v2.translate(-o2, -a2).translate(-p2, -f2).multiply(m2), s2 && (v2 = v2.rotate(s2)), l2 && (v2 = v2.scale(-1, 1)), c2 && (v2 = v2.scale(1, -1));
    for (const e3 of b)
      "e" !== e3 && "f" !== e3 && (v2[e3] > this.minScale + 1e-5 || v2[e3] < this.minScale - 1e-5) ? this.target[e3] = v2[e3] : this.target[e3] = t(v2[e3], 1e3);
    (this.targetScale < this.scale || Math.abs(n2 - 1) > 0.1 || "mousemove" === this.panMode || false === d2) && !h2 && this.clampTargetBounds(), this.isResting || (this.state = g.Panning, this.requestTick());
  }
  stop(t2 = false) {
    if (this.state === g.Init || this.state === g.Destroy)
      return;
    const e2 = this.isTicking;
    this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = false, this.isBouncingY = false;
    for (const e3 of b)
      this.velocity[e3] = 0, "current" === t2 ? this.current[e3] = this.target[e3] : "target" === t2 && (this.target[e3] = this.current[e3]);
    this.setTransform(), S(this.container, "is-scaling"), S(this.container, "is-animating"), this.isTicking = false, this.state = g.Ready, e2 && (this.emit("endAnimation"), this.updateControls());
  }
  requestTick() {
    this.isTicking || (this.emit("startAnimation"), this.updateControls(), E(this.container, "is-animating"), this.isScaling && E(this.container, "is-scaling")), this.isTicking = true, this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()));
  }
  panWithMouse(e2, i2 = this.option("mouseMoveFriction")) {
    if (this.pmme = e2, "mousemove" !== this.panMode || !e2)
      return;
    if (t(this.targetScale) <= t(this.minScale))
      return;
    this.emit("mouseMove", e2);
    const { container: n2, containerRect: s2, contentRect: o2 } = this, a2 = s2.width, r2 = s2.height, l2 = n2.getBoundingClientRect(), c2 = (e2.clientX || 0) - l2.left, h2 = (e2.clientY || 0) - l2.top;
    let { contentWidth: d2, contentHeight: u2 } = this.calculateContentDim(this.target);
    const p2 = this.option("mouseMoveFactor");
    p2 > 1 && (d2 !== a2 && (d2 *= p2), u2 !== r2 && (u2 *= p2));
    let f2 = 0.5 * (d2 - a2) - c2 / a2 * 100 / 100 * (d2 - a2);
    f2 += 0.5 * (o2.right - o2.left);
    let m2 = 0.5 * (u2 - r2) - h2 / r2 * 100 / 100 * (u2 - r2);
    m2 += 0.5 * (o2.bottom - o2.top), this.applyChange({ panX: f2 - this.target.e, panY: m2 - this.target.f, friction: i2 });
  }
  zoomWithWheel(e2) {
    if (this.state === g.Destroy || this.state === g.Init)
      return;
    const i2 = Date.now();
    if (i2 - this.pwt < 45)
      return void e2.preventDefault();
    this.pwt = i2;
    var n2 = [-e2.deltaX || 0, -e2.deltaY || 0, -e2.detail || 0].reduce(function(t2, e3) {
      return Math.abs(e3) > Math.abs(t2) ? e3 : t2;
    });
    const s2 = Math.max(-1, Math.min(1, n2)), { targetScale: o2, maxScale: a2, minScale: r2 } = this;
    let l2 = o2 * (100 + 45 * s2) / 100;
    t(l2) < t(r2) && t(o2) <= t(r2) ? (this.cwd += Math.abs(s2), l2 = r2) : t(l2) > t(a2) && t(o2) >= t(a2) ? (this.cwd += Math.abs(s2), l2 = a2) : (this.cwd = 0, l2 = Math.max(Math.min(l2, a2), r2)), this.cwd > this.option("wheelLimit") || (e2.preventDefault(), t(l2) !== t(o2) && this.zoomTo(l2, { event: e2 }));
  }
  canZoomIn() {
    return this.option("zoom") && (t(this.contentRect.width, 1) < t(this.contentRect.fitWidth, 1) || t(this.targetScale) < t(this.maxScale));
  }
  canZoomOut() {
    return this.option("zoom") && t(this.targetScale) > t(this.minScale);
  }
  zoomIn(t2 = 1.25, e2) {
    this.zoomTo(this.targetScale * t2, e2);
  }
  zoomOut(t2 = 0.8, e2) {
    this.zoomTo(this.targetScale * t2, e2);
  }
  zoomToFit(t2) {
    this.zoomTo("fit", t2);
  }
  zoomToCover(t2) {
    this.zoomTo("cover", t2);
  }
  zoomToFull(t2) {
    this.zoomTo("full", t2);
  }
  zoomToMax(t2) {
    this.zoomTo("max", t2);
  }
  toggleZoom(t2) {
    this.zoomTo(this.targetScale - this.minScale < 0.5 * (this.fullScale - this.minScale) ? "full" : "fit", t2);
  }
  toggleMax(t2) {
    this.zoomTo(this.targetScale - this.minScale < 0.5 * (this.maxScale - this.minScale) ? "max" : "fit", t2);
  }
  toggleCover(t2) {
    this.zoomTo(this.targetScale - this.minScale < 0.5 * (this.coverScale - this.minScale) ? "cover" : "fit", t2);
  }
  iterateZoom(t2) {
    this.zoomTo("next", t2);
  }
  zoomTo(t2 = 1, { friction: e2 = "auto", originX: i2 = 0, originY: n2 = 0, event: s2 } = {}) {
    if (this.isContentLoading || this.state === g.Destroy)
      return;
    const { targetScale: o2 } = this;
    this.stop();
    let a2 = 1;
    if ("mousemove" === this.panMode && (s2 = this.pmme || s2), s2) {
      const t3 = this.content.getBoundingClientRect(), e3 = s2.clientX || 0, o3 = s2.clientY || 0;
      i2 = e3 - t3.left - 0.5 * t3.width, n2 = o3 - t3.top - 0.5 * t3.height;
    }
    const r2 = this.fullScale, l2 = this.maxScale;
    let c2 = this.coverScale;
    "number" == typeof t2 ? a2 = t2 / o2 : ("next" === t2 && (r2 - c2 < 0.2 && (c2 = r2), t2 = o2 < r2 - 1e-5 ? "full" : o2 < l2 - 1e-5 ? "max" : "fit"), a2 = "full" === t2 ? r2 / o2 || 1 : "cover" === t2 ? c2 / o2 || 1 : "max" === t2 ? l2 / o2 || 1 : 1 / o2 || 1), e2 = "auto" === e2 ? a2 > 1 ? 0.15 : 0.25 : e2, this.applyChange({ scale: a2, originX: i2, originY: n2, friction: e2 }), s2 && "mousemove" === this.panMode && this.panWithMouse(s2, e2);
  }
  rotateCCW() {
    this.applyChange({ angle: -90 });
  }
  rotateCW() {
    this.applyChange({ angle: 90 });
  }
  flipX() {
    this.applyChange({ flipX: true });
  }
  flipY() {
    this.applyChange({ flipY: true });
  }
  fitX() {
    this.stop("target");
    const { containerRect: t2, contentRect: e2, target: i2 } = this;
    this.applyChange({ panX: 0.5 * t2.width - (e2.left + 0.5 * e2.fitWidth) - i2.e, panY: 0.5 * t2.height - (e2.top + 0.5 * e2.fitHeight) - i2.f, scale: t2.width / e2.fitWidth / this.targetScale, originX: 0, originY: 0, ignoreBounds: true });
  }
  fitY() {
    this.stop("target");
    const { containerRect: t2, contentRect: e2, target: i2 } = this;
    this.applyChange({ panX: 0.5 * t2.width - (e2.left + 0.5 * e2.fitWidth) - i2.e, panY: 0.5 * t2.innerHeight - (e2.top + 0.5 * e2.fitHeight) - i2.f, scale: t2.height / e2.fitHeight / this.targetScale, originX: 0, originY: 0, ignoreBounds: true });
  }
  toggleFS() {
    const { container: t2 } = this, e2 = this.cn("inFullscreen"), i2 = this.cn("htmlHasFullscreen");
    t2.classList.toggle(e2);
    const n2 = t2.classList.contains(e2);
    n2 ? (document.documentElement.classList.add(i2), document.addEventListener("keydown", this.onKeydown, true)) : (document.documentElement.classList.remove(i2), document.removeEventListener("keydown", this.onKeydown, true)), this.updateMetrics(), this.emit(n2 ? "enterFS" : "exitFS");
  }
  getMatrix(t2 = this.current) {
    const { a: e2, b: i2, c: n2, d: s2, e: o2, f: a2 } = t2;
    return new DOMMatrix([e2, i2, n2, s2, o2, a2]);
  }
  reset(t2) {
    if (this.state !== g.Init && this.state !== g.Destroy) {
      this.stop("current");
      for (const t3 of b)
        this.target[t3] = P[t3];
      this.target.a = this.minScale, this.target.d = this.minScale, this.clampTargetBounds(), this.isResting || (this.friction = void 0 === t2 ? this.option("friction") : t2, this.state = g.Panning, this.requestTick());
    }
  }
  destroy() {
    this.stop(), this.state = g.Destroy, this.detachEvents(), this.detachObserver();
    const { container: t2, content: e2 } = this, i2 = this.option("classes") || {};
    for (const e3 of Object.values(i2))
      t2.classList.remove(e3 + "");
    e2 && (e2.removeEventListener("load", this.onLoad), e2.removeEventListener("error", this.onError)), this.detachPlugins();
  }
}
Object.defineProperty(T, "defaults", { enumerable: true, configurable: true, writable: true, value: y }), Object.defineProperty(T, "Plugins", { enumerable: true, configurable: true, writable: true, value: {} });
const O = function(t2, e2) {
  let i2 = true;
  return (...n2) => {
    i2 && (i2 = false, t2(...n2), setTimeout(() => {
      i2 = true;
    }, e2));
  };
}, A = (t2, e2) => {
  let i2 = [];
  return t2.childNodes.forEach((t3) => {
    t3.nodeType !== Node.ELEMENT_NODE || e2 && !t3.matches(e2) || i2.push(t3);
  }), i2;
}, z = { viewport: null, track: null, enabled: true, slides: [], axis: "x", transition: "fade", preload: 1, slidesPerPage: "auto", initialPage: 0, friction: 0.12, Panzoom: { decelFriction: 0.12 }, center: true, infinite: true, fill: true, dragFree: false, adaptiveHeight: false, direction: "ltr", classes: { container: "f-carousel", viewport: "f-carousel__viewport", track: "f-carousel__track", slide: "f-carousel__slide", isLTR: "is-ltr", isRTL: "is-rtl", isHorizontal: "is-horizontal", isVertical: "is-vertical", inTransition: "in-transition", isSelected: "is-selected" }, l10n: { NEXT: "Next slide", PREV: "Previous slide", GOTO: "Go to slide #%d" } };
var L;
!function(t2) {
  t2[t2.Init = 0] = "Init", t2[t2.Ready = 1] = "Ready", t2[t2.Destroy = 2] = "Destroy";
}(L || (L = {}));
const R = (t2) => {
  if ("string" == typeof t2 && (t2 = { html: t2 }), !(t2 instanceof String || t2 instanceof HTMLElement)) {
    const e2 = t2.thumb;
    void 0 !== e2 && ("string" == typeof e2 && (t2.thumbSrc = e2), e2 instanceof HTMLImageElement && (t2.thumbEl = e2, t2.thumbElSrc = e2.src, t2.thumbSrc = e2.src), delete t2.thumb);
  }
  return Object.assign({ html: "", el: null, isDom: false, class: "", index: -1, dim: 0, gap: 0, pos: 0, transition: false }, t2);
}, k = (t2 = {}) => Object.assign({ index: -1, slides: [], dim: 0, pos: -1 }, t2);
class I extends f {
  constructor(t2, e2) {
    super(e2), Object.defineProperty(this, "instance", { enumerable: true, configurable: true, writable: true, value: t2 });
  }
  attach() {
  }
  detach() {
  }
}
const D = { classes: { list: "f-carousel__dots", isDynamic: "is-dynamic", hasDots: "has-dots", dot: "f-carousel__dot", isBeforePrev: "is-before-prev", isPrev: "is-prev", isCurrent: "is-current", isNext: "is-next", isAfterNext: "is-after-next" }, dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>', dynamicFrom: 11, maxCount: 1 / 0, minCount: 2 };
class F extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "isDynamic", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "list", { enumerable: true, configurable: true, writable: true, value: null });
  }
  onRefresh() {
    this.refresh();
  }
  build() {
    let t2 = this.list;
    return t2 || (t2 = document.createElement("ul"), E(t2, this.cn("list")), t2.setAttribute("role", "tablist"), this.instance.container.appendChild(t2), E(this.instance.container, this.cn("hasDots")), this.list = t2), t2;
  }
  refresh() {
    var t2;
    const e2 = this.instance.pages.length, i2 = Math.min(2, this.option("minCount")), n2 = Math.max(2e3, this.option("maxCount")), s2 = this.option("dynamicFrom");
    if (e2 < i2 || e2 > n2)
      return void this.cleanup();
    const a2 = "number" == typeof s2 && e2 > 5 && e2 >= s2, r2 = !this.list || this.isDynamic !== a2 || this.list.children.length !== e2;
    r2 && this.cleanup();
    const l2 = this.build();
    if (o(l2, this.cn("isDynamic"), !!a2), r2)
      for (let t3 = 0; t3 < e2; t3++)
        l2.append(this.createItem(t3));
    let c2, h2 = 0;
    for (const e3 of [...l2.children]) {
      const i3 = h2 === this.instance.page;
      i3 && (c2 = e3), o(e3, this.cn("isCurrent"), i3), null === (t2 = e3.children[0]) || void 0 === t2 || t2.setAttribute("aria-selected", i3 ? "true" : "false");
      for (const t3 of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"])
        S(e3, this.cn(t3));
      h2++;
    }
    if (c2 = c2 || l2.firstChild, a2 && c2) {
      const t3 = c2.previousElementSibling, e3 = t3 && t3.previousElementSibling;
      E(t3, this.cn("isPrev")), E(e3, this.cn("isBeforePrev"));
      const i3 = c2.nextElementSibling, n3 = i3 && i3.nextElementSibling;
      E(i3, this.cn("isNext")), E(n3, this.cn("isAfterNext"));
    }
    this.isDynamic = a2;
  }
  createItem(t2 = 0) {
    var e2;
    const i2 = document.createElement("li");
    i2.setAttribute("role", "presentation");
    const s2 = n(this.instance.localize(this.option("dotTpl"), [["%d", t2 + 1]]).replace(/\%i/g, t2 + ""));
    return i2.appendChild(s2), null === (e2 = i2.children[0]) || void 0 === e2 || e2.setAttribute("role", "tab"), i2;
  }
  cleanup() {
    this.list && (this.list.remove(), this.list = null), this.isDynamic = false, S(this.instance.container, this.cn("hasDots"));
  }
  attach() {
    this.instance.on(["refresh", "change"], this.onRefresh);
  }
  detach() {
    this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
  }
}
Object.defineProperty(F, "defaults", { enumerable: true, configurable: true, writable: true, value: D });
class j extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "container", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "prev", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "next", { enumerable: true, configurable: true, writable: true, value: null });
  }
  onRefresh() {
    const t2 = this.instance, e2 = t2.pages.length, i2 = t2.page;
    if (e2 < 2)
      return void this.cleanup();
    this.build();
    let n2 = this.prev, s2 = this.next;
    n2 && s2 && (n2.removeAttribute("disabled"), s2.removeAttribute("disabled"), t2.isInfinite || (i2 <= 0 && n2.setAttribute("disabled", ""), i2 >= e2 - 1 && s2.setAttribute("disabled", "")));
  }
  createButton(t2) {
    const e2 = this.instance, i2 = document.createElement("button");
    i2.setAttribute("tabindex", "0"), i2.setAttribute("title", e2.localize(`{{${t2.toUpperCase()}}}`)), E(i2, this.cn("button") + " " + this.cn("next" === t2 ? "isNext" : "isPrev"));
    const n2 = e2.isRTL ? "next" === t2 ? "prev" : "next" : t2;
    var s2;
    return i2.innerHTML = e2.localize(this.option(`${n2}Tpl`)), i2.dataset[`carousel${s2 = t2, s2 ? s2.match("^[a-z]") ? s2.charAt(0).toUpperCase() + s2.substring(1) : s2 : ""}`] = "true", i2;
  }
  build() {
    let t2 = this.container;
    t2 || (this.container = t2 = document.createElement("div"), E(t2, this.cn("container")), this.instance.container.appendChild(t2)), this.next || (this.next = t2.appendChild(this.createButton("next"))), this.prev || (this.prev = t2.appendChild(this.createButton("prev")));
  }
  cleanup() {
    this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove(), this.prev = null, this.next = null, this.container = null;
  }
  attach() {
    this.instance.on(["refresh", "change"], this.onRefresh);
  }
  detach() {
    this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
  }
}
Object.defineProperty(j, "defaults", { enumerable: true, configurable: true, writable: true, value: { classes: { container: "f-carousel__nav", button: "f-button", isNext: "is-next", isPrev: "is-prev" }, nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>', prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>' } });
class H extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "selectedIndex", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "target", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "nav", { enumerable: true, configurable: true, writable: true, value: null });
  }
  addAsTargetFor(t2) {
    this.target = this.instance, this.nav = t2, this.attachEvents();
  }
  addAsNavFor(t2) {
    this.nav = this.instance, this.target = t2, this.attachEvents();
  }
  attachEvents() {
    this.nav && this.target && (this.nav.options.initialSlide = this.target.options.initialPage, this.nav.on("ready", this.onNavReady), this.nav.state === L.Ready && this.onNavReady(this.nav), this.target.on("ready", this.onTargetReady), this.target.state === L.Ready && this.onTargetReady(this.target));
  }
  onNavReady(t2) {
    t2.on("createSlide", this.onNavCreateSlide), t2.on("Panzoom.click", this.onNavClick), t2.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange();
  }
  onTargetReady(t2) {
    t2.on("change", this.onTargetChange), t2.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange();
  }
  onNavClick(t2, e2, i2) {
    i2.pointerType || this.onNavTouch(t2, t2.panzoom, i2);
  }
  onNavTouch(t2, e2, i2) {
    var n2, s2;
    if (Math.abs(e2.dragOffset.x) > 3 || Math.abs(e2.dragOffset.y) > 3)
      return;
    const o2 = i2.target, { nav: a2, target: r2 } = this;
    if (!a2 || !r2 || !o2)
      return;
    const l2 = o2.closest("[data-index]");
    if (i2.stopPropagation(), i2.preventDefault(), !l2)
      return;
    const c2 = parseInt(l2.dataset.index || "", 10) || 0, h2 = r2.getPageForSlide(c2), d2 = a2.getPageForSlide(c2);
    a2.slideTo(d2), r2.slideTo(h2, { friction: (null === (s2 = null === (n2 = this.nav) || void 0 === n2 ? void 0 : n2.plugins) || void 0 === s2 ? void 0 : s2.Sync.option("friction")) || 0 }), this.markSelectedSlide(c2);
  }
  onNavCreateSlide(t2, e2) {
    e2.index === this.selectedIndex && this.markSelectedSlide(e2.index);
  }
  onTargetChange() {
    const { target: t2, nav: e2 } = this;
    if (!t2 || !e2)
      return;
    if (e2.state !== L.Ready || t2.state !== L.Ready)
      return;
    const i2 = t2.pages[t2.page].slides[0].index, n2 = e2.getPageForSlide(i2);
    this.markSelectedSlide(i2), e2.slideTo(n2);
  }
  markSelectedSlide(t2) {
    const e2 = this.nav;
    e2 && e2.state === L.Ready && (this.selectedIndex = t2, [...e2.slides].map((e3) => {
      e3.el && e3.el.classList[e3.index === t2 ? "add" : "remove"]("is-nav-selected");
    }));
  }
  attach() {
    const t2 = this;
    let e2 = t2.options.target, i2 = t2.options.nav;
    e2 ? t2.addAsNavFor(e2) : i2 && t2.addAsTargetFor(i2);
  }
  detach() {
    const t2 = this, e2 = t2.nav, i2 = t2.target;
    e2 && (e2.off("ready", t2.onNavReady), e2.off("createSlide", t2.onNavCreateSlide), e2.off("Panzoom.click", t2.onNavClick), e2.off("Panzoom.touchEnd", t2.onNavTouch)), t2.nav = null, i2 && (i2.off("ready", t2.onTargetReady), i2.off("refresh", t2.onTargetChange), i2.off("change", t2.onTargetChange)), t2.target = null;
  }
}
Object.defineProperty(H, "defaults", { enumerable: true, configurable: true, writable: true, value: { friction: 0.35 } });
const B = { Navigation: j, Dots: F, Sync: H };
class _ extends m {
  get axis() {
    return this.isHorizontal ? "e" : "f";
  }
  get isEnabled() {
    return this.state === L.Ready;
  }
  get isInfinite() {
    let t2 = false;
    const { contentDim: e2, viewportDim: i2, pages: n2, slides: s2 } = this;
    return n2.length >= 2 && e2 + s2[0].dim >= i2 && (t2 = this.option("infinite")), t2;
  }
  get isRTL() {
    return "rtl" === this.option("direction");
  }
  get isHorizontal() {
    return "x" === this.option("axis");
  }
  constructor(t2, e2 = {}, i2 = {}) {
    if (super(), Object.defineProperty(this, "userOptions", { enumerable: true, configurable: true, writable: true, value: {} }), Object.defineProperty(this, "userPlugins", { enumerable: true, configurable: true, writable: true, value: {} }), Object.defineProperty(this, "bp", { enumerable: true, configurable: true, writable: true, value: "" }), Object.defineProperty(this, "lp", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "state", { enumerable: true, configurable: true, writable: true, value: L.Init }), Object.defineProperty(this, "page", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "prevPage", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "container", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "viewport", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "track", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "slides", { enumerable: true, configurable: true, writable: true, value: [] }), Object.defineProperty(this, "pages", { enumerable: true, configurable: true, writable: true, value: [] }), Object.defineProperty(this, "panzoom", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "inTransition", { enumerable: true, configurable: true, writable: true, value: /* @__PURE__ */ new Set() }), Object.defineProperty(this, "contentDim", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "viewportDim", { enumerable: true, configurable: true, writable: true, value: 0 }), "string" == typeof t2 && (t2 = document.querySelector(t2)), !t2 || !x(t2))
      throw new Error("No Element found");
    this.container = t2, this.slideNext = O(this.slideNext.bind(this), 150), this.slidePrev = O(this.slidePrev.bind(this), 150), this.userOptions = e2, this.userPlugins = i2, queueMicrotask(() => {
      this.processOptions();
    });
  }
  processOptions() {
    const t2 = u({}, _.defaults, this.userOptions);
    let e2 = "";
    const i2 = t2.breakpoints;
    if (i2 && d(i2))
      for (const [n2, s2] of Object.entries(i2))
        window.matchMedia(n2).matches && d(s2) && (e2 += n2, u(t2, s2));
    e2 === this.bp && this.state !== L.Init || (this.bp = e2, this.state === L.Ready && (t2.initialSlide = this.pages[this.page].slides[0].index), this.state !== L.Init && this.destroy(), super.setOptions(t2), false === this.option("enabled") ? this.attachEvents() : setTimeout(() => {
      this.init();
    }, 0));
  }
  init() {
    this.state = L.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, _.Plugins), this.userPlugins)), this.initLayout(), this.initSlides(), this.updateMetrics(), this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = L.Ready, this.emit("ready");
  }
  initLayout() {
    const { container: t2 } = this, e2 = this.option("classes");
    E(t2, this.cn("container")), o(t2, e2.isLTR, !this.isRTL), o(t2, e2.isRTL, this.isRTL), o(t2, e2.isVertical, !this.isHorizontal), o(t2, e2.isHorizontal, this.isHorizontal);
    let i2 = this.option("viewport") || t2.querySelector(`.${e2.viewport}`);
    i2 || (i2 = document.createElement("div"), E(i2, e2.viewport), i2.append(...A(t2, `.${e2.slide}`)), t2.prepend(i2));
    let n2 = this.option("track") || t2.querySelector(`.${e2.track}`);
    n2 || (n2 = document.createElement("div"), E(n2, e2.track), n2.append(...Array.from(i2.childNodes))), n2.setAttribute("aria-live", "polite"), i2.contains(n2) || i2.prepend(n2), this.viewport = i2, this.track = n2, this.emit("initLayout");
  }
  initSlides() {
    const { track: t2 } = this;
    if (t2) {
      this.slides = [], [...A(t2, `.${this.cn("slide")}`)].forEach((t3) => {
        if (x(t3)) {
          const e2 = R({ el: t3, isDom: true, index: this.slides.length });
          this.slides.push(e2), this.emit("initSlide", e2, this.slides.length);
        }
      });
      for (let t3 of this.option("slides", [])) {
        const e2 = R(t3);
        e2.index = this.slides.length, this.slides.push(e2), this.emit("initSlide", e2, this.slides.length);
      }
      this.emit("initSlides");
    }
  }
  setInitialPage() {
    let t2 = 0;
    const e2 = this.option("initialSlide");
    t2 = "number" == typeof e2 ? this.getPageForSlide(e2) : parseInt(this.option("initialPage", 0) + "", 10) || 0, this.page = t2;
  }
  setInitialPosition() {
    if (!this.track || !this.pages.length)
      return;
    const t2 = this.isHorizontal;
    let e2 = this.page;
    this.pages[e2] || (this.page = e2 = 0);
    const i2 = this.pages[e2].pos * (this.isRTL && t2 ? 1 : -1), n2 = t2 ? `${i2}px` : "0", s2 = t2 ? "0" : `${i2}px`;
    this.track.style.transform = `translate3d(${n2}, ${s2}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight();
  }
  initPanzoom() {
    this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
    const t2 = this.option("Panzoom") || {};
    this.panzoom = new T(this.viewport, u({}, { content: this.track, zoom: false, panOnlyZoomed: false, lockAxis: this.isHorizontal ? "x" : "y", infinite: this.isInfinite, click: false, dblClick: false, touch: (t3) => !(this.pages.length < 2 && !t3.options.infinite), bounds: () => this.getBounds(), maxVelocity: (t3) => Math.abs(t3.target[this.axis] - t3.current[this.axis]) < 2 * this.viewportDim ? 100 : 0 }, t2)), this.panzoom.on("*", (t3, e2, ...i2) => {
      this.emit(`Panzoom.${e2}`, t3, ...i2);
    }), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation);
  }
  attachEvents() {
    const t2 = this.container;
    t2 && (t2.addEventListener("click", this.onClick, { passive: false, capture: false }), t2.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize);
  }
  createPages() {
    let t2 = [];
    const { contentDim: e2, viewportDim: i2 } = this;
    let n2 = this.option("slidesPerPage");
    ("number" != typeof n2 || e2 <= i2) && (n2 = 1 / 0);
    let s2 = 0, o2 = 0, a2 = 0;
    for (const e3 of this.slides)
      (!t2.length || o2 + e3.dim > i2 || a2 === n2) && (t2.push(k()), s2 = t2.length - 1, o2 = 0, a2 = 0), t2[s2].slides.push(e3), o2 += e3.dim + e3.gap, a2++;
    return t2;
  }
  processPages() {
    const e2 = this.pages, { contentDim: i2, viewportDim: n2 } = this, s2 = this.option("center"), o2 = this.option("fill"), a2 = o2 && s2 && i2 > n2 && !this.isInfinite;
    if (e2.forEach((t2, e3) => {
      t2.index = e3, t2.pos = t2.slides[0].pos, t2.dim = 0;
      for (const [e4, i3] of t2.slides.entries())
        t2.dim += i3.dim, e4 < t2.slides.length - 1 && (t2.dim += i3.gap);
      a2 && t2.pos + 0.5 * t2.dim < 0.5 * n2 ? t2.pos = 0 : a2 && t2.pos + 0.5 * t2.dim >= i2 - 0.5 * n2 ? t2.pos = i2 - n2 : s2 && (t2.pos += -0.5 * (n2 - t2.dim));
    }), e2.forEach((e3, s3) => {
      o2 && !this.isInfinite && i2 > n2 && (e3.pos = Math.max(e3.pos, 0), e3.pos = Math.min(e3.pos, i2 - n2)), e3.pos = t(e3.pos, 1e3), e3.dim = t(e3.dim, 1e3), e3.pos < 0.1 && e3.pos > -0.1 && (e3.pos = 0);
    }), this.isInfinite)
      return e2;
    const r2 = [];
    let l2;
    return e2.forEach((t2) => {
      const e3 = Object.assign({}, t2);
      l2 && e3.pos === l2.pos ? (l2.dim += e3.dim, l2.slides = [...l2.slides, ...e3.slides]) : (e3.index = r2.length, l2 = e3, r2.push(e3));
    }), r2;
  }
  getPageFromIndex(t2 = 0) {
    const e2 = this.pages.length;
    let i2;
    return t2 = parseInt((t2 || 0).toString()) || 0, i2 = this.isInfinite ? (t2 % e2 + e2) % e2 : Math.max(Math.min(t2, e2 - 1), 0), i2;
  }
  getSlideMetrics(e2) {
    var i2;
    const n2 = this.isHorizontal ? "width" : "height";
    let s2 = 0, o2 = 0, a2 = e2.el;
    if (a2 ? s2 = parseFloat(a2.dataset[n2] || "") || 0 : (a2 = document.createElement("div"), a2.style.visibility = "hidden", E(a2, this.cn("slide") + " " + e2.class), (this.track || document.body).prepend(a2)), s2)
      a2.style[n2] = `${s2}px`, a2.style["width" === n2 ? "height" : "width"] = "";
    else {
      const t2 = Math.max(1, (null === (i2 = window.visualViewport) || void 0 === i2 ? void 0 : i2.scale) || 1);
      s2 = a2.getBoundingClientRect()[n2] * t2;
    }
    const r2 = getComputedStyle(a2);
    return "content-box" === r2.boxSizing && (this.isHorizontal ? (s2 += parseFloat(r2.paddingLeft) || 0, s2 += parseFloat(r2.paddingRight) || 0) : (s2 += parseFloat(r2.paddingTop) || 0, s2 += parseFloat(r2.paddingBottom) || 0)), o2 = parseFloat(r2[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, e2.el || a2.remove(), { dim: t(s2, 1e3), gap: t(o2, 1e3) };
  }
  getBounds() {
    const { isInfinite: t2, isRTL: e2, isHorizontal: i2, pages: n2 } = this;
    let s2 = { min: 0, max: 0 };
    if (t2)
      s2 = { min: -1 / 0, max: 1 / 0 };
    else if (n2.length) {
      const t3 = n2[0].pos, o2 = n2[n2.length - 1].pos;
      s2 = e2 && i2 ? { min: t3, max: o2 } : { min: -1 * o2, max: -1 * t3 };
    }
    return { x: i2 ? s2 : { min: 0, max: 0 }, y: i2 ? { min: 0, max: 0 } : s2 };
  }
  repositionSlides() {
    let e2, { isHorizontal: i2, isRTL: n2, isInfinite: s2, viewport: o2, viewportDim: a2, contentDim: r2, page: l2, pages: c2, slides: h2, panzoom: d2 } = this, u2 = 0, p2 = 0, f2 = 0, m2 = 0;
    d2 ? m2 = -1 * d2.current[this.axis] : c2[l2] && (m2 = c2[l2].pos || 0), e2 = i2 ? n2 ? "right" : "left" : "top", n2 && i2 && (m2 *= -1);
    for (const i3 of h2)
      i3.el ? ("top" === e2 ? (i3.el.style.right = "", i3.el.style.left = "") : i3.el.style.top = "", i3.index !== u2 ? i3.el.style[e2] = 0 === p2 ? "" : `${t(p2, 1e3)}px` : i3.el.style[e2] = "", f2 += i3.dim + i3.gap, u2++) : p2 += i3.dim + i3.gap;
    if (s2 && f2 && o2) {
      let n3 = getComputedStyle(o2), s3 = "padding", l3 = i2 ? "Right" : "Bottom", c3 = parseFloat(n3[s3 + (i2 ? "Left" : "Top")]);
      m2 -= c3, a2 += c3, a2 += parseFloat(n3[s3 + l3]);
      for (const i3 of h2)
        i3.el && (t(i3.pos) < t(a2) && t(i3.pos + i3.dim + i3.gap) < t(m2) && t(m2) > t(r2 - a2) && (i3.el.style[e2] = `${t(p2 + f2, 1e3)}px`), t(i3.pos + i3.gap) >= t(r2 - a2) && t(i3.pos) > t(m2 + a2) && t(m2) < t(a2) && (i3.el.style[e2] = `-${t(f2, 1e3)}px`));
    }
    let g2, b2, v2 = [...this.inTransition];
    if (v2.length > 1 && (g2 = c2[v2[0]], b2 = c2[v2[1]]), g2 && b2) {
      let i3 = 0;
      for (const n3 of h2)
        n3.el ? this.inTransition.has(n3.index) && g2.slides.indexOf(n3) < 0 && (n3.el.style[e2] = `${t(i3 + (g2.pos - b2.pos), 1e3)}px`) : i3 += n3.dim + n3.gap;
    }
  }
  createSlideEl(t2) {
    const { track: e2, slides: i2 } = this;
    if (!e2 || !t2)
      return;
    if (t2.el)
      return;
    const n2 = document.createElement("div");
    E(n2, this.cn("slide")), E(n2, t2.class), E(n2, t2.customClass), t2.html && (n2.innerHTML = t2.html);
    const s2 = [];
    i2.forEach((t3, e3) => {
      t3.el && s2.push(e3);
    });
    const o2 = t2.index;
    let a2 = null;
    if (s2.length) {
      a2 = i2[s2.reduce((t3, e3) => Math.abs(e3 - o2) < Math.abs(t3 - o2) ? e3 : t3)];
    }
    const r2 = a2 && a2.el ? a2.index < t2.index ? a2.el.nextSibling : a2.el : null;
    e2.insertBefore(n2, e2.contains(r2) ? r2 : null), t2.el = n2, this.emit("createSlide", t2);
  }
  removeSlideEl(t2, e2 = false) {
    const i2 = t2.el;
    if (!i2)
      return;
    if (S(i2, this.cn("isSelected")), t2.isDom && !e2)
      return i2.removeAttribute("aria-hidden"), i2.removeAttribute("data-index"), S(i2, this.cn("isSelected")), void (i2.style.left = "");
    this.emit("removeSlide", t2);
    const n2 = new CustomEvent("animationend");
    i2.dispatchEvent(n2), t2.el && t2.el.remove(), t2.el = null;
  }
  transitionTo(e2 = 0, i2 = this.option("transition")) {
    if (!i2)
      return false;
    const { pages: n2, panzoom: s2 } = this;
    e2 = parseInt((e2 || 0).toString()) || 0;
    const o2 = this.getPageFromIndex(e2);
    if (!s2 || !n2[o2] || n2.length < 2 || Math.abs(n2[this.page].slides[0].dim - this.viewportDim) > 1)
      return false;
    const a2 = e2 > this.page ? 1 : -1, r2 = this.pages[o2].pos * (this.isRTL ? 1 : -1);
    if (this.page === o2 && t(r2, 1e3) === t(s2.target[this.axis], 1e3))
      return false;
    this.clearTransitions();
    const l2 = s2.isResting;
    E(this.container, this.cn("inTransition"));
    const c2 = this.pages[this.page].slides[0], h2 = this.pages[o2].slides[0];
    this.inTransition.add(h2.index), this.createSlideEl(h2);
    let d2 = c2.el, u2 = h2.el;
    l2 || "slide" === i2 || (i2 = "fadeFast", d2 = null);
    const p2 = this.isRTL ? "next" : "prev", f2 = this.isRTL ? "prev" : "next";
    return d2 && (this.inTransition.add(c2.index), c2.transition = i2, d2.addEventListener("animationend", this.onAnimationEnd), d2.classList.add(`f-${i2}Out`, `to-${a2 > 0 ? f2 : p2}`)), u2 && (h2.transition = i2, u2.addEventListener("animationend", this.onAnimationEnd), u2.classList.add(`f-${i2}In`, `from-${a2 > 0 ? p2 : f2}`)), s2.panTo({ x: this.isHorizontal ? r2 : 0, y: this.isHorizontal ? 0 : r2, friction: 0 }), this.onChange(o2), true;
  }
  manageSlideVisiblity() {
    const t2 = /* @__PURE__ */ new Set(), e2 = /* @__PURE__ */ new Set(), i2 = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
    for (const n2 of this.slides)
      i2.has(n2) ? t2.add(n2) : e2.add(n2);
    for (const e3 of this.inTransition)
      t2.add(this.slides[e3]);
    for (const e3 of t2)
      this.createSlideEl(e3), this.lazyLoadSlide(e3);
    for (const i3 of e2)
      t2.has(i3) || this.removeSlideEl(i3);
    this.markSelectedSlides(), this.repositionSlides();
  }
  markSelectedSlides() {
    if (!this.pages[this.page] || !this.pages[this.page].slides)
      return;
    const t2 = "aria-hidden";
    let e2 = this.cn("isSelected");
    if (e2)
      for (const i2 of this.slides)
        i2.el && (i2.el.dataset.index = `${i2.index}`, this.pages[this.page].slides.includes(i2) ? (i2.el.classList.contains(e2) || (E(i2.el, e2), this.emit("selectSlide", i2)), i2.el.removeAttribute(t2)) : (i2.el.classList.contains(e2) && (S(i2.el, e2), this.emit("unselectSlide", i2)), i2.el.setAttribute(t2, "true")));
  }
  flipInfiniteTrack() {
    const t2 = this.panzoom;
    if (!t2 || !this.isInfinite)
      return;
    const e2 = "x" === this.option("axis") ? "e" : "f", { viewportDim: i2, contentDim: n2 } = this;
    let s2 = t2.current[e2], o2 = t2.target[e2] - s2, a2 = 0, r2 = 0.5 * i2, l2 = n2;
    this.isRTL && this.isHorizontal ? (s2 < -r2 && (a2 = -1, s2 += l2), s2 > l2 - r2 && (a2 = 1, s2 -= l2)) : (s2 > r2 && (a2 = 1, s2 -= l2), s2 < -l2 + r2 && (a2 = -1, s2 += l2)), a2 && (t2.current[e2] = s2, t2.target[e2] = s2 + o2);
  }
  lazyLoadSlide(t2) {
    const e2 = this, i2 = t2 && t2.el;
    if (!i2)
      return;
    const s2 = /* @__PURE__ */ new Set(), o2 = "f-fadeIn";
    i2.querySelectorAll("[data-lazy-srcset]").forEach((t3) => {
      t3 instanceof HTMLImageElement && s2.add(t3);
    });
    let a2 = Array.from(i2.querySelectorAll("[data-lazy-src]"));
    i2.dataset.lazySrc && a2.push(i2), a2.map((t3) => {
      t3 instanceof HTMLImageElement ? s2.add(t3) : x(t3) && (t3.style.backgroundImage = `url('${t3.dataset.lazySrc || ""}')`, delete t3.dataset.lazySrc);
    });
    const r2 = (t3, i3, n2) => {
      n2 && (n2.remove(), n2 = null), i3.complete && (i3.classList.add(o2), setTimeout(() => {
        i3.classList.remove(o2);
      }, 350), i3.style.display = ""), this.option("adaptiveHeight") && t3.el && this.pages[this.page].slides.indexOf(t3) > -1 && (e2.updateMetrics(), e2.setViewportHeight()), this.emit("load", t3);
    };
    for (const e3 of s2) {
      let i3 = null;
      e3.src = e3.dataset.lazySrcset || e3.dataset.lazySrc || "", delete e3.dataset.lazySrc, delete e3.dataset.lazySrcset, e3.style.display = "none", e3.addEventListener("error", () => {
        r2(t2, e3, i3);
      }), e3.addEventListener("load", () => {
        r2(t2, e3, i3);
      }), setTimeout(() => {
        e3.parentNode && t2.el && (e3.complete ? r2(t2, e3, i3) : (i3 = n(w), e3.parentNode.insertBefore(i3, e3)));
      }, 300);
    }
  }
  onAnimationEnd(t2) {
    var e2;
    const i2 = t2.target, n2 = i2 ? parseInt(i2.dataset.index || "", 10) || 0 : -1, s2 = this.slides[n2], o2 = t2.animationName;
    if (!i2 || !s2 || !o2)
      return;
    const a2 = !!this.inTransition.has(n2) && s2.transition;
    a2 && o2.substring(0, a2.length + 2) === `f-${a2}` && this.inTransition.delete(n2), this.inTransition.size || this.clearTransitions(), n2 === this.page && (null === (e2 = this.panzoom) || void 0 === e2 ? void 0 : e2.isResting) && this.emit("settle");
  }
  onDecel(t2, e2 = 0, i2 = 0, n2 = 0, s2 = 0) {
    const { isRTL: o2, isHorizontal: a2, axis: r2, pages: l2 } = this, c2 = l2.length, h2 = Math.abs(Math.atan2(i2, e2) / (Math.PI / 180));
    let d2 = 0;
    if (d2 = h2 > 45 && h2 < 135 ? a2 ? 0 : i2 : a2 ? e2 : 0, !c2)
      return;
    const u2 = this.option("dragFree");
    let p2 = this.page, f2 = o2 && a2 ? 1 : -1;
    const m2 = t2.target[r2] * f2, g2 = t2.current[r2] * f2;
    let { pageIndex: b2 } = this.getPageFromPosition(m2), { pageIndex: v2 } = this.getPageFromPosition(g2);
    u2 ? this.onChange(b2) : (Math.abs(d2) > 5 ? (l2[p2].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 && (p2 = v2), p2 = o2 && a2 ? d2 < 0 ? p2 - 1 : p2 + 1 : d2 < 0 ? p2 + 1 : p2 - 1) : p2 = 0 === n2 && 0 === s2 ? p2 : v2, this.slideTo(p2, { transition: false, friction: t2.option("decelFriction") }));
  }
  onClick(t2) {
    const e2 = t2.target, i2 = e2 && x(e2) ? e2.dataset : null;
    let n2, s2;
    i2 && (void 0 !== i2.carouselPage ? (s2 = "slideTo", n2 = i2.carouselPage) : void 0 !== i2.carouselNext ? s2 = "slideNext" : void 0 !== i2.carouselPrev && (s2 = "slidePrev")), s2 ? (t2.preventDefault(), t2.stopPropagation(), e2 && !e2.hasAttribute("disabled") && this[s2](n2)) : this.emit("click", t2);
  }
  onSlideTo(t2) {
    const e2 = t2.detail || 0;
    this.slideTo(this.getPageForSlide(e2), { friction: 0 });
  }
  onChange(t2, e2 = 0) {
    const i2 = this.page;
    this.prevPage = i2, this.page = t2, this.option("adaptiveHeight") && this.setViewportHeight(), t2 !== i2 && (this.markSelectedSlides(), this.emit("change", t2, i2, e2));
  }
  onRefresh() {
    let t2 = this.contentDim, e2 = this.viewportDim;
    this.updateMetrics(), this.contentDim === t2 && this.viewportDim === e2 || this.slideTo(this.page, { friction: 0, transition: false });
  }
  onResize() {
    this.option("breakpoints") && this.processOptions();
  }
  onBeforeTransform(t2) {
    this.lp !== t2.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()), this.lp = t2.current.e;
  }
  onEndAnimation() {
    this.inTransition.size || this.emit("settle");
  }
  reInit(t2 = null, e2 = null) {
    this.destroy(), this.state = L.Init, this.userOptions = t2 || this.userOptions, this.userPlugins = e2 || this.userPlugins, this.processOptions();
  }
  slideTo(t2 = 0, { friction: e2 = this.option("friction"), transition: i2 = this.option("transition") } = {}) {
    if (this.state === L.Destroy)
      return;
    const { axis: n2, isHorizontal: s2, isRTL: o2, pages: a2, panzoom: r2 } = this, l2 = a2.length, c2 = o2 && s2 ? 1 : -1;
    if (!r2 || !l2)
      return;
    if (this.transitionTo(t2, i2))
      return;
    const h2 = this.getPageFromIndex(t2);
    let d2 = a2[h2].pos;
    if (this.isInfinite) {
      const e3 = this.contentDim, i3 = r2.target[n2] * c2;
      if (2 === l2)
        d2 += e3 * Math.floor(parseFloat(t2 + "") / 2);
      else {
        const t3 = i3;
        d2 = [d2, d2 - e3, d2 + e3].reduce(function(e4, i4) {
          return Math.abs(i4 - t3) < Math.abs(e4 - t3) ? i4 : e4;
        });
      }
    }
    d2 *= c2, Math.abs(r2.target[n2] - d2) < 0.1 || (r2.panTo({ x: s2 ? d2 : 0, y: s2 ? 0 : d2, friction: e2 }), this.onChange(h2));
  }
  slideToClosest(t2) {
    if (this.panzoom) {
      const { pageIndex: e2 } = this.getPageFromPosition(this.panzoom.current[this.isHorizontal ? "e" : "f"]);
      this.slideTo(e2, t2);
    }
  }
  slideNext() {
    this.slideTo(this.page + 1);
  }
  slidePrev() {
    this.slideTo(this.page - 1);
  }
  clearTransitions() {
    this.inTransition.clear(), S(this.container, this.cn("inTransition"));
    const t2 = ["to-prev", "to-next", "from-prev", "from-next"];
    for (const e2 of this.slides) {
      const i2 = e2.el;
      if (i2) {
        i2.removeEventListener("animationend", this.onAnimationEnd), i2.classList.remove(...t2);
        const n2 = e2.transition;
        n2 && i2.classList.remove(`f-${n2}Out`, `f-${n2}In`);
      }
    }
    this.manageSlideVisiblity();
  }
  prependSlide(t2) {
    var e2, i2;
    let n2 = Array.isArray(t2) ? t2 : [t2];
    for (const t3 of n2.reverse())
      this.slides.unshift(R(t3));
    for (let t3 = 0; t3 < this.slides.length; t3++)
      this.slides[t3].index = t3;
    const s2 = (null === (e2 = this.pages[this.page]) || void 0 === e2 ? void 0 : e2.pos) || 0;
    this.page += n2.length, this.updateMetrics();
    const o2 = (null === (i2 = this.pages[this.page]) || void 0 === i2 ? void 0 : i2.pos) || 0;
    if (this.panzoom) {
      const t3 = this.isRTL ? s2 - o2 : o2 - s2;
      this.panzoom.target.e -= t3, this.panzoom.current.e -= t3, this.panzoom.requestTick();
    }
  }
  appendSlide(t2) {
    let e2 = Array.isArray(t2) ? t2 : [t2];
    for (const t3 of e2) {
      const e3 = R(t3);
      e3.index = this.slides.length, this.slides.push(e3), this.emit("initSlide", t3, this.slides.length);
    }
    this.updateMetrics();
  }
  removeSlide(t2) {
    const e2 = this.slides.length;
    t2 = (t2 % e2 + e2) % e2, this.removeSlideEl(this.slides[t2], true), this.slides.splice(t2, 1);
    for (let t3 = 0; t3 < this.slides.length; t3++)
      this.slides[t3].index = t3;
    this.updateMetrics(), this.slideTo(this.page, { friction: 0, transition: false });
  }
  updateMetrics() {
    const { panzoom: e2, viewport: i2, track: n2, isHorizontal: s2 } = this;
    if (!n2)
      return;
    const o2 = s2 ? "width" : "height", a2 = s2 ? "offsetWidth" : "offsetHeight";
    if (i2) {
      let e3 = Math.max(i2[a2], t(i2.getBoundingClientRect()[o2], 1e3)), n3 = getComputedStyle(i2), r3 = "padding", l3 = s2 ? "Right" : "Bottom";
      e3 -= parseFloat(n3[r3 + (s2 ? "Left" : "Top")]) + parseFloat(n3[r3 + l3]), this.viewportDim = e3;
    }
    let r2, l2 = this.pages.length, c2 = 0;
    for (const [e3, i3] of this.slides.entries()) {
      let n3 = 0, s3 = 0;
      !i3.el && r2 ? (n3 = r2.dim, s3 = r2.gap) : ({ dim: n3, gap: s3 } = this.getSlideMetrics(i3), r2 = i3), n3 = t(n3, 1e3), s3 = t(s3, 1e3), i3.dim = n3, i3.gap = s3, i3.pos = c2, c2 += n3, (this.isInfinite || e3 < this.slides.length - 1) && (c2 += s3);
    }
    const h2 = this.contentDim;
    c2 = t(c2, 1e3), this.contentDim = c2, e2 && (e2.contentRect[o2] = c2, e2.contentRect["e" === this.axis ? "fullWidth" : "fullHeight"] = c2), this.pages = this.createPages(), this.pages = this.processPages(), this.state === L.Init && this.setInitialPage(), this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), e2 && l2 === this.pages.length && Math.abs(c2 - h2) > 0.5 && (e2.target[this.axis] = -1 * this.pages[this.page].pos, e2.current[this.axis] = -1 * this.pages[this.page].pos, e2.stop()), this.manageSlideVisiblity(), this.emit("refresh");
  }
  getProgress(e2, i2 = false) {
    void 0 === e2 && (e2 = this.page);
    const n2 = this, s2 = n2.panzoom, o2 = n2.pages[e2] || 0;
    if (!o2 || !s2)
      return 0;
    let a2 = -1 * s2.current.e, r2 = n2.contentDim;
    var l2 = [t((a2 - o2.pos) / (1 * o2.dim), 1e3), t((a2 + r2 - o2.pos) / (1 * o2.dim), 1e3), t((a2 - r2 - o2.pos) / (1 * o2.dim), 1e3)].reduce(function(t2, e3) {
      return Math.abs(e3) < Math.abs(t2) ? e3 : t2;
    });
    return i2 ? l2 : Math.max(-1, Math.min(1, l2));
  }
  setViewportHeight() {
    const { page: t2, pages: e2, viewport: i2, isHorizontal: n2 } = this;
    if (!i2 || !e2[t2])
      return;
    let s2 = 0;
    n2 && this.track && (this.track.style.height = "auto", e2[t2].slides.forEach((t3) => {
      t3.el && (s2 = Math.max(s2, t3.el.offsetHeight));
    })), i2.style.height = s2 ? `${s2}px` : "";
  }
  getPageForSlide(t2) {
    for (const e2 of this.pages)
      for (const i2 of e2.slides)
        if (i2.index === t2)
          return e2.index;
    return -1;
  }
  getVisibleSlides(t2 = 0) {
    var e2;
    const i2 = /* @__PURE__ */ new Set();
    let { contentDim: n2, viewportDim: s2, pages: o2, page: a2 } = this;
    n2 = n2 + (null === (e2 = this.slides[this.slides.length - 1]) || void 0 === e2 ? void 0 : e2.gap) || 0;
    let r2 = 0;
    r2 = this.panzoom ? -1 * this.panzoom.current[this.axis] : o2[a2] && o2[a2].pos || 0, this.isInfinite && (r2 -= Math.floor(r2 / n2) * n2), this.isRTL && this.isHorizontal && (r2 *= -1);
    const l2 = r2 - s2 * t2, c2 = r2 + s2 * (t2 + 1), h2 = this.isInfinite ? [-1, 0, 1] : [0];
    for (const t3 of this.slides)
      for (const e3 of h2) {
        const s3 = t3.pos + e3 * n2, o3 = t3.pos + t3.dim + t3.gap + e3 * n2;
        s3 < c2 && o3 > l2 && i2.add(t3);
      }
    return i2;
  }
  getPageFromPosition(t2) {
    const { viewportDim: e2, contentDim: i2 } = this, n2 = this.pages.length, s2 = this.slides.length, o2 = this.slides[s2 - 1];
    let a2 = 0, r2 = 0, l2 = 0;
    const c2 = this.option("center");
    c2 && (t2 += 0.5 * e2), this.isInfinite || (t2 = Math.max(this.slides[0].pos, Math.min(t2, o2.pos)));
    const h2 = i2 + o2.gap;
    l2 = Math.floor(t2 / h2) || 0, t2 -= l2 * h2;
    let d2 = o2, u2 = this.slides.find((e3) => {
      const i3 = t2 + (d2 && !c2 ? 0.5 * d2.dim : 0);
      return d2 = e3, e3.pos <= i3 && e3.pos + e3.dim + e3.gap > i3;
    });
    return u2 || (u2 = o2), r2 = this.getPageForSlide(u2.index), a2 = r2 + l2 * n2, { page: a2, pageIndex: r2 };
  }
  destroy() {
    if ([L.Destroy].includes(this.state))
      return;
    this.state = L.Destroy;
    const { container: t2, viewport: e2, track: i2, slides: n2, panzoom: s2 } = this, o2 = this.option("classes");
    t2.removeEventListener("click", this.onClick, { passive: false, capture: false }), t2.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), s2 && (s2.destroy(), this.panzoom = null), n2 && n2.forEach((t3) => {
      this.removeSlideEl(t3);
    }), this.detachPlugins(), e2 && e2.offsetParent && i2 && i2.offsetParent && e2.replaceWith(...i2.childNodes);
    for (const [e3, i3] of Object.entries(o2))
      "container" !== e3 && i3 && t2.classList.remove(i3);
    this.track = null, this.viewport = null, this.page = 0, this.slides = [];
    const a2 = this.events.get("ready");
    this.events = /* @__PURE__ */ new Map(), a2 && this.events.set("ready", a2);
  }
}
Object.defineProperty(_, "Panzoom", { enumerable: true, configurable: true, writable: true, value: T }), Object.defineProperty(_, "defaults", { enumerable: true, configurable: true, writable: true, value: z }), Object.defineProperty(_, "Plugins", { enumerable: true, configurable: true, writable: true, value: B });
const N = function(t2) {
  const e2 = window.pageYOffset, i2 = window.pageYOffset + window.innerHeight;
  if (!x(t2))
    return 0;
  const n2 = t2.getBoundingClientRect(), s2 = n2.y + window.pageYOffset, o2 = n2.y + n2.height + window.pageYOffset;
  if (e2 > o2 || i2 < s2)
    return 0;
  if (e2 < s2 && i2 > o2)
    return 100;
  if (s2 < e2 && o2 > i2)
    return 100;
  let a2 = n2.height;
  s2 < e2 && (a2 -= window.pageYOffset - s2), o2 > i2 && (a2 -= o2 - i2);
  const r2 = a2 / window.innerHeight * 100;
  return Math.round(r2);
}, W = !("undefined" == typeof window || !window.document || !window.document.createElement);
let $;
const X = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'].join(","), Y = (t2) => {
  if (t2 && W) {
    void 0 === $ && document.createElement("div").focus({ get preventScroll() {
      return $ = true, false;
    } });
    try {
      if ($)
        t2.focus({ preventScroll: true });
      else {
        const e2 = window.pageXOffset || document.body.scrollTop, i2 = window.pageYOffset || document.body.scrollLeft;
        t2.focus(), document.body.scrollTo({ top: e2, left: i2, behavior: "auto" });
      }
    } catch (t3) {
    }
  }
}, q = { dragToClose: true, hideScrollbar: true, Carousel: { classes: { container: "fancybox__carousel", viewport: "fancybox__viewport", track: "fancybox__track", slide: "fancybox__slide" } }, contentClick: "toggleZoom", contentDblClick: false, backdropClick: "close", animated: true, idle: 3500, showClass: "f-zoomInUp", hideClass: "f-fadeOut", commonCaption: false, parentEl: null, startIndex: 0, l10n: Object.assign(Object.assign({}, v), { CLOSE: "Close", NEXT: "Next", PREV: "Previous", MODAL: "You can close this modal content with the ESC key", ERROR: "Something Went Wrong, Please Try Again Later", IMAGE_ERROR: "Image Not Found", ELEMENT_NOT_FOUND: "HTML Element Not Found", AJAX_NOT_FOUND: "Error Loading AJAX : Not Found", AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden", IFRAME_ERROR: "Error Loading Page", TOGGLE_ZOOM: "Toggle zoom level", TOGGLE_THUMBS: "Toggle thumbnails", TOGGLE_SLIDESHOW: "Toggle slideshow", TOGGLE_FULLSCREEN: "Toggle full-screen mode", DOWNLOAD: "Download" }), tpl: { closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>', main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>' }, groupAll: false, groupAttr: "data-fancybox", defaultType: "image", defaultDisplay: "block", autoFocus: true, trapFocus: true, placeFocusBack: true, closeButton: "auto", keyboard: { Escape: "close", Delete: "close", Backspace: "close", PageUp: "next", PageDown: "prev", ArrowUp: "prev", ArrowDown: "next", ArrowRight: "next", ArrowLeft: "prev" }, Fullscreen: { autoStart: false }, compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches, wheel: "zoom" };
var V, Z;
!function(t2) {
  t2[t2.Init = 0] = "Init", t2[t2.Ready = 1] = "Ready", t2[t2.Closing = 2] = "Closing", t2[t2.CustomClosing = 3] = "CustomClosing", t2[t2.Destroy = 4] = "Destroy";
}(V || (V = {})), function(t2) {
  t2[t2.Loading = 0] = "Loading", t2[t2.Opening = 1] = "Opening", t2[t2.Ready = 2] = "Ready", t2[t2.Closing = 3] = "Closing";
}(Z || (Z = {}));
const G = () => {
  queueMicrotask(() => {
    (() => {
      const { slug: t2, index: e2 } = U.parseURL(), i2 = xt.getInstance();
      if (i2 && false !== i2.option("Hash")) {
        const n2 = i2.carousel;
        if (t2 && n2) {
          for (let e3 of n2.slides)
            if (e3.slug && e3.slug === t2)
              return n2.slideTo(e3.index);
          if (t2 === i2.option("slug"))
            return n2.slideTo(e2 - 1);
          const s2 = i2.getSlide(), o2 = s2 && s2.triggerEl && s2.triggerEl.dataset;
          if (o2 && o2.fancybox === t2)
            return n2.slideTo(e2 - 1);
        }
        U.hasSilentClose = true, i2.close();
      }
      U.startFromUrl();
    })();
  });
};
class U extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "origHash", { enumerable: true, configurable: true, writable: true, value: "" }), Object.defineProperty(this, "timer", { enumerable: true, configurable: true, writable: true, value: null });
  }
  onChange() {
    const t2 = this.instance, e2 = t2.carousel;
    this.timer && clearTimeout(this.timer);
    const i2 = t2.getSlide();
    if (!e2 || !i2)
      return;
    const n2 = t2.isOpeningSlide(i2), s2 = new URL(document.URL).hash;
    let o2, a2 = i2.slug || void 0, r2 = i2.triggerEl || void 0;
    o2 = a2 || this.instance.option("slug"), !o2 && r2 && r2.dataset && (o2 = r2.dataset.fancybox);
    let l2 = "";
    o2 && "true" !== o2 && (l2 = "#" + o2 + (!a2 && e2.slides.length > 1 ? "-" + (i2.index + 1) : "")), n2 && (this.origHash = s2 !== l2 ? s2 : ""), l2 && s2 !== l2 && (this.timer = setTimeout(() => {
      try {
        t2.state === V.Ready && window.history[n2 ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + l2);
      } catch (t3) {
      }
    }, 300));
  }
  onClose() {
    if (this.timer && clearTimeout(this.timer), true !== U.hasSilentClose)
      try {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (this.origHash || ""));
      } catch (t2) {
      }
  }
  attach() {
    const t2 = this.instance;
    t2.on("Carousel.ready", this.onChange), t2.on("Carousel.change", this.onChange), t2.on("close", this.onClose);
  }
  detach() {
    const t2 = this.instance;
    t2.off("Carousel.ready", this.onChange), t2.off("Carousel.change", this.onChange), t2.off("close", this.onClose);
  }
  static parseURL() {
    const t2 = window.location.hash.slice(1), e2 = t2.split("-"), i2 = e2[e2.length - 1], n2 = i2 && /^\+?\d+$/.test(i2) && parseInt(e2.pop() || "1", 10) || 1;
    return { hash: t2, slug: e2.join("-"), index: n2 };
  }
  static startFromUrl() {
    if (U.hasSilentClose = false, xt.getInstance() || false === xt.defaults.Hash)
      return;
    const { hash: t2, slug: e2, index: i2 } = U.parseURL();
    if (!e2)
      return;
    let n2 = document.querySelector(`[data-slug="${t2}"]`);
    if (n2 && n2.dispatchEvent(new CustomEvent("click", { bubbles: true, cancelable: true })), xt.getInstance())
      return;
    const s2 = document.querySelectorAll(`[data-fancybox="${e2}"]`);
    s2.length && (n2 = s2[i2 - 1], n2 && n2.dispatchEvent(new CustomEvent("click", { bubbles: true, cancelable: true })));
  }
  static destroy() {
    window.removeEventListener("hashchange", G, false);
  }
}
function K() {
  window.addEventListener("hashchange", G, false), setTimeout(() => {
    U.startFromUrl();
  }, 500);
}
Object.defineProperty(U, "defaults", { enumerable: true, configurable: true, writable: true, value: {} }), Object.defineProperty(U, "hasSilentClose", { enumerable: true, configurable: true, writable: true, value: false }), W && (/complete|interactive|loaded/.test(document.readyState) ? K() : document.addEventListener("DOMContentLoaded", K));
class J extends I {
  onCreateSlide(t2, e2, i2) {
    const n2 = this.instance.optionFor(i2, "src") || "";
    i2.el && "image" === i2.type && "string" == typeof n2 && this.setImage(i2, n2);
  }
  onRemoveSlide(t2, e2, i2) {
    i2.panzoom && i2.panzoom.destroy(), i2.panzoom = void 0, i2.imageEl = void 0;
  }
  onChange(t2, e2, i2, n2) {
    for (const t3 of e2.slides) {
      const e3 = t3.panzoom;
      e3 && t3.index !== i2 && e3.reset(0.35);
    }
  }
  onClose() {
    var t2;
    const e2 = this.instance, i2 = e2.container, n2 = e2.getSlide();
    if (!i2 || !i2.parentElement || !n2)
      return;
    const { el: s2, contentEl: o2, panzoom: a2 } = n2, r2 = n2.thumbElSrc;
    if (!s2 || !r2 || !o2 || !a2 || a2.isContentLoading || a2.state === g.Init || a2.state === g.Destroy)
      return;
    a2.updateMetrics();
    let l2 = this.getZoomInfo(n2);
    if (!l2)
      return;
    this.instance.state = V.CustomClosing, i2.classList.remove("is-zooming-in"), i2.classList.add("is-zooming-out"), o2.style.backgroundImage = `url('${r2}')`;
    const c2 = i2.getBoundingClientRect();
    1 === ((null === (t2 = window.visualViewport) || void 0 === t2 ? void 0 : t2.scale) || 1) && Object.assign(i2.style, { position: "absolute", top: `${window.pageYOffset}px`, left: `${window.pageXOffset}px`, bottom: "auto", right: "auto", width: `${c2.width}px`, height: `${c2.height}px`, overflow: "hidden" });
    const { x: h2, y: d2, scale: u2, opacity: p2 } = l2;
    if (p2) {
      const t3 = ((t4, e3, i3, n3) => {
        const s3 = e3 - t4, o3 = n3 - i3;
        return (e4) => i3 + ((e4 - t4) / s3 * o3 || 0);
      })(a2.scale, u2, 1, 0);
      a2.on("afterTransform", () => {
        o2.style.opacity = t3(a2.scale) + "";
      });
    }
    a2.on("endAnimation", () => {
      e2.destroy();
    }), a2.target.a = u2, a2.target.b = 0, a2.target.c = 0, a2.target.d = u2, a2.panTo({ x: h2, y: d2, scale: u2, friction: p2 ? 0.2 : 0.33, ignoreBounds: true }), a2.isResting && e2.destroy();
  }
  setImage(t2, e2) {
    const i2 = this.instance;
    t2.src = e2, this.process(t2, e2).then((e3) => {
      var n2;
      const s2 = t2.contentEl, o2 = t2.imageEl, a2 = t2.thumbElSrc;
      if (i2.isClosing() || !s2 || !o2)
        return;
      s2.offsetHeight;
      const r2 = !!i2.isOpeningSlide(t2) && this.getZoomInfo(t2);
      if (this.option("protected")) {
        null === (n2 = t2.el) || void 0 === n2 || n2.addEventListener("contextmenu", (t3) => {
          t3.preventDefault();
        });
        const e4 = document.createElement("div");
        E(e4, "fancybox-protected"), s2.appendChild(e4);
      }
      if (a2 && r2) {
        const n3 = e3.contentRect, o3 = Math.max(n3.fullWidth, n3.fullHeight);
        let c2 = null;
        !r2.opacity && o3 > 1200 && (c2 = document.createElement("img"), E(c2, "fancybox-ghost"), c2.src = a2, s2.appendChild(c2));
        const h2 = () => {
          c2 && (E(c2, "f-fadeFastOut"), setTimeout(() => {
            c2 && (c2.remove(), c2 = null);
          }, 200));
        };
        (l2 = a2, new Promise((t3, e4) => {
          const i3 = new Image();
          i3.onload = t3, i3.onerror = e4, i3.src = l2;
        })).then(() => {
          t2.state = Z.Opening, this.instance.emit("reveal", t2), this.zoomIn(t2).then(() => {
            h2(), this.instance.done(t2);
          }, () => {
            i2.hideLoading(t2);
          }), c2 && setTimeout(() => {
            h2();
          }, o3 > 2500 ? 800 : 200);
        }, () => {
          i2.hideLoading(t2), i2.revealContent(t2);
        });
      } else {
        const n3 = this.optionFor(t2, "initialSize"), s3 = this.optionFor(t2, "zoom"), o3 = { event: i2.prevMouseMoveEvent || i2.options.event, friction: s3 ? 0.12 : 0 };
        let a3 = i2.optionFor(t2, "showClass") || void 0, r3 = true;
        i2.isOpeningSlide(t2) && ("full" === n3 ? e3.zoomToFull(o3) : "cover" === n3 ? e3.zoomToCover(o3) : "max" === n3 ? e3.zoomToMax(o3) : r3 = false, e3.stop("current")), r3 && a3 && (a3 = e3.isDragging ? "f-fadeIn" : ""), i2.revealContent(t2, a3);
      }
      var l2;
    }, () => {
      i2.setError(t2, "{{IMAGE_ERROR}}");
    });
  }
  process(t2, e2) {
    return new Promise((i2, s2) => {
      var o2, a2;
      const r2 = this.instance, l2 = t2.el;
      r2.clearContent(t2), r2.showLoading(t2);
      let c2 = this.optionFor(t2, "content");
      "string" == typeof c2 && (c2 = n(c2)), c2 && x(c2) || (c2 = document.createElement("img"), c2 instanceof HTMLImageElement && (c2.src = e2 || "", c2.alt = (null === (o2 = t2.caption) || void 0 === o2 ? void 0 : o2.replace(/<[^>]+>/gi, "").substring(0, 1e3)) || `Image ${t2.index + 1} of ${null === (a2 = r2.carousel) || void 0 === a2 ? void 0 : a2.pages.length}`, c2.draggable = false, t2.srcset && c2.setAttribute("srcset", t2.srcset)), t2.sizes && c2.setAttribute("sizes", t2.sizes)), c2.classList.add("fancybox-image"), t2.imageEl = c2, r2.setContent(t2, c2, false);
      t2.panzoom = new T(l2, u({}, this.option("Panzoom") || {}, { content: c2, width: r2.optionFor(t2, "width", "auto"), height: r2.optionFor(t2, "height", "auto"), wheel: () => {
        const t3 = r2.option("wheel");
        return ("zoom" === t3 || "pan" == t3) && t3;
      }, click: (e3, i3) => {
        var n2, s3;
        if (r2.isCompact || r2.isClosing())
          return false;
        if (t2.index !== (null === (n2 = r2.getSlide()) || void 0 === n2 ? void 0 : n2.index))
          return false;
        let o3 = !i3 || i3.target && (null === (s3 = t2.contentEl) || void 0 === s3 ? void 0 : s3.contains(i3.target));
        return r2.option(o3 ? "contentClick" : "backdropClick") || false;
      }, dblClick: () => r2.isCompact ? "toggleZoom" : r2.option("contentDblClick") || false, spinner: false, panOnlyZoomed: true, wheelLimit: 1 / 0, transformParent: true, on: { ready: (t3) => {
        i2(t3);
      }, error: () => {
        s2();
      }, destroy: () => {
        s2();
      } } }));
    });
  }
  zoomIn(t2) {
    return new Promise((e2, i2) => {
      const n2 = this.instance, s2 = n2.container, { panzoom: o2, contentEl: a2, el: r2 } = t2;
      o2 && o2.updateMetrics();
      const l2 = this.getZoomInfo(t2);
      if (!(l2 && r2 && a2 && o2 && s2))
        return void i2();
      const { x: c2, y: h2, scale: d2, opacity: u2 } = l2, p2 = () => {
        t2.state !== Z.Closing && (u2 && (a2.style.opacity = Math.max(Math.min(1, 1 - (1 - o2.scale) / (1 - d2)), 0) + ""), o2.scale >= 1 && o2.scale > o2.targetScale - 0.1 && e2(o2));
      }, f2 = (t3) => {
        S(s2, "is-zooming-in"), t3.scale < 0.99 || t3.scale > 1.01 || (a2.style.opacity = "", t3.off("endAnimation", f2), t3.off("touchStart", f2), t3.off("afterTransform", p2), e2(t3));
      };
      o2.on("endAnimation", f2), o2.on("touchStart", f2), o2.on("afterTransform", p2), o2.on(["error", "destroy"], () => {
        i2();
      }), o2.panTo({ x: c2, y: h2, scale: d2, friction: 0, ignoreBounds: true }), o2.stop("current");
      const m2 = { event: "mousemove" === o2.panMode ? n2.prevMouseMoveEvent || n2.options.event : void 0 }, g2 = this.optionFor(t2, "initialSize");
      E(s2, "is-zooming-in"), n2.hideLoading(t2), "full" === g2 ? o2.zoomToFull(m2) : "cover" === g2 ? o2.zoomToCover(m2) : "max" === g2 ? o2.zoomToMax(m2) : o2.reset(0.172);
    });
  }
  getZoomInfo(t2) {
    var e2;
    const { el: i2, imageEl: n2, thumbEl: s2, panzoom: o2 } = t2;
    if (!i2 || !n2 || !s2 || !o2 || N(s2) < 3 || !this.optionFor(t2, "zoom") || this.instance.state === V.Destroy)
      return false;
    if (1 !== ((null === (e2 = window.visualViewport) || void 0 === e2 ? void 0 : e2.scale) || 1))
      return false;
    let { top: a2, left: r2, width: l2, height: c2 } = s2.getBoundingClientRect(), { top: h2, left: d2, fitWidth: u2, fitHeight: p2 } = o2.contentRect;
    if (!(l2 && c2 && u2 && p2))
      return false;
    const f2 = o2.container.getBoundingClientRect();
    d2 += f2.left, h2 += f2.top;
    const m2 = -1 * (d2 + 0.5 * u2 - (r2 + 0.5 * l2)), g2 = -1 * (h2 + 0.5 * p2 - (a2 + 0.5 * c2)), b2 = l2 / u2;
    let v2 = this.option("zoomOpacity") || false;
    return "auto" === v2 && (v2 = Math.abs(l2 / c2 - u2 / p2) > 0.1), { x: m2, y: g2, scale: b2, opacity: v2 };
  }
  attach() {
    const t2 = this, e2 = t2.instance;
    e2.on("Carousel.change", t2.onChange), e2.on("Carousel.createSlide", t2.onCreateSlide), e2.on("Carousel.removeSlide", t2.onRemoveSlide), e2.on("close", t2.onClose);
  }
  detach() {
    const t2 = this, e2 = t2.instance;
    e2.off("Carousel.change", t2.onChange), e2.off("Carousel.createSlide", t2.onCreateSlide), e2.off("Carousel.removeSlide", t2.onRemoveSlide), e2.off("close", t2.onClose);
  }
}
Object.defineProperty(J, "defaults", { enumerable: true, configurable: true, writable: true, value: { initialSize: "fit", Panzoom: { maxScale: 1 }, protected: false, zoom: true, zoomOpacity: "auto" } });
const Q = (t2, e2 = {}) => {
  const i2 = new URL(t2), n2 = new URLSearchParams(i2.search), s2 = new URLSearchParams();
  for (const [t3, i3] of [...n2, ...Object.entries(e2)]) {
    let e3 = i3.toString();
    "t" === t3 ? s2.set("start", parseInt(e3).toString()) : s2.set(t3, e3);
  }
  let o2 = s2.toString(), a2 = t2.match(/#t=((.*)?\d+s)/);
  return a2 && (o2 += `#t=${a2[1]}`), o2;
}, tt = { ajax: null, autoSize: true, iframeAttr: { allow: "autoplay; fullscreen", scrolling: "auto" }, preload: true, videoAutoplay: true, videoRatio: 16 / 9, videoTpl: `<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">
  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn't support embedded videos.</video>`, videoFormat: "", vimeo: { byline: 1, color: "00adef", controls: 1, dnt: 1, muted: 0 }, youtube: { controls: 1, enablejsapi: 1, nocookie: 1, rel: 0, fs: 1 } }, et = ["image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo", "video"];
class it extends I {
  onInitSlide(t2, e2, i2) {
    this.processType(i2);
  }
  onCreateSlide(t2, e2, i2) {
    this.setContent(i2);
  }
  onRemoveSlide(t2, e2, i2) {
    i2.xhr && (i2.xhr.abort(), i2.xhr = null);
    const n2 = i2.iframeEl;
    n2 && (n2.onload = n2.onerror = null, n2.src = "//about:blank", i2.iframeEl = null);
    const s2 = i2.contentEl, o2 = i2.placeholderEl;
    if ("inline" === i2.type && s2 && o2)
      s2.classList.remove("fancybox__content"), "none" !== s2.style.display && (s2.style.display = "none"), o2.parentNode && o2.parentNode.insertBefore(s2, o2), o2.remove(), i2.contentEl = void 0, i2.placeholderEl = void 0;
    else
      for (; i2.el && i2.el.firstChild; )
        i2.el.removeChild(i2.el.firstChild);
  }
  onSelectSlide(t2, e2, i2) {
    i2.state === Z.Ready && this.playVideo();
  }
  onUnselectSlide(t2, e2, i2) {
    var n2, s2;
    if ("html5video" === i2.type) {
      try {
        null === (s2 = null === (n2 = i2.el) || void 0 === n2 ? void 0 : n2.querySelector("video")) || void 0 === s2 || s2.pause();
      } catch (t3) {
      }
      return;
    }
    let o2;
    "vimeo" === i2.type ? o2 = { method: "pause", value: "true" } : "youtube" === i2.type && (o2 = { event: "command", func: "pauseVideo" }), o2 && i2.iframeEl && i2.iframeEl.contentWindow && i2.iframeEl.contentWindow.postMessage(JSON.stringify(o2), "*"), i2.poller && clearTimeout(i2.poller);
  }
  onDone(t2, e2) {
    t2.isCurrentSlide(e2) && !t2.isClosing() && this.playVideo();
  }
  onRefresh(t2, e2) {
    e2.slides.forEach((t3) => {
      t3.el && (this.setAspectRatio(t3), this.resizeIframe(t3));
    });
  }
  onMessage(t2) {
    try {
      let e2 = JSON.parse(t2.data);
      if ("https://player.vimeo.com" === t2.origin) {
        if ("ready" === e2.event)
          for (let e3 of Array.from(document.getElementsByClassName("fancybox__iframe")))
            e3 instanceof HTMLIFrameElement && e3.contentWindow === t2.source && (e3.dataset.ready = "true");
      } else if (t2.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === e2.event) {
        const t3 = document.getElementById(e2.id);
        t3 && (t3.dataset.ready = "true");
      }
    } catch (t3) {
    }
  }
  loadAjaxContent(t2) {
    const e2 = this.instance.optionFor(t2, "src") || "";
    this.instance.showLoading(t2);
    const i2 = this.instance, n2 = new XMLHttpRequest();
    i2.showLoading(t2), n2.onreadystatechange = function() {
      n2.readyState === XMLHttpRequest.DONE && i2.state === V.Ready && (i2.hideLoading(t2), 200 === n2.status ? i2.setContent(t2, n2.responseText) : i2.setError(t2, 404 === n2.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"));
    };
    const s2 = t2.ajax || null;
    n2.open(s2 ? "POST" : "GET", e2 + ""), n2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n2.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n2.send(s2), t2.xhr = n2;
  }
  setInlineContent(t2) {
    let e2 = null;
    if (x(t2.src))
      e2 = t2.src;
    else if ("string" == typeof t2.src) {
      const i2 = t2.src.split("#", 2).pop();
      e2 = i2 ? document.getElementById(i2) : null;
    }
    if (e2) {
      if ("clone" === t2.type || e2.closest(".fancybox__slide")) {
        e2 = e2.cloneNode(true);
        const i2 = e2.dataset.animationName;
        i2 && (e2.classList.remove(i2), delete e2.dataset.animationName);
        let n2 = e2.getAttribute("id");
        n2 = n2 ? `${n2}--clone` : `clone-${this.instance.id}-${t2.index}`, e2.setAttribute("id", n2);
      } else if (e2.parentNode) {
        const i2 = document.createElement("div");
        i2.classList.add("fancybox-placeholder"), e2.parentNode.insertBefore(i2, e2), t2.placeholderEl = i2;
      }
      this.instance.setContent(t2, e2);
    } else
      this.instance.setError(t2, "{{ELEMENT_NOT_FOUND}}");
  }
  setIframeContent(t2) {
    const { src: e2, el: i2 } = t2;
    if (!e2 || "string" != typeof e2 || !i2)
      return;
    const n2 = this.instance, s2 = document.createElement("iframe");
    s2.className = "fancybox__iframe", s2.setAttribute("id", `fancybox__iframe_${n2.id}_${t2.index}`);
    for (const [e3, i3] of Object.entries(this.optionFor(t2, "iframeAttr") || {}))
      s2.setAttribute(e3, i3);
    s2.onerror = () => {
      n2.setError(t2, "{{IFRAME_ERROR}}");
    }, t2.iframeEl = s2;
    const o2 = this.optionFor(t2, "preload");
    if (i2.classList.add("is-loading"), "iframe" !== t2.type || false === o2)
      return s2.setAttribute("src", t2.src + ""), this.resizeIframe(t2), void n2.setContent(t2, s2);
    n2.showLoading(t2), s2.onload = () => {
      if (!s2.src.length)
        return;
      const e3 = "true" !== s2.dataset.ready;
      s2.dataset.ready = "true", this.resizeIframe(t2), e3 ? n2.revealContent(t2) : n2.hideLoading(t2);
    }, s2.setAttribute("src", e2), n2.setContent(t2, s2, false);
  }
  resizeIframe(t2) {
    const e2 = t2.iframeEl, i2 = null == e2 ? void 0 : e2.parentElement;
    if (!e2 || !i2)
      return;
    let n2 = t2.autoSize, s2 = t2.width || 0, o2 = t2.height || 0;
    s2 && o2 && (n2 = false);
    const a2 = i2 && i2.style;
    if (false !== t2.preload && false !== n2 && a2)
      try {
        const t3 = window.getComputedStyle(i2), n3 = parseFloat(t3.paddingLeft) + parseFloat(t3.paddingRight), r2 = parseFloat(t3.paddingTop) + parseFloat(t3.paddingBottom), l2 = e2.contentWindow;
        if (l2) {
          const t4 = l2.document, e3 = t4.getElementsByTagName("html")[0], i3 = t4.body;
          a2.width = "", i3.style.overflow = "hidden", s2 = s2 || e3.scrollWidth + n3, a2.width = `${s2}px`, i3.style.overflow = "", a2.flex = "0 0 auto", a2.height = `${i3.scrollHeight}px`, o2 = e3.scrollHeight + r2;
        }
      } catch (t3) {
      }
    if (s2 || o2) {
      const t3 = { flex: "0 1 auto", width: "", height: "" };
      s2 && (t3.width = `${s2}px`), o2 && (t3.height = `${o2}px`), Object.assign(a2, t3);
    }
  }
  playVideo() {
    const t2 = this.instance.getSlide();
    if (!t2)
      return;
    const { el: e2 } = t2;
    if (!e2 || !e2.offsetParent)
      return;
    if (!this.optionFor(t2, "videoAutoplay"))
      return;
    if ("html5video" === t2.type)
      try {
        const t3 = e2.querySelector("video");
        if (t3) {
          const e3 = t3.play();
          void 0 !== e3 && e3.then(() => {
          }).catch((e4) => {
            t3.muted = true, t3.play();
          });
        }
      } catch (t3) {
      }
    if ("youtube" !== t2.type && "vimeo" !== t2.type)
      return;
    const i2 = () => {
      if (t2.iframeEl && t2.iframeEl.contentWindow) {
        let e3;
        if ("true" === t2.iframeEl.dataset.ready)
          return e3 = "youtube" === t2.type ? { event: "command", func: "playVideo" } : { method: "play", value: "true" }, e3 && t2.iframeEl.contentWindow.postMessage(JSON.stringify(e3), "*"), void (t2.poller = void 0);
        "youtube" === t2.type && (e3 = { event: "listening", id: t2.iframeEl.getAttribute("id") }, t2.iframeEl.contentWindow.postMessage(JSON.stringify(e3), "*"));
      }
      t2.poller = setTimeout(i2, 250);
    };
    i2();
  }
  processType(t2) {
    if (t2.html)
      return t2.type = "html", t2.src = t2.html, void (t2.html = "");
    const e2 = this.instance.optionFor(t2, "src", "");
    if (!e2 || "string" != typeof e2)
      return;
    let i2 = t2.type, n2 = null;
    if (n2 = e2.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
      const s2 = this.optionFor(t2, "youtube"), { nocookie: o2 } = s2, a2 = function(t3, e3) {
        var i3 = {};
        for (var n3 in t3)
          Object.prototype.hasOwnProperty.call(t3, n3) && e3.indexOf(n3) < 0 && (i3[n3] = t3[n3]);
        if (null != t3 && "function" == typeof Object.getOwnPropertySymbols) {
          var s3 = 0;
          for (n3 = Object.getOwnPropertySymbols(t3); s3 < n3.length; s3++)
            e3.indexOf(n3[s3]) < 0 && Object.prototype.propertyIsEnumerable.call(t3, n3[s3]) && (i3[n3[s3]] = t3[n3[s3]]);
        }
        return i3;
      }(s2, ["nocookie"]), r2 = `www.youtube${o2 ? "-nocookie" : ""}.com`, l2 = Q(e2, a2), c2 = encodeURIComponent(n2[2]);
      t2.videoId = c2, t2.src = `https://${r2}/embed/${c2}?${l2}`, t2.thumbSrc = t2.thumbSrc || `https://i.ytimg.com/vi/${c2}/mqdefault.jpg`, i2 = "youtube";
    } else if (n2 = e2.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
      const s2 = Q(e2, this.optionFor(t2, "vimeo")), o2 = encodeURIComponent(n2[1]), a2 = n2[4] || "";
      t2.videoId = o2, t2.src = `https://player.vimeo.com/video/${o2}?${a2 ? `h=${a2}${s2 ? "&" : ""}` : ""}${s2}`, i2 = "vimeo";
    }
    if (!i2 && t2.triggerEl) {
      const e3 = t2.triggerEl.dataset.type;
      et.includes(e3) && (i2 = e3);
    }
    i2 || "string" == typeof e2 && ("#" === e2.charAt(0) ? i2 = "inline" : (n2 = e2.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i2 = "html5video", t2.videoFormat = t2.videoFormat || "video/" + ("ogv" === n2[1] ? "ogg" : n2[1])) : e2.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i2 = "image" : e2.match(/\.(pdf)((\?|#).*)?$/i) ? i2 = "pdf" : (n2 = e2.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t2.src = `https://maps.google.${n2[1]}/?ll=${(n2[2] ? n2[2] + "&z=" + Math.floor(parseFloat(n2[3])) + (n2[4] ? n2[4].replace(/^\//, "&") : "") : n2[4] + "").replace(/\?/, "&")}&output=${n2[4] && n2[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, i2 = "map") : (n2 = e2.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t2.src = `https://maps.google.${n2[1]}/maps?q=${n2[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, i2 = "map")), i2 = i2 || this.instance.option("defaultType"), t2.type = i2, "image" === i2 && (t2.thumbSrc = t2.thumbSrc || t2.src);
  }
  setContent(t2) {
    const e2 = this.instance.optionFor(t2, "src") || "";
    if (t2 && t2.type && e2) {
      switch (t2.type) {
        case "html":
          this.instance.setContent(t2, e2);
          break;
        case "html5video":
          const i2 = this.option("videoTpl");
          i2 && this.instance.setContent(t2, i2.replace(/\{\{src\}\}/gi, e2 + "").replace(/\{\{format\}\}/gi, this.optionFor(t2, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t2.poster || t2.thumbSrc || ""));
          break;
        case "inline":
        case "clone":
          this.setInlineContent(t2);
          break;
        case "ajax":
          this.loadAjaxContent(t2);
          break;
        case "pdf":
        case "map":
        case "youtube":
        case "vimeo":
          t2.preload = false;
        case "iframe":
          this.setIframeContent(t2);
      }
      this.setAspectRatio(t2);
    }
  }
  setAspectRatio(t2) {
    var e2;
    const i2 = t2.contentEl, n2 = this.optionFor(t2, "videoRatio"), s2 = null === (e2 = t2.el) || void 0 === e2 ? void 0 : e2.getBoundingClientRect();
    if (!(i2 && s2 && n2 && 1 !== n2 && t2.type && ["video", "youtube", "vimeo", "html5video"].includes(t2.type)))
      return;
    const o2 = s2.width, a2 = s2.height;
    i2.style.aspectRatio = n2 + "", i2.style.width = o2 / a2 > n2 ? "auto" : "", i2.style.height = o2 / a2 > n2 ? "" : "auto";
  }
  attach() {
    const t2 = this, e2 = t2.instance;
    e2.on("Carousel.initSlide", t2.onInitSlide), e2.on("Carousel.createSlide", t2.onCreateSlide), e2.on("Carousel.removeSlide", t2.onRemoveSlide), e2.on("Carousel.selectSlide", t2.onSelectSlide), e2.on("Carousel.unselectSlide", t2.onUnselectSlide), e2.on("Carousel.Panzoom.refresh", t2.onRefresh), e2.on("done", t2.onDone), window.addEventListener("message", t2.onMessage);
  }
  detach() {
    const t2 = this, e2 = t2.instance;
    e2.off("Carousel.initSlide", t2.onInitSlide), e2.off("Carousel.createSlide", t2.onCreateSlide), e2.off("Carousel.removeSlide", t2.onRemoveSlide), e2.off("Carousel.selectSlide", t2.onSelectSlide), e2.off("Carousel.unselectSlide", t2.onUnselectSlide), e2.off("Carousel.Panzoom.refresh", t2.onRefresh), e2.off("done", t2.onDone), window.removeEventListener("message", t2.onMessage);
  }
}
Object.defineProperty(it, "defaults", { enumerable: true, configurable: true, writable: true, value: tt });
class nt extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "state", { enumerable: true, configurable: true, writable: true, value: "ready" }), Object.defineProperty(this, "inHover", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "timer", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "progressBar", { enumerable: true, configurable: true, writable: true, value: null });
  }
  get isActive() {
    return "ready" !== this.state;
  }
  onReady(t2) {
    this.option("autoStart") && (t2.isInfinite || t2.page < t2.pages.length - 1) && this.start();
  }
  onChange() {
    var t2;
    (null === (t2 = this.instance.panzoom) || void 0 === t2 ? void 0 : t2.isResting) || (this.removeProgressBar(), this.pause());
  }
  onSettle() {
    this.resume();
  }
  onVisibilityChange() {
    "visible" === document.visibilityState ? this.resume() : this.pause();
  }
  onMouseEnter() {
    this.inHover = true, this.pause();
  }
  onMouseLeave() {
    var t2;
    this.inHover = false, (null === (t2 = this.instance.panzoom) || void 0 === t2 ? void 0 : t2.isResting) && this.resume();
  }
  onTimerEnd() {
    const t2 = this.instance;
    "play" === this.state && (t2.isInfinite || t2.page !== t2.pages.length - 1 ? t2.slideNext() : t2.slideTo(0));
  }
  removeProgressBar() {
    this.progressBar && (this.progressBar.remove(), this.progressBar = null);
  }
  createProgressBar() {
    var t2;
    if (!this.option("showProgress"))
      return null;
    this.removeProgressBar();
    const e2 = this.instance, i2 = (null === (t2 = e2.pages[e2.page]) || void 0 === t2 ? void 0 : t2.slides) || [];
    let n2 = this.option("progressParentEl");
    if (n2 || (n2 = (1 === i2.length ? i2[0].el : null) || e2.viewport), !n2)
      return null;
    const s2 = document.createElement("div");
    return E(s2, "f-progress"), n2.prepend(s2), this.progressBar = s2, s2.offsetHeight, s2;
  }
  set() {
    const t2 = this, e2 = t2.instance;
    if (e2.pages.length < 2)
      return;
    if (t2.timer)
      return;
    const i2 = t2.option("timeout");
    t2.state = "play", E(e2.container, "has-autoplay");
    let n2 = t2.createProgressBar();
    n2 && (n2.style.transitionDuration = `${i2}ms`, n2.style.transform = "scaleX(1)"), t2.timer = setTimeout(() => {
      t2.timer = null, t2.inHover || t2.onTimerEnd();
    }, i2), t2.emit("set");
  }
  clear() {
    const t2 = this;
    t2.timer && (clearTimeout(t2.timer), t2.timer = null), t2.removeProgressBar();
  }
  start() {
    const t2 = this;
    if (t2.set(), "ready" !== t2.state) {
      if (t2.option("pauseOnHover")) {
        const e2 = t2.instance.container;
        e2.addEventListener("mouseenter", t2.onMouseEnter, false), e2.addEventListener("mouseleave", t2.onMouseLeave, false);
      }
      document.addEventListener("visibilitychange", t2.onVisibilityChange, false), t2.emit("start");
    }
  }
  stop() {
    const t2 = this, e2 = t2.state, i2 = t2.instance.container;
    t2.clear(), t2.state = "ready", i2.removeEventListener("mouseenter", t2.onMouseEnter, false), i2.removeEventListener("mouseleave", t2.onMouseLeave, false), document.removeEventListener("visibilitychange", t2.onVisibilityChange, false), S(i2, "has-autoplay"), "ready" !== e2 && t2.emit("stop");
  }
  pause() {
    const t2 = this;
    "play" === t2.state && (t2.state = "pause", t2.clear(), t2.emit("pause"));
  }
  resume() {
    const t2 = this, e2 = t2.instance;
    if (e2.isInfinite || e2.page !== e2.pages.length - 1)
      if ("play" !== t2.state) {
        if ("pause" === t2.state && !t2.inHover) {
          const e3 = new Event("resume", { bubbles: true, cancelable: true });
          t2.emit("resume", e3), e3.defaultPrevented || t2.set();
        }
      } else
        t2.set();
    else
      t2.stop();
  }
  toggle() {
    "play" === this.state || "pause" === this.state ? this.stop() : this.start();
  }
  attach() {
    const t2 = this, e2 = t2.instance;
    e2.on("ready", t2.onReady), e2.on("Panzoom.startAnimation", t2.onChange), e2.on("Panzoom.endAnimation", t2.onSettle), e2.on("Panzoom.touchMove", t2.onChange);
  }
  detach() {
    const t2 = this, e2 = t2.instance;
    e2.off("ready", t2.onReady), e2.off("Panzoom.startAnimation", t2.onChange), e2.off("Panzoom.endAnimation", t2.onSettle), e2.off("Panzoom.touchMove", t2.onChange), t2.stop();
  }
}
Object.defineProperty(nt, "defaults", { enumerable: true, configurable: true, writable: true, value: { autoStart: true, pauseOnHover: true, progressParentEl: null, showProgress: true, timeout: 3e3 } });
class st extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "ref", { enumerable: true, configurable: true, writable: true, value: null });
  }
  onPrepare(t2) {
    const e2 = t2.carousel;
    if (!e2)
      return;
    const i2 = t2.container;
    i2 && (e2.options.Autoplay = u({ autoStart: false }, this.option("Autoplay") || {}, { pauseOnHover: false, timeout: this.option("timeout"), progressParentEl: () => this.option("progressParentEl") || null, on: { start: () => {
      t2.emit("startSlideshow");
    }, set: (e3) => {
      var n2;
      i2.classList.add("has-slideshow"), (null === (n2 = t2.getSlide()) || void 0 === n2 ? void 0 : n2.state) !== Z.Ready && e3.pause();
    }, stop: () => {
      i2.classList.remove("has-slideshow"), t2.isCompact || t2.endIdle(), t2.emit("endSlideshow");
    }, resume: (e3, i3) => {
      var n2, s2, o2;
      !i3 || !i3.cancelable || (null === (n2 = t2.getSlide()) || void 0 === n2 ? void 0 : n2.state) === Z.Ready && (null === (o2 = null === (s2 = t2.carousel) || void 0 === s2 ? void 0 : s2.panzoom) || void 0 === o2 ? void 0 : o2.isResting) || i3.preventDefault();
    } } }), e2.attachPlugins({ Autoplay: nt }), this.ref = e2.plugins.Autoplay);
  }
  onReady(t2) {
    const e2 = t2.carousel, i2 = this.ref;
    e2 && i2 && this.option("playOnStart") && (e2.isInfinite || e2.page < e2.pages.length - 1) && i2.start();
  }
  onDone(t2, e2) {
    const i2 = this.ref;
    if (!i2)
      return;
    const n2 = e2.panzoom;
    n2 && n2.on("startAnimation", () => {
      t2.isCurrentSlide(e2) && i2.stop();
    }), t2.isCurrentSlide(e2) && i2.resume();
  }
  onKeydown(t2, e2) {
    var i2;
    const n2 = this.ref;
    n2 && e2 === this.option("key") && "BUTTON" !== (null === (i2 = document.activeElement) || void 0 === i2 ? void 0 : i2.nodeName) && n2.toggle();
  }
  attach() {
    const t2 = this, e2 = t2.instance;
    e2.on("Carousel.init", t2.onPrepare), e2.on("Carousel.ready", t2.onReady), e2.on("done", t2.onDone), e2.on("keydown", t2.onKeydown);
  }
  detach() {
    const t2 = this, e2 = t2.instance;
    e2.off("Carousel.init", t2.onPrepare), e2.off("Carousel.ready", t2.onReady), e2.off("done", t2.onDone), e2.off("keydown", t2.onKeydown);
  }
}
Object.defineProperty(st, "defaults", { enumerable: true, configurable: true, writable: true, value: { key: " ", playOnStart: false, progressParentEl: (t2) => {
  var e2;
  return (null === (e2 = t2.instance.container) || void 0 === e2 ? void 0 : e2.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) || t2.instance.container;
}, timeout: 3e3 } });
const ot = { classes: { container: "f-thumbs f-carousel__thumbs", viewport: "f-thumbs__viewport", track: "f-thumbs__track", slide: "f-thumbs__slide", isResting: "is-resting", isSelected: "is-selected", isLoading: "is-loading", hasThumbs: "has-thumbs" }, minCount: 2, parentEl: null, thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>', type: "modern" };
var at;
!function(t2) {
  t2[t2.Init = 0] = "Init", t2[t2.Ready = 1] = "Ready", t2[t2.Hidden = 2] = "Hidden", t2[t2.Disabled = 3] = "Disabled";
}(at || (at = {}));
let rt = class extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "type", { enumerable: true, configurable: true, writable: true, value: "modern" }), Object.defineProperty(this, "container", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "track", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "carousel", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "panzoom", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "thumbWidth", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "thumbClipWidth", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "thumbHeight", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "thumbGap", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "thumbExtraGap", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "shouldCenter", { enumerable: true, configurable: true, writable: true, value: true }), Object.defineProperty(this, "state", { enumerable: true, configurable: true, writable: true, value: at.Init });
  }
  formatThumb(t2, e2) {
    return this.instance.localize(e2, [["%i", t2.index], ["%d", t2.index + 1], ["%s", t2.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]]);
  }
  getSlides() {
    const t2 = [], e2 = this.option("thumbTpl") || "";
    if (e2)
      for (const i2 of this.instance.slides || []) {
        let n2 = "";
        i2.type && (n2 = `for-${i2.type}`, i2.type && ["video", "youtube", "vimeo", "html5video"].includes(i2.type) && (n2 += " for-video")), t2.push({ html: this.formatThumb(i2, e2), customClass: n2 });
      }
    return t2;
  }
  onInitSlide(t2, e2) {
    const i2 = e2.el;
    i2 && (e2.thumbSrc = i2.dataset.thumbSrc || e2.thumbSrc || "", e2.thumbClipWidth = parseFloat(i2.dataset.thumbClipWidth || "") || e2.thumbClipWidth || 0, e2.thumbHeight = parseFloat(i2.dataset.thumbHeight || "") || e2.thumbHeight || 0);
  }
  onInitSlides() {
    this.state === at.Init && this.build();
  }
  onRefreshM() {
    this.refreshModern();
  }
  onChangeM() {
    "modern" === this.type && (this.shouldCenter = true, this.centerModern());
  }
  onClickModern(t2) {
    t2.preventDefault(), t2.stopPropagation();
    const e2 = this.instance, i2 = e2.page, n2 = (t3) => {
      if (t3) {
        const e3 = t3.closest("[data-carousel-index]");
        if (e3)
          return parseInt(e3.dataset.carouselIndex || "", 10) || 0;
      }
      return -1;
    }, s2 = (t3, e3) => {
      const i3 = document.elementFromPoint(t3, e3);
      return i3 ? n2(i3) : -1;
    };
    let o2 = n2(t2.target);
    o2 < 0 && (o2 = s2(t2.clientX + this.thumbGap, t2.clientY), o2 === i2 && (o2 = i2 - 1)), o2 < 0 && (o2 = s2(t2.clientX - this.thumbGap, t2.clientY), o2 === i2 && (o2 = i2 + 1)), o2 < 0 && (o2 = ((e3) => {
      let n3 = s2(t2.clientX - e3, t2.clientY), a2 = s2(t2.clientX + e3, t2.clientY);
      return o2 < 0 && n3 === i2 && (o2 = i2 + 1), o2 < 0 && a2 === i2 && (o2 = i2 - 1), o2;
    })(this.thumbExtraGap)), o2 === i2 ? this.centerModern() : o2 > -1 && o2 < e2.pages.length && e2.slideTo(o2);
  }
  onTransformM() {
    if ("modern" !== this.type)
      return;
    const { instance: t2, container: e2, track: i2 } = this, n2 = t2.panzoom;
    if (!(e2 && i2 && n2 && this.panzoom))
      return;
    o(e2, this.cn("isResting"), n2.state !== g.Init && n2.isResting);
    const s2 = this.thumbGap, a2 = this.thumbExtraGap, r2 = this.thumbClipWidth;
    let l2 = 0, c2 = 0, h2 = 0;
    for (const e3 of t2.slides) {
      let i3 = e3.index, n3 = e3.thumbSlideEl;
      if (!n3)
        continue;
      o(n3, this.cn("isSelected"), i3 === t2.page), c2 = 1 - Math.abs(t2.getProgress(i3)), n3.style.setProperty("--progress", c2 ? c2 + "" : "");
      const d2 = 0.5 * ((e3.thumbWidth || 0) - r2);
      l2 += s2, l2 += d2, c2 && (l2 -= c2 * (d2 + a2)), n3.style.setProperty("--shift", l2 - s2 + ""), l2 += d2, c2 && (l2 -= c2 * (d2 + a2)), l2 -= s2, 0 === i3 && (h2 = a2 * c2);
    }
    i2 && (i2.style.setProperty("--left", h2 + ""), i2.style.setProperty("--width", l2 + h2 + s2 + a2 * c2 + "")), this.shouldCenter && this.centerModern();
  }
  buildClassic() {
    const { container: t2, track: e2 } = this, i2 = this.getSlides();
    if (!t2 || !e2 || !i2)
      return;
    const n2 = new this.instance.constructor(t2, u({ track: e2, infinite: false, center: true, fill: true, dragFree: true, slidesPerPage: 1, transition: false, Dots: false, Navigation: false, classes: { container: "f-thumbs", viewport: "f-thumbs__viewport", track: "f-thumbs__track", slide: "f-thumbs__slide" } }, this.option("Carousel") || {}, { Sync: { target: this.instance }, slides: i2 }));
    this.carousel = n2, this.track = e2, n2.on("ready", () => {
      this.emit("ready");
    }), n2.on("createSlide", (t3, e3) => {
      this.emit("createSlide", e3, e3.el);
    });
  }
  buildModern() {
    if ("modern" !== this.type)
      return;
    const { container: t2, track: e2, instance: i2 } = this, s2 = this.option("thumbTpl") || "";
    if (!t2 || !e2 || !s2)
      return;
    E(t2, "is-horizontal"), this.updateModern();
    for (const t3 of i2.slides || []) {
      const i3 = document.createElement("div");
      if (E(i3, this.cn("slide")), t3.type) {
        let e3 = `for-${t3.type}`;
        ["video", "youtube", "vimeo", "html5video"].includes(t3.type) && (e3 += " for-video"), E(i3, e3);
      }
      i3.appendChild(n(this.formatThumb(t3, s2))), this.emit("createSlide", t3, i3), t3.thumbSlideEl = i3, e2.appendChild(i3), this.resizeModernSlide(t3);
    }
    const o2 = new i2.constructor.Panzoom(t2, { content: e2, lockAxis: "x", zoom: false, panOnlyZoomed: false, bounds: () => {
      let t3 = 0, e3 = 0, n2 = i2.slides[0], s3 = i2.slides[i2.slides.length - 1], o3 = i2.slides[i2.page];
      return n2 && s3 && o3 && (e3 = -1 * this.getModernThumbPos(0), 0 !== i2.page && (e3 += 0.5 * (n2.thumbWidth || 0)), t3 = -1 * this.getModernThumbPos(i2.slides.length - 1), i2.page !== i2.slides.length - 1 && (t3 += (s3.thumbWidth || 0) - (o3.thumbWidth || 0) - 0.5 * (s3.thumbWidth || 0))), { x: { min: t3, max: e3 }, y: { min: 0, max: 0 } };
    } });
    o2.on("touchStart", (t3, e3) => {
      this.shouldCenter = false;
    }), o2.on("click", (t3, e3) => this.onClickModern(e3)), o2.on("ready", () => {
      this.centerModern(), this.emit("ready");
    }), o2.on(["afterTransform", "refresh"], (t3) => {
      this.lazyLoadModern();
    }), this.panzoom = o2, this.refreshModern();
  }
  updateModern() {
    if ("modern" !== this.type)
      return;
    const { container: t2 } = this;
    t2 && (this.thumbGap = parseFloat(getComputedStyle(t2).getPropertyValue("--f-thumb-gap")) || 0, this.thumbExtraGap = parseFloat(getComputedStyle(t2).getPropertyValue("--f-thumb-extra-gap")) || 0, this.thumbWidth = parseFloat(getComputedStyle(t2).getPropertyValue("--f-thumb-width")) || 40, this.thumbClipWidth = parseFloat(getComputedStyle(t2).getPropertyValue("--f-thumb-clip-width")) || 40, this.thumbHeight = parseFloat(getComputedStyle(t2).getPropertyValue("--f-thumb-height")) || 40);
  }
  refreshModern() {
    var t2;
    if ("modern" === this.type) {
      this.updateModern();
      for (const t3 of this.instance.slides || [])
        this.resizeModernSlide(t3);
      this.onTransformM(), null === (t2 = this.panzoom) || void 0 === t2 || t2.updateMetrics(true), this.centerModern(0);
    }
  }
  centerModern(e2) {
    const i2 = this.instance, { container: n2, panzoom: s2 } = this;
    if (!n2 || !s2 || s2.state === g.Init)
      return;
    const o2 = i2.page;
    let a2 = this.getModernThumbPos(o2), r2 = a2;
    for (let t2 = i2.page - 3; t2 < i2.page + 3; t2++) {
      if (t2 < 0 || t2 > i2.pages.length - 1 || t2 === i2.page)
        continue;
      const e3 = 1 - Math.abs(i2.getProgress(t2));
      e3 > 0 && e3 < 1 && (r2 += e3 * (this.getModernThumbPos(t2) - a2));
    }
    let l2 = 100;
    void 0 === e2 && (e2 = 0.2, i2.inTransition.size > 0 && (e2 = 0.12), Math.abs(-1 * s2.current.e - r2) > s2.containerRect.width && (e2 = 0.5, l2 = 0)), s2.options.maxVelocity = l2, s2.applyChange({ panX: t(-1 * r2 - s2.target.e, 1e3), friction: null === i2.prevPage ? 0 : e2 });
  }
  lazyLoadModern() {
    const { instance: t2, panzoom: e2 } = this;
    if (!e2)
      return;
    const i2 = -1 * e2.current.e || 0;
    let s2 = this.getModernThumbPos(t2.page);
    if (e2.state !== g.Init || 0 === s2)
      for (const s3 of t2.slides || []) {
        const t3 = s3.thumbSlideEl;
        if (!t3)
          continue;
        const o2 = t3.querySelector("img[data-lazy-src]"), a2 = s3.index, r2 = this.getModernThumbPos(a2), l2 = i2 - 0.5 * e2.containerRect.innerWidth, c2 = l2 + e2.containerRect.innerWidth;
        if (!o2 || r2 < l2 || r2 > c2)
          continue;
        let h2 = o2.dataset.lazySrc;
        if (!h2 || !h2.length)
          continue;
        if (delete o2.dataset.lazySrc, o2.src = h2, o2.complete)
          continue;
        E(t3, this.cn("isLoading"));
        const d2 = n(w);
        t3.appendChild(d2), o2.addEventListener("load", () => {
          t3.offsetParent && (t3.classList.remove(this.cn("isLoading")), d2.remove());
        }, false);
      }
  }
  resizeModernSlide(t2) {
    if ("modern" !== this.type)
      return;
    if (!t2.thumbSlideEl)
      return;
    const e2 = t2.thumbClipWidth && t2.thumbHeight ? Math.round(this.thumbHeight * (t2.thumbClipWidth / t2.thumbHeight)) : this.thumbWidth;
    t2.thumbWidth = e2;
  }
  getModernThumbPos(e2) {
    const i2 = this.instance.slides[e2], n2 = this.panzoom;
    if (!n2 || !n2.contentRect.fitWidth)
      return 0;
    let s2 = n2.containerRect.innerWidth, o2 = n2.contentRect.width;
    2 === this.instance.slides.length && (e2 -= 1, o2 = 2 * this.thumbClipWidth);
    let a2 = e2 * (this.thumbClipWidth + this.thumbGap) + this.thumbExtraGap + 0.5 * (i2.thumbWidth || 0);
    return a2 -= o2 > s2 ? 0.5 * s2 : 0.5 * o2, t(a2 || 0, 1);
  }
  build() {
    const t2 = this.instance, e2 = t2.container, i2 = this.option("minCount") || 0;
    if (i2) {
      let e3 = 0;
      for (const i3 of t2.slides || [])
        i3.thumbSrc && e3++;
      if (e3 < i2)
        return this.cleanup(), void (this.state = at.Disabled);
    }
    const n2 = this.option("type");
    if (["modern", "classic"].indexOf(n2) < 0)
      return void (this.state = at.Disabled);
    this.type = n2;
    const s2 = document.createElement("div");
    E(s2, this.cn("container")), E(s2, `is-${n2}`);
    const o2 = this.option("parentEl");
    o2 ? o2.appendChild(s2) : e2.after(s2), this.container = s2, E(e2, this.cn("hasThumbs"));
    const a2 = document.createElement("div");
    E(a2, this.cn("track")), s2.appendChild(a2), this.track = a2, "classic" === n2 ? this.buildClassic() : this.buildModern(), this.state = at.Ready, s2.addEventListener("click", (e3) => {
      setTimeout(() => {
        var e4;
        null === (e4 = null == s2 ? void 0 : s2.querySelector(`[data-carousel-index="${t2.page}"]`)) || void 0 === e4 || e4.focus();
      }, 100);
    });
  }
  cleanup() {
    this.carousel && this.carousel.destroy(), this.carousel = null, this.panzoom && this.panzoom.destroy(), this.panzoom = null, this.container && this.container.remove(), this.container = null, this.track = null, this.state = at.Init, S(this.instance.container, this.cn("hasThumbs"));
  }
  attach() {
    const t2 = this, e2 = t2.instance;
    e2.on("initSlide", t2.onInitSlide), e2.state === L.Init ? e2.on("initSlides", t2.onInitSlides) : t2.onInitSlides(), e2.on("Panzoom.afterTransform", t2.onTransformM), e2.on("Panzoom.refresh", t2.onRefreshM), e2.on("change", t2.onChangeM);
  }
  detach() {
    const t2 = this, e2 = t2.instance;
    e2.off("initSlide", t2.onInitSlide), e2.off("initSlides", t2.onInitSlides), e2.off("Panzoom.afterTransform", t2.onTransformM), e2.off("Panzoom.refresh", t2.onRefreshM), e2.off("change", t2.onChangeM), t2.cleanup();
  }
};
Object.defineProperty(rt, "defaults", { enumerable: true, configurable: true, writable: true, value: ot });
const lt = Object.assign(Object.assign({}, ot), { key: "t", showOnStart: true, parentEl: null });
class ct extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "ref", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "hidden", { enumerable: true, configurable: true, writable: true, value: false });
  }
  get isEnabled() {
    const t2 = this.ref;
    return t2 && t2.state !== at.Disabled;
  }
  get isHidden() {
    return this.hidden;
  }
  onInit() {
    var t2;
    const e2 = this, i2 = e2.instance, n2 = i2.carousel;
    if (e2.ref || !n2)
      return;
    const s2 = e2.option("parentEl") || i2.footer || i2.container;
    if (!s2)
      return;
    const o2 = u({}, e2.options, { parentEl: s2, classes: { container: "f-thumbs fancybox__thumbs" }, Carousel: { Sync: { friction: i2.option("Carousel.friction") || 0 } }, on: { ready: (t3) => {
      const i3 = t3.container;
      i3 && this.hidden && (e2.refresh(), i3.style.transition = "none", e2.hide(), i3.offsetHeight, queueMicrotask(() => {
        i3.style.transition = "", e2.show();
      }));
    } } });
    o2.Carousel = o2.Carousel || {}, o2.Carousel.on = u((null === (t2 = e2.options.Carousel) || void 0 === t2 ? void 0 : t2.on) || {}, { click: (t3, e3) => {
      e3.stopPropagation();
    } }), n2.options.Thumbs = o2, n2.attachPlugins({ Thumbs: rt }), e2.ref = n2.plugins.Thumbs, e2.option("showOnStart") || (e2.ref.state = at.Hidden, e2.hidden = true);
  }
  onResize() {
    var t2;
    const e2 = null === (t2 = this.ref) || void 0 === t2 ? void 0 : t2.container;
    e2 && (e2.style.maxHeight = "");
  }
  onKeydown(t2, e2) {
    const i2 = this.option("key");
    i2 && i2 === e2 && this.toggle();
  }
  toggle() {
    const t2 = this.ref;
    t2 && t2.state !== at.Disabled && (t2.state !== at.Hidden ? this.hidden ? this.show() : this.hide() : t2.build());
  }
  show() {
    const t2 = this.ref, e2 = t2 && t2.state !== at.Disabled && t2.container;
    e2 && (this.refresh(), e2.offsetHeight, e2.removeAttribute("aria-hidden"), e2.classList.remove("is-hidden"), this.hidden = false);
  }
  hide() {
    const t2 = this.ref, e2 = t2 && t2.container;
    e2 && (this.refresh(), e2.offsetHeight, e2.classList.add("is-hidden"), e2.setAttribute("aria-hidden", "true")), this.hidden = true;
  }
  refresh() {
    const t2 = this.ref;
    if (!t2 || t2.state === at.Disabled)
      return;
    const e2 = t2.container, i2 = (null == e2 ? void 0 : e2.firstChild) || null;
    e2 && i2 && i2.childNodes.length && (e2.style.maxHeight = `${i2.getBoundingClientRect().height}px`);
  }
  attach() {
    const t2 = this, e2 = t2.instance;
    e2.state === V.Init ? e2.on("Carousel.init", t2.onInit) : t2.onInit(), e2.on("resize", t2.onResize), e2.on("keydown", t2.onKeydown);
  }
  detach() {
    var t2;
    const e2 = this, i2 = e2.instance;
    i2.off("Carousel.init", e2.onInit), i2.off("resize", e2.onResize), i2.off("keydown", e2.onKeydown), null === (t2 = i2.carousel) || void 0 === t2 || t2.detachPlugins(["Thumbs"]), e2.ref = null;
  }
}
Object.defineProperty(ct, "defaults", { enumerable: true, configurable: true, writable: true, value: lt });
const ht = { panLeft: { icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>', change: { panX: -100 } }, panRight: { icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>', change: { panX: 100 } }, panUp: { icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>', change: { panY: -100 } }, panDown: { icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>', change: { panY: 100 } }, zoomIn: { icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>', action: "zoomIn" }, zoomOut: { icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>', action: "zoomOut" }, toggle1to1: { icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>', action: "toggleZoom" }, toggleZoom: { icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>', action: "toggleZoom" }, iterateZoom: { icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>', action: "iterateZoom" }, rotateCCW: { icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>', action: "rotateCCW" }, rotateCW: { icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>', action: "rotateCW" }, flipX: { icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>', action: "flipX" }, flipY: { icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>', action: "flipY" }, fitX: { icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>', action: "fitX" }, fitY: { icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>', action: "fitY" }, reset: { icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>', action: "reset" }, toggleFS: { icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>', action: "toggleFS" } };
var dt;
!function(t2) {
  t2[t2.Init = 0] = "Init", t2[t2.Ready = 1] = "Ready", t2[t2.Disabled = 2] = "Disabled";
}(dt || (dt = {}));
const ut = { absolute: "auto", display: { left: ["infobar"], middle: [], right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"] }, enabled: "auto", items: { infobar: { tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>' }, download: { tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>' }, prev: { tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>' }, next: { tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>' }, slideshow: { tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>' }, fullscreen: { tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>' }, thumbs: { tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>' }, close: { tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>' } }, parentEl: null }, pt = { tabindex: "-1", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" };
class ft extends I {
  constructor() {
    super(...arguments), Object.defineProperty(this, "state", { enumerable: true, configurable: true, writable: true, value: dt.Init }), Object.defineProperty(this, "container", { enumerable: true, configurable: true, writable: true, value: null });
  }
  onReady(t2) {
    var e2;
    if (!t2.carousel)
      return;
    let i2 = this.option("display"), n2 = this.option("absolute"), s2 = this.option("enabled");
    if ("auto" === s2) {
      const t3 = this.instance.carousel;
      let e3 = 0;
      if (t3)
        for (const i3 of t3.slides)
          (i3.panzoom || "image" === i3.type) && e3++;
      e3 || (s2 = false);
    }
    s2 || (i2 = void 0);
    let o2 = 0;
    const a2 = { left: [], middle: [], right: [] };
    if (i2)
      for (const t3 of ["left", "middle", "right"])
        for (const n3 of i2[t3]) {
          const i3 = this.createEl(n3);
          i3 && (null === (e2 = a2[t3]) || void 0 === e2 || e2.push(i3), o2++);
        }
    let r2 = null;
    if (o2 && (r2 = this.createContainer()), r2) {
      for (const [t3, e3] of Object.entries(a2)) {
        const i3 = document.createElement("div");
        E(i3, "fancybox__toolbar__column is-" + t3);
        for (const t4 of e3)
          i3.appendChild(t4);
        "auto" !== n2 || "middle" !== t3 || e3.length || (n2 = true), r2.appendChild(i3);
      }
      true === n2 && E(r2, "is-absolute"), this.state = dt.Ready, this.onRefresh();
    } else
      this.state = dt.Disabled;
  }
  onClick(t2) {
    var e2, i2;
    const n2 = this.instance, s2 = n2.getSlide(), o2 = null == s2 ? void 0 : s2.panzoom, a2 = t2.target, r2 = a2 && x(a2) ? a2.dataset : null;
    if (!r2)
      return;
    if (void 0 !== r2.fancyboxToggleThumbs)
      return t2.preventDefault(), t2.stopPropagation(), void (null === (e2 = n2.plugins.Thumbs) || void 0 === e2 || e2.toggle());
    if (void 0 !== r2.fancyboxToggleFullscreen)
      return t2.preventDefault(), t2.stopPropagation(), void this.instance.toggleFullscreen();
    if (void 0 !== r2.fancyboxToggleSlideshow) {
      t2.preventDefault(), t2.stopPropagation();
      const e3 = null === (i2 = n2.carousel) || void 0 === i2 ? void 0 : i2.plugins.Autoplay;
      let s3 = e3.isActive;
      return o2 && "mousemove" === o2.panMode && !s3 && o2.reset(), void (s3 ? e3.stop() : e3.start());
    }
    const l2 = r2.panzoomAction, c2 = r2.panzoomChange;
    if ((c2 || l2) && (t2.preventDefault(), t2.stopPropagation()), c2) {
      let t3 = {};
      try {
        t3 = JSON.parse(c2);
      } catch (t4) {
      }
      o2 && o2.applyChange(t3);
    } else
      l2 && o2 && o2[l2] && o2[l2]();
  }
  onChange() {
    this.onRefresh();
  }
  onRefresh() {
    if (this.instance.isClosing())
      return;
    const t2 = this.container;
    if (!t2)
      return;
    const e2 = this.instance.getSlide();
    if (!e2 || e2.state !== Z.Ready)
      return;
    const i2 = e2 && !e2.error && e2.panzoom;
    for (const e3 of t2.querySelectorAll("[data-panzoom-action]"))
      i2 ? (e3.removeAttribute("disabled"), e3.removeAttribute("tabindex")) : (e3.setAttribute("disabled", ""), e3.setAttribute("tabindex", "-1"));
    let n2 = i2 && i2.canZoomIn(), s2 = i2 && i2.canZoomOut();
    for (const e3 of t2.querySelectorAll('[data-panzoom-action="zoomIn"]'))
      n2 ? (e3.removeAttribute("disabled"), e3.removeAttribute("tabindex")) : (e3.setAttribute("disabled", ""), e3.setAttribute("tabindex", "-1"));
    for (const e3 of t2.querySelectorAll('[data-panzoom-action="zoomOut"]'))
      s2 ? (e3.removeAttribute("disabled"), e3.removeAttribute("tabindex")) : (e3.setAttribute("disabled", ""), e3.setAttribute("tabindex", "-1"));
    for (const e3 of t2.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
      s2 || n2 ? (e3.removeAttribute("disabled"), e3.removeAttribute("tabindex")) : (e3.setAttribute("disabled", ""), e3.setAttribute("tabindex", "-1"));
      const t3 = e3.querySelector("g");
      t3 && (t3.style.display = n2 ? "" : "none");
    }
  }
  onDone(t2, e2) {
    var i2;
    null === (i2 = e2.panzoom) || void 0 === i2 || i2.on("afterTransform", () => {
      this.instance.isCurrentSlide(e2) && this.onRefresh();
    }), this.instance.isCurrentSlide(e2) && this.onRefresh();
  }
  createContainer() {
    const t2 = this.instance.container;
    if (!t2)
      return null;
    const e2 = this.option("parentEl") || t2, i2 = document.createElement("div");
    return E(i2, "fancybox__toolbar"), e2.prepend(i2), i2.addEventListener("click", this.onClick, { passive: false, capture: true }), t2 && E(t2, "has-toolbar"), this.container = i2, i2;
  }
  createEl(t2) {
    const e2 = this.instance, i2 = e2.carousel;
    if (!i2)
      return null;
    if ("toggleFS" === t2)
      return null;
    if ("fullscreen" === t2 && !e2.fsAPI)
      return null;
    let s2 = null;
    const o2 = i2.slides.length || 0;
    let a2 = 0, r2 = 0;
    for (const t3 of i2.slides)
      (t3.panzoom || "image" === t3.type) && a2++, ("image" === t3.type || t3.downloadSrc) && r2++;
    if (o2 < 2 && ["infobar", "prev", "next"].includes(t2))
      return s2;
    if (void 0 !== ht[t2] && !a2)
      return null;
    if ("download" === t2 && !r2)
      return null;
    if ("thumbs" === t2) {
      const t3 = e2.plugins.Thumbs;
      if (!t3 || !t3.isEnabled)
        return null;
    }
    if ("slideshow" === t2) {
      if (!i2.plugins.Autoplay || o2 < 2)
        return null;
    }
    if (void 0 !== ht[t2]) {
      const e3 = ht[t2];
      s2 = document.createElement("button"), s2.setAttribute("title", this.instance.localize(`{{${t2.toUpperCase()}}}`)), E(s2, "f-button"), e3.action && (s2.dataset.panzoomAction = e3.action), e3.change && (s2.dataset.panzoomChange = JSON.stringify(e3.change)), s2.appendChild(n(this.instance.localize(e3.icon)));
    } else {
      const e3 = (this.option("items") || [])[t2];
      e3 && (s2 = n(this.instance.localize(e3.tpl)), "function" == typeof e3.click && s2.addEventListener("click", (t3) => {
        t3.preventDefault(), t3.stopPropagation(), "function" == typeof e3.click && e3.click.call(this, this, t3);
      }));
    }
    const l2 = null == s2 ? void 0 : s2.querySelector("svg");
    if (l2)
      for (const [t3, e3] of Object.entries(pt))
        l2.getAttribute(t3) || l2.setAttribute(t3, String(e3));
    return s2;
  }
  removeContainer() {
    const t2 = this.container;
    t2 && t2.remove(), this.container = null, this.state = dt.Disabled;
    const e2 = this.instance.container;
    e2 && S(e2, "has-toolbar");
  }
  attach() {
    const t2 = this, e2 = t2.instance;
    e2.on("Carousel.initSlides", t2.onReady), e2.on("done", t2.onDone), e2.on("reveal", t2.onChange), e2.on("Carousel.change", t2.onChange), t2.onReady(t2.instance);
  }
  detach() {
    const t2 = this, e2 = t2.instance;
    e2.off("Carousel.initSlides", t2.onReady), e2.off("done", t2.onDone), e2.off("reveal", t2.onChange), e2.off("Carousel.change", t2.onChange), t2.removeContainer();
  }
}
Object.defineProperty(ft, "defaults", { enumerable: true, configurable: true, writable: true, value: ut });
const mt = { Hash: U, Html: it, Images: J, Slideshow: st, Thumbs: ct, Toolbar: ft }, gt = function() {
  var t2 = window.getSelection();
  return t2 && "Range" === t2.type;
};
let bt = null, vt = null;
const yt = /* @__PURE__ */ new Map();
let wt = 0;
class xt extends m {
  get isIdle() {
    return this.idle;
  }
  get isCompact() {
    return this.option("compact");
  }
  constructor(t2 = [], e2 = {}, i2 = {}) {
    super(e2), Object.defineProperty(this, "userSlides", { enumerable: true, configurable: true, writable: true, value: [] }), Object.defineProperty(this, "userPlugins", { enumerable: true, configurable: true, writable: true, value: {} }), Object.defineProperty(this, "idle", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "idleTimer", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "clickTimer", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "pwt", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "ignoreFocusChange", { enumerable: true, configurable: true, writable: true, value: false }), Object.defineProperty(this, "state", { enumerable: true, configurable: true, writable: true, value: V.Init }), Object.defineProperty(this, "id", { enumerable: true, configurable: true, writable: true, value: 0 }), Object.defineProperty(this, "container", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "footer", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "caption", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "carousel", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "lastFocus", { enumerable: true, configurable: true, writable: true, value: null }), Object.defineProperty(this, "prevMouseMoveEvent", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "fsAPI", { enumerable: true, configurable: true, writable: true, value: void 0 }), this.fsAPI = (() => {
      let t3, e3 = "", i3 = "", n2 = "";
      return document.fullscreenEnabled ? (e3 = "requestFullscreen", i3 = "exitFullscreen", n2 = "fullscreenElement") : document.webkitFullscreenEnabled && (e3 = "webkitRequestFullscreen", i3 = "webkitExitFullscreen", n2 = "webkitFullscreenElement"), e3 && (t3 = { request: function(t4) {
        return "webkitRequestFullscreen" === e3 ? t4[e3](Element.ALLOW_KEYBOARD_INPUT) : t4[e3]();
      }, exit: function() {
        return document[n2] && document[i3]();
      }, isFullscreen: function() {
        return document[n2];
      } }), t3;
    })(), this.id = e2.id || ++wt, yt.set(this.id, this), this.userSlides = t2, this.userPlugins = i2, queueMicrotask(() => {
      this.init();
    });
  }
  init() {
    if (this.state === V.Destroy)
      return;
    this.state = V.Init, this.attachPlugins(Object.assign(Object.assign({}, xt.Plugins), this.userPlugins)), this.emit("init"), true === this.option("hideScrollbar") && (() => {
      if (!W)
        return;
      const t3 = document.body;
      if (t3.classList.contains("hide-scrollbar"))
        return;
      let e3 = window.innerWidth - document.documentElement.getBoundingClientRect().width;
      e3 < 0 && (e3 = 0);
      const i2 = t3.currentStyle || window.getComputedStyle(t3), n2 = parseFloat(i2.marginRight);
      document.documentElement.style.setProperty("--fancybox-scrollbar-compensate", `${e3}px`), n2 && t3.style.setProperty("--fancybox-body-margin", `${n2}px`), t3.classList.add("hide-scrollbar");
    })(), this.initLayout(), this.scale();
    const t2 = () => {
      this.initCarousel(this.userSlides), this.state = V.Ready, this.attachEvents(), this.emit("ready"), setTimeout(() => {
        this.container && this.container.setAttribute("aria-hidden", "false");
      }, 16);
    }, e2 = this.fsAPI;
    this.option("Fullscreen.autoStart") && e2 && !e2.isFullscreen() ? e2.request(this.container).then(() => t2()).catch(() => t2()) : t2();
  }
  initLayout() {
    var t2, e2;
    const i2 = this.option("parentEl") || document.body, s2 = n(this.localize(this.option("tpl.main") || ""));
    s2 && (s2.setAttribute("id", `fancybox-${this.id}`), s2.setAttribute("aria-label", this.localize("{{MODAL}}")), s2.classList.toggle("is-compact", this.isCompact), E(s2, this.option("mainClass") || ""), this.container = s2, this.footer = s2.querySelector(".fancybox__footer"), i2.appendChild(s2), E(document.documentElement, "with-fancybox"), bt && vt || (bt = document.createElement("span"), E(bt, "fancybox-focus-guard"), bt.setAttribute("tabindex", "0"), bt.setAttribute("aria-hidden", "true"), bt.setAttribute("aria-label", "Focus guard"), vt = bt.cloneNode(), null === (t2 = s2.parentElement) || void 0 === t2 || t2.insertBefore(bt, s2), null === (e2 = s2.parentElement) || void 0 === e2 || e2.append(vt)), this.option("animated") && (E(s2, "is-animated"), setTimeout(() => {
      this.isClosing() || S(s2, "is-animated");
    }, 350)), this.emit("initLayout"));
  }
  initCarousel(t2) {
    const i2 = this.container;
    if (!i2)
      return;
    const n2 = i2.querySelector(".fancybox__carousel");
    if (!n2)
      return;
    const s2 = this.carousel = new _(n2, u({}, { slides: t2, transition: "fade", Panzoom: { lockAxis: this.option("dragToClose") ? "xy" : "x", infinite: !!this.option("dragToClose") && "y" }, Dots: false, Navigation: { classes: { container: "fancybox__nav", button: "f-button", isNext: "is-next", isPrev: "is-prev" } }, initialPage: this.option("startIndex"), l10n: this.option("l10n") }, this.option("Carousel") || {}));
    s2.on("*", (t3, e2, ...i3) => {
      this.emit(`Carousel.${e2}`, t3, ...i3);
    }), s2.on(["ready", "change"], () => {
      var t3;
      const e2 = this.getSlide();
      e2 && (null === (t3 = e2.panzoom) || void 0 === t3 || t3.updateControls()), this.manageCaption(e2);
    }), this.on("Carousel.removeSlide", (t3, e2, i3) => {
      i3.contentEl && (i3.contentEl.remove(), i3.contentEl = void 0);
      const n3 = i3.el;
      n3 && (S(n3, "has-error"), S(n3, "has-unknown"), S(n3, `has-${i3.type || "unknown"}`)), i3.closeBtnEl && i3.closeBtnEl.remove(), i3.closeBtnEl = void 0, i3.captionEl && i3.captionEl.remove(), i3.captionEl = void 0, i3.spinnerEl && i3.spinnerEl.remove(), i3.spinnerEl = void 0, i3.state = void 0;
    }), s2.on("Panzoom.touchStart", () => {
      this.isCompact || this.endIdle();
    }), s2.on("settle", () => {
      this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && this.checkFocus();
    }), this.option("dragToClose") && (s2.on("Panzoom.afterTransform", (t3, i3) => {
      const n3 = this.getSlide();
      if (n3 && e(n3.el))
        return;
      const s3 = this.container;
      if (s3) {
        const t4 = Math.abs(i3.current.f), e2 = t4 < 1 ? "" : Math.max(0.5, Math.min(1, 1 - t4 / i3.contentRect.fitHeight * 1.5));
        s3.style.setProperty("--fancybox-ts", e2 ? "0s" : ""), s3.style.setProperty("--fancybox-opacity", e2 + "");
      }
    }), s2.on("Panzoom.touchEnd", (t3, i3, n3) => {
      var s3;
      const o2 = this.getSlide();
      if (o2 && e(o2.el))
        return;
      if (i3.isMobile && document.activeElement && -1 !== ["TEXTAREA", "INPUT"].indexOf(null === (s3 = document.activeElement) || void 0 === s3 ? void 0 : s3.nodeName))
        return;
      const a2 = Math.abs(i3.dragOffset.y);
      "y" === i3.lockedAxis && (a2 >= 200 || a2 >= 50 && i3.dragOffset.time < 300) && (n3 && n3.cancelable && n3.preventDefault(), this.close(n3, "f-throwOut" + (i3.current.f < 0 ? "Up" : "Down")));
    })), s2.on("change", (t3) => {
      var e2;
      let i3 = null === (e2 = this.getSlide()) || void 0 === e2 ? void 0 : e2.triggerEl;
      if (i3) {
        const e3 = new CustomEvent("slideTo", { bubbles: true, cancelable: true, detail: t3.page });
        i3.dispatchEvent(e3);
      }
    }), s2.on(["refresh", "change"], (t3) => {
      const e2 = this.container;
      if (!e2)
        return;
      for (const i4 of e2.querySelectorAll("[data-fancybox-current-index]"))
        i4.innerHTML = t3.page + 1;
      for (const i4 of e2.querySelectorAll("[data-fancybox-count]"))
        i4.innerHTML = t3.pages.length;
      if (!t3.isInfinite) {
        for (const i4 of e2.querySelectorAll("[data-fancybox-next]"))
          t3.page < t3.pages.length - 1 ? (i4.removeAttribute("disabled"), i4.removeAttribute("tabindex")) : (i4.setAttribute("disabled", ""), i4.setAttribute("tabindex", "-1"));
        for (const i4 of e2.querySelectorAll("[data-fancybox-prev]"))
          t3.page > 0 ? (i4.removeAttribute("disabled"), i4.removeAttribute("tabindex")) : (i4.setAttribute("disabled", ""), i4.setAttribute("tabindex", "-1"));
      }
      const i3 = this.getSlide();
      if (!i3)
        return;
      let n3 = i3.downloadSrc || "";
      n3 || "image" !== i3.type || i3.error || "string" != typeof i3.src || (n3 = i3.src);
      const s3 = "disabled", o2 = "tabindex", a2 = "download", r2 = "href";
      for (const t4 of e2.querySelectorAll("[data-fancybox-download]")) {
        const e3 = i3.downloadFilename;
        n3 ? (t4.removeAttribute(s3), t4.removeAttribute(o2), t4.setAttribute(r2, n3), t4.setAttribute(a2, e3 || n3), t4.setAttribute("target", "_blank")) : (t4.setAttribute(s3, ""), t4.setAttribute(o2, "-1"), t4.removeAttribute(r2), t4.removeAttribute(a2));
      }
    }), this.emit("initCarousel");
  }
  attachEvents() {
    const t2 = this, e2 = t2.container;
    if (!e2)
      return;
    e2.addEventListener("click", t2.onClick, { passive: false, capture: false }), e2.addEventListener("wheel", t2.onWheel, { passive: false, capture: false }), document.addEventListener("keydown", t2.onKeydown, { passive: false, capture: true }), document.addEventListener("visibilitychange", t2.onVisibilityChange, false), document.addEventListener("mousemove", t2.onMousemove), t2.option("trapFocus") && document.addEventListener("focus", t2.onFocus, true), window.addEventListener("resize", t2.onResize);
    const i2 = window.visualViewport;
    i2 && (i2.addEventListener("scroll", t2.onResize), i2.addEventListener("resize", t2.onResize));
  }
  detachEvents() {
    const t2 = this, e2 = t2.container;
    if (!e2)
      return;
    document.removeEventListener("keydown", t2.onKeydown, { passive: false, capture: true }), e2.removeEventListener("wheel", t2.onWheel, { passive: false, capture: false }), e2.removeEventListener("click", t2.onClick, { passive: false, capture: false }), document.removeEventListener("mousemove", t2.onMousemove), window.removeEventListener("resize", t2.onResize);
    const i2 = window.visualViewport;
    i2 && (i2.removeEventListener("resize", t2.onResize), i2.removeEventListener("scroll", t2.onResize)), document.removeEventListener("visibilitychange", t2.onVisibilityChange, false), document.removeEventListener("focus", t2.onFocus, true);
  }
  scale() {
    const t2 = this.container;
    if (!t2)
      return;
    const e2 = window.visualViewport, i2 = Math.max(1, (null == e2 ? void 0 : e2.scale) || 1);
    let n2 = "", s2 = "", o2 = "";
    if (e2 && i2 > 1) {
      let t3 = `${e2.offsetLeft}px`, a2 = `${e2.offsetTop}px`;
      n2 = e2.width * i2 + "px", s2 = e2.height * i2 + "px", o2 = `translate3d(${t3}, ${a2}, 0) scale(${1 / i2})`;
    }
    t2.style.transform = o2, t2.style.width = n2, t2.style.height = s2;
  }
  onClick(t2) {
    var e2, i2;
    const { container: n2, isCompact: s2 } = this;
    if (!n2 || this.isClosing())
      return;
    !s2 && this.option("idle") && this.resetIdle();
    const o2 = document.activeElement;
    if (gt() && o2 && n2.contains(o2))
      return;
    const a2 = t2.composedPath()[0];
    if (a2 === (null === (e2 = this.carousel) || void 0 === e2 ? void 0 : e2.container))
      return;
    if (a2.closest(".f-spinner") || a2.closest("[data-fancybox-close]"))
      return t2.preventDefault(), void this.close(t2);
    if (a2.closest("[data-fancybox-prev]"))
      return t2.preventDefault(), void this.prev();
    if (a2.closest("[data-fancybox-next]"))
      return t2.preventDefault(), void this.next();
    if (s2 && "image" === (null === (i2 = this.getSlide()) || void 0 === i2 ? void 0 : i2.type))
      return void (this.clickTimer ? (clearTimeout(this.clickTimer), this.clickTimer = null) : this.clickTimer = setTimeout(() => {
        this.toggleIdle(), this.clickTimer = null;
      }, 350));
    if (this.emit("click", t2), t2.defaultPrevented)
      return;
    let r2 = false;
    if (a2.closest(".fancybox__content")) {
      if (o2) {
        if (o2.closest("[contenteditable]"))
          return;
        a2.matches(X) || o2.blur();
      }
      if (gt())
        return;
      r2 = this.option("contentClick");
    } else
      a2.closest(".fancybox__carousel") && !a2.matches(X) && (r2 = this.option("backdropClick"));
    "close" === r2 ? (t2.preventDefault(), this.close(t2)) : "next" === r2 ? (t2.preventDefault(), this.next()) : "prev" === r2 && (t2.preventDefault(), this.prev());
  }
  onWheel(t2) {
    var e2;
    let i2 = this.option("wheel", t2);
    (null === (e2 = t2.target) || void 0 === e2 ? void 0 : e2.closest(".fancybox__thumbs")) && (i2 = "slide");
    const n2 = "slide" === i2, s2 = [-t2.deltaX || 0, -t2.deltaY || 0, -t2.detail || 0].reduce(function(t3, e3) {
      return Math.abs(e3) > Math.abs(t3) ? e3 : t3;
    }), o2 = Math.max(-1, Math.min(1, s2)), a2 = Date.now();
    this.pwt && a2 - this.pwt < 300 ? n2 && t2.preventDefault() : (this.pwt = a2, this.emit("wheel", t2), t2.defaultPrevented || ("close" === i2 ? (t2.preventDefault(), this.close(t2)) : "slide" === i2 && (t2.preventDefault(), this[o2 > 0 ? "prev" : "next"]())));
  }
  onKeydown(t2) {
    if (!this.isTopmost())
      return;
    this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
    const e2 = t2.key, i2 = this.option("keyboard");
    if (!i2 || t2.ctrlKey || t2.altKey || t2.shiftKey)
      return;
    const n2 = t2.composedPath()[0], s2 = document.activeElement && document.activeElement.classList, o2 = s2 && s2.contains("f-button") || n2.dataset.carouselPage || n2.dataset.carouselIndex;
    if ("Escape" !== e2 && !o2 && x(n2)) {
      if (n2.isContentEditable || -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(n2.nodeName))
        return;
    }
    this.emit("keydown", e2, t2);
    const a2 = i2[e2];
    "function" == typeof this[a2] && (t2.preventDefault(), this[a2]());
  }
  onResize() {
    const t2 = this.container;
    if (!t2)
      return;
    const e2 = this.isCompact;
    t2.classList.toggle("is-compact", e2), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), this.scale(), this.emit("resize");
  }
  onFocus(t2) {
    this.isTopmost() && this.checkFocus(t2);
  }
  onMousemove(t2) {
    this.prevMouseMoveEvent = t2, !this.isCompact && this.option("idle") && this.resetIdle();
  }
  onVisibilityChange() {
    "visible" === document.visibilityState ? this.checkFocus() : this.endIdle();
  }
  manageCloseBtn(t2) {
    const e2 = this.optionFor(t2, "closeButton") || false;
    if ("auto" === e2) {
      const t3 = this.plugins.Toolbar;
      if (t3 && t3.state === dt.Ready)
        return;
    }
    if (!e2)
      return;
    if (!t2.contentEl || t2.closeBtnEl)
      return;
    const i2 = this.option("tpl.closeButton");
    if (i2) {
      const e3 = n(this.localize(i2));
      t2.closeBtnEl = t2.contentEl.appendChild(e3), t2.el && E(t2.el, "has-close-btn");
    }
  }
  manageCaption(t2) {
    var e2, i2;
    const n2 = "fancybox__caption", s2 = "has-caption", o2 = this.container;
    if (!o2)
      return;
    const a2 = this.isCompact || this.option("commonCaption"), r2 = !a2;
    if (this.caption && this.stop(this.caption), r2 && this.caption && (this.caption.remove(), this.caption = null), a2 && !this.caption)
      for (const t3 of (null === (e2 = this.carousel) || void 0 === e2 ? void 0 : e2.slides) || [])
        t3.captionEl && (t3.captionEl.remove(), t3.captionEl = void 0, S(t3.el, s2), null === (i2 = t3.el) || void 0 === i2 || i2.removeAttribute("aria-labelledby"));
    if (t2 || (t2 = this.getSlide()), !t2 || a2 && !this.isCurrentSlide(t2))
      return;
    const l2 = t2.el;
    let c2 = this.optionFor(t2, "caption", "");
    if ("string" != typeof c2 || !c2.length)
      return void (a2 && this.caption && this.animate(this.caption, "f-fadeOut", () => {
        var t3;
        null === (t3 = this.caption) || void 0 === t3 || t3.remove(), this.caption = null;
      }));
    let h2 = null;
    if (r2) {
      if (h2 = t2.captionEl || null, l2 && !h2) {
        const e3 = `fancybox__caption_${this.id}_${t2.index}`;
        h2 = document.createElement("div"), E(h2, n2), h2.setAttribute("id", e3), t2.captionEl = l2.appendChild(h2), E(l2, s2), l2.setAttribute("aria-labelledby", e3);
      }
    } else {
      if (h2 = this.caption, h2 || (h2 = o2.querySelector("." + n2)), !h2) {
        h2 = document.createElement("div"), h2.dataset.fancyboxCaption = "", E(h2, n2), h2.innerHTML = c2;
        (this.footer || o2).prepend(h2);
      }
      E(o2, s2), this.caption = h2;
    }
    h2 && (h2.innerHTML = c2);
  }
  checkFocus(t2) {
    var e2;
    const i2 = document.activeElement || null;
    i2 && (null === (e2 = this.container) || void 0 === e2 ? void 0 : e2.contains(i2)) || this.focus(t2);
  }
  focus(t2) {
    var e2;
    if (this.ignoreFocusChange)
      return;
    const i2 = document.activeElement || null, n2 = (null == t2 ? void 0 : t2.target) || null, s2 = this.container, o2 = this.getSlide();
    if (!s2 || !(null === (e2 = this.carousel) || void 0 === e2 ? void 0 : e2.viewport))
      return;
    if (!t2 && i2 && s2.contains(i2))
      return;
    const a2 = o2 && o2.state === Z.Ready ? o2.el : null;
    if (!a2 || a2.contains(i2) || s2 === i2)
      return;
    t2 && t2.cancelable && t2.preventDefault(), this.ignoreFocusChange = true;
    const r2 = Array.from(s2.querySelectorAll(X));
    let l2 = [], c2 = null;
    for (let t3 of r2) {
      const e3 = !t3.offsetParent || t3.closest('[aria-hidden="true"]'), i3 = a2 && a2.contains(t3), n3 = !this.carousel.viewport.contains(t3);
      t3 === s2 || (i3 || n3) && !e3 ? (l2.push(t3), void 0 !== t3.dataset.origTabindex && (t3.tabIndex = parseFloat(t3.dataset.origTabindex)), t3.removeAttribute("data-orig-tabindex"), !t3.hasAttribute("autoFocus") && c2 || (c2 = t3)) : (t3.dataset.origTabindex = void 0 === t3.dataset.origTabindex ? t3.getAttribute("tabindex") || void 0 : t3.dataset.origTabindex, t3.tabIndex = -1);
    }
    let h2 = null;
    t2 ? (!n2 || l2.indexOf(n2) < 0) && (h2 = c2 || s2, l2.length && (i2 === vt ? h2 = l2[0] : this.lastFocus !== s2 && i2 !== bt || (h2 = l2[l2.length - 1]))) : h2 = o2 && "image" === o2.type ? s2 : c2 || s2, h2 && Y(h2), this.lastFocus = document.activeElement, this.ignoreFocusChange = false;
  }
  next() {
    const t2 = this.carousel;
    t2 && t2.pages.length > 1 && t2.slideNext();
  }
  prev() {
    const t2 = this.carousel;
    t2 && t2.pages.length > 1 && t2.slidePrev();
  }
  jumpTo(...t2) {
    this.carousel && this.carousel.slideTo(...t2);
  }
  isTopmost() {
    var t2;
    return (null === (t2 = xt.getInstance()) || void 0 === t2 ? void 0 : t2.id) == this.id;
  }
  animate(t2 = null, e2 = "", i2) {
    if (!t2 || !e2)
      return void (i2 && i2());
    this.stop(t2);
    const n2 = (s2) => {
      s2.target === t2 && t2.dataset.animationName && (t2.removeEventListener("animationend", n2), delete t2.dataset.animationName, i2 && i2(), S(t2, e2));
    };
    t2.dataset.animationName = e2, t2.addEventListener("animationend", n2), E(t2, e2);
  }
  stop(t2) {
    t2 && t2.dispatchEvent(new CustomEvent("animationend", { bubbles: false, cancelable: true, currentTarget: t2 }));
  }
  setContent(t2, e2 = "", i2 = true) {
    if (this.isClosing())
      return;
    const s2 = t2.el;
    if (!s2)
      return;
    let o2 = null;
    if (x(e2) ? o2 = e2 : (o2 = n(e2 + ""), x(o2) || (o2 = document.createElement("div"), o2.innerHTML = e2 + "")), ["img", "picture", "iframe", "video", "audio"].includes(o2.nodeName.toLowerCase())) {
      const t3 = document.createElement("div");
      t3.appendChild(o2), o2 = t3;
    }
    x(o2) && t2.filter && !t2.error && (o2 = o2.querySelector(t2.filter)), o2 && x(o2) ? (E(o2, "fancybox__content"), t2.id && o2.setAttribute("id", t2.id), "none" !== o2.style.display && "none" !== getComputedStyle(o2).getPropertyValue("display") || (o2.style.display = t2.display || this.option("defaultDisplay") || "flex"), s2.classList.add(`has-${t2.error ? "error" : t2.type || "unknown"}`), s2.prepend(o2), t2.contentEl = o2, i2 && this.revealContent(t2), this.manageCloseBtn(t2), this.manageCaption(t2)) : this.setError(t2, "{{ELEMENT_NOT_FOUND}}");
  }
  revealContent(t2, e2) {
    const i2 = t2.el, n2 = t2.contentEl;
    i2 && n2 && (this.emit("reveal", t2), this.hideLoading(t2), t2.state = Z.Opening, (e2 = this.isOpeningSlide(t2) ? void 0 === e2 ? this.optionFor(t2, "showClass") : e2 : "f-fadeIn") ? this.animate(n2, e2, () => {
      this.done(t2);
    }) : this.done(t2));
  }
  done(t2) {
    this.isClosing() || (t2.state = Z.Ready, this.emit("done", t2), E(t2.el, "is-done"), this.isCurrentSlide(t2) && this.option("autoFocus") && queueMicrotask(() => {
      this.option("autoFocus") && (this.option("autoFocus") ? this.focus() : this.checkFocus());
    }), this.isOpeningSlide(t2) && !this.isCompact && this.option("idle") && this.setIdle());
  }
  isCurrentSlide(t2) {
    const e2 = this.getSlide();
    return !(!t2 || !e2) && e2.index === t2.index;
  }
  isOpeningSlide(t2) {
    var e2, i2;
    return null === (null === (e2 = this.carousel) || void 0 === e2 ? void 0 : e2.prevPage) && t2.index === (null === (i2 = this.getSlide()) || void 0 === i2 ? void 0 : i2.index);
  }
  showLoading(t2) {
    t2.state = Z.Loading;
    const e2 = t2.el;
    if (!e2)
      return;
    E(e2, "is-loading"), this.emit("loading", t2), t2.spinnerEl || setTimeout(() => {
      if (!this.isClosing() && !t2.spinnerEl && t2.state === Z.Loading) {
        let i2 = n(w);
        t2.spinnerEl = i2, e2.prepend(i2), this.animate(i2, "f-fadeIn");
      }
    }, 250);
  }
  hideLoading(t2) {
    const e2 = t2.el;
    if (!e2)
      return;
    const i2 = t2.spinnerEl;
    this.isClosing() ? null == i2 || i2.remove() : (S(e2, "is-loading"), i2 && this.animate(i2, "f-fadeOut", () => {
      i2.remove();
    }), t2.state === Z.Loading && (this.emit("loaded", t2), t2.state = Z.Ready));
  }
  setError(t2, e2) {
    if (this.isClosing())
      return;
    const i2 = new Event("error", { bubbles: true, cancelable: true });
    if (this.emit("error", i2, t2), i2.defaultPrevented)
      return;
    t2.error = e2, this.hideLoading(t2), this.clearContent(t2);
    const n2 = document.createElement("div");
    n2.classList.add("fancybox-error"), n2.innerHTML = this.localize(e2 || "<p>{{ERROR}}</p>"), this.setContent(t2, n2);
  }
  clearContent(t2) {
    var e2;
    null === (e2 = this.carousel) || void 0 === e2 || e2.emit("removeSlide", t2);
  }
  getSlide() {
    var t2;
    const e2 = this.carousel;
    return (null === (t2 = null == e2 ? void 0 : e2.pages[null == e2 ? void 0 : e2.page]) || void 0 === t2 ? void 0 : t2.slides[0]) || void 0;
  }
  close(t2, e2) {
    if (this.isClosing())
      return;
    const i2 = new Event("shouldClose", { bubbles: true, cancelable: true });
    if (this.emit("shouldClose", i2, t2), i2.defaultPrevented)
      return;
    t2 && t2.cancelable && (t2.preventDefault(), t2.stopPropagation());
    const n2 = this.fsAPI, s2 = () => {
      this.proceedClose(t2, e2);
    };
    n2 && n2.isFullscreen() ? Promise.resolve(n2.exit()).then(() => s2()) : s2();
  }
  clearIdle() {
    this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null;
  }
  setIdle(t2 = false) {
    const e2 = () => {
      this.clearIdle(), this.idle = true, E(this.container, "is-idle"), this.emit("setIdle");
    };
    if (this.clearIdle(), !this.isClosing())
      if (t2)
        e2();
      else {
        const t3 = this.option("idle");
        t3 && (this.idleTimer = setTimeout(e2, t3));
      }
  }
  endIdle() {
    this.clearIdle(), this.idle && !this.isClosing() && (this.idle = false, S(this.container, "is-idle"), this.emit("endIdle"));
  }
  resetIdle() {
    this.endIdle(), this.setIdle();
  }
  toggleIdle() {
    this.idle ? this.endIdle() : this.setIdle(true);
  }
  toggleFullscreen() {
    const t2 = this.fsAPI;
    t2 && (t2.isFullscreen() ? t2.exit() : this.container && t2.request(this.container));
  }
  isClosing() {
    return [V.Closing, V.CustomClosing, V.Destroy].includes(this.state);
  }
  proceedClose(t2, e2) {
    var i2, n2;
    this.state = V.Closing, this.clearIdle(), this.detachEvents();
    const s2 = this.container, o2 = this.carousel, a2 = this.getSlide(), r2 = a2 && this.option("placeFocusBack") ? a2.triggerEl || this.option("triggerEl") : null;
    if (r2 && (N(r2) ? Y(r2) : r2.focus()), s2 && (E(s2, "is-closing"), s2.setAttribute("aria-hidden", "true"), this.option("animated") && E(s2, "is-animated"), s2.style.pointerEvents = "none"), o2) {
      o2.clearTransitions(), null === (i2 = o2.panzoom) || void 0 === i2 || i2.destroy(), null === (n2 = o2.plugins.Navigation) || void 0 === n2 || n2.detach();
      for (const t3 of o2.slides) {
        t3.state = Z.Closing, this.hideLoading(t3);
        const e3 = t3.contentEl;
        e3 && this.stop(e3);
        const i3 = null == t3 ? void 0 : t3.panzoom;
        i3 && (i3.stop(), i3.detachEvents(), i3.detachObserver()), this.isCurrentSlide(t3) || o2.emit("removeSlide", t3);
      }
    }
    this.emit("close", t2), this.state !== V.CustomClosing ? (void 0 === e2 && a2 && (e2 = this.optionFor(a2, "hideClass")), e2 && a2 ? (this.animate(a2.contentEl, e2, () => {
      o2 && o2.emit("removeSlide", a2);
    }), setTimeout(() => {
      this.destroy();
    }, 500)) : this.destroy()) : setTimeout(() => {
      this.destroy();
    }, 500);
  }
  destroy() {
    var t2;
    if (this.state === V.Destroy)
      return;
    this.state = V.Destroy, null === (t2 = this.carousel) || void 0 === t2 || t2.destroy();
    const e2 = this.container;
    e2 && e2.remove(), yt.delete(this.id);
    const i2 = xt.getInstance();
    i2 ? i2.focus() : (bt && (bt.remove(), bt = null), vt && (vt.remove(), vt = null), S(document.documentElement, "with-fancybox"), (() => {
      if (!W)
        return;
      const t3 = document, e3 = t3.body;
      e3.classList.remove("hide-scrollbar"), e3.style.setProperty("--fancybox-body-margin", ""), t3.documentElement.style.setProperty("--fancybox-scrollbar-compensate", "");
    })(), this.emit("destroy"));
  }
  static bind(t2, e2, i2) {
    if (!W)
      return;
    let n2, s2 = "", o2 = {};
    if (void 0 === t2 ? n2 = document.body : "string" == typeof t2 ? (n2 = document.body, s2 = t2, "object" == typeof e2 && (o2 = e2 || {})) : (n2 = t2, "string" == typeof e2 && (s2 = e2), "object" == typeof i2 && (o2 = i2 || {})), !n2 || !x(n2))
      return;
    s2 = s2 || "[data-fancybox]";
    const a2 = xt.openers.get(n2) || /* @__PURE__ */ new Map();
    a2.set(s2, o2), xt.openers.set(n2, a2), 1 === a2.size && n2.addEventListener("click", xt.fromEvent);
  }
  static unbind(t2, e2) {
    let i2, n2 = "";
    if ("string" == typeof t2 ? (i2 = document.body, n2 = t2) : (i2 = t2, "string" == typeof e2 && (n2 = e2)), !i2)
      return;
    const s2 = xt.openers.get(i2);
    s2 && n2 && s2.delete(n2), n2 && s2 || (xt.openers.delete(i2), i2.removeEventListener("click", xt.fromEvent));
  }
  static destroy() {
    let t2;
    for (; t2 = xt.getInstance(); )
      t2.destroy();
    for (const t3 of xt.openers.keys())
      t3.removeEventListener("click", xt.fromEvent);
    xt.openers = /* @__PURE__ */ new Map();
  }
  static fromEvent(t2) {
    if (t2.defaultPrevented)
      return;
    if (t2.button && 0 !== t2.button)
      return;
    if (t2.ctrlKey || t2.metaKey || t2.shiftKey)
      return;
    let e2 = t2.composedPath()[0];
    const i2 = e2.closest("[data-fancybox-trigger]");
    if (i2) {
      const t3 = i2.dataset.fancyboxTrigger || "", n3 = document.querySelectorAll(`[data-fancybox="${t3}"]`), s3 = parseInt(i2.dataset.fancyboxIndex || "", 10) || 0;
      e2 = n3[s3] || e2;
    }
    if (!(e2 && e2 instanceof Element))
      return;
    let n2, s2, o2, a2;
    if ([...xt.openers].reverse().find(([t3, i3]) => !(!t3.contains(e2) || ![...i3].reverse().find(([i4, r3]) => {
      let l3 = e2.closest(i4);
      return !!l3 && (n2 = t3, s2 = i4, o2 = l3, a2 = r3, true);
    }))), !n2 || !s2 || !o2)
      return;
    a2 = a2 || {}, t2.preventDefault(), e2 = o2;
    let r2 = [], l2 = u({}, q, a2);
    l2.event = t2, l2.triggerEl = e2, l2.delegate = i2;
    const c2 = l2.groupAll, h2 = l2.groupAttr, d2 = h2 && e2 ? e2.getAttribute(`${h2}`) : "";
    if ((!e2 || d2 || c2) && (r2 = [].slice.call(n2.querySelectorAll(s2))), e2 && !c2 && (r2 = d2 ? r2.filter((t3) => t3.getAttribute(`${h2}`) === d2) : [e2]), !r2.length)
      return;
    const p2 = xt.getInstance();
    return p2 && p2.options.triggerEl && r2.indexOf(p2.options.triggerEl) > -1 ? void 0 : (e2 && (l2.startIndex = r2.indexOf(e2)), xt.fromNodes(r2, l2));
  }
  static fromSelector(t2, e2) {
    let i2 = null, n2 = "";
    if ("string" == typeof t2 ? (i2 = document.body, n2 = t2) : t2 instanceof HTMLElement && "string" == typeof e2 && (i2 = t2, n2 = e2), !i2 || !n2)
      return false;
    const s2 = xt.openers.get(i2);
    if (!s2)
      return false;
    const o2 = s2.get(n2);
    return !!o2 && xt.fromNodes(Array.from(i2.querySelectorAll(n2)), o2);
  }
  static fromNodes(t2, e2) {
    e2 = u({}, q, e2 || {});
    const i2 = [];
    for (const n2 of t2) {
      const t3 = n2.dataset || {}, s2 = t3.src || n2.getAttribute("href") || n2.getAttribute("currentSrc") || n2.getAttribute("src") || void 0;
      let o2;
      const a2 = e2.delegate;
      let r2;
      a2 && i2.length === e2.startIndex && (o2 = a2 instanceof HTMLImageElement ? a2 : a2.querySelector("img:not([aria-hidden])")), o2 || (o2 = n2 instanceof HTMLImageElement ? n2 : n2.querySelector("img:not([aria-hidden])")), o2 && (r2 = o2.currentSrc || o2.src || void 0, !r2 && o2.dataset && (r2 = o2.dataset.lazySrc || o2.dataset.src || void 0));
      const l2 = { src: s2, triggerEl: n2, thumbEl: o2, thumbElSrc: r2, thumbSrc: r2 };
      for (const e3 in t3)
        "fancybox" !== e3 && (l2[e3] = t3[e3] + "");
      i2.push(l2);
    }
    return new xt(i2, e2);
  }
  static getInstance(t2) {
    if (t2)
      return yt.get(t2);
    return Array.from(yt.values()).reverse().find((t3) => !t3.isClosing() && t3) || null;
  }
  static getSlide() {
    var t2;
    return (null === (t2 = xt.getInstance()) || void 0 === t2 ? void 0 : t2.getSlide()) || null;
  }
  static show(t2 = [], e2 = {}) {
    return new xt(t2, e2);
  }
  static next() {
    const t2 = xt.getInstance();
    t2 && t2.next();
  }
  static prev() {
    const t2 = xt.getInstance();
    t2 && t2.prev();
  }
  static close(t2 = true, ...e2) {
    if (t2)
      for (const t3 of yt.values())
        t3.close(...e2);
    else {
      const t3 = xt.getInstance();
      t3 && t3.close(...e2);
    }
  }
}
Object.defineProperty(xt, "version", { enumerable: true, configurable: true, writable: true, value: "5.0.19" }), Object.defineProperty(xt, "defaults", { enumerable: true, configurable: true, writable: true, value: q }), Object.defineProperty(xt, "Plugins", { enumerable: true, configurable: true, writable: true, value: mt }), Object.defineProperty(xt, "openers", { enumerable: true, configurable: true, writable: true, value: /* @__PURE__ */ new Map() });
export {
  _ as Carousel,
  xt as Fancybox,
  T as Panzoom
};
