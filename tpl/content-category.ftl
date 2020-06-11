<#--
    @package Akina
-->
<article class="post works-list" itemscope="" itemtype="http://schema.org/BlogPosting">
    <div class="works-entry">
        <div class="works-main">
            <div class="works-feature">
                <#if post.thumbnail?? && post.thumbnail!=''>
                    <a href="${post.fullPath!}" style="background-image: url(${post.thumbnail!});"></a>
                <#else>
                    <a href="${post.fullPath!}" style="background-image: url(${theme_base!}/images/temp.jpg);"></a>
                </#if>
            </div>

            <div class="works-overlay">
                <h1 class="works-title"><a href="${post.fullPath!}">${post.title!}</a></h1>
                <div class="works-p-time">
                    <i class="iconfont">&#xe74a;</i> ${post.createTime?string("yyyy-MM-dd")}
                </div>
                <div class="works-meta">
                    <div class="works-comnum">
                        <span><i class="iconfont">&#xe731;</i> <?php comments_popup_link('暂无', '1 ', '% '); ?></span>
                    </div>
                    <div class="works-views">
                        <span><i class="iconfont">&#xe73d;</i> ${post.visits?c} </span>
                    </div>
                </div>
                <a class="worksmore" href="${post.fullPath!}"></a>
            </div>
            <!-- .entry-footer -->
        </div>
    </div>

</article><!-- #post-## -->
