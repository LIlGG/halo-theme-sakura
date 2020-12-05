<#--
    图库界面
-->
<#include "header.ftl">
<@header title="${options.photos_title?default('图库')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.photos_patternimg?? && settings.photos_patternimg!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.photos_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
            </div>
            <header class="pattern-header">
                <#if options.photos_title?default("")?trim?length gt 1>
                <h1 class="entry-title">${options.photos_title}</h1>
                <#else>
                <span class="entry-title i18n" data-iname="page.photos.title"></span>
                </#if>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
    </#if>
</@header>
<style type="text/css">
.site-content {
    max-width: none;
    padding: 0;
}
@media (max-width: 860px) {
    .site-content {
        padding: 0;
    }
}

</style>
<div class="photo-page">
<#if settings.photos_style == "masonry" || settings.photos_style == "packery">
    <#include "tpl/content-masonry-photos.ftl">
<#else>
    <#include "tpl/content-justify-photos.ftl">
</#if>
</div>
<#include "footer.ftl">
<@footer />