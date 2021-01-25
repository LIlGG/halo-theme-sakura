<#--
    日志页面
-->
<#include "header.ftl">
<@header title="${options.journals_title?default('日志')} - ${blog_title!}">
    <#if (settings.patternimg!true) && (settings.journals_patternimg?? && settings.journals_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!='')>
        <div class="pattern-center-blank"></div>
        <div class="pattern-center">
            <div class="pattern-attachment-img">
                <#if (settings.patternimg!true) && (settings.journals_patternimg?? && settings.journals_patternimg!='')>
                <img data-src="${settings.journals_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg"  class="lazyload" onerror="imgError(this)">
                <#else>
                    <img
                        src="${settings.rimage_url!}?journal=journal&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>"
                        srcset="<#if settings.rimage_cover_lqip == 'loading'>${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg<#else>${settings.rimage_url!}?journal=journal&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=150</#if>"
                        data-srcset="${settings.rimage_url!}?journal=journal&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=640 640w,
                            ${settings.rimage_url!}?journal=journal&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=960 960w,
                            ${settings.rimage_url!}?journal=journal&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=1280 1280w,
                            ${settings.rimage_url!}?journal=journal&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if> 1440w"
                        data-sizes="auto"
                        class="lazyload<#if settings.rimage_cover_lqip == 'lowquality'> blur-up</#if>" />
                </#if>
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
            <img class="lazyload avatar" data-src="${user.avatar!}" alt="${user.nickname!}"  width="48" height="48" src="${res_base_url!}/source/images/svg/loader/trans.ajax-spinner-preloader.svg" onerror="imgError(this)">
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
