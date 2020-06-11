<!-- 采用这种方式有太多不确定性，暂时不使用（尤其是使用多个路径的图，该种方式会使其报错） -->
<#if options.attachment_type == 'LOCAL'>
        <img class="lazyload" src="${post.thumbnail?keep_before_last('.')}-thumbnail.${post.thumbnail?keep_after_last('.')}" data-src="${post.thumbnail}">
    <#elseif options.attachment_type == 'SMMS'>
        <img class="lazyload" src="${post.thumbnail}" data-src="${post.thumbnail}">
    <#elseif options.attachment_type == 'UPOSS'>
        <img class="lazyload" src="${post.thumbnail}${options.oss_upyun_thumbnail_style_rule!}" data-src="${post.thumbnail}">
    <#elseif options.attachment_type == 'QINIUOSS'>
        <img class="lazyload" src="${post.thumbnail}${options.oss_qiniu_thumbnail_style_rule!}" data-src="${post.thumbnail}">
    <#elseif options.attachment_type == 'ALIOSS'>
        <img class="lazyload" src="${post.thumbnail}${options.oss_ali_thumbnail_style_rule!}" data-src="${post.thumbnail}">
    <#elseif options.attachment_type == 'BAIDUBOS'>
        <img class="lazyload" src="${post.thumbnail}${options.oss_baidu_thumbnail_style_rule!}" data-src="${post.thumbnail}">
    <#elseif options.attachment_type == 'TENCENTCOS'>
        <img class="lazyload" src="${post.thumbnail}${options.oss_tencent_thumbnail_style_rule!}" data-src="${post.thumbnail}">
    <#elseif options.attachment_type == 'HUAWEIOBS'>
        <img class="lazyload" src="${post.thumbnail}${options.oss_huawei_thumbnail_style_rule!}" data-src="${post.thumbnail}">
</#if>
