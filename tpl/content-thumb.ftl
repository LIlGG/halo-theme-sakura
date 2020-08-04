<#--
	@package Akina
-->
<#list posts.content as post>
<article class="post post-list-thumb <#if (post_index+1) % 2==0>post-list-thumb-left</#if>" itemscope="" itemtype="http://schema.org/BlogPosting">
	<div class="post-thumb">
		<#if post.thumbnail?? && post.thumbnail!=''>
			<a href="${post.fullPath!}">
				<#--  <#include "../layouts/lazyload-img.ftl">  -->
				<img class="lazyload" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/svg/loader/orange.progress-bar-stripe-loader.svg" data-src="${post.thumbnail!}" onerror="imgError(this, IMG_Type.DEFAULT)">
			</a>
		<#else>
			<a href="${post.fullPath!}">
				<img class="lazyload" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/svg/loader/orange.progress-bar-stripe-loader.svg" data-src="${theme_base!}/images/temp.jpg" onerror="imgError(this, IMG_Type.DEFAULT)">
			</a>
		</#if>
	</div><!-- thumbnail-->
	<div class="post-content-wrap">
		<div class="post-content">
			<div class="post-date">
				<i class="iconfont">&#xe65f;</i>发布于 ${post.createTime?string("yyyy-MM-dd")}
				<#if post.topPriority?? && post.topPriority!=0>
				&nbsp;<i class="iconfont hotpost">&#xe758;</i>
				</#if>
			</div>
			<a href="${post.fullPath!}" class="post-title"><h3>${post.title!}</h3></a>
			<div class="post-meta">
				<span>
					<i class="iconfont">&#xe73d;</i>${post.visits?c} 热度
				</span>
				<span class="comments-number">
					<i class="iconfont">&#xe731;</i>${post.commentCount!0} 条评论
				</span>
				<#if post.categories?? && post.categories?size gt 0>
				<span>
					<i class="iconfont">&#xe739;</i>
					<a href="${post.categories[0].fullPath!}">${post.categories[0].name!}</a>
				</span>
				</#if>
			</div>
			<div class="float-content">
				<p>${post.summary!}</p>
				<div class="post-bottom">
					<a href="${post.fullPath!}" class="button-normal"><i class="iconfont">&#xe6a0;</i></a>
				</div>
			</div>
		</div>
	</div>
</article>
</#list>