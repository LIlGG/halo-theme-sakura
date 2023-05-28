import { g as getDefaultExportFromCjs, c as commonjsGlobal } from "../main.min.js";
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
var js = { exports: {} };
var defaultOptions;
var hasRequiredDefaultOptions;
function requireDefaultOptions() {
  if (hasRequiredDefaultOptions)
    return defaultOptions;
  hasRequiredDefaultOptions = 1;
  defaultOptions = {
    // Where to render the table of contents.
    tocSelector: ".js-toc",
    // Where to grab the headings to build the table of contents.
    contentSelector: ".js-toc-content",
    // Which headings to grab inside of the contentSelector element.
    headingSelector: "h1, h2, h3",
    // Headings that match the ignoreSelector will be skipped.
    ignoreSelector: ".js-toc-ignore",
    // For headings inside relative or absolute positioned containers within content
    hasInnerContainers: false,
    // Main class to add to links.
    linkClass: "toc-link",
    // Extra classes to add to links.
    extraLinkClasses: "",
    // Class to add to active links,
    // the link corresponding to the top most heading on the page.
    activeLinkClass: "is-active-link",
    // Main class to add to lists.
    listClass: "toc-list",
    // Extra classes to add to lists.
    extraListClasses: "",
    // Class that gets added when a list should be collapsed.
    isCollapsedClass: "is-collapsed",
    // Class that gets added when a list should be able
    // to be collapsed but isn't necessarily collapsed.
    collapsibleClass: "is-collapsible",
    // Class to add to list items.
    listItemClass: "toc-list-item",
    // Class to add to active list items.
    activeListItemClass: "is-active-li",
    // How many heading levels should not be collapsed.
    // For example, number 6 will show everything since
    // there are only 6 heading levels and number 0 will collapse them all.
    // The sections that are hidden will open
    // and close as you scroll to headings within them.
    collapseDepth: 0,
    // Smooth scrolling enabled.
    scrollSmooth: true,
    // Smooth scroll duration.
    scrollSmoothDuration: 420,
    // Smooth scroll offset.
    scrollSmoothOffset: 0,
    // Callback for scroll end.
    scrollEndCallback: function(e) {
    },
    // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
    headingsOffset: 1,
    // Timeout between events firing to make sure it's
    // not too rapid (for performance reasons).
    throttleTimeout: 50,
    // Element to add the positionFixedClass to.
    positionFixedSelector: null,
    // Fixed position class to add to make sidebar fixed after scrolling
    // down past the fixedSidebarOffset.
    positionFixedClass: "is-position-fixed",
    // fixedSidebarOffset can be any number but by default is set
    // to auto which sets the fixedSidebarOffset to the sidebar
    // element's offsetTop from the top of the document on init.
    fixedSidebarOffset: "auto",
    // includeHtml can be set to true to include the HTML markup from the
    // heading node instead of just including the textContent.
    includeHtml: false,
    // includeTitleTags automatically sets the html title tag of the link
    // to match the title. This can be useful for SEO purposes or
    // when truncating titles.
    includeTitleTags: false,
    // onclick function to apply to all links in toc. will be called with
    // the event as the first parameter, and this can be used to stop,
    // propagation, prevent default or perform action
    onClick: function(e) {
    },
    // orderedList can be set to false to generate unordered lists (ul)
    // instead of ordered lists (ol)
    orderedList: true,
    // If there is a fixed article scroll container, set to calculate titles' offset
    scrollContainer: null,
    // prevent ToC DOM rendering if it's already rendered by an external system
    skipRendering: false,
    // Optional callback to change heading labels.
    // For example it can be used to cut down and put ellipses on multiline headings you deem too long.
    // Called each time a heading is parsed. Expects a string and returns the modified label to display.
    // Additionally, the attribute `data-heading-label` may be used on a heading to specify
    // a shorter string to be used in the TOC.
    // function (string) => string
    headingLabelCallback: false,
    // ignore headings that are hidden in DOM
    ignoreHiddenElements: false,
    // Optional callback to modify properties of parsed headings.
    // The heading element is passed in node parameter and information parsed by default parser is provided in obj parameter.
    // Function has to return the same or modified obj.
    // The heading will be excluded from TOC if nothing is returned.
    // function (object, HTMLElement) => object | void
    headingObjectCallback: null,
    // Set the base path, useful if you use a `base` tag in `head`.
    basePath: "",
    // Only takes affect when `tocSelector` is scrolling,
    // keep the toc scroll position in sync with the content.
    disableTocScrollSync: false,
    // Offset for the toc scroll (top) position when scrolling the page.
    // Only effective if `disableTocScrollSync` is false.
    tocScrollOffset: 0
  };
  return defaultOptions;
}
var buildHtml;
var hasRequiredBuildHtml;
function requireBuildHtml() {
  if (hasRequiredBuildHtml)
    return buildHtml;
  hasRequiredBuildHtml = 1;
  buildHtml = function(options) {
    var forEach = [].forEach;
    var some = [].some;
    var body = document.body;
    var tocElement;
    var currentlyHighlighting = true;
    var SPACE_CHAR = " ";
    function createEl(d, container) {
      var link = container.appendChild(createLink(d));
      if (d.children.length) {
        var list = createList(d.isCollapsed);
        d.children.forEach(function(child) {
          createEl(child, list);
        });
        link.appendChild(list);
      }
    }
    function render(parent, data) {
      var collapsed = false;
      var container = createList(collapsed);
      data.forEach(function(d) {
        createEl(d, container);
      });
      tocElement = parent || tocElement;
      if (tocElement === null) {
        return;
      }
      if (tocElement.firstChild) {
        tocElement.removeChild(tocElement.firstChild);
      }
      if (data.length === 0) {
        return tocElement;
      }
      return tocElement.appendChild(container);
    }
    function createLink(data) {
      var item = document.createElement("li");
      var a = document.createElement("a");
      if (options.listItemClass) {
        item.setAttribute("class", options.listItemClass);
      }
      if (options.onClick) {
        a.onclick = options.onClick;
      }
      if (options.includeTitleTags) {
        a.setAttribute("title", data.textContent);
      }
      if (options.includeHtml && data.childNodes.length) {
        forEach.call(data.childNodes, function(node) {
          a.appendChild(node.cloneNode(true));
        });
      } else {
        a.textContent = data.textContent;
      }
      a.setAttribute("href", options.basePath + "#" + data.id);
      a.setAttribute("class", options.linkClass + SPACE_CHAR + "node-name--" + data.nodeName + SPACE_CHAR + options.extraLinkClasses);
      item.appendChild(a);
      return item;
    }
    function createList(isCollapsed) {
      var listElement = options.orderedList ? "ol" : "ul";
      var list = document.createElement(listElement);
      var classes = options.listClass + SPACE_CHAR + options.extraListClasses;
      if (isCollapsed) {
        classes = classes + SPACE_CHAR + options.collapsibleClass;
        classes = classes + SPACE_CHAR + options.isCollapsedClass;
      }
      list.setAttribute("class", classes);
      return list;
    }
    function updateFixedSidebarClass() {
      if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
        var top;
        top = document.querySelector(options.scrollContainer).scrollTop;
      } else {
        top = document.documentElement.scrollTop || body.scrollTop;
      }
      var posFixedEl = document.querySelector(options.positionFixedSelector);
      if (options.fixedSidebarOffset === "auto") {
        options.fixedSidebarOffset = tocElement.offsetTop;
      }
      if (top > options.fixedSidebarOffset) {
        if (posFixedEl.className.indexOf(options.positionFixedClass) === -1) {
          posFixedEl.className += SPACE_CHAR + options.positionFixedClass;
        }
      } else {
        posFixedEl.className = posFixedEl.className.split(SPACE_CHAR + options.positionFixedClass).join("");
      }
    }
    function getHeadingTopPos(obj) {
      var position = 0;
      if (obj !== null) {
        position = obj.offsetTop;
        if (options.hasInnerContainers) {
          position += getHeadingTopPos(obj.offsetParent);
        }
      }
      return position;
    }
    function updateToc(headingsArray) {
      if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
        var top;
        top = document.querySelector(options.scrollContainer).scrollTop;
      } else {
        top = document.documentElement.scrollTop || body.scrollTop;
      }
      if (options.positionFixedSelector) {
        updateFixedSidebarClass();
      }
      var headings = headingsArray;
      var topHeader;
      if (currentlyHighlighting && tocElement !== null && headings.length > 0) {
        some.call(headings, function(heading, i) {
          if (getHeadingTopPos(heading) > top + options.headingsOffset + 10) {
            var index2 = i === 0 ? i : i - 1;
            topHeader = headings[index2];
            return true;
          } else if (i === headings.length - 1) {
            topHeader = headings[headings.length - 1];
            return true;
          }
        });
        var oldActiveTocLink = tocElement.querySelector("." + options.activeLinkClass);
        var activeTocLink = tocElement.querySelector("." + options.linkClass + ".node-name--" + topHeader.nodeName + '[href="' + options.basePath + "#" + topHeader.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, "\\$1") + '"]');
        if (oldActiveTocLink === activeTocLink) {
          return;
        }
        var tocLinks = tocElement.querySelectorAll("." + options.linkClass);
        forEach.call(tocLinks, function(tocLink) {
          tocLink.className = tocLink.className.split(SPACE_CHAR + options.activeLinkClass).join("");
        });
        var tocLis = tocElement.querySelectorAll("." + options.listItemClass);
        forEach.call(tocLis, function(tocLi) {
          tocLi.className = tocLi.className.split(SPACE_CHAR + options.activeListItemClass).join("");
        });
        if (activeTocLink && activeTocLink.className.indexOf(options.activeLinkClass) === -1) {
          activeTocLink.className += SPACE_CHAR + options.activeLinkClass;
        }
        var li = activeTocLink && activeTocLink.parentNode;
        if (li && li.className.indexOf(options.activeListItemClass) === -1) {
          li.className += SPACE_CHAR + options.activeListItemClass;
        }
        var tocLists = tocElement.querySelectorAll("." + options.listClass + "." + options.collapsibleClass);
        forEach.call(tocLists, function(list) {
          if (list.className.indexOf(options.isCollapsedClass) === -1) {
            list.className += SPACE_CHAR + options.isCollapsedClass;
          }
        });
        if (activeTocLink && activeTocLink.nextSibling && activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass) !== -1) {
          activeTocLink.nextSibling.className = activeTocLink.nextSibling.className.split(SPACE_CHAR + options.isCollapsedClass).join("");
        }
        removeCollapsedFromParents(activeTocLink && activeTocLink.parentNode.parentNode);
      }
    }
    function removeCollapsedFromParents(element) {
      if (element && element.className.indexOf(options.collapsibleClass) !== -1 && element.className.indexOf(options.isCollapsedClass) !== -1) {
        element.className = element.className.split(SPACE_CHAR + options.isCollapsedClass).join("");
        return removeCollapsedFromParents(element.parentNode.parentNode);
      }
      return element;
    }
    function disableTocAnimation(event) {
      var target = event.target || event.srcElement;
      if (typeof target.className !== "string" || target.className.indexOf(options.linkClass) === -1) {
        return;
      }
      currentlyHighlighting = false;
    }
    function enableTocAnimation() {
      currentlyHighlighting = true;
    }
    return {
      enableTocAnimation,
      disableTocAnimation,
      render,
      updateToc
    };
  };
  return buildHtml;
}
var parseContent;
var hasRequiredParseContent;
function requireParseContent() {
  if (hasRequiredParseContent)
    return parseContent;
  hasRequiredParseContent = 1;
  parseContent = function parseContent2(options) {
    var reduce = [].reduce;
    function getLastItem(array) {
      return array[array.length - 1];
    }
    function getHeadingLevel(heading) {
      return +heading.nodeName.toUpperCase().replace("H", "");
    }
    function getHeadingObject(heading) {
      if (!(heading instanceof window.HTMLElement))
        return heading;
      if (options.ignoreHiddenElements && (!heading.offsetHeight || !heading.offsetParent)) {
        return null;
      }
      const headingLabel = heading.getAttribute("data-heading-label") || (options.headingLabelCallback ? String(options.headingLabelCallback(heading.textContent)) : heading.textContent.trim());
      var obj = {
        id: heading.id,
        children: [],
        nodeName: heading.nodeName,
        headingLevel: getHeadingLevel(heading),
        textContent: headingLabel
      };
      if (options.includeHtml) {
        obj.childNodes = heading.childNodes;
      }
      if (options.headingObjectCallback) {
        return options.headingObjectCallback(obj, heading);
      }
      return obj;
    }
    function addNode(node, nest) {
      var obj = getHeadingObject(node);
      var level = obj.headingLevel;
      var array = nest;
      var lastItem = getLastItem(array);
      var lastItemLevel = lastItem ? lastItem.headingLevel : 0;
      var counter = level - lastItemLevel;
      while (counter > 0) {
        lastItem = getLastItem(array);
        if (lastItem && level === lastItem.headingLevel) {
          break;
        } else if (lastItem && lastItem.children !== void 0) {
          array = lastItem.children;
        }
        counter--;
      }
      if (level >= options.collapseDepth) {
        obj.isCollapsed = true;
      }
      array.push(obj);
      return array;
    }
    function selectHeadings(contentElement, headingSelector) {
      var selectors = headingSelector;
      if (options.ignoreSelector) {
        selectors = headingSelector.split(",").map(function mapSelectors(selector) {
          return selector.trim() + ":not(" + options.ignoreSelector + ")";
        });
      }
      try {
        return contentElement.querySelectorAll(selectors);
      } catch (e) {
        console.warn("Headers not found with selector: " + selectors);
        return null;
      }
    }
    function nestHeadingsArray(headingsArray) {
      return reduce.call(headingsArray, function reducer(prev, curr) {
        var currentHeading = getHeadingObject(curr);
        if (currentHeading) {
          addNode(currentHeading, prev.nest);
        }
        return prev;
      }, {
        nest: []
      });
    }
    return {
      nestHeadingsArray,
      selectHeadings
    };
  };
  return parseContent;
}
var updateTocScroll;
var hasRequiredUpdateTocScroll;
function requireUpdateTocScroll() {
  if (hasRequiredUpdateTocScroll)
    return updateTocScroll;
  hasRequiredUpdateTocScroll = 1;
  updateTocScroll = function updateTocScroll2(options) {
    var toc = options.tocElement || document.querySelector(options.tocSelector);
    if (toc && toc.scrollHeight > toc.clientHeight) {
      var activeItem = toc.querySelector("." + options.activeListItemClass);
      if (activeItem) {
        toc.scrollTop = activeItem.offsetTop - options.tocScrollOffset;
      }
    }
  };
  return updateTocScroll;
}
var scrollSmooth = {};
var hasRequiredScrollSmooth;
function requireScrollSmooth() {
  if (hasRequiredScrollSmooth)
    return scrollSmooth;
  hasRequiredScrollSmooth = 1;
  scrollSmooth.initSmoothScrolling = initSmoothScrolling;
  function initSmoothScrolling(options) {
    var duration = options.duration;
    var offset = options.offset;
    var pageUrl = location.hash ? stripHash(location.href) : location.href;
    delegatedLinkHijacking();
    function delegatedLinkHijacking() {
      document.body.addEventListener("click", onClick, false);
      function onClick(e) {
        if (!isInPageLink(e.target) || e.target.className.indexOf("no-smooth-scroll") > -1 || e.target.href.charAt(e.target.href.length - 2) === "#" && e.target.href.charAt(e.target.href.length - 1) === "!" || e.target.className.indexOf(options.linkClass) === -1) {
          return;
        }
        jump(e.target.hash, {
          duration,
          offset,
          callback: function() {
            setFocus(e.target.hash);
          }
        });
      }
    }
    function isInPageLink(n) {
      return n.tagName.toLowerCase() === "a" && (n.hash.length > 0 || n.href.charAt(n.href.length - 1) === "#") && (stripHash(n.href) === pageUrl || stripHash(n.href) + "#" === pageUrl);
    }
    function stripHash(url) {
      return url.slice(0, url.lastIndexOf("#"));
    }
    function setFocus(hash) {
      var element = document.getElementById(hash.substring(1));
      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }
        element.focus();
      }
    }
  }
  function jump(target, options) {
    var start = window.pageYOffset;
    var opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    };
    var tgt = document.querySelector('[id="' + decodeURI(target).split("#").join("") + '"]') || document.querySelector('[id="' + target.split("#").join("") + '"]');
    var distance = typeof target === "string" ? opt.offset + (target ? tgt && tgt.getBoundingClientRect().top || 0 : -(document.documentElement.scrollTop || document.body.scrollTop)) : target;
    var duration = typeof opt.duration === "function" ? opt.duration(distance) : opt.duration;
    var timeStart;
    var timeElapsed;
    requestAnimationFrame(function(time) {
      timeStart = time;
      loop(time);
    });
    function loop(time) {
      timeElapsed = time - timeStart;
      window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
      if (timeElapsed < duration) {
        requestAnimationFrame(loop);
      } else {
        end();
      }
    }
    function end() {
      window.scrollTo(0, start + distance);
      if (typeof opt.callback === "function") {
        opt.callback();
      }
    }
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1)
        return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  }
  return scrollSmooth;
}
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(root);
    }
  })(typeof commonjsGlobal !== "undefined" ? commonjsGlobal : window || commonjsGlobal, function(root) {
    var defaultOptions2 = requireDefaultOptions();
    var options = {};
    var tocbot = {};
    var BuildHtml = requireBuildHtml();
    var ParseContent = requireParseContent();
    var updateTocScroll2 = requireUpdateTocScroll();
    var buildHtml2;
    var parseContent2;
    var supports = !!root && !!root.document && !!root.document.querySelector && !!root.addEventListener;
    if (typeof window === "undefined" && !supports) {
      return;
    }
    var headingsArray;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend() {
      var target = {};
      for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
    function throttle(fn, threshold, scope) {
      threshold || (threshold = 250);
      var last;
      var deferTimer;
      return function() {
        var context = scope || this;
        var now = +/* @__PURE__ */ new Date();
        var args = arguments;
        if (last && now < last + threshold) {
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function() {
            last = now;
            fn.apply(context, args);
          }, threshold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }
    function getContentElement(options2) {
      try {
        return options2.contentElement || document.querySelector(options2.contentSelector);
      } catch (e) {
        console.warn("Contents element not found: " + options2.contentSelector);
        return null;
      }
    }
    function getTocElement(options2) {
      try {
        return options2.tocElement || document.querySelector(options2.tocSelector);
      } catch (e) {
        console.warn("TOC element not found: " + options2.tocSelector);
        return null;
      }
    }
    tocbot.destroy = function() {
      var tocElement = getTocElement(options);
      if (tocElement === null) {
        return;
      }
      if (!options.skipRendering) {
        if (tocElement) {
          tocElement.innerHTML = "";
        }
      }
      if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
        document.querySelector(options.scrollContainer).removeEventListener("scroll", this._scrollListener, false);
        document.querySelector(options.scrollContainer).removeEventListener("resize", this._scrollListener, false);
        if (buildHtml2) {
          document.querySelector(options.scrollContainer).removeEventListener("click", this._clickListener, false);
        }
      } else {
        document.removeEventListener("scroll", this._scrollListener, false);
        document.removeEventListener("resize", this._scrollListener, false);
        if (buildHtml2) {
          document.removeEventListener("click", this._clickListener, false);
        }
      }
    };
    tocbot.init = function(customOptions) {
      if (!supports) {
        return;
      }
      options = extend(defaultOptions2, customOptions || {});
      this.options = options;
      this.state = {};
      if (options.scrollSmooth) {
        options.duration = options.scrollSmoothDuration;
        options.offset = options.scrollSmoothOffset;
        tocbot.scrollSmooth = requireScrollSmooth().initSmoothScrolling(options);
      }
      buildHtml2 = BuildHtml(options);
      parseContent2 = ParseContent(options);
      this._buildHtml = buildHtml2;
      this._parseContent = parseContent2;
      this._headingsArray = headingsArray;
      tocbot.destroy();
      var contentElement = getContentElement(options);
      if (contentElement === null) {
        return;
      }
      var tocElement = getTocElement(options);
      if (tocElement === null) {
        return;
      }
      headingsArray = parseContent2.selectHeadings(contentElement, options.headingSelector);
      if (headingsArray === null) {
        return;
      }
      var nestedHeadingsObj = parseContent2.nestHeadingsArray(headingsArray);
      var nestedHeadings = nestedHeadingsObj.nest;
      if (!options.skipRendering) {
        buildHtml2.render(tocElement, nestedHeadings);
      }
      this._scrollListener = throttle(function(e) {
        buildHtml2.updateToc(headingsArray);
        !options.disableTocScrollSync && updateTocScroll2(options);
        var isTop = e && e.target && e.target.scrollingElement && e.target.scrollingElement.scrollTop === 0;
        if (e && (e.eventPhase === 0 || e.currentTarget === null) || isTop) {
          buildHtml2.updateToc(headingsArray);
          if (options.scrollEndCallback) {
            options.scrollEndCallback(e);
          }
        }
      }, options.throttleTimeout);
      this._scrollListener();
      if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
        document.querySelector(options.scrollContainer).addEventListener("scroll", this._scrollListener, false);
        document.querySelector(options.scrollContainer).addEventListener("resize", this._scrollListener, false);
      } else {
        document.addEventListener("scroll", this._scrollListener, false);
        document.addEventListener("resize", this._scrollListener, false);
      }
      var timeout = null;
      this._clickListener = throttle(function(event) {
        if (options.scrollSmooth) {
          buildHtml2.disableTocAnimation(event);
        }
        buildHtml2.updateToc(headingsArray);
        timeout && clearTimeout(timeout);
        timeout = setTimeout(function() {
          buildHtml2.enableTocAnimation();
        }, options.scrollSmoothDuration);
      }, options.throttleTimeout);
      if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
        document.querySelector(options.scrollContainer).addEventListener("click", this._clickListener, false);
      } else {
        document.addEventListener("click", this._clickListener, false);
      }
      return this;
    };
    tocbot.refresh = function(customOptions) {
      tocbot.destroy();
      tocbot.init(customOptions || this.options);
    };
    root.tocbot = tocbot;
    return tocbot;
  });
})(js);
var jsExports = js.exports;
const index = /* @__PURE__ */ getDefaultExportFromCjs(jsExports);
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [jsExports]);
export {
  index$1 as i
};
