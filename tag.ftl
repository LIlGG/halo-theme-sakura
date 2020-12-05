<#--
/**
 * 标签页
 */
-->
<#include "header.ftl">
<@header title="标签：${tag.name!} - ${blog_title!}">
    <#if (settings.patternimg!true) && ((tag.thumbnail?? && tag.thumbnail!='') || (settings.tag_patternimg?? && settings.tag_patternimg!=''))>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src='${((tag.thumbnail)?length>0)?string((tag.thumbnail),"${settings.tag_patternimg!}")}' src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
            </div>
            <header class="pattern-header">
                <h1 class="cat-title i18n" data-iname="page.tags.item.title" data-ivalue="${tag.name!}"></h1>
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
        <#if posts?? && posts.content?size gt 0>
            <#if !(settings.patternimg!true) || !((tag.thumbnail?? && tag.thumbnail!='') || (settings.tag_patternimg?? && settings.tag_patternimg!=''))>
                <header class="page-header">
                    <h1 class="cat-title">${tag.name!}</h1>
                    <span class="cat-des">

                    </span>
                </header><!-- .page-header -->
            </#if>
            <#-- Start the Loop -->
            <#list posts.content as post>
                <#include "tpl/content.ftl">
            </#list>
            <div class="clearer"></div>
        <#else>
            <#include "tpl/content-none.ftl">
        </#if>
    </main><!-- #main -->
    <@paginationTag method="tagPosts" page="${posts.number}" total="${posts.totalPages}" display="3" slug="${tag.slug!}">
        <#include "layouts/list-nextprev.ftl">
    </@paginationTag>
</div><!-- #primary -->
<#include "footer.ftl">
<@footer />