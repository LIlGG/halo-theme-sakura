<#---
    @package Akina
-->
<#include "header.ftl">
<@header title="文章归档 - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.archives_patternimg?? && settings.archives_patternimg!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.archives_patternimg!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
            </div>
            <header class="pattern-header">
                <h1 class="entry-title">文章归档</h1>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
    </#if>
</@header>
<article class="post-item page type-page status-publish hentry">
    <div id="archives-temp">
        <#if !(settings.patternimg!true) || !(settings.archives_patternimg?? && settings.archives_patternimg!='')>
            <h2>文章归档</h2>
        </#if>
        <div id="archives-content">
            <@postTag method="archiveMonth">
                <#list archives as archive>
                    <div class="archive-title" id="arti-${archive.year?c}-${archive.month!}">
                        <span class="ar-time"><i class="iconfont">&#xe74a;</i></span>
                        <h3>${archive.year?c}-${archive.month!}</h3>
                        <div class="archives archives-${archive_index}" id="monlist" data-date="${archive.year?c}-${archive.month!}" style="display: block; overflow: hidden;">
                            <#list archive.posts as post>
                                <span class="ar-circle"></span>
                                <div class="arrow-left-ar"></div>
                                <div class="brick">
                                    <a href="${post.fullPath!}">
                                        <span class="time"><i class="iconfont">&#xe65f;</i>${post.createTime?string('MM-dd')}</span>${post.title!}
                                    </a>
                                </div>
                            </#list>
                        </div>
                    </div>
                </#list>
            </@postTag>
        </div>
    </div>
</article>
<#include "footer.ftl">
<@footer />