<#--
    @package Akina
-->
<article id="post-${sheet.id!}" class="post-item post-${sheet.id} page type-page status-publish hentry">
    <#if !(settings.patternimg!true) || !(sheet.thumbnail?? || sheet.thumbnail!='')>
        <header class="entry-header">
            <h1 class="entry-title">${sheet.title!}</h1>
        </header><!-- .entry-header -->
    </#if>
    <div class="entry-content">
        ${sheet.formatContent!}
    </div><!-- .entry-content -->

    <footer class="entry-footer">
    </footer><!-- .entry-footer -->
</article><!-- #post-## -->
