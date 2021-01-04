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
	<#if (!target.disallowComment!false) && (!settings.keep_record_mode!false)>
		<section id="comments" class="comments">
			<div class="comments-main">
				<h3 id="comments-list-title">
					<span class="name i18n" data-iname="comment.name"></span>
					<span class="noticom i18n" data-iname="comment.number" data-ivalue="${target.commentCount!0}"></span>
				</h3>
				<halo-comment id="${target.id?c}" type="${type}" :configs="configs"/>
			</div>
		</section>
	</#if>
</#macro>