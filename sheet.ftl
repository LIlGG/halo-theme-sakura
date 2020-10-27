<#--
	@package Akina
-->
<#include "header.ftl">
<@header title="${sheet.title!} - ${blog_title!}">
	<#if (settings.patternimg!true) && (sheet.thumbnail?? && sheet.thumbnail!='')>
		<div class="pattern-center-blank"></div>
		<div class="pattern-center">
			<div class="pattern-attachment-img">
				<img data-src="${sheet.thumbnail!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
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
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<#include "tpl/content-page.ftl">
		</main><!-- #main -->
	</div><!-- #primary -->
<#include "footer.ftl">
<@footer />
