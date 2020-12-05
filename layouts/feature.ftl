<div class="top-feature">
	<h1 class="fes-title" style="font-family: 'Ubuntu', sans-serif;">
	<#if settings.feature_icon?? && settings.feature_icon!=''>
		<i class="${settings.feature_icon}" aria-hidden="true"></i>
		</#if>
		<#if settings.feature_title?default("")?trim?length gt 1>
		<span>${settings.feature_title}</span>
		<#else>
		<span class="i18n" data-iname="home.feature.title"></span>
		</#if>
	</h1>
	<div class="top-feature-v2">
		<div class="the-feature square from_left_and_right">
			<a href="${settings.feature1_link!'#'}" target="_blank">
				<div class="img">
					<img src="${settings.feature1_img!'${res_base_url!}/source/images/temp.jpg'}">
				</div>
				<div class="info">
					<h3>
						<#if settings.feature1_title?default("")?trim?length gt 1>
						<span>${settings.feature1_title}</span>
						<#else>
						<span class="i18n" data-iname="home.feature.one.title"></span>
						</#if>
					</h3>
					<p>
						<#if settings.feature1_desc?default("")?trim?length gt 1>
						<span>${settings.feature1_desc}</span>
						<#else>
						<span class="i18n" data-iname="home.feature.one.desc"></span>
						</#if>
					</p>
				</div>
			</a>
		</div>
	</div>
	<div class="top-feature-v2">
			<div class="the-feature square from_left_and_right">
			<a href="${settings.feature2_link!'#'}" target="_blank">
				<div class="img">
					<img src="${settings.feature2_img!'${res_base_url!}/source/images/temp.jpg'}">
				</div>
				<div class="info">
					<h3>
						<#if settings.feature2_title?default("")?trim?length gt 1>
						<span>${settings.feature2_title}</span>
						<#else>
						<span class="i18n" data-iname="home.feature.two.title"></span>
						</#if>
					</h3>
					<p>
						<#if settings.feature2_desc?default("")?trim?length gt 1>
						<span>${settings.feature2_desc}</span>
						<#else>
						<span class="i18n" data-iname="home.feature.two.desc"></span>
						</#if>
					</p>
				</div>
			</a>
		</div>
	</div>
	<div class="top-feature-v2">
		<div class="the-feature square from_left_and_right">
			<a href="${settings.feature3_link!'#'}" target="_blank">
				<div class="img">
					<img src="${settings.feature3_img!'${res_base_url!}/source/images/temp.jpg'}">
				</div>
				<div class="info">
					<h3>
						<#if settings.feature3_title?default("")?trim?length gt 1>
						<span>${settings.feature3_title}</span>
						<#else>
						<span class="i18n" data-iname="home.feature.three.title"></span>
						</#if>
					</h3>
					<p>
						<#if settings.feature3_desc?default("")?trim?length gt 1>
						<span>${settings.feature3_desc}</span>
						<#else>
						<span class="i18n" data-iname="home.feature.three.desc"></span>
						</#if>
					</p>
				</div>
			</a>
		</div>
	</div>
</div>