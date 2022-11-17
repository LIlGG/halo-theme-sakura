<#macro live2d>
<link rel="stylesheet" type="text/css" href="${theme_base!}/plugins/live2d/css/takagi.min.css"/>
<#if settings.live2d_style??>
    ${settings.live2d_style!}
</#if>
<div class="takagi">
    <div class="takagi-tips"></div>
    <canvas id="live2d" class="live2d"></canvas>
    <div class="takagi-tool">
        <span class="fui-home"></span>
        <span class="fui-chat"></span>
        <span class="fui-eye"></span>
        <span class="fui-user"></span>
        <span class="fui-photo"></span>
        <span class="fui-info-circle"></span>
        <span class="fui-cross"></span>
    </div>
</div>

<script>
    if(document.body.clientWidth > 860) {
        function loadJS(url, callback){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            if(typeof callback == 'function'){
                script.onload = script.onreadystatechange = function(){
                    if(!this.readyState || this.readyState == 'loaded'
                                        || this.readyState == 'complete'){
                        callback();
                        script.onload = script.onreadystatechange = null;
                    }
                }
            }
            document.body.appendChild(script);
        };

        loadJS("${theme_base!}/plugins/live2d/js/takagi-tips.min.js");
        loadJS("${theme_base!}/plugins/live2d/js/live2d.min.js", function() {
            initModel("", options);
        });

        var options = {
            modelAPI: "${((settings.live2d_modelAPI!'')?length>0)?string((settings.live2d_modelAPI!''), '//live2d.fghrsh.net/api/')}",
            tipsMessage: "${((settings.live2d_tipsMessage!'')?length>0)?string((settings.live2d_tipsMessage!''), '${theme_base!}/plugins/live2d/json/takagi-tips.json')}",
            hitokotoAPI: "${((settings.live2d_hitokotoAPI!'')?length>0)?string((settings.live2d_hitokotoAPI!''), 'lwl12.com')}",
            modelId: ${settings.live2d_modelId!'1'},
            modelTexturesId: ${settings.live2d_modelTexturesId!'1'},
            showToolMenu: ${(settings.live2d_showToolMenu!true)?string('true','false')},
            canCloseLive2d: ${(settings.live2d_canCloseLive2d!true)?string('true','false')},
            canSwitchModel: ${(settings.live2d_canSwitchModel!true)?string('true','false')},
            canSwitchTextures: ${(settings.live2d_canSwitchTextures!true)?string('true','false')},
            canSwitchHitokoto: ${(settings.live2d_canSwitchHitokoto!true)?string('true','false')},
            canTakeScreenshot: ${(settings.live2d_canTakeScreenshot!true)?string('true','false')},
            canTurnToHomePage: ${(settings.live2d_canTurnToHomePage!true)?string('true','false')},
            canTurnToAboutPage: ${(settings.live2d_canTurnToAboutPage!true)?string('true','false')},
            modelStorage: ${(settings.live2d_modelStorage!true)?string('true','false')},
            modelRandMode: "${((settings.live2d_modelRandMode!'')?length>0)?string((settings.live2d_modelRandMode!''), 'switch')}",
            modelTexturesRandMode: "${((settings.live2d_modelTexturesRandMode!'')?length>0)?string((settings.live2d_modelTexturesRandMode!''), 'rand')}",
            showHitokoto: ${(settings.live2d_showHitokoto!true)?string('true','false')},
            showF12Status: ${(settings.live2d_showF12Status!true)?string('true','false')},
            showF12Message: ${(settings.live2d_showF12Message!false)?string('true','false')},
            showF12OpenMsg: ${(settings.live2d_showF12OpenMsg!true)?string('true','false')},
            showCopyMessage: ${(settings.live2d_showCopyMessage!true)?string('true','false')},
            showWelcomeMessage: ${(settings.live2d_showWelcomeMessage!true)?string('true','false')},
            takagiSize: "${((settings.live2d_takagiSize!'')?length>0)?string((settings.live2d_takagiSize!''), '280x250')}",
            takagiTipsSize: "${((settings.live2d_takagiTipsSize!'')?length>0)?string((settings.live2d_takagiTipsSize!''), '250x70')}",
            takagiFontSize: "${((settings.live2d_takagiFontSize!'')?length>0)?string((settings.live2d_takagiFontSize!''), '12px')}",
            takagiToolFont: "${((settings.live2d_takagiToolFont!'')?length>0)?string((settings.live2d_takagiToolFont!''), '14px')}",
            takagiToolLine: "${((settings.live2d_takagiToolLine!'')?length>0)?string((settings.live2d_takagiToolLine!''), '20px')}",
            takagiToolTop: "${((settings.live2d_takagiToolTop!'')?length>0)?string((settings.live2d_takagiToolTop!''), '0px')}",
            takagiMinWidth: "${((settings.live2d_takagiMinWidth!'')?length>0)?string((settings.live2d_takagiMinWidth!''), '768px')}",
            takagiEdgeSide: "${((settings.live2d_takagiEdgeSide!'')?length>0)?string((settings.live2d_takagiEdgeSide!''), 'left:0')}",
            takagiDraggable: "${((settings.live2d_takagiDraggable!'')?length>0)?string((settings.live2d_takagiDraggable!''), 'disable')}",
            takagiDraggableRevert: ${(settings.live2d_takagiDraggableRevert!true)?string('true','false')},
            l2dVersion: "${((settings.live2d_l2dVersion!'')?length>0)?string((settings.live2d_l2dVersion!''), '1.0.0')}",
            l2dVerDate: "${((settings.live2d_l2dVerDate!'')?length>0)?string((settings.live2d_l2dVerDate!''), '2020.07.01')}",
            homePageUrl: "${((blog_url!'')?length>0)?string((blog_url!''), 'auto')}",
            aboutPageUrl: "${((settings.live2d_aboutPageUrl!'')?length>0)?string((settings.live2d_aboutPageUrl!''), 'https://lixingyong.com/s/halo-live2d')}",
            screenshotCaptureName: "${((settings.live2d_screenshotCaptureName!'')?length>0)?string((settings.live2d_screenshotCaptureName!''), 'live2d.png')}"
        }
    }
</script>
</#macro>