<#--
/**
 * 主题的标签目录，用来展示所有的标签，需要手动在菜单中添加
 * 菜单链接如下： https://{youraddress}/tags
 * @author LIlGG
 */
-->
<#include "header.ftl">
<@header title="${options.tags_title?default('文章标签')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.tag_patternimg?? && settings.tag_patternimg!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.tag_patternimg!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.8/img/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
            </div>
            <header class="pattern-header">
                <h1 class="entry-title">${options.tags_title?default('文章标签')}</h1>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
        <header class="entry-header">
            <h1 class="entry-title">${options.tags_title?default('文章标签')}</h1>
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
                <div class="tag-title center-align">
                    <i class="fa fa-tags"></i>&nbsp;&nbsp;文章标签
                </div>
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
