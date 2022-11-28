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
    <div class="wrapper">
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
        <!-- 工具栏 -->
        <#if settings.photos_style == "masonry">
        <nav id="grid-changer">
            <ul>
                <li class="col-${settings.masonry_changer_min!'3'}">
                    <a href="javascript:void(0)" class="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                            <rect width="10" height="10" x="8" y="8"></rect>
                        </svg>
                    </a>
                </li>
                <li class="col-${settings.masonry_changer_max!'5'}">
                    <a href="javascript:void(0)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                            <rect width="7" height="7" x="6" y="6"></rect>
                            <rect width="7" height="7" x="14" y="6"></rect>
                            <rect width="7" height="7" x="6" y="14"></rect>
                            <rect width="7" height="7" x="14" y="14"></rect>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
        </#if>
        <div class="gallery masonry-gallery">
            <@photoTag method="list">
            <#list photos as photo>
            <#if settings.photos_style == "masonry">
            <figure class="gallery-item col-${settings.masonry_column!'3'} ${((photo.team)?length>0)?string((photo.team),'默认')?replace(' ', '-')}">
            <#else>
            <figure class="gallery-item ${((photo.team)?length>0)?string((photo.team),'默认')?replace(' ', '-')}">
            </#if>
                <header class="gallery-icon">
                    <a data-fancybox="gallery" href="${photo.url!}">
                        <#if settings.is_thumbnail!true>
                        <img class="lazyload" src="${res_base_url!}/source/images/load/load.gif" data-src="${photo.thumbnail!}" alt="${photo.name!}"/>
                        <#else>
                        <img class="lazyload" src="${res_base_url!}/source/images/load/load.gif" data-src="${photo.url!}" alt="${photo.name!}"/>
                        </#if>
                    </a>
                </header>
                <figcaption class="gallery-caption">
                    <div class="entry-summary">
                        <h3>${photo.name}</h3>
                        <#if photo.description?? && photo.description != "">
                        <p>${photo.description!}</p>
                        </#if>
                    </div>
                </figcaption>
            </figure>
            </#list>
            </@photoTag>
        </div>
    </div>
</section>