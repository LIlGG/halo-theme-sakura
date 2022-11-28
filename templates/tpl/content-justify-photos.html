<section>
    <#if !((settings.patternimg!true) && (settings.photos_patternimg?? && settings.photos_patternimg!='') || ((metas.ri?boolean)!true && settings.rimage_cover_sheet_open!true && settings.rimage_url?? && settings.rimage_url!=''))>
    <header class="entry-header">
        <h1 class="entry-title">
        	<#if options.photos_title?default("")?trim?length gt 1>
			<span>${options.photos_title}</span>
			<#else>
			<span class="i18n" data-iname="page.photos.title"></span>
			</#if>
        </h1>
    </header><!-- .entry-header -->
    </#if>
    <div  class="wrapper justify-wrapper">
        <nav id="gallery-filter">
            <ul>
                <li>
                    <a href="javascript:void(0);" data-filter="*" class="active i18n" data-iname="page.photos.all"></a>
                </li>
                <@photoTag method="listTeams">
                <#list teams as item>
                <li>
                    <a href="javascript:void(0);" data-filter=".${((item.team)?length>0)?string((item.team),'默认')?replace(' ', '-')}">${((item.team)?length>0)?string((item.team),'默认')}</a>
                </li>
                </#list>
                </@photoTag>
            </ul>
        </nav>
        <div class="gallery masonry-gallery">
            <@photoTag method="list">
            <#list photos as photo>
            <div class="gallery-item justify-gallery-item ${((photo.team)?length>0)?string((photo.team),'默认')?replace(' ', '-')}">
                <a data-fancybox="gallery" href="${photo.url!}">
                    <#if settings.is_thumbnail!true>
                    <img src="${photo.thumbnail!}"/>
                    <#else>
                    <img src="${photo.url!}"/>
                    </#if>
                </a>
                <figcaption class="justify-caption gallery-caption">
                    <div class="entry-summary">
                        <h3>${photo.name}</h3>
                        <#if photo.description??>
                        <p>${photo.description}</p>
                        </#if>
                    </div>
                </figcaption>
            </div>
            </#list>
            </@photoTag>
        </div>
    </div>
</section>