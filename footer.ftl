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
<#macro footer>
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
			   style="background-image: url('${settings.footer_logo?default('https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/images/sakura.svg')}');"></p>
			<!-- 请尊重作者，请务必保留版权 -->
			<p style="font-family: 'Ubuntu', sans-serif;">
				<span style="color: #666666;">Powered 
 					<i class="fa fa-vimeo animated" style="color: #e74c3c;"></i> 
					by 
					<a rel="me" target="_blank"  href="http://halo.run" title="一个优秀的开源博客发布应用" style="color: #000000;text-decoration:none;">Halo</a>
				</span>
				 •
				<span style="color: #666666;">Crafted with
 					<i class="fa fa-heart animated" style="color: #e74c3c;"></i> 
					by 
					<a rel="me" target="_blank" href="https://github.com/LIlGG/halo-theme-sakura" style="color: #000000;text-decoration:none;">LIlGG</a>
				</span>
			</p>
			<@global.footer />
			<p>
				© ${.now?string("yyyy")} ${(user.nickname)!}
				<#if settings.footer_case_number??  && settings.footer_case_number != "">
				<a href="https://beian.miit.gov.cn/ " target="_blank">${settings.footer_case_number}</a>
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
	<#include "layouts/nav.ftl">
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
			<i class="iconfont icon-search"></i>
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
        <span id="open-skinMenu">切换主题 | SCHEME TOOL &nbsp;<i class="iconfont icon-gear inline-block rotating"></i></span>
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
<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/jquery@1.11.0/dist/jquery.min.js'></script>
<script type='text/javascript' src='${theme_base!}/js/jquery.pjax.min.js?ver=2.0.6.170420'></script>
<script type='text/javascript' src='${theme_base!}/js/input.min.js?ver=2.0.6.170420'></script>
<!-- 相册 -->
<#if settings.photos_style == "justify">
<script src="https://cdn.jsdelivr.net/npm/justifiedGallery@3.8.1/dist/js/jquery.justifiedGallery.min.js"></script>
<#elseif settings.photos_style == "masonry" || settings.photos_style == "packery">
<script src="https://cdn.jsdelivr.net/gh/metafizzy/isotope@3.0.6/dist/isotope.pkgd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/imagesloaded@4.1.4/imagesloaded.pkgd.min.js"></script>
<#if settings.photos_style == "packery">
<script type='text/javascript' src='${theme_base!}/js/packery-mode.pkgd.min.js?ver=2.0.6.170420'></script>
</#if>
</#if>
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
		"bgvideo": "${(settings.bgvideo!true)?string('true','')}",
		"tagRandomColorMin": "${settings.tag_randomColorMin!0.965}",
		"tagRandomColorMax": "${settings.tag_randomColorMax!0.969}",
		"nickname": "${user.nickname!}",
		"sitename": "${blog_title!}",
		"openToast": "${(settings.open_toast!true)?string('true','')}",
		"toastWidth": ${settings.toast_width!},
		"toastHeight": ${settings.toast_height!},
		"toastTop": "${settings.toast_top!}",
		"toastBackground": "${settings.theme_skin!}",
		"toastColor": "${settings.toast_color!}",
		"toastFontSize": ${settings.toast_font_size!},
		"copyMonitor": "${(settings.copy_monitor!true)?string('true','')}",
		"copyrightNotice": "${(settings.copyright_notice!true)?string('true','')}",
		"photosStyle": "${(settings.photos_style)!'justify'}",
		"photosGutter": ${(settings.photos_gutter)!10},
		"tocDepth": ${(settings.toc_depth)!0}
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
	<script src="${theme_base!}/plugins/aplayer/js/index.js"></script>
</#if>
<#if settings.post_toc!true>
	<script src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/js/tocbot/4.11.1/js/tocbot.min.js"></script>
</#if>
<script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
<script src="${settings.comment_mode!'//cdn.jsdelivr.net/gh/LIlGG/halo-comment-sakura@v1.3.1/dist/halo-comment.min.js'}"></script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.min.js"></script>
<#if settings.tag_cloud!true>
<script src="https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.js"></script>
<script type='text/javascript'>
	var wordcloud = [
		<@tagTag method="list">
		<#list tags as tag>
		{'text': '${tag.name!}', 'weight': '${tag.postCount!}', 'link': '${tag.fullPath!}'},
		</#list>
		</@tagTag>
	]
</script>
</#if>
<#if settings.category_radar!true>
<script src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.5/js/echarts/echarts.min.js"></script>
<script type='text/javascript'>
	var categoryRadar = {
		<@categoryTag method="list">
		<#list categories as category>
		'${category.name!}': '${category.postCount!}',
		</#list>
		</@categoryTag>
	}
</script>
</#if>
<script type='text/javascript' src='${theme_base!}/js/qrcode.min.js'></script>
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='${theme_base!}/js/app.min.js?ver=2.0.6.170420'></script>
<#nested />
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
</#macro>