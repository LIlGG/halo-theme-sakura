<#--
	@package Akina
-->
<section class="no-results not-found">
	<header class="page-header">
		<h1 class="page-title i18n" data-iname="page.none.title"></h1>
	</header><!-- .page-header -->

	<div class="page-content">
		<#if is_search??>
           <div class="sorry">
				<p class="i18n" data-iname="page.none.search"></p>
				<div class="sorry-inner">
					<ul class="search-no-reasults">
						<@postTag method="latest" top="10">
							<#list posts as post>
								<li><a href="${post.fullPath!}" title="${post.title!}">${post.title!}</a> </li>
							</#list>
						</@postTag>
					</ul>
				</div>
			</div>
		<#else>
			<p class="i18n" data-iname="page.none.notfound"></p>
		</#if>
	</div><!-- .page-content -->
</section><!-- .no-results -->
