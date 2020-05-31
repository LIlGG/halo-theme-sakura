<#--

/**
 Template Name: links
 */
-->
<#include "header.ftl">
<@header title="${sheet.title!} - ${blog_title!}" />
	<?php while(have_posts()) : the_post(); ?>
	<?php if(akina_option('patternimg') || !get_post_thumbnail_id(get_the_ID())) { ?>
	<span class="linkss-title"><?php the_title();?></span>
	<?php } ?>
		<article class="post-item post-${sheet.id} page type-page status-publish <#if sheet.thumbnail?? && sheet.thumbnail!=''>has-post-thumbnail</#if> hentry">
			${sheet.formatContent!}
			<div class="links">
				<?php echo get_link_items(); ?>
			</div>
		</article>
	<?php endwhile; ?>
<#include "footer.ftl">
