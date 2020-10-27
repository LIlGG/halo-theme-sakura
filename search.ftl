<#--
	@package Akina
-->
<#include "header.ftl">
<@header title="${keyword!} - 搜索结果 - ${blog_title!}">
	<#if (settings.patternimg!true) && (settings.searh_patternimg?? && settings.searh_patternimg!='')>
		<div class="pattern-center">
			<div class="pattern-attachment-img">
				<img data-src="${settings.searh_patternimg!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
			</div>
			<header class="pattern-header">
				<h1 class="entry-title search-title"> 关于“ ${keyword!} ”的搜索结果</h1>
			</header>
		</div>
	<#else>
		<div class="blank"></div>
	</#if>
</@header>

<section id="primary" class="content-area">
	<#if posts?? && posts.content?size gt 0>
		<main id="main" class="site-main" role="main">
			<#if !(settings.patternimg!true) || !(settings.searh_patternimg?? && settings.searh_patternimg!='')>
			<header class="page-header">
				<h1 class="page-title">搜索结果: <span>${keyword!}</span></h1>
			</header><!-- .page-header -->
			</#if>
			<#list posts.content as post>
				<#include "tpl/content.ftl">
			</#list>
		</main><!-- #main -->
		<#if posts.totalPages gt 1>
			<@paginationTag method="search" page="${posts.number}" total="${posts.totalPages}" display="3" keyword="${keyword!}">
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
							<a href="${pagination.prevPageFullPath!}"><i class="iconfont icon-previous"></i></a>
						</#if>
						<#if pagination.hasNext>
							<a href="${pagination.nextPageFullPath!}"><i class="iconfont icon-next"></i></a>
						</#if>
					</nav>
				</#if>
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
