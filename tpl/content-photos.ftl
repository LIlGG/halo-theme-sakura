<section>
    <#if !(settings.patternimg!true) || !(settings.photos_patternimg?? && settings.photos_patternimg!='')>
    <header class="entry-header">
        <h1 class="entry-title">${options.photos_title?default('图库')}</h1>
    </header><!-- .entry-header -->
    </#if>
    <div class="wrapper">
        <nav id="gallery-filter">
            <ul>
                <li>
                    <a href="javascript:void(0);" data-filter="*" class="active">全部</a>
                </li>
                <@photoTag method="listTeams">
                <#list teams as item>
                <li>
                    <a href="javascript:void(0);" data-filter=".${((item.team)?length>0)?string((item.team),'默认')}">${((item.team)?length>0)?string((item.team),'默认')}</a>
                </li>
                </#list>
                </@photoTag>
            </ul>
        </nav>
        <!-- 工具栏 -->
        <nav id="grid-changer">
            <ul>
                <li class="col-3">
                    <a href="javascript:void(0)" class="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                            <rect width="10" height="10" x="8" y="8"></rect>
                        </svg>
                    </a>
                </li>
                <li class="col-5">
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
        <div class="gallery masonry-gallery">
            <@photoTag method="list">
            <#list photos as photo>
            <figure class="gallery-item  ${((photo.team)?length>0)?string((photo.team),'默认')}">
                <header class="gallery-icon">
                    <a data-fancybox="gallery" href="${photo.url!}">
                        <img src="${photo.thumbnail!}"/>
                    </a>
                </header>
                <figcaption class="gallery-caption">
                    <div class="entry-summary">
                        <h3>${photo.name}</h3>
                        <#if photo.description??>
                        <p>${photo.description}</p>
                        </#if>
                    </div>
                </figcaption>
            </figure>
            </#list>
            </@photoTag>
        </div>
    </div>
</section>