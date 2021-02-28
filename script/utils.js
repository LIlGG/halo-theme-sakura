/**
 * 主题所用工具类
 * @date 2020/12/21
 * @author <a href="https://github.com/LIlGG">LIlGG</a>
 * @version 1.0
 */
var Util = {
    _version: '1.3.1',
    /**
    * 获取当前浏览器语言
    * 使用当前方法，只会得到语言前两个字符
    * @return zh、cn 等
    */
    getNavLangSub: function () {
        var currentLang = navigator.language;
        // 只获取前两个字符
        currentLang = currentLang.substr(0, 2);
        //判断IE浏览器使用语言
        if (!currentLang) {
            currentLang = navigator.browserLanguage;
        }
        return currentLang;
    },

    /**
     * 存储数据到浏览器的 cookie 内
     * 不建议向 cookie 内存入大量数据，如果有大数据需求的话
     * 或许可以考虑 {@link Util#setLocalStorageByJSON}
     * @param {String} key 需要存储的 key
     * @param {String} value 需要存储在 cookie 内的值
     * @param {Number} days 存储时间。单位/天。不输入则为永久存储
     */
    setCookie: function (key, value, days) {
        var keyVE = key + Util._version,
            expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie =
            keyVE + "=" + (value || "") + expires + "; path=/";
    },

    /**
     * 获取存储在浏览器 cookie 内的数据
     * @param {String} key 
     * @return 如果没能获取到数据，则返回 null。否则，返回目标数据字符串
     */
    getCookie: function (key) {
        var keyVE = key + Util._version + "=";
        var ca = document.cookie.split(";");

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(keyVE) == 0) return c.substring(keyVE.length, c.length);
        }

        return null;
    },

    /**
     * 删除存储在浏览器 cookie 内的数据
     * @param {String} key 需要删除的 key
     */
    removeCookie: function (key) {
        var keyVE = key + Util._version + "=";

        document.cookie =
            keyVE + "=; Max-Age=-99999999;";
    },

    /**
     * 存储 JSON 数据到浏览器的 localstorage 里
     * 当前方法不支持永久存储
     * @param {String} key 需要存储的 key
     * @param {JSON} value 需要存储的JSON数据
     * @param {Number} expires 存储时间。单位/秒。【默认 3600秒（一小时）】
     */
    setLocalStorage: function (key, value, expires = 3600) {
        var keyVE = key + Util._version;
        var date = new Date();

        try {
            localStorage.setItem(keyVE, JSON.stringify({
                expires: date.valueOf() + expires * 1000,
                data: value
            }));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.log("数据已满，自动清空");
                localStorage.clear();
                setLocalStorage(key, value, expires);
            }
        }
    },

    /**
     * 根据 key 获取存储在 localstorage 内的 JSON 数据【KEY 会自动加上 util 的版本号】
     * @param {String} key 需要读取数据的 key
     * @return 返回 JSON 格式的数据，如果不存在或者过期了，则返回 null
     */
    getLocalStorage: function (key) {
        var keyVE = key + Util._version;

        var result = JSON.parse(localStorage.getItem(keyVE));
        var date = new Date();
        if (result && result.expires > date) {
            return result.data;
        } else {
            localStorage.removeItem(keyVE);
            return null;
        }
    },

    /**
     * 删除保存在 localStorage 中的数据
     * @param {*} key 需要删除的 key【会自动加上 util 的版本号】
     */
    removeLocalStorage: function (key) {
        var keyVE = key + Util._version;

        localStorage.removeItem(keyVE);
    },

    /**
     * 异步加载 JS 
     * @param {*} url 需要加载 JS 地址
     * @param {*} callback 加载完成回调
     */
    loadJS: function (url, callback) {
        Util._loadRes("script", url, callback);
    },

    /**
     * 异步加载 CSS
     * @param {*} url 需要加载的 CSS 地址
     * @param {*} callback 加载完成回调
     */
    loadCSS: function (url, callback) {
        Util._loadRes("link", url, callback);
    },

    /**
     * 异步加载资源 *私有方法（不建议直接调用）*
     * @param {*} type 当前需要加载的资源类型
     * @param {*} url 资源 链接地址
     * @param {*} callback 加载完成回调函数
     */
    _loadRes: function (type, url, callback) {
        var dom,
            fn = callback || function () { };
        switch (type) {
            case 'script':
                dom = document.createElement(type);
                dom.type = 'text/javascript';
                dom.src = url;
                break;
            case 'link':
                dom = document.createElement(type);
                dom.type = 'text/css';
                dom.type = 'stylesheet'
                dom.href = url;
                break;
            default:
                console.warn("暂不支持：" + type + " 类型");
                return;
        }
        //IE
        if (dom.readyState) {
            dom.onreadystatechange = function () {
                if (dom.readyState == 'loaded' || dom.readyState == 'complete') {
                    dom.onreadystatechange = null;
                    fn();
                }
            };
        } else {
            //其他浏览器
            dom.onload = function () {
                fn();
            };
        }

        var head = document.getElementsByTagName('head')[0];
        head.appendChild(dom);
    },

    /**
     * 获取随机颜色值
     * 当获取的值越小，色调越偏冷
     * @param {Number} min 色调值，0 - 1 之间的值
     * @param {Number} max 色调值，需要大于min且为0 - 1之间的值
     */
    getRandomColor: function (min = 0, max = 1) {
        if (!min) {
            min = 0;
        }
        if (!max) {
            max = 0;
        }
        min = isNaN(min) ? 0 : Number(min);
        max = isNaN(max) ? 1 : Number(max);
        min = Math.min(Math.max(Math.abs(min), 0), 1);
        max = Math.min(Math.max(Math.abs(max), 0), 1);
        max = max < min ? 1 : max;
        return (
            "#" +
            (function (h) {
                return new Array(7 - h.length).join("0") + h;
            })((((Math.random() * (max - min) + min) * 0x1000000) << 0).toString(16))
        );
    },

    /**
     * 关键帧搜索
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
     * 字节搜索方式
     * @param {Array} list 需要搜索的字节数组
     * @param {Number} value 当前所处秒
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

    /**
     * 删除元素的 class，可根据前缀来删除
     * @param {*} el 需要删除的 dom 元素
     * @param {*} prefix 需要删除的 class，可以仅为前缀
     */
    removeClassByPrefix: function (el, prefix) {
        var classes = el.className.split(" ").filter(function(c) {
            return c.lastIndexOf(prefix, 0) !== 0;
        })

        el.className = classes.join(" ").trim();
    },
}


/**
 * 封装的toast组件（使用纯js，可以单独拿出去使用）
 * @author LIlGG
 */
var Toast = function () {
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
        e: function (msg, tag) {
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

        i: function (msg, tag) {
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

        w: function (msg, tag) {
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

        d: function (msg, tag) {
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

        v: function (msg, tag) {
            if (!tag || Log.FORCE_GLOBAL_TAG)
                tag = Log.GLOBAL_TAG;

            let str = `[${tag}] > ${msg}`;

            if (!Log.ENABLE_VERBOSE) {
                return;
            }

            console.log(str);
        },
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