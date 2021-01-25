<#--
    @package Akina
-->
<#include "header.ftl">
<@header title="${post.title!} - ${blog_title!}">
    <#if (settings.patternimg!true) && (post.thumbnail?? && post.thumbnail!='') || ((metas.ri?boolean)!true && settings.rimage_cover_open!true && settings.rimage_url?? && settings.rimage_url!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center single-center">
            <div class="pattern-attachment-img">
                <#if (settings.patternimg!true) && (post.thumbnail?? && post.thumbnail!='')>
                <img class="lazyload" data-src="${post.thumbnail!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this)">
                <#else>
                    <img
                        src="${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>"
                        srcset="<#if settings.rimage_cover_lqip == 'loading'>${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg<#else>${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=150</#if>"
                        data-srcset="${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=640 640w,
                            ${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=960 960w,
                            ${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=1280 1280w,
                            ${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if> 1440w"
                        data-sizes="auto"
                        class="lazyload<#if settings.rimage_cover_lqip == 'lowquality'> blur-up</#if>" />
                </#if>
            </div>
            <header class="pattern-header single-header">
                <h1 class="entry-title">${post.title!}</h1>
                <p class="entry-census">
                    <span>
                        <a href="${blog_url!}">
                            <img src="${user.avatar!}">
                        </a>
                    </span>
                    <span>
                        <a href="${blog_url!}">${user.nickname!}</a>
                    </span>
                    <span class="bull">·</span>${post.createTime?string('yyyy-MM-dd')}
                    <span class="bull">·</span><span class="i18n" data-iname="post.visits" data-ivalue="${post.visits!0}"></span>
                </p>
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
        <#include "tpl/content-single.ftl">
        <#include "layouts/post-nextprev.ftl">
        <#include "layouts/authorprofile.ftl">
    </main><!-- #main -->
</div><!-- #primary -->
<#include "footer.ftl">
<@footer />
