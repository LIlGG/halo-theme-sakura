<#--
	@package Akina
-->
<#include "header.ftl">
<@header title="${keyword!} - 搜索结果 - ${blog_title!}">
	<#if (settings.patternimg!true) && (settings.searh_patternimg?? && settings.searh_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!='')>
		<div class="pattern-center">
			<div class="pattern-attachment-img">
				<#if (settings.patternimg!true) && (settings.searh_patternimg?? && settings.searh_patternimg!='')>
                <img data-src="${settings.searh_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this)">
                <#else>
					<img
                        src="${settings.rimage_url!}?serach=serach&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>"
                        srcset="<#if settings.rimage_cover_lqip == 'loading'>${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg<#else>${settings.rimage_url!}?serach=serach&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=150</#if>"
                        data-srcset="${settings.rimage_url!}?serach=serach&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=640 640w,
                            ${settings.rimage_url!}?serach=serach&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=960 960w,
                            ${settings.rimage_url!}?serach=serach&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=1280 1280w,
                            ${settings.rimage_url!}?serach=serach&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if> 1440w"
                        data-sizes="auto"
                        class="lazyload<#if settings.rimage_cover_lqip == 'lowquality'> blur-up</#if>" />
                </#if>
			</div>
			<header class="pattern-header">
				<h1 class="entry-title search-title i18n" data-iname="page.search.title" data-ivalue="${keyword!}"></h1>
			</header>
		</div>
	<#else>
		<div class="blank"></div>
	</#if>
</@header>

<section id="primary" class="content-area">
	<#if posts?? && posts.content?size gt 0>
		<main id="main" class="site-main" role="main">
			<#if !((settings.patternimg!true) && (settings.searh_patternimg?? && settings.searh_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!=''))>
			<header class="page-header">
				<h1 class="page-title"><span class="i18n" data-iname="page.search.sresult"></span><span>${keyword!}</span></h1>
			</header><!-- .page-header -->
			</#if>
			<#list posts.content as post>
				<#include "tpl/content.ftl">
			</#list>
		</main><!-- #main -->
		<#if posts.totalPages gt 1>
			<@paginationTag method="search" page="${posts.number}" total="${posts.totalPages}" display="3" keyword="${keyword!}">
				<#include "layouts/list-nextprev.ftl">
			</@paginationTag>
		</#if>
    <#else>
		<div class="search-box">
			<!-- search start -->
			<form class="s-search" method="get" action="/search" role="search">
				<i class="iconfont icon-search"></i>
				<input class="text-input" type="search" name="keyword" placeholder="Search..." required>
			</form>
			<!-- search end -->
		</div>
		<#include "tpl/content-none.ftl">
    </#if>
</section><!-- #primary -->
<#include "footer.ftl">
<@footer />
