<#--
	COMMENTS TEMPLATE
-->
<#macro comment target,type>
	<#local
  		configs = '{
			"autoLoad": ${settings.comment_auto_load?string("true", "false")},
			"showUserAgent": ${settings.comment_show_user_agent?string("true", "false")},
			"gravatarSource": "${settings.comment_gravatar_source!}",
			"loadingStyle": "${settings.comment_loading_style!}",
			"aWord": "${settings.comment_a_word!}",
			"authorPopup": "${settings.comment_author_popup!}",
			"emailPopup": "${settings.comment_email_popup!}",
			"urlPopup": "${settings.comment_url_popup!}",
			"notComment": "${settings.comment_not_comment!}"
		}'
	>
	<#if (!target.disallowComment!false) && (!settings.keep_record_mode!false)>
		<section id="comments" class="comments">
			<div class="comments-main">
				<h3 id="comments-list-title">
					<span class="name i18n" data-iname="comment.name"></span>
					<span class="noticom i18n" data-iname="comment.number" data-ivalue="${target.commentCount!0}"></span>
				</h3>
				<halo-comment id='${target.id?c}' type='${type}' configs='${configs}'/>
			</div>
		</section>
	</#if>
</#macro>