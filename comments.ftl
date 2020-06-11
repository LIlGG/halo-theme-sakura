<#--
	COMMENTS TEMPLATE
-->
<#macro comment target,type>
	<#if !target.disallowComment!false>
		<script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
		<script src="${options.comment_internal_plugin_js!'//cdn.jsdelivr.net/gh/halo-dev/halo-comment@latest/dist/halo-comment.min.js'}"></script>
		<section id="comments" class="comments">
			<div class="commentwrap comments-hidden">
				<div class="notification"><i class="iconfont">&#xe731;</i>查看评论 -
				<span class="noticom">${target.commentCount!0} 条评论 </span>
				</div>
			</div>

			<div class="comments-main">
				<h3 id="comments-list-title">Comments | <span class="noticom">${target.commentCount!0} 条评论 </span></h3>
				<div class="commentwrap">
					<halo-comment id="${target.id?c}" type="${type}"/>
				</div>
			</div>
		</section>
	</#if>
</#macro>