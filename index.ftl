<#--
	@package Akina
-->
<#global res_base_url = settings.cdn?then("//cdn.jsdelivr.net/gh/LIlGG/halo-theme-sakura@1.3.1", theme_base)/>

<#include "header.ftl">
<@header title="${blog_title!}">
	<div class="blank"></div>
</@header>

<#if settings.head_notice!false && settings.notice_title!=''>
	<div class="notice" style="
	<#if (settings.focus_height!true)>
		margin-top: 20px;
	</#if>
		">
		<i class="iconfont icon-broadcast"></i>
		<div class="notice-content">${settings.notice_title!}</div>
	</div>
</#if>

<#if settings.top_feature!true>
	<#include "layouts/feature.ftl">
</#if>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<h1 class="main-title" style="font-family: 'Ubuntu', sans-serif;">
		<i class="fa fa-envira" aria-hidden="true"></i>
		<span class="i18n" data-iname="home.discovery"> </span>
		</h1>
		<#if posts?? && posts.getTotalElements() gt 0>
			<#--Start the Loop-->
			<#if (settings.post_list_style!'standard') == 'standard'>
				<#list posts.content as post>
					<#include "tpl/content.ftl">
				</#list>
			<#else>
				<#include "tpl/content-thumb.ftl">
			</#if>
		<#else>
			<#include "tpl/content-none.ftl">
		</#if>
	</main><!-- #main -->

	<@paginationTag method="index" page="${posts.number}" total="${posts.totalPages}" display="3">
		<#include "layouts/list-nextprev.ftl">
	</@paginationTag>
</div><!-- #primary -->

<#include "footer.ftl">
<@footer />