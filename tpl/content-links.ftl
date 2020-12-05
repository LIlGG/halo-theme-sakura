<article>
    <#if !(settings.patternimg!true) || (!(settings.links_patternimg?? && settings.links_patternimg!='') && !(is_sheet?? && sheet.thumbnail?? && sheet.thumbnail!=''))>
    <header class="entry-header">
        <h1 class="entry-title">
            <#if options.links_title?default("")?trim?length gt 1>
			<span>${options.links_title}</span>
			<#else>
			<span class="i18n" data-iname="page.links.title"></span>
            </#if>
        </h1>
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
                            <img class="lazyload" data-src="${link.logo!}" src="${res_base_url!}/source/images/svg/loader/trans.ajax-spinner-preloader.svg" onerror="imgError(this, IMG_Type.DEFAULT)">
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