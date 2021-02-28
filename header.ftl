<#--
	@package Akina
-->
<#global res_base_url = settings.cdn?then("//cdn.jsdelivr.net/gh/LIlGG/halo-theme-sakura@1.3.1", theme_base)/>
<#macro header title>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title itemprop="name">${title!}</title>
	<meta name="description" content="${meta_description!}"/>
	<meta name="keywords" content="${meta_keywords!}"/>
  	<link rel="dns-prefetch" href="//cdn.jsdelivr.net">

	<@global.head />
	<link rel='stylesheet' href='${theme_base!}/styles/style.min.css?ver=1.3.1' type='text/css' media='all'>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+SerifMerriweather|Merriweather+Sans|Source+Code+Pro|Ubuntu:400,700|Noto+Serif+SC" media="noexist" onload="this.media='all'">
	<link rel="stylesheet" href="//at.alicdn.com/t/font_2010950_uq2c7ykeiyk.css" media="noexist" onload="this.media='all'">
	<link rel="stylesheet" href="${res_base_url!}/source/css/lib.css" media="noexist" onload="this.media='all'">
	<link rel='stylesheet' href="${res_base_url!}/source/css/highlight/highlight-${settings.code_pretty!'Default'}.css" type="text/css" media="noexist" onload="this.media='all'">
	<#if settings.is_aplayer!false>
	<link rel="stylesheet" href="${res_base_url!}/source/lib/APlayer/APlayer.min.css" media='all'>
	</#if>
	<#if settings.tag_cloud!true>
	<link rel="stylesheet" href="${res_base_url!}/source/lib/jqcloud2/jqcloud.min.css" media="noexist" onload="this.media='all'">
	</#if>
	<#if settings.photos_style == "justify">
	<link rel="stylesheet" href="${res_base_url!}/source/lib/justifiedGallery/justifiedGallery.min.css" media="noexist" onload="this.media='all'">
	</#if>
	<#include "inc/decorate.ftl">
	<script type="text/javascript">
		if (!!window.ActiveXObject || "ActiveXObject" in window) {
			alert('请抛弃万恶的IE系列浏览器吧。');
		}
	</script>
</head>
<body class="hfeed chinese-font serif">
<section id="main-container">
    <#if settings.head_focus!true>
		<div class="headertop ${settings.focus_img_filter!'filter-nothing'}">
		<#include "layouts/imgbox.ftl">
		<!-- 背景视频 -->
		<#if settings.bgvideo!false>
			<#if settings.bgvideo_url?? && settings.bgvideo_url!= '' || settings.bgvideo_id?? && settings.bgvideo_id!= ''>
			<#include "layouts/videobox.ftl">
			</#if>
		</#if>
		<!-- 首页下拉箭头 -->
		<#if settings.godown!true>
			<div class="headertop-down faa-float animated" onclick="headertop_down()">
				<span><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
			</div>
		</#if>
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
					<img src="${(user.avatar)!}" width="30" height="30">
					<div class="header-user-menu">
						<div class="herder-user-name">
							<div class="herder-user-name-u">${(user.nickname)!}</div>
						</div>
					</div>
				</div>
				<#if settings.top_search!true>
				<div class="searchbox"><i class="iconfont js-toggle-search iconsearch icon-search"></i></div>
				</#if>
				<div class="lower-cantiner">
					<div class="lower">
						<#if !settings.shownav!false>
							<div id="show-nav" class="showNav mobile-fit">
								<div class="line line1"></div>
								<div class="line line2"></div>
								<div class="line line3"></div>
							</div>
						</#if>
						<nav <#if settings.shownav!false>class="navbar"</#if>>
							<#include "layouts/nav.ftl">
						</nav>
						<!-- #site-navigation -->
					</div>
				</div>
			</div>
		</header><!-- #masthead -->
		<#nested />
		<div id="content" class="site-content">
</#macro>
