<#--
	@package Akina
-->
<article class="post post-list" itemscope="" itemtype="http://schema.org/BlogPosting">
	<div class="post-entry">
		<div class="feature">
			<#if post.thumbnail?? && post.thumbnail!=''>
			<a href="${post.fullPath!}">
				<div class="overlay"><i class="iconfont icon-text"></i></div>
				<img width="150" height="150" src="${post.thumbnail!}" class="attachment-post-thumbnail size-post-thumbnail" alt="" />
			</a>
			<#else>
			<a href="${post.fullPath!}">
				<div class="overlay"><i class="iconfont icon-text"></i></div>
				<img src="${theme_base!}/images/random/d-${randomMethod(1,10)}.jpg"/>
			</a>
			</#if>
		</div>
		<h1 class="entry-title"><a href="${post.fullPath!}">${post.title!}</a></h1>
		<div class="p-time">
			<#if post.topPriority?? && post.topPriority!=0>
				<i class="iconfont icon-hot hotpost"></i>
			</#if>
			<i class="iconfont icon-time"></i>发布于 ${post.createTime?string("yyyy-MM-dd")}
		</div>
		<p>${post.summary!}</p>
		<footer class="entry-footer">
			<div class="post-more">
				<a href="${post.fullPath!}"><i class="iconfont icon-caidan"></i></a>
			</div>
			<div class="info-meta">
				<div class="comnum">
					<span><i class="iconfont icon-mark"></i>${post.commentCount!0} 条评论</span>
				</div>
				<div class="views">
					<span><i class="iconfont icon-attention"></i>${post.visits!0} 热度</span>
				</div>
			</div>
		</footer><!-- .entry-footer -->
	</div>
	<hr>
</article><!-- #post-## -->