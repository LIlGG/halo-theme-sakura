<#--
	@package Akina
-->
<#list posts.content as post>
<article class="post post-list-thumb <#if (post_index+1) % 2==0>post-list-thumb-left</#if>" itemscope="" itemtype="http://schema.org/BlogPosting">
	<div class="post-thumb">
		<a href="${post.fullPath!}">
		<#if post.thumbnail?? && post.thumbnail!=''>
			<img class="lazyload" data-src="${post.thumbnail!}" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this)">
		<#elseif settings.rimage_cover_open!true && settings.rimage_url?? && settings.rimage_url!=''>
			<img
                src="${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>"
                srcset="<#if settings.rimage_cover_lqip == 'loading'>${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg<#else>${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=150</#if>"
                data-srcset="${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=640 640w,
                    ${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=960 960w,
                    ${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if>&th=1280 1280w,
                    ${settings.rimage_url!}?postid=${post.id}&type=url&itype=${settings.rimage_cover_itype!}<#if settings.rimage_cover_itype != 'image'>&id=${(settings.rimage_cover_id)!''}</#if> 1440w"
                data-sizes="auto"
                class="lazyload<#if settings.rimage_cover_lqip == 'lowquality'> blur-up</#if>" />
		<#else>
			<img class="lazyload" data-src="${res_base_url!}/source/images/temp.jpg" src="${res_base_url!}/source/images/svg/loader/orange.progress-bar-stripe-loader.svg" onerror="imgError(this)">
		</#if>
		</a>
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
				<span class="comments-number">
					<#if !settings.keep_record_mode!false>
					<i class="iconfont icon-mark"></i>
					<span class="i18n" data-iname="postlist.comments" data-ivalue="${post.commentCount!0}">
					</span>
					</#if>
				</span>
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