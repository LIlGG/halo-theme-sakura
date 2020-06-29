<#--
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Akina
 */
-->
<#include "header.ftl">
<@header title="标签：${tag.name!} - ${blog_title!}">
    <#if (settings.patternimg!true) && ((tag.thumbnail?? && tag.thumbnail!='') || (settings.tag_patternimg?? && settings.tag_patternimg!=''))>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${tag.thumbnail!'${settings.tag_patternimg!}'}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload">
            </div>
            <header class="pattern-header">
                <h1 class="cat-title">标签：${tag.name!}</h1>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
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
        <#if (settings.pagenav_style!'ajax') == 'ajax'>
            <div id="pagination">
                <#if pagination.hasNext>
                    <a href="${pagination.nextPageFullPath!}" class="">Previous</a>
                <#else>
                    <span>没有更多文章了</span>
                </#if>
            </div>
        <#else>
            <nav class="navigator">
                <#if pagination.hasPrev>
                    <a href="${pagination.prevPageFullPath!}"><i class="iconfont">&#xe679;</i></a>
                </#if>
                <#if pagination.hasNext>
                    <a href="${pagination.nextPageFullPath!}"><i class="iconfont">&#xe6a3;</i></a>
                </#if>
            </nav>
        </#if>
    </@paginationTag>
</div><!-- #primary -->
<#include "footer.ftl">