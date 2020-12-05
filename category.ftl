<#--
    分类页面
-->
<#include "header.ftl">
<@header title="分类：${category.name!} - ${blog_title!}">
    <#if (settings.patternimg!true) && ((category.thumbnail?? && category.thumbnail!='') || (settings.category_patternimg?? && settings.category_patternimg!=''))>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src='${((category.thumbnail)?length>0)?string((category.thumbnail),"${settings.category_patternimg!}")}' src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
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
