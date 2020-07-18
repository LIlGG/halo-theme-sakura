<#--
    Template Name: links
-->
<#include "header.ftl">
<@header title="${sheet.title!} - ${blog_title!}">
	<#if (settings.patternimg!true) && (sheet.thumbnail?? && sheet.thumbnail!='')>
		<div class="pattern-center">
			<div class="pattern-attachment-img">
				<img data-src="${sheet.thumbnail!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
			</div>
			<header class="pattern-header">
				<h1 class="entry-title">${sheet.title!}</h1>
			</header>
		</div>
	<#else>
		<div class="blank"></div>
	</#if>
</@header>
    <article id="post-${sheet.id!}" class="post-item post-${sheet.id} page type-page status-publish hentry">
        ${sheet.formatContent!} 
        <div class="links">
            <@linkTag method="listTeams">
                <#list teams as item>
                    <h3 class="link-title">
                        <span class="fake-title">${((item.team!'')?length>0)?string((item.team!''), '小伙伴们')}</span>
                    </h3>
                    <ul class="link-items fontSmooth">
                    <#list item.links as link>
                        <li class="link-item">
                            <a class="link-item-inner effect-apollo" href="${link.url!}" title="${link.name!}" target="_blank">
                                <img class="lazyload" data-src="${link.logo!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/svg/loader/trans.ajax-spinner-preloader.svg">
                                <span class="sitename">${link.name!}</span>
                                <div class="linkdes">${link.description!}</div>
                            </a>
                        </li> 
                    </#list>
                    </ul>
                </#list>
            </@linkTag>
        </div>       
    </article>
    <div class="toc-container">
        <div class="toc"></div>
    </div>
    <div class="have-toc"></div>
<#include "footer.ftl">
<@footer />