<#--
	NEXT / PREVIOUS POSTS (精华版)
-->
<#if settings.post_nepre!true>
<section class="post-squares nextprev">
	<#if prevPost??>
		<div class="post-nepre <#if nextPost??>half<#else>full</#if> previous">
			<a href="${prevPost.fullPath!}" rel="prev">
				<#if (settings.patternimg!true) && (prevPost.thumbnail?? && prevPost.thumbnail!='')>
				<div class="background" style="background-image:url('${prevPost.thumbnail!}');"></div>
				<#elseif ((metas.ri?boolean)!true && settings.rimage_cover_open!true && settings.rimage_url?? && settings.rimage_url!='')>
				<div class="background" style="background-image:url(${settings.rimage_url!}?postid=${prevPost.id}&type=url&itype=image&qn=${(settings.rimage_cover_detail_qn)!'0'});"></div>
				<#else>
				<div class="background" style="background-image:url();"></div>
				</#if>
				<span class="label i18n" data-iname="post.prev"></span><div class="info"><h3>${prevPost.title!}</h3><hr></div>
			</a>
		</div>
	</#if>
	<#if nextPost??>
	<div class="post-nepre <#if prevPost??>half<#else>full</#if> next">
		<a href="${nextPost.fullPath!}" rel="next">
			<#if (settings.patternimg!true) && (nextPost.thumbnail?? && nextPost.thumbnail!='')>
			<div class="background" style="background-image:url('${nextPost.thumbnail!}');"></div>
			<#elseif ((metas.ri?boolean)!true && settings.rimage_cover_open!true && settings.rimage_url?? && settings.rimage_url!='')>
			<div class="background" style="background-image:url(${settings.rimage_url!}?postid=${nextPost.id}&type=url&itype=image&qn=${(settings.rimage_cover_detail_qn)!'0'});"></div>
			<#else>
			<div class="background" style="background-image:url();"></div>
			</#if>
			<span class="label i18n" data-iname="post.next"></span><div class="info"><h3>${nextPost.title!}</h3><hr></div>
		</a>
	</div>
	</#if>
</section>
</#if>