<#--
    Template Name: links
-->
<#include "header.ftl">
<@header title="${sheet.title!} - ${blog_title!}">
	<#if (settings.patternimg!true) && (sheet.thumbnail?? && sheet.thumbnail!='')>
        <div class="pattern-center-blank"></div>
		<div class="pattern-center">
			<div class="pattern-attachment-img">
				<img data-src="${sheet.thumbnail!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.8/img/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
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