// ── Nav scroll blur ───────────────────────────────────────
(function () {
    var nav = document.querySelector('.main-nav');
    if (!nav) return;
    function update() {
        nav.classList.toggle('is-scrolled', window.scrollY > 4);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
})();

// ── CRT hover for links ───────────────────────────────────
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function rnd(min, max) { return min + Math.random() * (max - min); }
    function dir() { return Math.random() < 0.5 ? -1 : 1; }
    function rgbSplit(spread, a) {
        return (-spread).toFixed(1) + 'px 1px rgba(255,30,80,' + a + '),' +
                spread.toFixed(1) + 'px -1px rgba(0,210,255,' + a + ')';
    }

    document.querySelectorAll('.main-nav a:not([aria-current="page"])').forEach(function (link) {
        var ver = 0;

        link.addEventListener('mouseenter', function () {
            var v = ++ver;
            var d = dir(), spread = rnd(1, 2);
            var tx1 = d * rnd(1.5, 3), tx2 = -d * rnd(0.5, 1.5);

            link.style.transition  = 'none';
            link.style.filter      = 'blur(0.5px) brightness(' + rnd(1.2, 1.4).toFixed(2) + ')';
            link.style.transform   = 'translateX(' + tx1.toFixed(1) + 'px)';
            link.style.textShadow  = rgbSplit(spread, 0.55);

            setTimeout(function () {
                if (ver !== v) return;
                link.style.filter     = 'blur(0.3px) brightness(1.1)';
                link.style.transform  = 'translateX(' + tx2.toFixed(1) + 'px)';
                link.style.textShadow = rgbSplit(spread * 0.5, 0.3);

                setTimeout(function () {
                    if (ver !== v) return;
                    link.style.transition  = 'filter 0.15s ease, transform 0.15s ease, text-shadow 0.15s ease, opacity 0.15s ease';
                    link.style.filter      = '';
                    link.style.transform   = '';
                    link.style.textShadow  = '';
                    link.style.opacity     = '0.5';
                }, 60);
            }, 60);
        });

        link.addEventListener('mouseleave', function () {
            ver++;
            link.style.transition  = 'none';
            link.style.filter      = '';
            link.style.transform   = '';
            link.style.textShadow  = '';
            link.style.opacity     = '';
        });
    });
})();
