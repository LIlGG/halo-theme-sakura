import { i as isDimensionStacked, e as enableDataStack, g as getStackedDimension, M as Model, c as createScaleByModel, n as niceScaleExtent, A as AxisModelCommonMixin, a as createTextStyle$1, b as createSymbol, d as enableHoverEmphasis, f as getECData, h as getLayoutRect, j as MAX_SAFE_INTEGER, k as asc, l as getPercentWithPrecision, m as getPixelPrecision, o as getPrecision, p as getPrecisionSafe, q as isNumeric, r as isRadianAroundZero, s as linearMap, t as nice, u as numericToNumber, v as parseDate, w as quantile, x as quantity, y as quantityExponent, z as reformIntervals, B as remRadian, C as round, D as format$1, E as Arc, F as BezierCurve, G as Circle, H as Ellipse, I as Group, J as IncrementalDisplayable, L as Line, K as LinearGradient, P as Polygon, N as Polyline, R as RadialGradient, O as Ring, S as Sector, Q as clipPointsByRect, T as clipRectByRect, U as createIcon, V as extendPath, W as extendShape, X as getShapeClass, Y as getTransform, Z as initProps, _ as makeImage, $ as makePath, a0 as mergePath, a1 as registerShape, a2 as resizePath, a3 as updateProps, a4 as addCommas, a5 as capitalFirst, a6 as formatTime, a7 as formatTpl, a8 as getTooltipMarker, a9 as normalizeCssArray, aa as toCamelCase, ab as ComponentModel, ac as ComponentView, ad as SeriesModel, ae as ChartView } from "./Axis-1d2b148d.js";
import { aM, aI, ah, aj, aF, ag, ak, al, am, ax, an, ao, aD, ai, aL, aL as aL2, av, aw, ay, aA, aG, aC, as, at, aq, ar, ap, aE, au, az, aB, aJ, aK, af, aH } from "./Axis-1d2b148d.js";
import { Z as ZRText, m as mixin, B as BoundingRect, C as CompoundPath, a as ZRImage, R as Rect, e as encodeHTML, t as truncateText, b as bind, c as clone, d as curry, f as defaults, g as each, h as extend, i as filter, j as indexOf, k as inherits, l as isArray, n as isFunction, o as isObject, p as isString, q as map, r as merge, s as reduce } from "./graphic-c958e8df.js";
import { x, z, A, u, y, v, w } from "./graphic-c958e8df.js";
import { c as createSeriesData, a as createDimensions } from "./createSeriesData-47a0bdc8.js";
function getTextRect(text, font, align, verticalAlign, padding, rich, truncate, lineHeight) {
  var textEl = new ZRText({
    style: {
      text,
      font,
      align,
      verticalAlign,
      padding,
      rich,
      overflow: truncate ? "truncate" : null,
      lineHeight
    }
  });
  return textEl.getBoundingRect();
}
function createList(seriesModel) {
  return createSeriesData(null, seriesModel);
}
var dataStack = {
  isDimensionStacked,
  enableDataStack,
  getStackedDimension
};
function createScale(dataExtent, option) {
  var axisModel = option;
  if (!(option instanceof Model)) {
    axisModel = new Model(option);
  }
  var scale = createScaleByModel(axisModel);
  scale.setExtent(dataExtent[0], dataExtent[1]);
  niceScaleExtent(scale, axisModel);
  return scale;
}
function mixinAxisModelCommonMethods(Model2) {
  mixin(Model2, AxisModelCommonMixin);
}
function createTextStyle(textStyleModel, opts) {
  opts = opts || {};
  return createTextStyle$1(textStyleModel, null, null, opts.state !== "normal");
}
const helper = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createDimensions,
  createList,
  createScale,
  createSymbol,
  createTextStyle,
  dataStack,
  enableHoverEmphasis,
  getECData,
  getLayoutRect,
  mixinAxisModelCommonMethods
}, Symbol.toStringTag, { value: "Module" }));
const number = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MAX_SAFE_INTEGER,
  asc,
  getPercentWithPrecision,
  getPixelPrecision,
  getPrecision,
  getPrecisionSafe,
  isNumeric,
  isRadianAroundZero,
  linearMap,
  nice,
  numericToNumber,
  parseDate,
  quantile,
  quantity,
  quantityExponent,
  reformIntervals,
  remRadian,
  round
}, Symbol.toStringTag, { value: "Module" }));
const time = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  format: format$1,
  parse: parseDate
}, Symbol.toStringTag, { value: "Module" }));
const graphic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc,
  BezierCurve,
  BoundingRect,
  Circle,
  CompoundPath,
  Ellipse,
  Group,
  Image: ZRImage,
  IncrementalDisplayable,
  Line,
  LinearGradient,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Ring,
  Sector,
  Text: ZRText,
  clipPointsByRect,
  clipRectByRect,
  createIcon,
  extendPath,
  extendShape,
  getShapeClass,
  getTransform,
  initProps,
  makeImage,
  makePath,
  mergePath,
  registerShape,
  resizePath,
  updateProps
}, Symbol.toStringTag, { value: "Module" }));
const format = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addCommas,
  capitalFirst,
  encodeHTML,
  formatTime,
  formatTpl,
  getTextRect,
  getTooltipMarker,
  normalizeCssArray,
  toCamelCase,
  truncateText
}, Symbol.toStringTag, { value: "Module" }));
const util = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind,
  clone,
  curry,
  defaults,
  each,
  extend,
  filter,
  indexOf,
  inherits,
  isArray,
  isFunction,
  isObject,
  isString,
  map,
  merge,
  reduce
}, Symbol.toStringTag, { value: "Module" }));
function extendComponentModel(proto) {
  var Model2 = ComponentModel.extend(proto);
  ComponentModel.registerClass(Model2);
  return Model2;
}
function extendComponentView(proto) {
  var View = ComponentView.extend(proto);
  ComponentView.registerClass(View);
  return View;
}
function extendSeriesModel(proto) {
  var Model2 = SeriesModel.extend(proto);
  SeriesModel.registerClass(Model2);
  return Model2;
}
function extendChartView(proto) {
  var View = ChartView.extend(proto);
  ChartView.registerClass(View);
  return View;
}
export {
  aM as Axis,
  ChartView,
  ComponentModel,
  ComponentView,
  aI as List,
  Model,
  ah as PRIORITY,
  SeriesModel,
  x as color,
  aj as connect,
  aF as dataTool,
  ag as dependencies,
  ak as disConnect,
  al as disconnect,
  am as dispose,
  z as env,
  extendChartView,
  extendComponentModel,
  extendComponentView,
  extendSeriesModel,
  format,
  ax as getCoordinateSystemDimensions,
  an as getInstanceByDom,
  ao as getInstanceById,
  aD as getMap,
  graphic,
  helper,
  ai as init,
  A as innerDrawElementOnCanvas,
  u as matrix,
  number,
  aL as parseGeoJSON,
  aL2 as parseGeoJson,
  av as registerAction,
  aw as registerCoordinateSystem,
  ay as registerLayout,
  aA as registerLoading,
  aG as registerLocale,
  aC as registerMap,
  as as registerPostInit,
  at as registerPostUpdate,
  aq as registerPreprocessor,
  ar as registerProcessor,
  ap as registerTheme,
  aE as registerTransform,
  au as registerUpdateLifecycle,
  az as registerVisual,
  aB as setCanvasCreator,
  y as setPlatformAPI,
  aJ as throttle,
  time,
  aK as use,
  util,
  v as vector,
  af as version,
  w as zrUtil,
  aH as zrender
};
