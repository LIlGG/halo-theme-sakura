/**
 * 国际化
 */
var I18N = function () {
    var i18nlanguage,
        doc;
    // 加载资源
    function init() {
        if(!window.$) {
            loadJS(Poi.themeBase + "/source/js/lib.js", init)
        } else if(!window.$.i18n) {
            loadJS(Poi.themeBase + "/source/lib/jquery-i18n/jquery.i18n.min.js", init)
        } else if (!window.jsyaml) {
            loadJS(Poi.themeBase + "/source/lib/js-yaml/dist/js-yaml.min.js", init)
        } else {
            execI18n();
        }
    }
    
    /**
     * 根据文本渲染i18n
     */
    function renderI18n() {
        if (!$.i18n) {
            console.error("未能加载国际化插件，终止国际化操作！")
        }
        // 使用i18n 渲染页面文本
        // 先unload一下
        $.i18n.unload();
        // 加载doc
        $.i18n.load(doc);
        // 遍历所有需要i18n的文本
        $('.i18n').each(function () {
            var args = [];
            var name = $(this).data("iname");
            var value = $(this).data("ivalue") + '';
            var attr = $(this).data('iattr');
            args.push(name);
            if (value) {
                value = value.split(",");
                args = args.concat(value);
            }

            var text = $.i18n._.apply($.i18n, args);
            if(attr) {
                $(this).attr(attr, text);
            } else {
                $(this).text(text);
            }
        })
    }

    function execI18n() {
        if(getCookie(i18nlanguage + ".yml")) {
            doc = JSON.parse(getCookie(i18nlanguage + ".yml"));
            renderI18n();
        } else {
            $.ajax({
                url: Poi.themeBase + "/languages/" + i18nlanguage + ".yml",
                success: function (data) {
                    doc = jsyaml.safeLoad(data, 'utf8');
                    if (!doc) {
                        console.warn("读取读取国际化数据失败");
                        return;
                    }
                    setCookie(i18nlanguage + ".yml", JSON.stringify(doc), 1);
                    // 执行渲染
                    renderI18n();
                }
            })
        }
    }
    /**
    * 获取浏览器语言
    */
    function getNavLang() {
        var currentLang = navigator.language;
        // 只获取前两个字符
        currentLang = currentLang.substr(0, 2);
        //判断IE浏览器使用语言
        if (!currentLang) {
            currentLang = navigator.browserLanguage;
        }
        return currentLang;
    }

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie =
            name + "v1.0.0" + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "v1.0.0" + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function loadJS(url, callback) {
        var script = document.createElement('script'),
            fn = callback || function () { };
        script.type = 'text/javascript';
        //IE
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    fn();
                }
            };
        } else {
            //其他浏览器
            script.onload = function () {
                fn();
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    
    // 获取用户指定的语言，如果用户未指定或者未自动，则读取缓存，否则读取浏览器语言
    if (Poi.i18n && Poi.i18n != "auto") {
        i18nlanguage = Poi.i18n;
    } else if (getCookie("i18nlanguage")) {
        i18nlanguage = getCookie("i18nlanguage");
    } else {
        // 从浏览器读取
        i18nlanguage = getNavLang();
        setCookie("i18nlanguage", i18nlanguage);
    }

    if (!i18nlanguage) {
        i18nlanguage = "zh";
        console.warn("未能判断语言，将使用默认语言（zh）");
    }
    
    // 初始化
    init();
}