<#--
    分类页面
-->
<#include "header.ftl">
<@header title="分类：${category.name!} - ${blog_title!}">
    <#if (settings.patternimg!true) && ((category.thumbnail?? && category.thumbnail!='') || (settings.category_patternimg?? && settings.category_patternimg!='')) || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <#if (settings.patternimg!true) && ((category.thumbnail?? && category.thumbnail!='') || (settings.category_patternimg?? && settings.category_patternimg!=''))>
                <img data-src='${((category.thumbnail)?length>0)?string((category.thumbnail),"${settings.category_patternimg!}")}' src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
                <#else>
                    <#if settings.rimage_cover_itype == 'image'>
                    <img class="lazyload" data-src="${settings.rimage_url!}?journal=journal&type=url&itype=image&qn=${(settings.rimage_cover_detail_qn)!'0'}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
                    <#else>
                    <img class="lazyload" data-src="${settings.rimage_url!}?journal=journal&type=url&itype=${settings.rimage_cover_itype!}&id=${(settings.rimage_cover_id)!''}&qn=${(settings.rimage_cover_detail_qn)!'0'}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
                    </#if>
                </#if>
            </div>
            <header class="pattern-header">
                <h1 class="cat-title i18n" data-iname="page.categories.item_title" data-ivalue="${category.name!}"></h1>
                <span class="cat-des">${category.description!}</span>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
    </#if>
</@header>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        <#if posts?? && posts.content?size gt 0>
            <#if !(settings.patternimg!true) || !((category.thumbnail?? && category.thumbnail!='') || (settings.category_patternimg?? && settings.category_patternimg!=''))>
                <header class="page-header">
                    <h1 class="cat-title">${category.name!}</h1>
                    <span class="cat-des">
                        ${category.description!}
                    </span>
                </header>
            </#if>
            <#list posts.content as post>
                <#include "tpl/content.ftl">
            </#list>
            <div class="clearer"></div>
        <#else>
            <#include "tpl/content-none.ftl">
        </#if>
    </main>
    <@paginationTag method="categoryPosts" page="${posts.number}" total="${posts.totalPages}" display="3" slug="${category.slug!}">
        <#include "layouts/list-nextprev.ftl">
    </@paginationTag>
</div>
<#include "footer.ftl">
<@footer />
