<article>
    <#if !(settings.patternimg!true) || (!(settings.links_patternimg?? && settings.links_patternimg!='') && !(is_sheet?? && sheet.thumbnail?? && sheet.thumbnail!=''))>
    <header class="entry-header">
        <h1 class="entry-title">${options.links_title?default('友情链接')}</h1>
    </header><!-- .entry-header -->
    </#if>
    <#if is_sheet??>
     ${sheet.formatContent!}
    </#if>
    <div class="links">
        <@linkTag method="listTeams">
            <#list teams as item>
                <h3 class="link-title">
                    <span class="fake-title">${((item.team!'')?length>0)?string((item.team!''), '小伙伴们')}</span>
                </h3>
                <ul class="link-items fontSmooth">
                <#list item.links?sort_by('priority')?reverse as link>
                    <li class="link-item">
                        <a class="link-item-inner effect-apollo" href="${link.url!}" title="${link.name!}" target="_blank">
                            <img class="lazyload" data-src="${link.logo!}" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.2/img/svg/loader/trans.ajax-spinner-preloader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
                            <span class="sitename">${link.name!}</span>
                            <div class="linkdes">${link.description!}</div>
                        </a>
                    </li> 
                </#list>
                </ul>
            </#list>
        </@linkTag>
    </div>       
</article>