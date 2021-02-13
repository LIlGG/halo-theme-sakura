<figure id="centerbg" class="centerbg" style="background-image: url(
	<#if settings.rimage_cover_back_open!false && settings.rimage_url?? && settings.rimage_url!=''>
		${settings.rimage_url!}?home=home&type=url&itype=${settings.rimage_cover_back_itype!}&id=${(settings.rimage_cover_back_id)!''}&t=<#if settings.rimage_cover_back_num != 0>${randomMethod(1,settings.rimage_cover_back_num + 1)}<#else>${.now?string('yyyyMMddHHmmssSSS')}</#if>
	<#else>
	${settings.focus_img_1!'${res_base_url!}/source/images/hd.jpg'}
	</#if>
	);
	<#if !(settings.focus_height!true)>
		background-position: center center;background-attachment: inherit;
	</#if>
">
	<#if settings.focus_infos!true>
	<div class="focusinfo">
		<#if settings.focus_tou == "avatar">
			<#if user.avatar??>
			<div class="header-tou"><a href="${blog_url!}" ><img src="${user.avatar!}"></a></div>
			<#else>
			<div class="header-tou" ><a href="${blog_url!}"><img src="${res_base_url!}/source/images/avatar.jpg"></a></div>
			</#if>
		<#elseif settings.focus_tou == "glitch-text">
			<#if settings.glitch_text??>
			<h1 class="center-text glitch" data-text="${settings.glitch_text}">${settings.glitch_text}</h1>
			</#if>
		</#if>
		<div class="header-info">
			<#if user.description?default("")?trim?length gt 1>
			<p><i class="fa fa-quote-left"></i>${user.description}<i class="fa fa-quote-right"></i></p>
			</#if>
			<div class="top-social_v2">
			    <li id="bg-pre">
            		<img class="flipx" src="${res_base_url!}/source/images/next-b.svg">
          		</li>
			<#if settings.wechat??>
				<li class="wechat"><a href="#">
					<img src="${res_base_url!}/source/images/sns/wechat.png"/></a>
					<div class="wechatInner">
						<img src="${settings.wechat!}" class="i18n" data-iname="icon_alt.wechat" data-iattr="alt">
					</div>
				</li>
			</#if>
			<#if settings.sina??>
				<li>
					<a href="${settings.sina!}" target="_blank" class="social-sina i18n" data-iname="icon_alt.sina" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/sina.png"/>
					</a>
				</li>
			</#if>
			<#if settings.qq??>
				<li class="qq">
					<a href="//wpa.qq.com/msgrd?v=3&uin=${settings.qq!}&site=qq&menu=yes" target="_blank" class="i18n" data-iname="icon_alt.qq" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/qq.png"/>
					</a>
				</li>
			</#if>
			<#if settings.qzone??>
				<li>
					<a href="${settings.qzone!}" target="_blank" class="social-qzone i18n" data-iname="icon_alt.qzone" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/qzone.png"/>
					</a>
				</li>
			</#if>
			<#if settings.github??>
				<li>
					<a href="${settings.github!}" target="_blank" class="social-github i18n" data-iname="icon_alt.github" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/github.png"/>
					</a>
				</li>
			</#if>
			<#if settings.lofter??>
				<li>
					<a href="${settings.lofter!}" target="_blank" class="social-lofter i18n" data-iname="icon_alt.lofter" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/lofter.png"/>
					</a>
				</li>
			</#if>
			<#if settings.bili??>
				<li>
					<a href="${settings.bili!}" target="_blank" class="social-bili i18n" data-iname="icon_alt.bili" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/bilibili.png"/>
					</a>
				</li>
			</#if>
			<#if settings.wangyiyun??>
				<li>
					<a href="${settings.wangyiyun!}" target="_blank" class="social-wangyiyun i18n" data-iname="icon_alt.cloudmusic" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/wangyiyun.png"/>
					</a>
				</li>
			</#if>
			<#if settings.twitter??>
				<li>
					<a href="${settings.twitter!}" target="_blank" class="i18n" data-iname="icon_alt.twitter" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/twitter.png"/>
					</a>
				</li>
			</#if>
			<#if settings.facebook??>
				<li>
					<a href="${settings.facebook!}" target="_blank" class="i18n" data-iname="icon_alt.facebook" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/facebook.png"/>
					</a>
				</li>
			</#if>
			<#if settings.googleplus??>
				<li>
					<a href="${settings.googleplus!}" target="_blank" class="i18n" data-iname="icon_alt.googleplus" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/googleplus.png"/>
					</a>
				</li>
			</#if>
			<#if settings.jianshu??>
				<li>
					<a href="${settings.jianshu!}" target="_blank" class="i18n" data-iname="icon_alt.jianshu" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/jianshu.png"/>
					</a>
				</li>
			</#if>
			<#if settings.zhihu??>
				<li>
					<a href="${settings.zhihu!}" target="_blank" class="i18n" data-iname="icon_alt.zhihu" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/zhihu.png"/>
					</a>
				</li>
			</#if>
			<#if settings.csdn??>
				<li>
					<a href="${settings.csdn!}" target="_blank" class="i18n" data-iname="icon_alt.csdn" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/csdn.png"/>
					</a>
				</li>
			</#if>
			<#if settings.telegram??>
				<li>
					<a href="${settings.telegram!}" target="_blank" class="i18n" data-iname="icon_alt.telegram" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/telegram.svg"/>
					</a>
				</li>
			</#if>
			<#if settings.email??>
				<li>
					<a onclick="LIlGGAttachContext.TOMAIL()" target="_blank" class="i18n" data-iname="icon_alt.email" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/email.svg"/>
					</a>
				</li>
			</#if>
			<#if settings.stackoverflow??>
				<li>
					<a href="${settings.stackoverflow!}" target="_blank" class="i18n" data-iname="icon_alt.stackoverflow" data-iattr="title">
						<img src="${res_base_url!}/source/images/sns/stackoverflow.svg"/>
					</a>
				</li>
			</#if>
				
			<#if settings.customize_link?? && settings.customize_icon?? && settings.customize_title??>
				<li>
					<a href="${settings.customize_link!}" target="_blank" title="${settings.customize_title!}">
						<img src="${settings.customize_icon}"/>
					</a>
				</li>
			</#if>
		
				<li id="bg-next">
            		<img src="${res_base_url!}/source/images/next-b.svg">
          		</li>
			</div>
		</div>
	</div>
	</#if>
</figure>