<#---
    @package Akina
-->
<#include "header.ftl">
<@header title="${options.archives_title?default('文章归档')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.archives_patternimg?? && settings.archives_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <#if (settings.patternimg!true) && (settings.archives_patternimg?? && settings.archives_patternimg!='')>
                <img data-src="${settings.archives_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this)">
                <#else>
                    <img
                        src="${settings.rimage_url!}?archives=archives&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>"
                        srcset="<#if settings.rimage_cover_lqip == 'loading'>${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg<#else>${settings.rimage_url!}?archives=archives&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=150</#if>"
                        data-srcset="${settings.rimage_url!}?archives=archives&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=640 640w,
                            ${settings.rimage_url!}?archives=archives&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=960 960w,
                            ${settings.rimage_url!}?archives=archives&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=1280 1280w,
                            ${settings.rimage_url!}?archives=archives&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if> 1440w"
                        data-sizes="auto"
                        class="lazyload<#if settings.rimage_cover_lqip == 'lowquality'> blur-up</#if>" />
                </#if>
            </div>
            <header class="pattern-header">
                <#if options.archives_title?default("")?trim?length gt 1>
                <h1 class="entry-title">${options.archives_title}</h1>
                <#else>
                <h1 class="entry-title i18n" data-iname="page.archives.title"></h1>
                </#if>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
    </#if>
</@header>
<article class="post-item page type-page status-publish hentry">
    <div id="archives-temp">
        <#if !((settings.patternimg!true) && (settings.archives_patternimg?? && settings.archives_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!=''))>
                <#if options.archives_title?default("")?trim?length gt 1>
                <h2>${options.archives_title}</h2>
                <#else>
                <h2 class="i18n" data-iname="page.archives.title"></h2>
                </#if>
        </#if>
        <div id="archives-content">
            <@postTag method="archiveMonth">
                <#list archives as archive>
                    <div class="archive-title" id="arti-${archive.year?c}-${archive.month!}">
                        <span class="ar-time"><i class="iconfont icon-log"></i></span>
                        <h3>${archive.year?c}-${archive.month!}</h3>
                        <div class="archives archives-${archive_index}" id="monlist" data-date="${archive.year?c}-${archive.month!}" style="display: block; overflow: hidden;">
                            <#list archive.posts as post>
                                <span class="ar-circle"></span>
                                <div class="arrow-left-ar"></div>
                                <div class="brick">
                                    <a href="${post.fullPath!}">
                                        <span class="time"><i class="iconfont icon-time"></i>${post.createTime?string('MM-dd')}</span>${post.title!}
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