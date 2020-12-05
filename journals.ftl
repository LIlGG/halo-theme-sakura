<#--
    日志页面
-->
<#include "header.ftl">
<@header title="${options.journals_title?default('日志')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.journals_patternimg?? && settings.journals_patternimg!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <img data-src="${settings.journals_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
            </div>
            <header class="pattern-header">
                <#if options.journals_title?default("")?trim?length gt 1>
                <h1 class="entry-title">${options.journals_title}</h1>
                <#else>
                <h1 class="entry-title i18n" data-iname="page.journal.title"></h1>
                </#if>
            </header>
        </div>
    <#else>
        <div class="blank"></div>
        <header class="entry-header">
              <#if options.journals_title?default("")?trim?length gt 1>
              <h1 class="entry-title">${options.journals_title}</h1>
              <#else>
              <h1 class="entry-title i18n" data-iname="page.journal.title"></h1>
              </#if>
        </header>
        <style>
            .toc-container {
                top: 210px;
            }
		</style>
    </#if>
</@header>
<div class="journals-content">
  <#if (journals.content?size>0) >
    <ul id="main" class="journals-line" role="main">
      <#list journals.content as journal>
        <li id="journal-${journal.id?c}" class="journal">
          <span class="journal-author-img">
            <img class="lazyload avatar" data-src="${user.avatar!}" alt="${user.nickname!}"  width="48" height="48" src="${res_base_url!}/source/images/svg/loader/trans.ajax-spinner-preloader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
          <span class="journal-label">${journal.content!}
            <p class="journal-time">
              <span> ${journal.createTime?string('yyyy-MM-dd HH:mm:ss')}</span>
              <#-- TODO 由于接口功能的原因，点赞功能暂时不设置 -->
              <#--  <span style="float: right">
                <span><i class="iconfont icon-dz"></i></span>
                <span style="font-size: 15px;">${journal.likes!}</span>
              </span>  -->
            </p>
          </span>
        </li>
      </#list>
    </ul>
    <#if journals.totalPages gt 1>
      <@paginationTag method="journals" page="${journals.number}" total="${journals.totalPages}" display="3">
        <center id="journals-pagination">
          <#if pagination.hasNext>
          <a href="${pagination.nextPageFullPath!}" class="at_button i18n" data-iname="page.journal.loadmore" style="margin-bottom: 15px;">加载更多...</a>
          </#if>
        </center>
      </@paginationTag>
    </#if>
    <#else>
        <span class="i18n" data-iname="page.journal.empty"></span>
    </#if>
</div>
<#include "footer.ftl">
<@footer />
