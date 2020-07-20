<#--
    @package Akina
-->
<article id="post-${post.id?c}">
    <#if !(settings.patternimg!true) || !(post.thumbnail?? || post.thumbnail!='')>
        <header class="entry-header">
            <h1 class="entry-title">${post.title!}</h1>
            <p class="entry-census">${post.createTime?string('yyyy-MM-dd')}
                &nbsp;&nbsp;${post.visits!0} 次阅读</p>
            <hr>
        </header><!-- .entry-header -->
    </#if>
    <#if (metas.toc?boolean)!true>
    <div class="toc-container">
        <div class="toc"></div>
    </div>
    </#if>
    <div class="entry-content">
        ${post.formatContent!}
        <p>Q.E.D. <i class="fa fa-meetup" aria-hidden="true" style="color:#d34836"></i></p>
    </div><!-- .entry-content -->
    <#if settings.alipay_code?? || settings.wechat_code??>
    <div class="single-reward">
        <div class="reward-open">赏
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
                知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
            </a>
        </div>
        <div class="post-tags">
            <#if tags?? && tags?size gt 0>
                <i class="iconfont">&#xe68c;</i>
                <#list tags as tag>
                    <a href="${tag.fullPath!}" rel="tag">${tag.name!}</a>
                </#list>
            </#if>
        </div>
        <#include "../layouts/sharelike.ftl">
    </footer><!-- .entry-footer -->
</article><!-- #post-## -->
