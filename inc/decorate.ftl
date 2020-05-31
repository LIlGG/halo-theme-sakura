<@compress single_line=true>
<style type="text/css">
    <#if settings.shownav!false>
      .site-top .lower nav {
          display: block !important;
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
</style>
</@compress>