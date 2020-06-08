<#--
	@package Akina
-->
<#include "header.ftl">
<@header title="${sheet.title!} - ${blog_title!}">
	<#if (settings.patternimg!true) && (sheet.thumbnail?? && sheet.thumbnail!='')>
		<div class="pattern-center">
			<div class="pattern-attachment-img">
				<img data-src="${sheet.thumbnail!}" class="lazyload">
			</div>
			<header class="pattern-header">
			    <div class="toc-container">
        			<div class="toc"></div>
    			</div>
				<h1 class="entry-title">${sheet.title!}</h1>
			</header>
		</div>
	<#else>
		<div class="blank"></div>
	</#if>
</@header>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<#include "tpl/content-page.ftl">
		</main><!-- #main -->
	</div><!-- #primary -->
<#include "footer.ftl">
