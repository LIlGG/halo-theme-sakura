<!-- 跟随 Pjax 进行页面变化的样式 -->
<style>
    /** Post start */
    <#if is_post?? && settings.post_auto_collapse!true>
    .yya:not(.sabit) {
        top: -100px;
        transition: all .4s ease;
    }

    .sabit {
        transition: all .4s ease;
    }
    </#if>
    /** Post end */
</style>