/**
 * 国际化
 */
var I18N = function() {
    var _doc,
    _i18nlanguage,
    LOG_TAG = "I18N";

    // 加载资源
    var _load = function() {
        if(!window.$) {
            Util.loadJS(Poi.themeBase + "/source/js/lib.js", _load)
        } else if(!window.$.i18n) {
            Util.loadJS(Poi.themeBase + "/source/lib/jquery-i18n/jquery.i18n.min.js", _load)
        } else if (!window.jsyaml) {
            Util.loadJS(Poi.themeBase + "/source/lib/js-yaml/dist/js-yaml.min.js", _load)
        } else {
            _execI18n();
        }
    }
    
    /**
     * 根据文本渲染i18n
     */
    var _renderI18n = function() {
        if (!$.i18n) {
            Log.e("未能加载国际化插件，终止国际化操作！", LOG_TAG)
        }
        // 使用i18n 渲染页面文本
        // 先unload一下
        $.i18n.unload();
        // 加载doc
        $.i18n.load(_doc);
        // 遍历所有需要i18n的文本
        $('.i18n').each(function () {
            var args = [];
            var name = $(this).data("iname");
            var value = $(this).data("ivalue") + '';
            var attr = $(this).data('iattr');
            args.push(name);
            if (value) {
                value = value.split(";");
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

    var _execI18n = function() {
        if(Util.getLocalStorage(_i18nlanguage + ".yml")) {
            _doc = JSON.parse(Util.getLocalStorage(_i18nlanguage + ".yml"));
            _renderI18n();
        } else {
            $.ajax({
                url: Poi.themeBase + "/languages/" + _i18nlanguage + ".yml",
                success: function (data) {
                    _doc = jsyaml.safeLoad(data, 'utf8');
                    if (!_doc) {
                        Log.w("读取读取国际化数据失败", LOG_TAG);
                        return;
                    }
                    Util.setLocalStorage(_i18nlanguage + ".yml", JSON.stringify(_doc), 60 * 60 * 24);
                    // 执行渲染
                    _renderI18n();
                }
            })
        }
    }

    return {
        init: function() {
            // 获取用户指定的语言，如果用户未指定或者未自动，则读取缓存，否则读取浏览器语言
            if (Poi.i18n && Poi.i18n != "auto") {
                _i18nlanguage = Poi.i18n;
            } else if (Util.getLocalStorage("_i18nlanguage")) {
                _i18nlanguage = Util.getLocalStorage("_i18nlanguage");
            } else {
                // 从浏览器读取
                _i18nlanguage = Util.getNavLangSub();
                Util.setLocalStorage("_i18nlanguage", _i18nlanguage, 60 * 60 * 24 * 30);
            }
    
            if (!_i18nlanguage) {
                _i18nlanguage = "zh";
                Log.w("未能判断语言，将使用默认语言（zh）", LOG_TAG);
            }
            // 加载资源
            _load();
        },
    }
}();