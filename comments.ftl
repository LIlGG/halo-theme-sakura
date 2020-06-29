<#--
	COMMENTS TEMPLATE
-->
<#macro comment target,type>
	<script>
	var configs = {
    	autoLoad: true,
    	showUserAgent: true,
		loadingStyle: "balls"
	}
	</script>
	<#if !target.disallowComment!false>
		<section id="comments" class="comments">
			<div class="commentwrap comments-hidden">
				<div class="notification"><i class="iconfont">&#xe731;</i>查看评论 -
				<span class="noticom">${target.commentCount!0} 条评论 </span>
				</div>
			</div>

			<div class="comments-main">
				<h3 id="comments-list-title">Comments | <span class="noticom">${target.commentCount!0} 条评论 </span></h3>
				<halo-comment id="${target.id?c}" type="${type}" :configs="configs"/>
			</div>
		</section>
	</#if>
</#macro>