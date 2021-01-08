<#--
    @package Akina
-->
<article id="post-${sheet.id!}" class="post-item post-${sheet.id} page type-page status-publish hentry">
    <#if !((settings.patternimg!true) && (sheet.thumbnail?? && sheet.thumbnail!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!=''))>
        <header class="entry-header">
            <h1 class="entry-title">${sheet.title!}</h1>
        </header><!-- .entry-header -->
    </#if>
    <#if (metas.toc?boolean)!true>
    <div class="toc-container">
        <div class="toc"></div>
    </div>
    </#if>
    <div class="entry-content">
        ${sheet.formatContent!}
    </div><!-- .entry-content -->

    <footer class="entry-footer">
    </footer><!-- .entry-footer -->
</article><!-- #post-## -->
