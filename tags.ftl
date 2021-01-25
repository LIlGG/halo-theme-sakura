<#--
/**
 * 主题的标签目录，用来展示所有的标签，需要手动在菜单中添加
 * 菜单链接如下： https://{youraddress}/tags
 * @author LIlGG
 */
-->
<#include "header.ftl">
<@header title="${options.tags_title?default('文章标签')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.tag_patternimg?? && settings.tag_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <#if (settings.patternimg!true) && (settings.tag_patternimg?? && settings.tag_patternimg!='')>
                <img data-src="${settings.tag_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this)">
                <#else>
                    <img
                        src="${settings.rimage_url!}?tagid=tag&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>"
                        srcset="<#if settings.rimage_cover_lqip == 'loading'>${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg<#else>${settings.rimage_url!}?tagid=tag&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=150</#if>"
                        data-srcset="${settings.rimage_url!}?tagid=tag&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=640 640w,
                            ${settings.rimage_url!}?tagid=tag&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=960 960w,
                            ${settings.rimage_url!}?tagid=tag&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=1280 1280w,
                            ${settings.rimage_url!}?tagid=tag&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if> 1440w"
                        data-sizes="auto"
                        class="lazyload<#if settings.rimage_cover_lqip == 'lowquality'> blur-up</#if>" />
                </#if>
            </div>
            <header class="pattern-header">
                <#if options.tags_title?default("")?trim?length gt 1>
                <h1 class="entry-title">${options.tags_title}</h1>
                <#else>
                <h1 class="entry-title i18n" data-iname="page.tags.title"></h1>
                </#if>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
        <header class="entry-header">
            <#if options.tags_title?default("")?trim?length gt 1>
            <h1 class="entry-title">${options.tags_title}</h1>
            <#else>
            <h1 class="entry-title i18n" data-iname="page.tags.title"></h1>
            </#if>
        </header>
    </#if>
</@header>
<#if settings.tag_cloud!true>
<style type="text/css">
    .site-content {
        max-width: none
    }
    #tag-wordcloud {
        width: 100%;
        height: 300px;
    }

    .tag-contents {
        max-width: 800px;
    }
</style>
<div class="container">
    <div class="card">
        <div id="tag-wordcloud" class="card-content jqcloud"></div>
    </div>
</div>
</#if>
<div class="tag-contents">
    <div id="tags" class="container chip-container">
        <div class="card">
            <div class="card-content">
                <#if !((settings.patternimg!true) && (settings.tag_patternimg?? && settings.tag_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!=''))>
                <div class="tag-title center-align">
                    <i class="fa fa-tags"></i>&nbsp;&nbsp;<span class="i18n" data-iname="page.tags.title"></span>
                </div>
                </#if>
                <div class="tag-chips">
                <@tagTag method="list">
                <#list tags as tag>
                <a href="${tag.fullPath!}" title="${tag.name!}: ${tag.postCount!}">
                    <span class="chip center-align waves-effect waves-light chip-default" data-tagname="${tag.name!}">${tag.name!}
                        <span class="tag-length">${tag.postCount!}</span>
                    </span>
                </a>
                </#list>
                </@tagTag>
                </div>
            </div>
        </div>
    </div>
</div>
<#include "footer.ftl">
<@footer>
</@footer>
