<#--
    @package Akina
-->
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title itemprop="name">Page not found - ${blog_title!}</title>

    <@global.head />

    <#include "inc/decorate.ftl">
    <link rel='stylesheet' href='${theme_base!}/styles/style.min.css' type='text/css'/>
</head>
<body class="error404 hfeed">
<section class="error-404 not-found">
    <div class="error-img">
        <div class="anim-icon" id="404" style="height: 66%;"></div>
    </div>
    <div class="err-button back">
        <a id="golast" href=javascript:history.go(-1);>返回上一页</a>
        <a id="gohome" href="${blog_url!}">返回主页</a>
    </div>
    <p style="margin-bottom: 1em;margin-top: 1.5em;text-align: center;font-size: 15px;">
        别急，试试站内搜索？
    </p>
    <p style="margin-bottom: 1em;text-align: center;font-size: 15px;">
        Don't worry, search in site?
    </p>
    <div style="display:block; width:284px;margin: auto;">
        <p style="margin-bottom: 1em;margin-top: 1.5em;text-align: center;font-size: 15px;"></p>
        <form class="s-search" method="get" action="/search" role="search">
            <i class="iconfont js-toggle-search iconsearch icon-search" style="bottom: 8px;left: 12px;"></i>
            <input class="text-input" style="padding: 8px 20px 8px 46px;" type="search" name="keyword" placeholder="Search..." required>	
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
<script src="https://cdn.lixingyong.com/halo-sakura/js/404.js" type="text/javascript"></script>
</body>


