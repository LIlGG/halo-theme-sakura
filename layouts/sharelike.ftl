<#--
	sharelike
-->
<#--<#if settings.post_like!true>-->
<#--<div class="post-like">-->
<#--<a href="javascript:;" data-action="ding" data-id="${post.id?c}" class="specsZan">-->
<#--	<i class="iconfont">&#xe669;</i> <span class="count">-->
<#--		${post.likes?c}-->
<#--	</a>-->
<#--</div>-->
<#--</#if>-->
<#if settings.post_share!true>
<div class="post-share">
<ul class="sharehidden">
	<li><a href="http://www.jiathis.com/send/?webid=weixin&url=${post.fullPath!}&title=${post.title!}" onclick="window.open(this.href, 'renren-share', 'width=490,height=700');return false;" class="s-weixin"><img src="${theme_base!}/images/sns/wechat.png"/></a></li>
	<li><a href="http://www.jiathis.com/send/?webid=qzone&url=${post.fullPath!}&title=${post.title!}" onclick="window.open(this.href, 'weibo-share', 'width=730,height=500');return false;" class="s-qq"><img src="${theme_base!}/images/sns/qzone.png"/></a></li>
	<li><a href="http://www.jiathis.com/send/?webid=tsina&url=${post.fullPath!}&title=${post.title!}" onclick="window.open(this.href, 'weibo-share', 'width=550,height=235');return false;" class="s-sina"><img src="${theme_base!}/images/sns/sina.png"/></a></li>
	<li><a href="http://www.jiathis.com/send/?webid=douban&url=${post.fullPath!}&title=${post.title!}" onclick="window.open(this.href, 'renren-share', 'width=490,height=600');return false;" class="s-douban"><img src="${theme_base!}/images/sns/douban.png"/></a></li>
	</ul>
	<i class="iconfont show-share">&#xe6eb;</i>
</div>
</#if>