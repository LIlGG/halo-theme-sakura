<#--
    图库界面
-->
<#include "header.ftl">
<@header title="${options.photos_title?default('图库')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.photos_patternimg?? && settings.photos_patternimg!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.photos_patternimg!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
            </div>
            <header class="pattern-header">
                <h1 class="entry-title">${options.photos_title?default('图库')}</h1>
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
    <#include "tpl/content-photos.ftl">
</div>
<#include "footer.ftl">
<@footer />