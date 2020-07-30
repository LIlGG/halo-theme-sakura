<#--
    Template Name: links
-->
<#include "header.ftl">
<@header title="${options.links_title?default('友情链接')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.links_patternimg?? && settings.links_patternimg!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.links_patternimg!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
            </div>
            <header class="pattern-header">
                <h1 class="entry-title">${options.links_title?default('友情链接')}</h1>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
        <style>
            .toc-container {
                top: 210px;
            }
		</style>
    </#if>
</@header>
    <#include "tpl/content-links.ftl">
    <#if (metas.toc?boolean)!true>
    <div class="toc-container">
        <div class="toc"></div>
    </div>
    </#if>
<#include "footer.ftl">
<@footer />