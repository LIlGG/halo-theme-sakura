<#--
	@package Akina
-->
<article class="post post-list" itemscope="" itemtype="http://schema.org/BlogPosting">
	<div class="post-entry">
		<div class="feature">
			<a href="${post.fullPath!}">
				<div class="overlay"><i class="iconfont icon-text"></i></div>
				<#if post.thumbnail?? && post.thumbnail!=''>
				<img width="150" height="150" src="${post.thumbnail!}" class="attachment-post-thumbnail size-post-thumbnail" onerror="imgError(this, IMG_Type.DEFAULT)"/>
				<#elseif settings.rimage_cover_open!true && settings.rimage_url?? && settings.rimage_url!=''>
					<#if settings.rimage_cover_itype == 'image'>
					<img width="150" height="150" src="${settings.rimage_url!}?postid=${post.id}&type=url&itype=image&qn=${(settings.rimage_cover_content_qn)!'0'}" class="attachment-post-thumbnail size-post-thumbnail" onerror="imgError(this, IMG_Type.DEFAULT)">
					<#else>
					<img width="150" height="150" src="${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}&id=${(settings.rimage_cover_id)!''}&qn=${(settings.rimage_cover_content_qn)!'0'}" class="attachment-post-thumbnail size-post-thumbnail" onerror="imgError(this, IMG_Type.DEFAULT)">
					</#if>
				<#else>
				<img src="${res_base_url!}/source/images/random/d-${randomMethod(1,10)}.jpg" onerror="imgError(this, IMG_Type.DEFAULT)"/>
				</#if>		
			</a>
		</div>
		<h1 class="entry-title"><a href="${post.fullPath!}">${post.title!}</a></h1>
		<div class="p-time">
			<#if post.topPriority?? && post.topPriority!=0>
				<i class="iconfont icon-hot hotpost"></i>
			</#if>
			<i class="iconfont icon-time"></i><span class="i18n" data-iname="postlist.time" data-ivalue="${post.createTime?string('yyyy-MM-dd')}"></span>
		</div>
		<p>${post.summary!}</p>
		<footer class="entry-footer">
			<div class="post-more">
				<a href="${post.fullPath!}"><i class="iconfont icon-caidan"></i></a>
			</div>
			<div class="info-meta">
				<div class="comnum">
					<span><i class="iconfont icon-mark"></i><span class="i18n" data-iname="postlist.heat" data-ivalue="${post.visits?c}"></span></span>
				</div>
				<div class="views">
					<span><i class="iconfont icon-attention"></i><span class="i18n" data-iname="postlist.comments" data-ivalue="${post.commentCount!0}"></span></span>
				</div>
			</div>
		</footer><!-- .entry-footer -->
	</div>
	<hr>
</article><!-- #post-## -->