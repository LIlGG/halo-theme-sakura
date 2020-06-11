<#--
	NEXT / PREVIOUS POSTS (精华版)
-->
<#if settings.post_nepre!true>
<section class="post-squares nextprev">
	<#if prevPost??>
		<div class="post-nepre <#if nextPost??>half<#else>full</#if> previous">
			<a href="${prevPost.fullPath!}" rel="prev">
				<div class="background" style="background-image:url('${prevPost.thumbnail!}');"></div><span class="label">Previous Post</span><div class="info"><h3>${prevPost.title!}</h3><hr></div>
			</a>
		</div>
	</#if>
	<#if nextPost??>
	<div class="post-nepre <#if prevPost??>half<#else>full</#if> next">
		<a href="${nextPost.fullPath!}" rel="next">
			<div class="background" style="background-image:url('${nextPost.thumbnail!}');"></div><span class="label">Next Post</span><div class="info"><h3>${nextPost.title!}</h3><hr></div>
		</a>
	</div>
	</#if>
</section>
</#if>