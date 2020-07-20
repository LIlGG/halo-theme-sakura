<#--
    Template Name: links
-->
<#include "header.ftl">
<@header title="${options.links_title?default('友情链接')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.links_patternimg?? && settings.links_patternimg!='')>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.links_patternimg!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)>
            </div>
            <header class="pattern-header">
                <h1 class="entry-title">${options.links_title?default('友情链接')}</h1>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
    </#if>
</@header>
    <article>
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
                                <img class="lazyload" data-src="${link.logo!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/svg/loader/trans.ajax-spinner-preloader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
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
    <#if (metas.toc?boolean)!true>
    <div class="toc-container">
        <div class="toc"></div>
    </div>
    </#if>
<#include "footer.ftl">
<@footer />