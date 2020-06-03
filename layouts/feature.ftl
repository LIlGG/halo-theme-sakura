<div class="top-feature">
	<h1 class="fes-title" style="font-family: 'Ubuntu', sans-serif;">
	<#if settings.feature_icon?? && settings.feature_icon!=''>
	<i class="${settings.feature_icon}" aria-hidden="true"></i>
	</#if>
	${settings.feature_title!'聚焦'}</h1>
	<#if (settings.feature_type!'v2') == 'v2'>
	<div class="top-feature-v2">
		<div class="the-feature square from_left_and_right">
			<a href="${settings.feature1_link!'#'}" target="_blank">
				<div class="img">
					<img src="${settings.feature1_img!'${theme_base!}/images/temp.jpg'}">
				</div>
				<div class="info">
					<h3>${settings.feature1_title!'feature1'}</h3>
					<p>${settings.feature1_desc!'feature1'}</p>
				</div>
			</a>
		</div>
	</div>
	<div class="top-feature-v2">
			<div class="the-feature square from_left_and_right">
			<a href="${settings.feature2_link!'#'}" target="_blank">
				<div class="img">
					<img src="${settings.feature2_img!'${theme_base!}/images/temp.jpg'}">
				</div>
				<div class="info">
					<h3>${settings.feature2_title!'feature2'}</h3>
					<p>${settings.feature2_desc!'feature2'}</p>
				</div>
			</a>
		</div>
	</div>
	<div class="top-feature-v2">
		<div class="the-feature square from_left_and_right">
			<a href="${settings.feature3_link!'#'}" target="_blank">
				<div class="img">
					<img src="${settings.feature3_img!'${theme_base!}/images/temp.jpg'}">
				</div>
				<div class="info">
					<h3>${settings.feature3_title!'feature3'}</h3>
					<p>${settings.feature3_desc!'feature3'}</p>
				</div>
			</a>
		</div>
	</div>
	<#else>
	<div class="feature-content">
		<li class="feature-1">
			<a href="${settings.feature1_link!'#'}" target="_blank">
				<div class="feature-title">
					<span class="foverlay">${settings.feature1_title!'feature1'}</span>
				</div>
				<img src="${settings.feature1_img!'${theme_base!}/images/temp.jpg'}">
			</a>
		</li>
		<li class="feature-2">
			<a href="${settings.feature2_link!'#'}" target="_blank">
				<div class="feature-title">
					<span class="foverlay">${settings.feature2_title!'feature2'}</span>
				</div>
				<img src="${settings.feature2_img!'${theme_base!}/images/temp.jpg'}">
			</a>
		</li>
		<li class="feature-3">
			<a href="${settings.feature3_link!'#'}" target="_blank">
				<div class="feature-title">
					<span class="foverlay">${settings.feature3_title!'feature3'}</span>
				</div>
				<img src="${settings.feature3_img!'${theme_base!}/images/temp.jpg'}">
			</a>
		</li>
	</div>
	</#if>
</div>