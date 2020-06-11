<#--
    Template Name: links
-->
<#include "header.ftl">
<@header title="${options.links_title?default('友情链接')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.links_patternimg?? && settings.links_patternimg!='')>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.links_patternimg!}" src="https://cdn.lixingyong.com/img/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload">
            </div>
            <header class="pattern-header">
                <h1 class="entry-title">${options.links_title?default('友情链接')}</h1>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
    </#if>
</@header>
    <article id="post-${sheet.id!}" class="post-item post-${sheet.id} page type-page status-publish hentry">
        <div class="links">
            <@linkTag method="listTeams">
                <#list teams as item>
                    <h3 class="link-title">
                        <span class="fake-title">${item.team}</span>
                    </h3>
                    <ul class="link-items fontSmooth">
                    <#list item.links as link>
                        <li class="link-item">
                            <a class="link-item-inner effect-apollo" href="${link.url!}" title="${link.name!}" target="_blank">
                                <img class="lazyload" data-src="${link.logo!}" src="https://cdn.lixingyong.com/img/svg/loader/trans.ajax-spinner-preloader.svg">
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