<#--
	@package Akina
-->
<#list posts.content as post>
<article class="post post-list-thumb <#if (post_index+1) % 2==0>post-list-thumb-left</#if>" itemscope="" itemtype="http://schema.org/BlogPosting">
	<div class="post-thumb">
		<#if post.thumbnail?? && post.thumbnail!=''>
			<a href="${post.fullPath!}">
				<#--  <#include "../layouts/lazyload-img.ftl">  -->
				<img class="lazyload" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" data-src="${post.thumbnail!}" onerror="imgError(this, IMG_Type.DEFAULT)">
			</a>
		<#else>
			<a href="${post.fullPath!}">
				<img class="lazyload" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" data-src="${res_base_url!}/source/images/temp.jpg" onerror="imgError(this, IMG_Type.DEFAULT)">
			</a>
		</#if>
	</div><!-- thumbnail-->
	<div class="post-content-wrap">
		<div class="post-content">
			<div class="post-date">
				<i class="iconfont icon-time"></i><span class="i18n" data-iname="postlist.time" data-ivalue="${post.createTime?string('yyyy-MM-dd')}"></span>
				<#if post.topPriority?? && post.topPriority!=0>&nbsp;<i class="iconfont icon-hot hotpost"></i></#if>
			</div>
			<a href="${post.fullPath!}" class="post-title"><h3>${post.title!}</h3></a>
			<div class="post-meta">
				<span><i class="iconfont icon-attention"></i><span class="i18n" data-iname="postlist.heat" data-ivalue="${post.visits?c}"></span></span>
				<span class="comments-number"><i class="iconfont icon-mark"></i><span class="i18n" data-iname="postlist.comments" data-ivalue="${post.commentCount!0}"></span></span>
				<#if post.categories?? && post.categories?size gt 0>
				<span><i class="iconfont icon-file"></i><a href="${post.categories[0].fullPath!}">${post.categories[0].name!}</a></span>
				</#if>
			</div>
			<div class="float-content">
				<p>${post.summary!}</p>
				<div class="post-bottom">
					<a href="${post.fullPath!}" class="button-normal"><i class="iconfont icon-caidan"></i></a>
				</div>
			</div>
		</div>
	</div>
</article>
</#list>