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
			   style="background-image: url('${settings.footer_logo?default('https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/Sakura/images/sakura.svg')}');"></p>
			<p style="font-family: 'Ubuntu', sans-serif;">
				<@global.footer />
			</p>
			<p>
				© ${.now?string("yyyy")} ${(user.nickname)!}
				<#if settings.footer_case_number??  && settings.footer_case_number != "">
				<a href="http://www.beian.miit.gov.cn" target="_blank">${settings.footer_case_number}</a>
				</#if>
			</p>
		</div>
		<div class="footer-device">
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
		<img src="${(user.avatar)!'${theme_base!}/images/avatar.jpg'}">
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
					<a href="${menu.url!}">
						<span class="faa-parent animated-hover">
						<#if menu.icon?? && menu.icon?trim?length gt 0>
							<i class="${menu.icon}" aria-hidden="true"></i>
						</#if>${menu.name!}</span>
					</a>
					<#if menu.children?? && menu.children?size gt 0>
						<ul class="sub-menu">
							<#list menu.children as child>
								<li>
								<a href="${child.url!}">
								<#if child.icon?? && child.icon?trim?length gt 1>
									<i class="${child.icon}" aria-hidden="true"></i>
								</#if>${child.name}</a></li>
							</#list>
						</ul>
					</#if>
				</li>
			</#list>
		</@menuTag>
	</ul>
	<p class="m-footer">© ${.now?string("yyyy")} ${(user.nickname)!}</p>
</div><!-- m-nav-center end -->
<a href="#" class="cd-top"></a>
<!-- m-cd-top start -->
<button class="m-cd-top" title="Go to top">
	<i class="fa fa-chevron-up" aria-hidden="true"></i>
</button>
<!-- m-cd-top end -->
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
<!-- aplayer start -->
<#if settings.is_aplayer!false || settings.aplayer_float!false>
<div id="aplayer-float" style="z-index: 100;" class="aplayer" data-global="true" data-id="${settings.aplayer_id!'2345868969'}" data-server="${settings.aplayer_server!'netease'}" data-type="${settings.aplayer_type!'playlist'}" data-fixed="true" data-preload="${settings.aplayer_preload!'none'}" data-order="${settings.aplayer_order!'list'}" data-theme="${settings.aplayer_theme!'orange'}" data-autoplay="${(settings.aplayer_autoplay!false)?string('true', 'false')}"></div>
</#if>
<!-- aplayer end -->
<!-- theme-change start -->
<#if settings.theme_change!true>
<div class="changeSkin-gear no-select">
	<div class="keys">
        <span id="open-skinMenu">切换主题 | SCHEME TOOL &nbsp;
          <i class="iconfont icon-gear inline-block rotating"></i>
        </span>
    </div>
</div>
<div class="skin-menu no-select">
	<div class="theme-controls row-container">
		<ul class="menu-list">
			<#list 0..7 as i>
			<#assign iconStr="settings.bg_icon_${i}" icon = (iconStr?eval)?default("fa fa-television") />
			<#assign descStr="settings.bg_desc_${i}" desc = (descStr?eval)?default("") />
			<li id="bg_${i}" data-text="${desc}">
            	<i class="${icon}" aria-hidden="true" ></i>
          	</li>
			</#list>
		</ul>
	</div>
</div>
<canvas id="night-mode-cover"></canvas>
</#if>
<!-- theme-change end -->
<script type='text/javascript' src='${theme_base!}/js/jquery.min.js?ver=2.0.6.170420'></script>
<script type='text/javascript' src='${theme_base!}/js/jquery.pjax.min.js?ver=2.0.6.170420'></script>
<script type='text/javascript' src='${theme_base!}/js/input.min.js?ver=2.0.6.170420'></script>
<script type='text/javascript'>
	/* <![CDATA[ */
	var Poi = {
		"pjax":"${(settings.poi_pjax!true)?string('true','')}",
		"windowheight":"${(!(settings.focus_height!true))?string('fixed','auto')}",
		"ajaxurl":"${blog_url!}",
		"formpostion":"bottom",
		"toc": "${(settings.post_toc!true)?string('true','')}",
		"codeLine": "${(settings.code_line!true)?string('true','')}",
		"themeChange": "${(settings.code_line!true)?string('true','')}",
		"headFocus": "${(settings.head_focus!true)?string('true','')}",
		"bgvideo": "${(settings.bgvideo!true)?string('true','')}"
	};

	var bgConfig = {
	<#list 0..7 as i>
		<#assign name = (("settings.bg_name_" + i)?eval)?default(""), 
				desc = (("settings.bg_desc_" + i)?eval)?default(""),
				url = (("settings.bg_url_" + i)?eval)?default(""),
				strategy = (("settings.bg_img_strategy_" + i)?eval)?default(""),
				isSkinSecter = (("settings.bg_skin_secter_" + i)?eval)?default(""),
				isNight = (("settings.bg_night_" + i)?eval)?default(""),
				isNightMode = (("settings.bg_night_mode_" + i)?eval)?default(""),
				opacity = (("settings.bg_opacity_" + i)?eval)?default("1") />
		
		"bg_${i}": {
			"name": "${name}",
			"desc": "${desc}",
			"url": "${url}",
			"strategy": "${strategy}",
			"isSkinSecter": "${(isSkinSecter!false)?string('true', '')}",
			"isNight": "${(isNight!true)?string('true', '')}",
			"isNightMode": "${(isNightMode!true)?string('true', '')}",
			"opacity": "${opacity}"

		},
	</#list>
	};
	/* ]]> */
</script>
<script type="text/javascript" src="${theme_base!}/plugins/highlight/js/highlight.pack.js"></script>
<#if settings.code_line!true>
	<script type="text/javascript" src="${theme_base!}/plugins/highlight/js/highlightjs-line-numbers.min.js"></script>
</#if>
<#if settings.is_aplayer!false>
	<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
	<script src="${theme_base!}/plugins/aplayer/js/index.js"></script>
</#if>
<#if settings.post_toc!true>
	<script src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/js/tocbot/4.11.1/js/tocbot.min.js"></script>
</#if>
<script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
<script src="${settings.comment_mode!'//cdn.jsdelivr.net/gh/LIlGG/halo-comment-sakura@v1.3.1/dist/halo-comment.min.js'}"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.min.js"></script>
<script type='text/javascript' src='${theme_base!}/js/app.js?ver=2.0.6.170420'></script>
<#if settings.live2d_switch!true>
<script src="https://cdn.bootcdn.net/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<#include "plugins/live2d/ftl/live2d.ftl">
<@live2d/>
</#if>
<div class="site-statistics">
	<@global.statistics />
</div>
</body>
</html>