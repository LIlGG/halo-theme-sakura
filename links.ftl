<#--
    Template Name: links
-->
<#include "header.ftl">
<@header title="${options.links_title?default('友情链接')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.links_patternimg?? && settings.links_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <#if (settings.patternimg!true) && (settings.links_patternimg?? && settings.links_patternimg!='')>
                <img data-src="${settings.links_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
                <#else>
                    <#if settings.rimage_cover_itype == 'image'>
                    <img class="lazyload" data-src="${settings.rimage_url!}?link=link&type=url&itype=image&qn=${(settings.rimage_cover_detail_qn)!'0'}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
                    <#else>
                    <img class="lazyload" data-src="${settings.rimage_url!}?link=link&type=url&itype=${settings.rimage_cover_itype!}&id=${(settings.rimage_cover_id)!''}&qn=${(settings.rimage_cover_detail_qn)!'0'}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
                    </#if>
                </#if>
            </div>
            <header class="pattern-header">
                <#if options.links_title?default("")?trim?length gt 1>
                <h1 class="entry-title">${options.links_title}</h1>
                <#else>
                <h1  class="entry-title i18n" data-iname="page.links.title"></h1>
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