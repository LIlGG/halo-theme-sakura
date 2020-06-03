<#--
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Akina
 */
-->
</div><!-- #content -->
<#include "comments.ftl">
<#if is_post??>
	<@comment post,"post" />
<#elseif is_sheet??>
	<@comment sheet,"sheet" />
</#if>
</div><!-- #page Pjax container-->
<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="site-info">
		<div class="footertext">
			<p class="foo-logo"
			   style="background-image: url('${theme_base!}/images/f-logo.png');"></p>
			<p>
				<@global.footer />
			</p>
		</div>
		<div class="footer-device">
			&nbsp; <a href="http://www.akina.pw/themeakina" rel="designer" target="_blank">Theme</a> &nbsp; <a href="https://halo.run/" target="_blank" rel="nofollow">Halo</a> &nbsp;
		</div>
	</div><!-- .site-info -->
</footer><!-- #colophon -->
<div class="openNav">
	<div class="iconflat">
		<div class="icon"></div>
	</div>
	<div class="site-branding">
		<#if blog_logo?? && blog_logo!=''>
			<div class="site-title">
				<a href="${blog_url!}">
					<img src="${blog_logo!}">
				</a>
			</div>
		<#else>
			<h1 class="site-title"><a href="${blog_url!}">${blog_title!}</a></h1>
		</#if>
	</div>
</div><!-- m-nav-bar -->
</section><!-- #section -->
<!-- m-nav-center -->
<div id="mo-nav">
	<div class="m-avatar">
		<#if user.avatar??>
			<img src="${user.avatar!}">
		<#else>
			<img src="${theme_base!}/images/avatar.jpg">
		</#if>
	</div>
	<div class="m-search">
		<form class="m-search-form" method="get" action="/search" role="search">
			<input class="m-search-input" type="search" name="keyword" placeholder="搜索..." required>
		</form>
	</div>
	<ul id="menu-menu-1" class="menu">
		<@menuTag method="tree">
			<#list menus?sort_by('priority') as menu>
				<li>
					<a href="${menu.url!}">${menu.name!}</a>
					<#if menu.children?? && menu.children?size gt 0>
						<ul class="sub-menu">
							<#list menu.children as child>
								<li><a href="${child.url!}">${child.name}</a></li>
							</#list>
						</ul>
					</#if>
				</li>
			</#list>
		</@menuTag>
	</ul>
</div><!-- m-nav-center end -->
<a href="#" class="cd-top"></a>
<!-- search start -->
<form class="js-search search-form search-form--modal" method="get" action="/search" role="search">
	<div class="search-form__inner">
		<div>
			<p class="micro mb-">输入后按回车搜索 ...</p>
			<i class="iconfont">&#xe65c;</i>
			<input class="text-input" type="search" name="keyword" placeholder="Search" required>
		</div>
	</div>
	<div class="search_close"></div>
</form>
<!-- search end -->
<script type='text/javascript' src='${theme_base!}/js/jquery.min.js?ver=2.0.6.170420'></script>
<script type='text/javascript' src='${theme_base!}/js/jquery.pjax.js?ver=2.0.6.170420'></script>
<script type='text/javascript' src='${theme_base!}/js/input.min.js?ver=2.0.6.170420'></script>
<script type='text/javascript'>
	/* <![CDATA[ */
	var Poi = {
		"pjax":"${(settings.poi_pjax!true)?string('true','')}",
		"windowheight":"${(!(settings.focus_height!true))?string('fixed','auto')}",
		"codelamp":"open",
		"ajaxurl":"${blog_url!}",
		"formpostion":"bottom"
	};
	/* ]]> */
</script>
<#if is_post?? || is_sheet??>
	<script type="text/javascript" src="${theme_base!}/plugins/prism/js/prism.js"></script>
	<link href="${theme_base!}/plugins/prism/css/prism-${settings.code_pretty!'Default'}.css" type="text/css" rel="stylesheet" />
</#if>
<script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.js"></script>
<script type='text/javascript' src='${theme_base!}/js/app.js?ver=2.0.6.170420'></script>
<div class="site-statistics">
	<@global.statistics />
</div>
</body>
</html>