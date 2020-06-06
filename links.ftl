<#--
    Template Name: links
-->
<#include "header.ftl">
<@header title="友情链接 - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.links_patternimg?? && settings.links_patternimg!='')>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.links_patternimg!}" class="lazyload">
            </div>
            <header class="pattern-header">
                <h1 class="entry-title">友情链接</h1>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
    </#if>
</@header>
	<#if !(settings.patternimg!true) || !(settings.links_patternimg?? && settings.links_patternimg!='')>
	    <span class="linkss-title">友情链接</span>
	</#if>
    <article <?php post_class("post-item"); ?>
        <div class="links">
            <ul class="link-items fontSmooth">
                <@linkTag method="list">
                    <#list links as link>
                        <li class="link-item">
                            <a class="link-item-inner effect-apollo" href="${link.url!}" title="${link.name!}" target="_blank">
                                <span class="sitename">${link.name!}</span>
                                <div class="linkdes">${link.description!}</div>
                            </a>
                        </li>
                    </#list>
                </@linkTag>
            </ul>
        </div>
    </article>
<#include "footer.ftl">