<#--
	AUTHOR PROFILE
 -->
<#if settings.author_profile!true>
	<section class="author-profile">
		<div class="info" itemprop="author" itemscope="" itemtype="http://schema.org/Person">
			<a href="${blog_url!}" class="profile gravatar"><img src="${user.avatar!}" itemprop="image" alt="${user.nickname!}" height="70" width="70"></a>
			<div class="meta">
				<span class="title">${user.nickname!}</span>
				<h3 itemprop="name">
					<a href="${blog_url!}" itemprop="url" rel="author">${user.nickname!}</a>
				</h3>						
			</div>
		</div>
		<hr>
		<p><i class="iconfont">&#xe761;</i>${user.description!'Carpe Diem and Do what I like'}</p>
	</section>
</#if>