<#--
    @package Akina
-->
<#global res_base_url = settings.cdn?then("//cdn.jsdelivr.net/gh/LIlGG/halo-theme-sakura@1.3.1", theme_base)/>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title itemprop="name" class="i18n" data-iname="notfound.title" data-ivalue="${blog_title!}"></title>

    <@global.head />

    <#include "inc/decorate.ftl">
    <link rel="stylesheet" href="//at.alicdn.com/t/font_2010950_uq2c7ykeiyk.css" media="noexist" onload="this.media='all'">
    <link rel='stylesheet' href='${theme_base!}/styles/style.min.css' type='text/css'/>
</head>
<body class="error404 hfeed">
<section class="error-404 not-found">
    <div class="error-img">
        <div class="anim-icon" id="404" style="height: 66%;"></div>
    </div>
    <div class="err-button back">
        <a id="golast" href=javascript:history.go(-1); class="i18n" data-iname="notfound.golast">返回上一页</a>
        <a id="gohome" href="${blog_url!}" class="i18n" data-iname="notfound.gohome">返回主页</a>
    </div>
    <p style="margin-bottom: 1em;margin-top: 1.5em;text-align: center;font-size: 15px;" class="i18n" data-iname="notfound.search">别急，试试站内搜索？</p>
    <p style="margin-bottom: 1em;text-align: center;font-size: 15px;" class="i18n" data-iname="notfound.search_2">Don't worry, search in site?</p>
    <div style="display:block; width:284px;margin: auto;">
        <p style="margin-bottom: 1em;margin-top: 1.5em;text-align: center;font-size: 15px;"></p>
        <form class="s-search" method="get" action="/search" role="search">
            <i class="iconfont icon-search" style="bottom: 9px;left: 15px;"></i>
            <input class="text-input i18n" style="padding: 8px 20px 8px 46px;" type="search" name="keyword" required data-iname="notfound.searchinput" data-iattr="placeholder" placeholder="Search...">	
        </form>
    </div>
</section>
<script>
    var the_url = window.location.href;
    var the_dom = "${blog_url?replace("https://", "")}";
    the_dom = the_dom.replace("http://", "");
    var the_port_index = the_dom.indexOf(":");
    if(the_port_index != -1) {
        the_dom = the_dom.substring(0, the_port_index)
    }
</script>
<script src="${res_base_url!}/source/js/404.js" type="text/javascript"></script>
<script type='text/javascript' src='${res_base_url!}/script/utils.min.js?ver=1.3.1'></script>
<script type='text/javascript' src='${res_base_url!}/script/i18n.min.js?ver=1.3.1'></script>
<script>
var Poi = {
    "themeBase": "${res_base_url!}",
    "i18n": "${settings.i18n!'auto'}"
}
window.onload = function() {
    I18N.init();
}
</script>
</body>


