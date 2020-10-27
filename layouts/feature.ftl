<div class="top-feature">
	<h1 class="fes-title" style="font-family: 'Ubuntu', sans-serif;">
	<#if settings.feature_icon?? && settings.feature_icon!=''>
	<i class="${settings.feature_icon}" aria-hidden="true"></i>
	</#if>
	${settings.feature_title!'聚焦'}</h1>
	<div class="top-feature-v2">
		<div class="the-feature square from_left_and_right">
			<a href="${settings.feature1_link!'#'}" target="_blank">
				<div class="img">
					<img src="${settings.feature1_img!'${res_base_url!}/source/images/temp.jpg'}">
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
					<img src="${settings.feature2_img!'${res_base_url!}/source/images/temp.jpg'}">
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
					<img src="${settings.feature3_img!'${res_base_url!}/source/images/temp.jpg'}">
				</div>
				<div class="info">
					<h3>${settings.feature3_title!'feature3'}</h3>
					<p>${settings.feature3_desc!'feature3'}</p>
				</div>
			</a>
		</div>
	</div>
</div>