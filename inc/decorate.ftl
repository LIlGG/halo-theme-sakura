<@compress single_line=true>
<style type="text/css">
    <#if settings.shownav!false>
      .site-top .lower nav {
          display: block !important;
      }
    </#if>
    /**
    * 图片资源
    */
    .video-play,
    .loadvideo {
        background-image: url(${res_base_url!}/source/images/play@32x32.png)
    }

    .video-pause {
	    background-image: url(${res_base_url!}/source/images/pause@32x32.png)
    }

    #video-add {
        background-image: url(${res_base_url!}/source/images/add@32x32.png);
    }

    #loading-comments {
        background-image: url(${res_base_url!}/source/images/disqus-preloader.svg);
    }

    .headertop.filter-grid:before {
        background-image: url(${res_base_url!}/source/images/grid.png)
    }

    .headertop.filter-dot:before {
        background-image: url(${res_base_url!}/source/images/dot.gif)
    }

    @media (max-width:860px) {
        .headertop.filter-dot:before {
            background-image: url(${res_base_url!}/source/images/grid.png)
        }
    }

    .search-form.is-visible {
        background-image: url(${res_base_url!}/source/images/other/iloli.gif);
    }

    #pagination .loading {
        background-image: url(${res_base_url!}/source/images/rotating-ball-o.svg);
    }

    #banner_wave_1 {
        background-image: url(${res_base_url!}/source/images/wave1.png) repeat-x;
    }

    #banner_wave_2 {
        background-image: url(${res_base_url!}/source/images/wave2.png) repeat-x;
    }
    <#if (settings.cursor_skin!'sakura') == 'sakura'>
    /** 鼠标样式 */
    a {
        cursor: url(${res_base_url!}/source/cursor/ayuda.cur), auto
    }

    a:active {
	    cursor: url(${res_base_url!}/source/cursor/work.cur),alias
    }

    p {
        cursor: url(${res_base_url!}/source/cursor/texto.cur),auto
    }

    body {
        cursor: url(${res_base_url!}/source/cursor/normal.cur),auto;
    }

    .cd-top {
        cursor: url(${res_base_url!}/source/cursor/No_Disponible.cur),auto;
    }

    .botui-actions-buttons-button {
        cursor: url(${res_base_url!}/source/cursor/No_Disponible.cur),auto;
    }

    .button.botui-actions-buttons-button {
        cursor: url(${res_base_url!}/source/cursor/No_Disponible.cur),auto;
    }

    .highlight-wrap code {
        cursor: url(${res_base_url!}/source/cursor/texto.cur),auto
    }
    </#if>

    .cd-top {
        background: url(${(settings.top_back_img)!'${res_base_url!}/source/images/scroll.png'}) no-repeat center;
    }

    <#if settings.theme_skin??>
    .author-profile i, .post-like a, .post-share .show-share, .sub-text, .we-info a, span.sitename, .post-more i:hover, #pagination a:hover, .post-content a:hover, .float-content i:hover {
        color: ${settings.theme_skin!}
    }

    .feature i, .feature-title span, .download, .navigator i:hover, .links ul li:before, .ar-time i, span.ar-circle, .object, .comment .comment-reply-link, .siren-checkbox-radio:checked + .siren-checkbox-radioInput:after {
        background: ${settings.theme_skin!}
    }

    ::-webkit-scrollbar-thumb {
        background: ${settings.theme_skin!}
    }

    .download, .navigator i:hover, .link-title, .links ul li:hover, #pagination a:hover, .comment-respond input[type='submit']:hover {
        border-color: ${settings.theme_skin!}
    }

    .entry-content a:hover, .site-info a:hover, .comment h4 a, #comments-navi a.prev, #comments-navi a.next, .comment h4 a:hover, .site-top ul li a:hover, .entry-title a:hover, #archives-temp h3, span.page-numbers.current, .sorry li a:hover, .site-title a:hover, i.iconfont.js-toggle-search.iconsearch:hover, .comment-respond input[type='submit']:hover {
        color: ${settings.theme_skin!}
    }

    #nprogress .bar {
        background: ${settings.theme_skin!}
    }

    #nprogress .peg {
        box-shadow: 0 0 10px ${settings.theme_skin!}, 0 0 5px ${settings.theme_skin!};
    }

    #pagination a:hover {
        border: 1px solid ${settings.theme_skin!};
    }

    #pagination a:hover {
        -webkit-box-shadow: 0 0 4px ${settings.theme_skin!};
        -moz-box-shadow: 0 0 4px ${settings.theme_skin!};
        -o-box-shadow: 0 0 4px ${settings.theme_skin!};
        box-shadow: 0 0 4px ${settings.theme_skin!}
    }

    .entry-content a:after {
        background-color: ${settings.theme_skin!}
    }

    .site-top ul li a:after {
        background-color: ${settings.theme_skin!}
    }

    .post-tags a:hover {
        color: ${settings.theme_skin!}
    }

    @media (max-width: 860px) {
        #mo-nav ul li a:hover {
            color: ${settings.theme_skin!};
        }
    }
        <#if settings.tag_cloud!true>
            @media (min-width: 860px) {
            .chip-container {
                margin-top: -60px;;
            }
        }
        </#if>
    </#if>
    <#if settings.site_custom_style??>
        ${settings.site_custom_style!}
    </#if>

    <#if (settings.list_type!'round') == 'square'>
    .feature img {
        border-radius: 0;!important;
    }

    .feature i {
        border-radius: 0;!important;
    }
    </#if>
    <#if (settings.photos_style!'justify') == 'justify' || (settings.photos_style!'justify') == 'packery'>
    #gallery-filter {
        text-align: center;
    }
    </#if>
    <#if (settings.photos_style!'justify') == 'packery'>
    .masonry-gallery.gallery {
        margin: 0 auto;
    }
    </#if>
    
    .masonry-gallery .gallery-item {
	    margin-bottom: ${(settings.photos_gutter)!10}px
    }
    /** 日志 */
    .journals-line>li:nth-child(odd) .journal-label:after {
        border-right-color: ${(settings.journal_color_bg_1)!'#E6E6FA'};
    }

    .at_button {
        background-color: ${(settings.journal_color_bg_1)!'#E6E6FA'};
        color: ${(settings.journal_color_font_1)!'block'};
    }

    .at_button:hover {
        background: ${(settings.journal_color_bg_2)!'#F0FFFF'};
        color: ${(settings.journal_color_font_2)!'block'};
    }

    <#if settings.journal_bg??>
        .journals-line>li:nth-child(odd) .journal-label {
            <#if settings.journal_bg_blur!true>
            background: linear-gradient(60deg,rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35) 95%) 0% 0% / cover, url(${settings.journal_bg}) 0% 0% / cover;
            <#else>
            background: url(${settings.journal_bg}) 0% 0% / cover;
            </#if>
            color: ${(settings.journal_color_font_1)!'block'};
        }
        .journals-line>li .journal-label {
            <#if settings.journal_bg_blur!true>
            background: linear-gradient(60deg,rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35) 95%) 0% 0% / cover, url(${settings.journal_bg}) 0% 0% / cover;
            <#else>
            background: url(${settings.journal_bg}) 0% 0% / cover;
            </#if>
            color: ${(settings.journal_color_font_2)!'block'};
        }
    <#else>
    .journals-line>li:nth-child(odd) .journal-label {
        background: ${(settings.journal_color_bg_1)!'#E6E6FA'};
        color: ${(settings.journal_color_font_1)!'block'};
    }

    .journals-line>li .journal-label {
        background: ${(settings.journal_color_bg_2)!'#F0FFFF'};
        color: ${(settings.journal_color_font_2)!'block'};
    }
    </#if>

    <#if settings.top_back_mode == 'simplify'>
    .cd-top {
		display: none;
		height: 60px;
		width: 50px
	}

	.cd-top span {
		height: 10px;
		width: 50px
	}

	.m-cd-top {
		display: block;
        bottom: 40px;
	}

    @media screen and (max-width:860px) { 
        .m-cd-top {
            bottom: 10px;
        }
    }
    </#if>


    /*黑夜模式控件透明度*/
    body.dark .header-info,
    body.dark .top-social img {
        color:#fff;
        background:rgba(0,0,0,${(settings.dark_widget_tmd)!0.7});
    }

    body.dark .notification,
    body.dark .the-feature.from_left_and_right .info {
        background-color: rgba(0,0,0,${(settings.dark_widget_tmd)!0.7});
    }

    body.dark .skin-menu,
    body.dark .m-cd-top {
        background-color:rgba(0,0,0,${(settings.dark_widget_tmd)!0.7}) !important;
    }

    /*黑夜模式图像亮度*/
    body.dark img,
    body.dark .highlight-wrap,
    body.dark iframe,
    body.dark .entry-content .aplayer {
        filter:brightness(${(settings.dark_imgbri)!0.7});
    }

    /*黑夜模式主题色*/
    body.dark .ar-time i,
    body.dark span.ar-circle,
    body.dark .scrollbar,
    body.dark .butterBar-message,
    body.dark .aplayer .aplayer-list ol li:hover {
        background: ${settings.theme_dark!} !important;
    }

    body.dark .aplayer .aplayer-list ol li.aplayer-list-light .aplayer-list-cur,
    body.dark .user-menu-option a:hover ,
    body.dark .menu-list li:hover ,
    body.dark .font-family-controls button:hover ,
    body.dark .openNav .icon, 
    body.dark .openNav .icon:before ,
    body.dark .openNav .icon:after ,
    body.dark .openNav .icon:after ,
    body.dark .site-top ul li a:after  {
        background-color: ${settings.theme_dark!};
    }
    body.dark #archives-temp h3,
    body.dark #moblieGoTop,
    body.dark #changskin,
    body.dark .the-feature.from_left_and_right a:hover .info p,
    body.dark .the-feature.from_left_and_right .info,
    body.dark .ins-section .ins-search-item:hover,
    body.dark .ins-section .ins-search-item:hover .ins-slug,
    body.dark .ins-section .ins-search-item:hover .ins-search-preview,
    body.dark .ins-section .ins-search-item:hover .iconfont ,
    body.dark .float-content i:hover,
    body.dark .menhera-container .emoji-item:hover ,
    body.dark .comment-respond .logged-in-as a:hover ,
    body.dark .site-top ul li a:hover ,
    body.dark i.iconfont.js-toggle-search.iconsearch:hover {
        color: ${settings.theme_dark!};
    }

    body.dark .aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon:hover path  {
        fill: ${settings.theme_dark!}
    }

    body.dark #moblieGoTop:hover , 
    body.dark #changskin:hover {
        color: ${settings.theme_dark!};
        opacity:.8;
    }

    body.dark .focusinfo .header-tou img  {
        box-shadow: inset 0 0 10px ${settings.theme_dark!};
    }
</style>
<!-- 黑夜模式评论模块 -->
<style id="comment-style" type="text/css" media="noexist">
    .halo-comment.dark button,
    .halo-comment.dark input,
    .halo-comment.dark select,
    .halo-comment.dark textarea,
    .halo-comment.dark i.iconfont.js-toggle-search.iconsearch,
    .halo-comment.dark .comment-textarea .input-label,
    .halo-comment.dark #emotion-toggle span,
    .halo-comment.dark .emotion-box,
    .halo-comment.dark .emotion-box .motion-container .emoji-item {
        color: #eee !important;
    }

    .halo-comment.dark .body p {
        color: #bebebe !important;
    }

    .halo-comment.dark input[type=color]:focus,
    .halo-comment.dark input[type=date]:focus,
    .halo-comment.dark input[type=datetime-local]:focus,
    .halo-comment.dark input[type=datetime]:focus,
    .halo-comment.dark input[type=email]:focus,
    .halo-comment.dark input[type=month]:focus,
    .halo-comment.dark input[type=number]:focus,
    .halo-comment.dark input[type=password]:focus,
    .halo-comment.dark input[type=range]:focus,
    .halo-comment.dark input[type=search]:focus,
    .halo-comment.dark input[type=tel]:focus,
    .halo-comment.dark input[type=text]:focus,
    .halo-comment.dark input[type=time]:focus,
    .halo-comment.dark input[type=url]:focus,
    .halo-comment.dark input[type=week]:focus,
    .halo-comment.dark textarea:focus {
        color: #eee !important;
        background-color: #31363b !important;
    }

    .halo-comment.dark .comment .info, 
    .halo-comment.dark .comment .comment-time,
    .halo-comment.dark .comment-respond .logged-in-as, 
    .halo-comment.dark .notification, 
    .halo-comment.dark .comment-respond .logged-in-as a {
        color: #9499a8;
    }

    <#if settings.comment_custom_style??>
        ${settings.comment_custom_style!}
    </#if>
</style>
</@compress>