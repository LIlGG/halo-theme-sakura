<#--
	@package Akina
-->
<#include "header.ftl">
<@header title="${keyword!} - 搜索结果 - ${blog_title!}">
	<#if (settings.patternimg!true) && (settings.searh_patternimg?? && settings.searh_patternimg!='')>
		<div class="pattern-center">
			<div class="pattern-attachment-img">
				<img data-src="${settings.searh_patternimg!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/svg/loader/orange.progress-bar-stripe-loader.svg" class="lazyload" onerror="imgError(this, IMG_Type.DEFAULT)">
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
	<main id="main" class="site-main" role="main">
		<#if posts?? && posts.content?size gt 0>
			<#if !(settings.patternimg!true) || !(settings.searh_patternimg?? && settings.searh_patternimg!='')>
			<header class="page-header">
				<h1 class="page-title">搜索结果: <span>${keyword!}</span></h1>
			</header><!-- .page-header -->
			</#if>
			<#list posts.content as post>
				<#include "tpl/content.ftl">
			</#list>

        <#else>
			<div class="search-box">
				<!-- search start -->
				<form class="s-search">
					<i class="iconfont">&#xe65c;</i>
					<input class="text-input" type="search" name="s" placeholder="Search..." required>
				</form>
				<!-- search end -->
			</div>
			<#include "tpl/content-none.ftl">
        </#if>
	</main><!-- #main -->
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
						<a href="${pagination.prevPageFullPath!}"><i class="iconfont">&#xe679;</i></a>
					</#if>
					<#if pagination.hasNext>
						<a href="${pagination.nextPageFullPath!}"><i class="iconfont">&#xe6a3;</i></a>
					</#if>
				</nav>
			</#if>
		</@paginationTag>
</section><!-- #primary -->
<#include "footer.ftl">
<@footer />
