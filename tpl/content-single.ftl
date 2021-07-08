<#--
    @package Akina
-->
<link rel='stylesheet' type='text/css' href='https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.css'>
<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/highlight.min.js"></script>
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/default.min.css">
<script src="/themes/LIlGG_Sakura/script/marked.min.js"></script>
<script src='https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js'></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css" integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.js" integrity="sha384-YNHdsYkH6gMx9y3mRkmcJ2mFUjTd0qNQQvY9VYZgQd7DcN7env35GzlmFaZ23JGp" crossorigin="anonymous"></script>
<script src="/themes/LIlGG_Sakura/plugins/katex/katex.js"></script>
<script src="/themes/LIlGG_Sakura/script/markdown.js"></script>
<article id="post-${post.id?c}">
    <#if !((settings.patternimg!true) && (post.thumbnail?? && post.thumbnail!='') || ((metas.ri?boolean)!true && settings.rimage_cover_open!true && settings.rimage_url?? && settings.rimage_url!=''))>
        <header class="entry-header">
            <h1 class="entry-title">${post.title!}</h1>
            <p class="entry-census">${post.createTime?string('yyyy-MM-dd')}
                &nbsp;&nbsp;<span class="i18n" data-iname="post.visits" data-ivalue="${post.visits!0}"></span></p>
            <hr>
        </header><!-- .entry-header -->
    </#if>
    <#if (metas.toc?boolean)!true>
        <div class="toc-container">
            <div class="toc"></div>
        </div>
    </#if>
    <div class="entry-content">
        <div id="realistic-content"></div>
        <p>Q.E.D. <i class="fa fa-meetup" aria-hidden="true" style="color:#d34836"></i></p>
    </div><!-- .entry-content -->
    <script>
        let problemContent = "${post.originalContent?j_string}"
        console.log(problemContent)
        markdown_text = marked(String.raw({raw:problemContent}));
        console.log(markdown_text);
        let target = $("#realistic-content");
        target.html(markdown_text);
        RenderKatex(target);
        $("table").each(function (){
            $(this).addClass("table");
        })
    </script>
    <#if settings.alipay_code?? || settings.wechat_code??>
        <div class="single-reward">
            <div class="reward-open"><span class="i18n" data-iname="post.reward"></span>
                <div class="reward-main">
                    <ul class="reward-row">
                        <#if settings.alipay_code?? && settings.alipay_code!=''>
                            <li class="alipay-code"><img src="${settings.alipay_code!}"></li>
                        </#if>
                        <#if settings.wechat_code?? && settings.wechat_code!=''>
                            <li class="wechat-code"><img src="${settings.wechat_code!}"></li>
                        </#if>
                    </ul>
                </div>
            </div>
        </div>
    </#if>
    <footer class="post-footer">
        <div class="post-lincenses">
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="nofollow">
                <i class="fa fa-creative-commons" aria-hidden="true"></i>
                <span class="i18n" data-iname="post.creative_commons"></span>
            </a>
        </div>
        <div class="post-tags">
            <#if tags?? && tags?size gt 0>
                <i class="iconfont icon-tags"></i>
                <#list tags as tag>
                    <a href="${tag.fullPath!}" rel="tag">${tag.name!}</a>
                </#list>
            </#if>
        </div>
        <#include "../layouts/sharelike.ftl">
    </footer><!-- .entry-footer -->
</article><!-- #post-## -->
