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
<#assign cdn_base_url="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.8"/>
</div><!-- #page Pjax container-->
<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="site-info">
		<div class="footertext">
			<p class="foo-logo"
			   style="background-image: url('${settings.footer_logo?default('${cdn_base_url!}/img/Sakura/images/sakura.svg')}');"></p>
			<@global.footer />
		</div>
		<div class="footer-device">
			<!-- 请尊重作者，请务必保留版权 -->
			<p style="font-family: 'Ubuntu', sans-serif;">
				<span>Powered 
 					<i class="fa fa-vimeo animated" style="color: #e74c3c;"></i> 
					by 
					<a rel="me" target="_blank"  href="http://halo.run" title="一个优秀的开源博客发布应用" style="text-decoration:none;">Halo</a>
				</span>
				 •
				<span>Crafted with
 					<i class="fa fa-heart animated" style="color: #e74c3c;"></i> 
					by 
					<a rel="me" target="_blank" href="https://github.com/LIlGG/halo-theme-sakura" style="text-decoration:none;">LIlGG</a>
				</span>
			</p>
			<p>
				© ${.now?string("yyyy")} ${(user.nickname)!}
				<#if settings.footer_case_number??  && settings.footer_case_number != "">
				<a href="https://beian.miit.gov.cn/ " target="_blank">${settings.footer_case_number}</a>
				</#if>
			</p>
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

	<#if settings.glitch_text??>
		<p style="text-align: center; color: #333; font-weight: 900; font-family: 'Ubuntu', sans-serif; letter-spacing: 1.5px">${settings.glitch_text}</p>
	</#if>

	<#if settings.focus_infos!true>
		<p style="text-align: center; word-spacing: 20px;">
			<#if settings.twitter??>
				<a href="${settings.twitter!}" class="social-twitter" target="_blank" style="color: #00aced"><img src="${cdn_base_url!}/img/Sakura/images/sns/twitter.png" width="18"/></a>
			</#if>
			<#if settings.sina??>
				<a href="${settings.sina!}" class="social-sina" target="_blank" style="color: #dd4b39"><img src="${cdn_base_url!}/img/Sakura/images/sns/sina.png" width="18"/></a>
			</#if>
			<#if settings.github??>
				<a href="${settings.github!}" class="social-github" target="_blank" style="color: #333"><img src="${cdn_base_url!}/img/Sakura/images/sns/github.png" width="18"/></a>
			</#if>
			<#if settings.wechat??>
				<a href="${settings.wechat!}" class="social-wechat" target="_blank" style="color: #333"><img src="${cdn_base_url!}/img/Sakura/images/sns/wechat.png" width="18"/></a>
			</#if>
			<#if settings.qq??>
				<a href="//wpa.qq.com/msgrd?v=3&uin=${settings.qq!}&site=qq&menu=yes" class="social-wangyiyun" target="_blank" style="color: #333"><img src="${cdn_base_url!}/img/Sakura/images/sns/qq.png" width="18"/></a>
			</#if>
			<#if settings.bili??>
				<a href="${settings.bili!}" class="social-bili" target="_blank" style="color: #333"><img src="${cdn_base_url!}/img/Sakura/images/sns/bilibili.png" width="18"/></a>
			</#if>
			<#if settings.wangyiyun??>
				<a href="${settings.wangyiyun!}" class="social-wangyiyun" target="_blank" style="color: #333"><img src="${cdn_base_url!}/img/Sakura/images/sns/wangyiyun.png" width="18"/></a>
			</#if>
		</p>
	</#if>

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
</#if>
<!-- theme-change end -->
<!-- 定义全局属性 -->
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
				isNight = (("settings.bg_night_" + i)?eval)?default("") />
		
		"bg_${i}": {
			"name": "${name}",
			"desc": "${desc}",
			"url": "${url}",
			"strategy": "${strategy}",
			"isNight": "${(isNight!true)?string('true', '')}"
		},
	</#list>
	};
	/* ]]> */
</script>
<script type="text/javascript" src="${cdn_base_url!}/js/lib.js"></script>
<!-- 相册 -->
<#if settings.photos_style == "justify">
<script src="https://cdn.jsdelivr.net/npm/justifiedGallery@3.8.1/dist/js/jquery.justifiedGallery.min.js"></script>
<#elseif settings.photos_style == "masonry" || settings.photos_style == "packery">
<script src="https://cdn.jsdelivr.net/gh/metafizzy/isotope@3.0.6/dist/isotope.pkgd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/imagesloaded@4.1.4/imagesloaded.pkgd.min.js"></script>
<#if settings.photos_style == "packery">
<script type='text/javascript' src='${cdn_base_url!}/js/packery/packery-mode.pkgd.min.js'></script>
</#if>
</#if>
<script type="text/javascript" src="${theme_base!}/plugins/highlight/js/highlight.pack.js"></script>
<#if settings.code_line!true>
	<script type="text/javascript" src="${theme_base!}/plugins/highlight/js/highlightjs-line-numbers.min.js"></script>
</#if>
<#if settings.is_aplayer!false>
	<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js" defer></script>
	<script src="${theme_base!}/plugins/aplayer/js/index.js" defer></script>
</#if>
<#if settings.post_toc!true>
	<script src="${cdn_base_url!}/js/tocbot/4.11.1/js/tocbot.min.js" defer></script>
</#if>
<script src="${settings.comment_mode!'//cdn.jsdelivr.net/gh/LIlGG/halo-comment-sakura@v1.3.1/dist/halo-comment.min.js'}" defer></script>
<#if settings.tag_cloud!true>
<script src="https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.js" defer></script>
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
<script src="${cdn_base_url!}/js/echarts/echarts.min.js" defer></script>
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
<script type='text/javascript' src='${cdn_base_url!}/js/src/qrcode.min.js' defer></script>
<script type='text/javascript' src='${theme_base!}/js/app.min.js?ver=1.2.0'></script>
<#nested />
<#if settings.live2d_switch!true>
<script src="https://cdn.bootcdn.net/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" async defer></script>
<#include "plugins/live2d/ftl/live2d.ftl">
<@live2d/>
</#if>
<div class="site-statistics">
	<@global.statistics />
</div>
</body>
</html>
</#macro>