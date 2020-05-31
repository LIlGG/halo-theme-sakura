<#--
    @package Akina
-->
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title itemprop="name">未找到页面 - ${blog_title!}</title>

    <@global.head />

    <#include "inc/decorate.ftl">
    <link rel='stylesheet' id='siren-css'  href='${theme_base!}/style.css?ver=2.0.6.170420' type='text/css' media='all' />

</head>
<body class="error404 hfeed">
<section class="error-404 not-found">
    <div class="error-img">
        <img src="${theme_base!}/images/404.jpg">
    </div>
    <div class="err-button back">
        <a id="golast" href=javascript:history.go(-1);>返回上一页</a>
        <a id="gohome" href="${blog_url!}">返回主页</a>
    </div>
</section>
</body>


