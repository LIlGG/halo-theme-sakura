<#--
	@package Akina
-->
<#macro header title>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title itemprop="name">${title!}</title>

	<meta name="description" content="${meta_description!}"/>
	<meta name="keywords" content="${meta_keywords!}"/>

	<@global.head />
	<link rel='stylesheet' id='siren-css'  href='${theme_base!}/style.css?ver=2.0.6.170420' type='text/css' media='all' />
	<link rel='stylesheet' id='siren-css'  href='https://cdn.lixingyong.com/css/lib.css' type='text/css' media='all' />
	<link rel='stylesheet' id='siren-css'  href='https://cdn.lixingyong.com/css/iconfont/fonts-noto.css' type='text/css' media='all' />
	<#include "inc/decorate.ftl">
	<script type="text/javascript">
		if (!!window.ActiveXObject || "ActiveXObject" in window) { //is IE?
			alert('请抛弃万恶的IE系列浏览器吧。');
		}
	</script>
</head>
<body class="hfeed">
<section id="main-container">
    <#if settings.head_focus!true>
		<div class="headertop ${settings.focus_img_filter!'filter-nothing'}">
			<#include "layouts/imgbox.ftl">
		</div>
	</#if>
	<div id="page" class="site wrapper">
		<header class="site-header  <#if (is_index)!false == true>is-homepage</#if>" role="banner">
			<div class="site-top">
				<div class="site-branding">
					<#if blog_logo?? && blog_logo!=''>
						<div class="site-title">
							<a href="${blog_url!}">
								<img src="${blog_logo!}">
							</a>
						</div>
					<#else>
						<h1 class="site-title"><a href="${blog_url!}">${blog_title!}</a></h1>
					<!-- logo end -->
					</#if>
				</div><!-- .site-branding -->
				<div class="header-user-avatar">
					<img src="${user.avatar!}" width="30" height="30">
					<div class="header-user-menu">
						<div class="herder-user-name">
							<div class="herder-user-name-u">${user.nickname!}</div>
						</div>
<#--						<div class="user-menu-option">-->
<#--							<a href="${context!}/admin/index.html#/dashboard" target="_blank">管理中心</a>-->
<#--							<a href="${context!}/admin/index.html#/posts/write" target="_blank">撰写文章</a>-->
<#--							<a href="${context!}/admin/index.html#/user/profile" target="_blank">个人资料</a>-->
<#--						</div>-->
					</div>
				</div>
				<#if settings.top_search!true>
				<div class="searchbox"><i class="iconfont js-toggle-search iconsearch">&#xe65c;</i></div>
				</#if>
				<div class="lower-cantiner">
					<div class="lower">
						<#if !settings.shownav!false>
							<div id="show-nav" class="showNav">
								<div class="line line1"></div>
								<div class="line line2"></div>
								<div class="line line3"></div>
							</div>
						</#if>
						<nav <#if settings.shownav!false>class="navbar"</#if>>
							<ul id="menu-menu-1" class="menu" >
								<@menuTag method="tree">
									<#list menus?sort_by('priority') as menu>
										<li>
											<a <#if menu.url?? && menu.url?trim?length gt 0> href="${menu.url!}" target="${menu.target!}" </#if>>
												<span class="faa-parent animated-hover">
												<#if menu.icon?? && menu.icon?trim?length gt 0>
													<i class="${menu.icon}" aria-hidden="true"></i>
												</#if>${menu.name}</span>
											</a>
											<#if menu.children?? && menu.children?size gt 0>
												<ul class="sub-menu">
													<#list menu.children?sort_by('priority') as child>
														<li>
															<a href="${child.url!}" target="${child.target!}">
															<#if child.icon?? && child.icon?trim?length gt 1>
															<i class="${child.icon}" aria-hidden="true"></i>
															</#if>${child.name}</a>
														<li>
													</#list>
												</ul>
											</#if>
										</li>

									</#list>
								</@menuTag>
							</ul>
						</nav>
						<!-- #site-navigation -->
					</div>
				</div>
			</div>
		</header><!-- #masthead -->
		<#nested />
		<div id="content" class="site-content">
</#macro>