function loadAudio() {
    function a(a, b) {
        var c = {
            container: a,
            audio: b,
            mini: null,
            fixed: null,
            autoplay: !1,
            mutex: !0,
            lrcType: 3,
            listFolded: !1,
            preload: 'auto',
            theme: '#2980b9',
            loop: 'all',
            order: 'list',
            volume: null,
            listMaxHeight: null,
            customAudioType: null,
            storageName: 'sakura'
        };
        if (b.length) {
            b[0].lrc || (c.lrcType = 0);
            var d = {};
            for (var e in c) {
                var f = e.toLowerCase(); (a.dataset.hasOwnProperty(f) || a.dataset.hasOwnProperty(e) || null !== c[e]) && (d[e] = a.dataset[f] || a.dataset[e] || c[e], ('true' === d[e] || 'false' === d[e]) && (d[e] = 'true' == d[e]))
            }
            ap.push(new APlayer(d))
        }
        for (var f = 0; f < ap.length; f++) {
            try {
                ap[f].lrc.hide();
            } catch(a) {
                console.log(a)
            }
        }

        var lrcTag = 1;
        $(".aplayer.aplayer-fixed").click(function() {
            if (lrcTag == 1) {
                for (var f = 0; f < ap.length; f++) try {
                    ap[f].lrc.show();
                } catch(a) {
                    console.log(a)
                }
            }
            lrcTag = 2;
        });

        var apSwitchTag = 0;
        $(".aplayer.aplayer-fixed .aplayer-body").addClass("ap-hover");
        $(".aplayer-miniswitcher").click(function() {
            if (apSwitchTag == 0) {
                $(".aplayer.aplayer-fixed .aplayer-body").removeClass("ap-hover");
                apSwitchTag = 1;
            } else {
                $(".aplayer.aplayer-fixed .aplayer-body").addClass("ap-hover");
                apSwitchTag = 0;
            }
        });
    }
    var b = 'https://api.lixingyong.com/api/:server?type=:type&id=:id&r=:r';

    'undefined' != typeof audio_api && (b = audio_api);

    for (var c = document.querySelectorAll('.aplayer'), d = function() {
        var d = c[e],
        f = d.dataset.id;
        if (f) {
            var g = d.dataset.api || b;
            g = g.replace(':server', d.dataset.server),
            g = g.replace(':type', d.dataset.type),
            g = g.replace(':id', d.dataset.id),
            g = g.replace(':auth', d.dataset.auth),
            g = g.replace(':r', Math.random());
            var h = new XMLHttpRequest;
            h.onreadystatechange = function() {
                if (4 === h.readyState && (200 <= h.status && 300 > h.status || 304 === h.status)) {
                    var b = JSON.parse(h.responseText);
                    a(d, b)
                }
            },
            h.open('get', g, true),
            h.send(null)
        } else if (d.dataset.url) {
            var i = [{
                name: d.dataset.name || d.dataset.title || 'Audio name',
                artist: d.dataset.artist || d.dataset.author || 'Audio artist',
                url: d.dataset.url,
                cover: d.dataset.cover || d.dataset.pic,
                lrc: d.dataset.lrc,
                type: d.dataset.type || 'auto'
            }];
            a(d, i)
        }
    }, 
    e = 0; e < c.length; e++) d()
}

function reloadAplayer() {
    for (var a = 0; a < ap.length; a++)
    try {
        ap[a].destroy()
    } catch (b) {}
    loadAudio();
}
var ap = [];

document.addEventListener('DOMContentLoaded', function() {
    reloadAplayer();
});
