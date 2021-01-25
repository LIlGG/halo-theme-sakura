<#--
/**
 * 主题的分类目录，用来展示所有的标签，需要手动在菜单中添加
 * 菜单链接如下： https://{youraddress}/categories
 * @author LIlGG
 */
-->
<#include "header.ftl">
<@header title="${options.categories_title?default('文章分类')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.category_patternimg?? && settings.category_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <#if (settings.patternimg!true) && (settings.category_patternimg?? && settings.category_patternimg!='')>
                <img data-src="${settings.category_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this)">
                <#else>
                    <img
                        src="${settings.rimage_url!}?category=category&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>"
                        srcset="<#if settings.rimage_cover_lqip == 'loading'>${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg<#else>${settings.rimage_url!}?category=category&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=150</#if>"
                        data-srcset="${settings.rimage_url!}?category=category&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=640 640w,
                            ${settings.rimage_url!}?category=category&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=960 960w,
                            ${settings.rimage_url!}?category=category&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=1280 1280w,
                            ${settings.rimage_url!}?category=category&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if> 1440w"
                        data-sizes="auto"
                        class="lazyload<#if settings.rimage_cover_lqip == 'lowquality'> blur-up</#if>" />
                </#if>
            </div>
            <header class="pattern-header">
                <#if options.categories_title?default("")?trim?length gt 1>
                <h1 class="entry-title">${options.categories_title}</h1>
                <#else>
                <h1 class="entry-title i18n" data-iname="page.categories.title"></h1>
                </#if>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
        <header class="entry-header">
            <#if options.categories_title?default("")?trim?length gt 1>
            <h1 class="entry-title">${options.categories_title}</h1>
            <#else>
            <h1 class="entry-title i18n" data-iname="page.categories.title"></h1>
            </#if>
        </header><!-- .entry-header -->
    </#if>
</@header>
<div class="tag-contents">
    <div id="tags" class="container chip-container" style="margin-top: 0px;">
        <div class="card">
            <div class="card-content">
                <#if !((settings.patternimg!true) && (settings.category_patternimg?? && settings.category_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!=''))>
                <div class="tag-title center-align">
                    <i class="fa fa-bookmark"></i>&nbsp;&nbsp;<span class="i18n" data-iname="page.categories.title"></span>
                </div>
                </#if>
                <div class="tag-chips">
                <@categoryTag method="list">
                <#list categories as category>
                <a href="${category.fullPath!}" title="${category.name!}: ${category.postCount!}">
                    <span class="chip center-align waves-effect waves-light chip-default" data-tagname="${category.name!}">${category.name!}
                        <span class="tag-length">${category.postCount!}</span>
                    </span>
                </a>
                </#list>
                </@categoryTag>
                </div>
            </div>
        </div>
    </div>
</div>
<#if settings.category_radar!true>
<style type="text/css">
    .tag-contents {
        margin-top: 14px;
    }
    #category-echarts {
        width: 100%;
        height: 360px;
    }
</style>
<div class="tag-contents category-show">
    <div class="card">
        <div id="category-echarts"></div>
    </div>
</div>
</#if>
<#include "footer.ftl">
<@footer>
</@footer>
