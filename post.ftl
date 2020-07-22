<#--
    @package Akina
-->
<#include "header.ftl">
<@header title="${post.title!} - ${blog_title!}">
    <#if (settings.patternimg!true) && (post.thumbnail?? && post.thumbnail!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center single-center">
            <div class="pattern-attachment-img">
                <img data-src="${post.thumbnail!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
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
                    <span class="bull">·</span>${post.visits!0} 次阅读
                </p>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
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
