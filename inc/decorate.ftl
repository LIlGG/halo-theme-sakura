<@compress single_line=true>
<style type="text/css">
    <#if settings.shownav!false>
      .site-top .lower nav {
          display: block !important;
      }
    </#if>
    <#if (settings.cursor_skin!'sakura') == 'sakura'>
    /** 鼠标样式 */
    a {
        cursor: url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/cursor/ayuda.cur), auto
    }

    a:active {
	    cursor: url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/cursor/work.cur),alias
    }

    p {
        cursor: url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/cursor/texto.cur),auto
    }

    body {
        cursor: url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/cursor/normal.cur),auto;
    }

    .cd-top {
        cursor: url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/cursor/No_Disponible.cur),auto;
    }

    .botui-actions-buttons-button {
        cursor: url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/cursor/No_Disponible.cur),auto;
    }

    .button.botui-actions-buttons-button {
        cursor: url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/cursor/No_Disponible.cur),auto;
    }

    .highlight-wrap code {
        cursor: url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/Sakura/cursor/texto.cur),auto
    }
    </#if>
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
</style>
</@compress>