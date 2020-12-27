<#--
    Template Name: links
-->
<#include "header.ftl">
<@header title="${sheet.title!} - ${blog_title!}">
	<#if (settings.patternimg!true) && (sheet.thumbnail?? && sheet.thumbnail!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!='')>
        <div class="pattern-center-blank"></div>
		<div class="pattern-center">
			<div class="pattern-attachment-img">
				<#if (settings.patternimg!true) && (sheet.thumbnail?? && sheet.thumbnail!='')>
                <img class="lazyload" data-src="${sheet.thumbnail!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
                <#else>
                    <#if settings.rimage_cover_itype == 'image'>
                    <img class="lazyload" data-src="${settings.rimage_url!}?sheetid=${sheet.id}&type=url&itype=image&qn=${(settings.rimage_cover_detail_qn)!'0'}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
                    <#else>
                    <img class="lazyload" data-src="${settings.rimage_url!}?sheetid=${sheet.id}&type=url&itype=${settings.rimage_cover_itype!}&id=${(settings.rimage_cover_id)!''}&qn=${(settings.rimage_cover_detail_qn)!'0'}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
                    </#if>
                </#if>
			</div>
			<header class="pattern-header">
				<h1 class="entry-title">${sheet.title!}</h1>
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