
(function(d, e) {


  
    function Mb() {
        Ga = !0;
        L = Ha = document.getElementById("canvas");
        f = L.getContext("2d");
        L.onmousedown = function(a) {
            if (fb) {
                var b = a.clientX - (5 + h / 5 / 2),
                    c = a.clientY - (5 + h / 5 / 2);
                if (Math.sqrt(b * b + c * c) <= h / 5 / 2) {
                    ca();
                    H(17);
                    return
                }
            }
            na = 1 * a.clientX;
            oa = 1 * a.clientY;
            Ia();
            ca()
        };
        L.onmousemove = function(a) {
            na = 1 * a.clientX;
            oa = 1 * a.clientY;
            Ia()
        };
        L.onmouseup = function() {};
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", gb, !1) : document.body.onmousewheel = gb;
        var a = !1,
            b = !1,
            c = !1;
        d.onkeydown = function(n) {
            32 != n.keyCode || a || (ca(), H(17), a = !0);
            81 != n.keyCode || b || (H(18), b = !0);
            87 != n.keyCode || c || (ca(), H(21), c = !0);
            27 == n.keyCode && pa(300)
        };
        d.onkeyup = function(n) {
            32 == n.keyCode && (a = !1);
            87 == n.keyCode && (c = !1);
            81 == n.keyCode && b && (H(19), b = !1)
        };
        d.onblur = function() {
            H(19);
            c = b = a = !1
        };
        d.onresize = hb;
        d.requestAnimationFrame(ib);
        setInterval(ca, 40);
        qa("EU-London");
        0 == Ja && y && M();
        Ma(0);
        pa(0);
        hb();
        d.location.hash && 6 <= d.location.hash.length && kb(d.location.hash)
    }

    function gb(a) {
        N *= Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
        1 > N && (N = 1);
        N > 4 / g && (N = 4 / g)
    }

    function Nb() {
        if (.4 > g) da = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, n = Number.NEGATIVE_INFINITY, d = 0; d < v.length; d++) {
                var e = v[d];
                !e.H() || e.L || 20 >= e.size * g || (a = Math.min(e.x - e.size, a), b = Math.min(e.y - e.size, b), c = Math.max(e.x + e.size, c), n = Math.max(e.y + e.size, n))
            }
            da = Ob.X({
                ba: a - 10,
                ca: b - 10,
                Z: c + 10,
                $: n + 10,
                fa: 2,
                ha: 4
            });
            for (d = 0; d < v.length; d++)
                if (e = v[d], e.H() && !(20 >= e.size * g))
                    for (a = 0; a < e.a.length; ++a) b = e.a[a].x, c = e.a[a].y, b < t - h / 2 / g || c < u - q / 2 / g || b > t + h / 2 / g || c > u + q / 2 / g || da.Y(e.a[a])
        }
    }

    function Ia() {
        ra = (na - h / 2) / g + t;
        sa = (oa - q / 2) / g + u
    }

    function lb() {
        e("#adsBottom").hide();
        e("#overlays").hide();
        e("#stats").hide();
        e("#mainPanel").hide();
        V = fa = !1;
        mb(d.aa.concat(d.ac))
    }

    function qa(a) {
        a && a != y && ("EU-London" != a && e("#region").val(a), y = d.localStorage.location = a, e(".region-message").hide(), e(".region-message." + a).show(), e(".btn-needs-server").prop("disabled", !1), Ga && M())
    }

    function pa(a) {
        fa || V || (I = null, Ka || (e("#adsBottom").show(), e("#g300x250").hide(), e("#a300x250").show()), nb(Ka ? d.ac : d.aa), Ka = !1, 1E3 > a && (s = 1), fa = !0, e("#mainPanel").show(), 0 < a ? e("#overlays").fadeIn(a) : e("#overlays").show())
    }

    function ga(a) {
        e("#helloContainer").attr("data-gamemode", a);
        W = a;
        e("#gamemode").val(a)
    }

    function nb(a) {
        d.googletag && d.googletag.cmd.push(function() {
            La && (La = !1, setTimeout(function() {
                La = !0
            }, 6E4 * Pb), d.googletag && d.googletag.pubads && d.googletag.pubads().refresh && d.googletag.pubads().refresh(a))
        })
    }

    function mb(a) {
        d.googletag && d.googletag.pubads && d.googletag.pubads().clear && d.googletag.pubads().clear(a)
    }

    function ha(a) {
        return d.i18n[a] || d.i18n_dict.en[a] || a
    }

    function ob() {
        var a = ++Ja;
        if (W == "") W = "ws://127.0.0.1:8080";
        a == Ja && Ma(0);
    }

    function M() {
        Ga && y && (e("#connecting").show(), ob())
    }

    function Ma(b) {
        let a = "ws://127.0.0.1:8080";
        if (!["", null].includes(e("#region").val())) {
            a = e("#region").val();
        }
        if (r) {
            r.onopen = null;
            r.onmessage = null;
            r.onclose = null;
            try {
                r.close()
            } catch (c) {}
            r = null
        }
        Na.ip && (a = "ws://" + Na.ip);
        if (null != O) {
            var n = O;
            O = function() {
                n(b)
            }
        }
        if (Qb) {}
        z = [];
        l = [];
        J = {};
        v = [];
        X = [];
        w = [];
        A = B = null;
        P = 0;
        ia = !1;
        console.log("Connecting to " + a);
        r = new WebSocket(a);
        r.binaryType = "arraybuffer";
        r.onopen = function() {
            var a;
            console.log("socket open");
            a = Q(5);
            a.setUint8(0, 254);
            a.setUint32(1, 5, !0);
            R(a);
            a = Q(5);
            a.setUint8(0, 255);
            a.setUint32(1, 154669603, !0);
            R(a);
            a = Q(1 + b.length);
            a.setUint8(0, 80);
            for (var c = 0; c < b.length; ++c) a.setUint8(c + 1, b.charCodeAt(c));
            R(a);
            pb()
        };
        r.onmessage = Rb;
        r.onclose = Sb;
        r.onerror = function() {
            console.log("socket error")
        }
    }

    function Q(a) {
        return new DataView(new ArrayBuffer(a))
    }

    function R(a) {
        r.send(a.buffer)
    }

    function Sb() {
        ia && (ua = 3000);
        console.log("socket close");
        setTimeout(M, ua);
    }

    function Rb(a) {
        Tb(new DataView(a.data))
    }

    function Tb(a) {
        function b() {
            for (var b = "";;) {
                var d = a.getUint16(c, !0);
                c += 2;
                if (0 == d) break;
                b += String.fromCharCode(d)
            }
            return b
        }
        var c = 0;
        240 == a.getUint8(c) && (c += 5);
        switch (a.getUint8(c++)) {
            case 16:
                Ub(a, c);
                break;
            case 17:
                ja = a.getFloat32(c, !0);
                c += 4;
                ka = a.getFloat32(c, !0);
                c += 4;
                la = a.getFloat32(c, !0);
                c += 4;
                break;
            case 20:
                l = [];
                z = [];
                break;
            case 21:
                Oa = a.getInt16(c, !0);
                c += 2;
                Pa = a.getInt16(c, !0);
                c += 2;
                Qa || (Qa = !0, va = Oa, wa = Pa);
                break;
            case 32:
                z.push(a.getUint32(c, !0));
                c += 4;
                break;
            case 49:
                if (null != B) break;
                var n = a.getUint32(c, !0),
                    c = c + 4;
                w = [];
                for (var d = 0; d < n; ++d) {
                    var e = a.getUint32(c, !0),
                        c = c + 4;
                    w.push({
                        id: e,
                        name: b()
                    })
                }
                qb();
                break;
            case 50:
                B = [];
                n = a.getUint32(c, !0);
                c += 4;
                for (d = 0; d < n; ++d) B.push(a.getFloat32(c, !0)), c += 4;
                qb();
                break;
            case 64:
                xa = a.getFloat64(c, !0);
                c += 8;
                ya = a.getFloat64(c, !0);
                c += 8;
                za = a.getFloat64(c, !0);
                c += 8;
                Aa = a.getFloat64(c, !0);
                c += 8;
                ja = (za + xa) / 2;
                ka = (Aa + ya) / 2;
                la = 1;
                0 == l.length && (t = ja, u = ka, g = la);
                break;
            case 81:
                var f = a.getUint32(c, !0),
                    c = c + 4,
                    k = a.getUint32(c, !0),
                    c = c + 4,
                    h = a.getUint32(c, !0),
                    c = c + 4;
                setTimeout(function() {
                    Y({
                        d: f,
                        e: k,
                        c: h
                    })
                }, 1200)
        }
    }

    function Ub(a, b) {
        function c() {
            for (var c = "";;) {
                var d = a.getUint16(b, !0);
                b += 2;
                if (0 == d) break;
                c += String.fromCharCode(d)
            }
            return c
        }

        function n() {
            for (var c = "";;) {
                var d = a.getUint8(b++);
                if (0 == d) break;
                c += String.fromCharCode(d)
            }
            return c
        }
        rb = F = Date.now();
        ia || (ia = !0, Vb());
        Ra = !1;
        var p = a.getUint16(b, !0);
        b += 2;
        for (var f = 0; f < p; ++f) {
            var C = J[a.getUint32(b, !0)],
                k = J[a.getUint32(b + 4, !0)];
            b += 8;
            C && k && (k.R(), k.o = k.x, k.p = k.y, k.n = k.size, k.C = C.x, k.D = C.y, k.m = k.size, k.K = F, Wb(C, k))
        }
        for (f = 0;;) {
            p = a.getUint32(b, !0);
            b += 4;
            if (0 == p) break;
            ++f;
            var g, C = a.getInt32(b, !0);
            b += 4;
            k = a.getInt32(b, !0);
            b += 4;
            g = a.getInt16(b, !0);
            b += 2;
            var m = a.getUint8(b++),
                K = a.getUint8(b++),
                S = a.getUint8(b++),
                K = Xb(m << 16 | K << 8 | S),
                S = a.getUint8(b++),
                h = !!(S & 1),
                q = !!(S & 16),
                r = null;
            S & 2 && (b += 4 + a.getUint32(b, !0));
            S & 4 && (r = n());
            var s = c(),
                m = null;
            J.hasOwnProperty(p) ? (m = J[p], m.J(), m.o = m.x, m.p = m.y, m.n = m.size, m.color = K) : (m = new Z(p, C, k, g, K, s), v.push(m), J[p] = m, m.ia = C, m.ja = k);
            m.f = h;
            m.j = q;
            m.C = C;
            m.D = k;
            m.m = g;
            m.K = F;
            m.T = S;
            r && (m.V = r);

            s && m.t(s); - 1 != z.indexOf(p) && -1 == l.indexOf(m) && (l.push(m), 1 == l.length && (t = m.x, u = m.y, sb(), document.getElementById("overlays").style.display = "none", x = [], Sa = 0, Ta = l[0].color, Ua = !0, tb = Date.now(), T = Va = Wa = 0))
        }
        C = a.getUint32(b, !0);
        b += 4;
        for (f = 0; f < C; f++) p = a.getUint32(b, !0), b += 4, m = J[p], null != m && m.R();
        Ra && 0 == l.length && (ub = Date.now(), Ua = !1, fa || V || (vb ? (nb(d.ab), Yb(), V = !0, e("#overlays").fadeIn(3E3), e("#stats").show()) : pa(3E3)))
    }

    function Vb() {
        e("#connecting").hide();
        wb();
        O && (O(), O = null);
        null != Xa && clearTimeout(Xa);
        Xa = setTimeout(function() {
            d.ga && (++xb, d.ga("set", "dimension2", xb))
        }, 1E4)
    }

    function ca() {
        if ($()) {
            var a = na - h / 2,
                b = oa - q / 2;
            64 > a * a + b * b || .01 > Math.abs(yb - ra) && .01 > Math.abs(zb - sa) || (yb = ra, zb = sa, a = Q(13), a.setUint8(0, 16), a.setInt32(1, ra, !0), a.setInt32(5, sa, !0), a.setUint32(9, 0, !0), R(a))
        }
    }

    function wb() {
        if ($() && ia && null != I) {
            var a = Q(1 + 2 * I.length);
            a.setUint8(0, 0);
            for (var b = 0; b < I.length; ++b) a.setUint16(1 + 2 * b, I.charCodeAt(b), !0);
            R(a);
            I = null
        }
    }

    function $() {
        return null != r && r.readyState == r.OPEN
    }

    function H(a) {
        if ($()) {
            var b = Q(1);
            b.setUint8(0, a);
            R(b)
        }
    }

    function pb() {
        if ($() && null != D) {
            var a = Q(1 + D.length);
            a.setUint8(0, 81);
            for (var b = 0; b < D.length; ++b) a.setUint8(b + 1, D.charCodeAt(b));
            R(a)
        }
    }

    function hb() {
        h = 1 * d.innerWidth;
        q = 1 * d.innerHeight;
        Ha.width = L.width = h;
        Ha.height = L.height = q;
        var a = e("#helloContainer");
        a.css("transform", "none");
        var b = a.height(),
            c = d.innerHeight;
        b > c / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + c / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
        Ab()
    }

    function Bb() {
        var a;
        a = 1 * Math.max(q / 1080, h / 1920);
        return a *= N
    }

    function Zb() {
        if (0 != l.length) {
            for (var a = 0, b = 0; b < l.length; b++) a += l[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * Bb();
            g = (9 * g + a) / 10
        }
    }

    function Ab() {
        var a, b = Date.now();
        ++$b;
        F = b;
        if (0 < l.length) {
            Zb();
            for (var c = a = 0, d = 0; d < l.length; d++) l[d].J(), a += l[d].x / l.length, c += l[d].y / l.length;
            ja = a;
            ka = c;
            la = g;
            t = (t + a) / 2;
            u = (u + c) / 2
        } else t = (29 * t + ja) / 30, u = (29 * u + ka) / 30, g = (9 * g + la * Bb()) / 10;
        Nb();
        Ia();
        Ya || f.clearRect(0, 0, h, q);
        Ya ? (f.fillStyle = Ba ? "#111111" : "#F2FBFF", f.globalAlpha = .05, f.fillRect(0, 0, h, q), f.globalAlpha = 1) : ac();
        v.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size
        });
        f.save();
        f.translate(h / 2, q / 2);
        f.scale(g, g);
        f.translate(-t, -u);
        for (d = 0; d < X.length; d++) X[d].s(f);
        for (d = 0; d < v.length; d++) v[d].s(f);
        if (Qa) {
            va = (3 * va + Oa) / 4;
            wa = (3 * wa + Pa) / 4;
            f.save();
            f.strokeStyle = "#FFAAAA";
            f.lineWidth = 10;
            f.lineCap = "round";
            f.lineJoin = "round";
            f.globalAlpha = .5;
            f.beginPath();
            for (d = 0; d < l.length; d++) f.moveTo(l[d].x, l[d].y), f.lineTo(va, wa);
            f.stroke();
            f.restore()
        }
        f.restore();
        A && A.width && f.drawImage(A, h - A.width - 10, 10);
        P = Math.max(P, Cb());
        0 != P && (null == Ca && (Ca = new Da(12, "#FFFFFF")), Ca.u(ha("score") + ": " + ~~(P / 100)), c = Ca.F(), a = c.width, f.globalAlpha = .3, f.fillStyle = "#000000", f.fillRect(4, q - 5 - 12 - 5, a + 5, 17), f.globalAlpha = 1, f.drawImage(c, 6, q - 5 - 12 - 3));
        bc();
        b = Date.now() - b;
        b > 1E3 / 60 ? G -= .01 : b < 1E3 / 65 && (G += .01);
        .4 > G && (G = .4);
        1 < G && (G = 1);
        b = F - Db;
        !$() || fa || V ? (s += b / 2E3, 1 < s && (s = 1)) : (s -= b / 300, 0 > s && (s = 0));
        0 < s ? (f.fillStyle = "#000000", Eb ? (f.globalAlpha = s, f.fillRect(0, 0, h, q), E.complete && E.width && (E.width / E.height < h / q ? (b = h, a = E.height * h / E.width) : (b = E.width * q / E.height, a = q), f.drawImage(E, (h - b) / 2, (q - a) / 2, b, a), f.globalAlpha = .5 * s, f.fillRect(0, 0, h, q))) : (f.globalAlpha = .5 * s, f.fillRect(0, 0, h, q)), f.globalAlpha = 1) : Eb = !1;
        Db = F
    }

    function ac() {
        f.fillStyle = Ba ? "#111111" : "#F2FBFF";
        f.fillRect(0, 0, h, q);
        f.save();
        f.strokeStyle = Ba ? "#AAAAAA" : "#000000";
        f.globalAlpha = .2 * g;
        for (var a = h / g, b = q / g, c = (-t + a / 2) % 50; c < a; c += 50) f.beginPath(), f.moveTo(c * g - .5, 0), f.lineTo(c * g - .5, b * g), f.stroke();
        for (c = (-u + b / 2) % 50; c < b; c += 50) f.beginPath(), f.moveTo(0, c * g - .5), f.lineTo(a * g, c * g - .5), f.stroke();
        f.restore()
    }

    function bc() {
        if (fb && Za.width) {
            var a = h / 5;
            f.drawImage(Za, 5, 5, a, a)
        }
    }

    function Cb() {
        for (var a = 0, b = 0; b < l.length; b++) a += l[b].m * l[b].m;
        return a
    }

    function qb() {
        A = null;
        if (null != B || 0 != w.length)
            if (null != B || Ea) {
                A = document.createElement("canvas");
                var a = A.getContext("2d"),
                    b = 60,
                    b = null == B ? b + 24 * w.length : b + 180,
                    c = Math.min(140, .3 * h) / 200;
                A.width = 200 * c;
                A.height = b * c;
                a.scale(c, c);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha = 1;
                a.fillStyle = "#FFFFFF";
                c = null;
                c = ha("leaderboard");
                a.font = "30px Ubuntu";
                a.fillText(c, 100 - a.measureText(c).width / 2, 40);
                if (null == B)
                    for (a.font = "18px Ubuntu", b = 0; b < w.length; ++b) c = w[b].name || ha("unnamed_cell"), Ea || (c = ha("unnamed_cell")), -1 != z.indexOf(w[b].id) ? (l[0].name && (c = l[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
                else
                    for (b = c = 0; b < B.length; ++b) {
                        var d = c + B[b] * Math.PI * 2;
                        a.fillStyle = cc[b + 1];
                        a.beginPath();
                        a.moveTo(100, 140);
                        a.arc(100, 140, 80, c, d, !1);
                        a.fill();
                        c = d
                    }
            }
    }

    function $a(a, b, c, d, e) {
        this.P = a;
        this.x = b;
        this.y = c;
        this.g = d;
        this.b = e
    }

    function Z(a, b, c, d, e, f) {
        this.id = a;
        this.o = this.x = b;
        this.p = this.y = c;
        this.n = this.size = d;
        this.color = e;
        this.a = [];
        this.Q();
        this.t(f)
    }

    function Xb(a) {
        for (a = a.toString(16); 6 > a.length;) a = "0" + a;
        return "#" + a
    }

    function Da(a, b, c, d) {
        a && (this.q = a);
        b && (this.M = b);
        this.O = !!c;
        d && (this.r = d)
    }

    function dc(a) {
        for (var b = a.length, c, d; 0 < b;) d = Math.floor(Math.random() * b), b--, c = a[b], a[b] = a[d], a[d] = c
    }

    function Y(a, b) {
        var c = "1" == e("#helloContainer").attr("data-has-account-data");
        e("#helloContainer").attr("data-has-account-data", "1");
        if (null == b && d.localStorage[U]) {
            var n = JSON.parse(d.localStorage[U]);
            n.xp = a.e;
            n.xpNeeded = a.c;
            n.level = a.d;
            d.localStorage[U] = JSON.stringify(n)
        }
        if (c) {
            var p = +e(".agario-exp-bar .progress-bar-text").first().text().split("index.html")[0],
                c = +e(".agario-exp-bar .progress-bar-text").first().text().split("index.html")[1].split(" ")[0],
                n = e(".agario-profile-panel .progress-bar-star").first().text();
            if (n != a.d) Y({
                e: c,
                c: c,
                d: n
            }, function() {
                e(".agario-profile-panel .progress-bar-star").text(a.d);
                e(".agario-exp-bar .progress-bar").css("width", "100%");
                e(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    e(".progress-bar-star").removeClass("animated tada")
                });
                setTimeout(function() {
                    e(".agario-exp-bar .progress-bar-text").text(a.c + "/" + a.c + " XP");
                    Y({
                        e: 0,
                        c: a.c,
                        d: a.d
                    }, function() {
                        Y(a, b)
                    })
                }, 1E3)
            });
            else {
                var f = Date.now(),
                    g = function() {
                        var c;
                        c = (Date.now() - f) / 1E3;
                        c = 0 > c ? 0 : 1 < c ? 1 : c;
                        c = c * c * (3 - 2 * c);
                        e(".agario-exp-bar .progress-bar-text").text(~~(p + (a.e - p) * c) + "/" + a.c + " XP");
                        e(".agario-exp-bar .progress-bar").css("width", (88 * (p + (a.e - p) * c) / a.c).toFixed(2) + "%");
                        1 > c ? d.requestAnimationFrame(g) : b && b()
                    };
                d.requestAnimationFrame(g)
            }
        } else e(".agario-profile-panel .progress-bar-star").text(a.d), e(".agario-exp-bar .progress-bar-text").text(a.e + "/" + a.c + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.e / a.c).toFixed(2) + "%"), b && b()
    }

    function Fb(a) {
        "string" == typeof a && (a = JSON.parse(a));
        Date.now() + 18E5 > a.expires ? e("#helloContainer").attr("data-logged-in", "0") : (d.localStorage[U] = JSON.stringify(a), D = a.authToken, e(".agario-profile-name").text(a.name), pb(), Y({
            e: a.xp,
            c: a.xpNeeded,
            d: a.level
        }), e("#helloContainer").attr("data-logged-in", "1"))
    }

    function ec(a) {
        a = a.split("\n");
        Fb({
            name: a[0],
            fbid: a[1],
            authToken: a[2],
            expires: 1E3 * +a[3],
            level: +a[4],
            xp: +a[5],
            xpNeeded: +a[6]
        })
    }

    function ab(a) {
        if ("connected" == a.status) {
            var b = a.authResponse.accessToken;
            console.log(b);
            d.FB.api("/me/picture?width=180&height=180", function(a) {
                d.localStorage.fbPictureCache = a.data.url;
                e(".agario-profile-picture").attr("src", a.data.url)
            });
            e("#helloContainer").attr("data-logged-in", "1");
            null != D ? e.ajax(ea + "checkToken", {
                error: function() {
                    D = null;
                    ab(a)
                },
                success: function(a) {
                    a = a.split("\n");
                    Y({
                        d: +a[0],
                        e: +a[1],
                        c: +a[2]
                    })
                },
                dataType: "text",
                method: "POST",
                cache: !1,
                crossDomain: !0,
                data: D
            }) : e.ajax(ea + "facebookLogin", {
                error: function() {
                    D = null;
                    e("#helloContainer").attr("data-logged-in", "0")
                },
                success: ec,
                dataType: "text",
                method: "POST",
                cache: !1,
                crossDomain: !0,
                data: b
            })
        }
    }

    function kb(a) {
        ga(":party");
        e("#helloContainer").attr("data-party-state", "4");
        a = decodeURIComponent(a).replace(/.*#/gim, "");
        bb("#" + d.encodeURIComponent(a));
        e.ajax(ea + "getToken", {
            error: function() {
                e("#helloContainer").attr("data-party-state", "6")
            },
            success: function(b) {
                b = b.split("\n");
                e(".partyToken").val("//agario.fun/" + d.encodeURIComponent(a));
                e("#helloContainer").attr("data-party-state", "5");
                ga(":party");
                Ma(a)
            },
            dataType: "text",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: a
        })
    }

    function bb(a) {
        d.history && d.history.replaceState && d.history.replaceState({}, d.document.title, a)
    }

    function Wb(a, b) {
        var c = -1 != z.indexOf(a.id),
            d = -1 != z.indexOf(b.id),
            e = 30 > b.size;
        c && e && ++Sa;
        e || !c || d || ++Va
    }

    function Gb(a) {
        a = ~~a;
        var b = (a % 60).toString();
        a = (~~(a / 60)).toString();
        2 > b.length && (b = "0" + b);
        return a + ":" + b
    }

    function fc() {
        if (null == w) return 0;
        for (var a = 0; a < w.length; ++a)
            if (-1 != z.indexOf(w[a].id)) return a + 1;
        return 0
    }

    function Yb() {
        e(".stats-food-eaten").text(Sa);
        e(".stats-time-alive").text(Gb((ub - tb) / 1E3));
        e(".stats-leaderboard-time").text(Gb(Wa));
        e(".stats-highest-mass").text(~~(P / 100));
        e(".stats-cells-eaten").text(Va);
        e(".stats-top-position").text(0 == T ? ":(" : T);
        var a = document.getElementById("statsGraph");
        if (a) {
            var b = a.getContext("2d"),
                c = a.width,
                a = a.height;
            b.clearRect(0, 0, c, a);
            if (2 < x.length) {
                for (var d = 200, p = 0; p < x.length; p++) d = Math.max(x[p], d);
                b.lineWidth = 3;
                b.lineCap = "round";
                b.lineJoin = "round";
                b.strokeStyle = Ta;
                b.fillStyle = Ta;
                b.beginPath();
                b.moveTo(0, a - x[0] / d * (a - 10) + 10);
                for (p = 1; p < x.length; p += Math.max(~~(x.length / c), 1)) {
                    for (var f = p / (x.length - 1) * c, g = [], k = -20; 20 >= k; ++k) 0 > p + k || p + k >= x.length || g.push(x[p + k]);
                    g = g.reduce(function(a, b) {
                        return a + b
                    }) / g.length / d;
                    b.lineTo(f, a - g * (a - 10) + 10)
                }
                b.stroke();
                b.globalAlpha = .5;
                b.lineTo(c, a);
                b.lineTo(0, a);
                b.fill();
                b.globalAlpha = 1

            }
        }
    }
    if (!d.agarioNoInit) {
        var cb = d.location.protocol,
            Qb = "https:" == cb,
            ea = cb + "//agario.fun/",
            Fa = d.navigator.userAgent;
        if (-1 != Fa.indexOf("Android")) d.ga && d.ga("send", "event", "MobileRedirect", "PlayStore"), setTimeout(function() {}, 1E3);
        else if (-1 != Fa.indexOf("iPhone") || -1 != Fa.indexOf("iPad") || -1 != Fa.indexOf("iPod")) d.ga && d.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function() {}, 1E3);
        else {
            var Ha, f, L, h, q, da = null,
                r = null,
                t = 0,
                u = 0,
                z = [],
                l = [],
                J = {},
                v = [],
                X = [],
                w = [],
                na = 0,
                oa = 0,
                ra = -1,
                sa = -1,
                $b = 0,
                F = 0,
                Db = 0,
                I = null,
                xa = 0,
                ya = 0,
                za = 1E4,
                Aa = 1E4,
                g = 1,
                y = null,
                Hb = !0,
                Ea = !0,
                db = !1,
                Ra = !1,
                P = 0,
                Ba = !1,
                Ib = !1,
                ja = t = ~~((xa + za) / 2),
                ka = u = ~~((ya + Aa) / 2),
                la = 1,
                W = "",
                B = null,
                Ga = !1,
                Qa = !1,
                Oa = 0,
                Pa = 0,
                va = 0,
                wa = 0,
                Jb = 0,
                cc = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
                Ya = !1,
                ia = !1,
                rb = 0,
                D = null,
                N = 1,
                s = 1,
                fa = !1,
                Ja = 0,
                Eb = !0,
                Na = {};
            (function() {
                var a = d.location.search;
                "?" == a.charAt(0) && (a = a.slice(1));
                for (var a = a.split("&"), b = 0; b < a.length; b++) {
                    var c = a[b].split("=");
                    Na[c[0]] = c[1]
                }
            })();
            var E = new Image;
            E.src = "img/background.png";
            var fb = "ontouchstart" in d && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(d.navigator.userAgent),
                Za = new Image;
            Za.src = "img/split.png";
            var Kb = document.createElement("canvas");
            if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == Kb || null == Kb.getContext || null == d.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
            else {
                var ta = null;
                d.setNick = function(a) {
                    d.ga && d.ga("send", "event", "Nick", a.toLowerCase());
                    lb();
                    I = a;
                    wb();
                    P = 0
                };
                d.setRegion = qa;
                var Ka = !0;
                d.setSkins = function(a) {
                    Hb = a
                };
                d.setNames = function(a) {
                    Ea = a
                };
                d.setDarkTheme = function(a) {
                    Ba = a
                };
                d.setColors = function(a) {
                    db = a
                };
                d.setShowMass = function(a) {
                    Ib = a
                };
                d.spectate = function() {
                    I = null;
                    H(1);
                    lb()
                };
                d.setGameMode = function(a) {
                    a != W && (":party" == W && e("#helloContainer").attr("data-party-state", "0"), ga(a), ":party" != a && M())
                };
                d.setAcid = function(a) {
                    Ya = a
                };
                null != d.localStorage && (null == d.localStorage.AB9 && (d.localStorage.AB9 = 0 + ~~(100 * Math.random())), Jb = +d.localStorage.AB9, d.ABGroup = Jb);
                e.get(cb + "//agario.fun/gc/", function(a) {
                    var b = a.split(" ");
                    a = b[0];
                    b = b[1] || ""; - 1 == ["UA"].indexOf(a) && Lb.push("ussr");
                    ma.hasOwnProperty(a) && ("string" == typeof ma[a] ? y || qa(ma[a]) : ma[a].hasOwnProperty(b) && (y || qa(ma[a][b])))
                }, "text");
                var La = !0,
                    Pb = 0,
                    ma = {
                        AF: "BR-Brazil",
                        AX: "BR-Brazil",
                        AL: "BR-Brazil",
                        DZ: "BR-Brazil",
                        AS: "BR-Brazil",
                        AD: "BR-Brazil",
                        AO: "BR-Brazil",
                        AI: "BR-Brazil",
                        AG: "BR-Brazil",
                        AR: "BR-Brazil",
                        AM: "BR-Brazil",
                        AW: "BR-Brazil",
                        AU: "BR-Brazil",
                        AT: "BR-Brazil",
                        AZ: "BR-Brazil",
                        BS: "BR-Brazil",
                        BH: "BR-Brazil",
                        BD: "BR-Brazil",
                        BB: "BR-Brazil",
                        BY: "BR-Brazil",
                        BE: "BR-Brazil",
                        BZ: "BR-Brazil",
                        BJ: "BR-Brazil",
                        BM: "BR-Brazil",
                        BT: "BR-Brazil",
                        BO: "BR-Brazil",
                        BQ: "BR-Brazil",
                        BA: "BR-Brazil",
                        BW: "BR-Brazil",
                        BR: "BR-Brazil",
                        IO: "BR-Brazil",
                        VG: "BR-Brazil",
                        BN: "BR-Brazil",
                        BG: "BR-Brazil",
                        BF: "BR-Brazil",
                        BI: "BR-Brazil",
                        KH: "BR-Brazil",
                        CM: "BR-Brazil",
                        CA: "BR-Brazil",
                        CV: "BR-Brazil",
                        KY: "BR-Brazil",
                        CF: "BR-Brazil",
                        TD: "BR-Brazil",
                        CL: "BR-Brazil",
                        CN: "BR-Brazil",
                        CX: "BR-Brazil",
                        CC: "BR-Brazil",
                        CO: "BR-Brazil",
                        KM: "BR-Brazil",
                        CD: "BR-Brazil",
                        CG: "BR-Brazil",
                        CK: "BR-Brazil",
                        CR: "BR-Brazil",
                        CI: "BR-Brazil",
                        HR: "BR-Brazil",
                        CU: "BR-Brazil",
                        CW: "BR-Brazil",
                        CY: "BR-Brazil",
                        CZ: "BR-Brazil",
                        DK: "BR-Brazil",
                        DJ: "BR-Brazil",
                        DM: "BR-Brazil",
                        DO: "BR-Brazil",
                        EC: "BR-Brazil",
                        EG: "BR-Brazil",
                        SV: "BR-Brazil",
                        GQ: "BR-Brazil",
                        ER: "BR-Brazil",
                        EE: "BR-Brazil",
                        ET: "BR-Brazil",
                        FO: "BR-Brazil",
                        FK: "BR-Brazil",
                        FJ: "BR-Brazil",
                        FI: "BR-Brazil",
                        FR: "BR-Brazil",
                        GF: "BR-Brazil",
                        PF: "BR-Brazil",
                        GA: "BR-Brazil",
                        GM: "BR-Brazil",
                        GE: "BR-Brazil",
                        DE: "BR-Brazil",
                        GH: "BR-Brazil",
                        GI: "BR-Brazil",
                        GR: "BR-Brazil",
                        GL: "BR-Brazil",
                        GD: "BR-Brazil",
                        GP: "BR-Brazil",
                        GU: "BR-Brazil",
                        GT: "BR-Brazil",
                        GG: "BR-Brazil",
                        GN: "BR-Brazil",
                        GW: "BR-Brazil",
                        GY: "BR-Brazil",
                        HT: "BR-Brazil",
                        VA: "BR-Brazil",
                        HN: "BR-Brazil",
                        HK: "BR-Brazil",
                        HU: "BR-Brazil",
                        IS: "BR-Brazil",
                        IN: "BR-Brazil",
                        ID: "BR-Brazil",
                        IR: "BR-Brazil",
                        IQ: "BR-Brazil",
                        IE: "BR-Brazil",
                        IM: "BR-Brazil",
                        IL: "BR-Brazil",
                        IT: "BR-Brazil",
                        JM: "BR-Brazil",
                        JP: "BR-Brazil",
                        JE: "BR-Brazil",
                        JO: "BR-Brazil",
                        KZ: "BR-Brazil",
                        KE: "BR-Brazil",
                        KI: "BR-Brazil",
                        KP: "BR-Brazil",
                        KR: "BR-Brazil",
                        KW: "BR-Brazil",
                        KG: "BR-Brazil",
                        LA: "BR-Brazil",
                        LV: "BR-Brazil",
                        LB: "BR-Brazil",
                        LS: "BR-Brazil",
                        LR: "BR-Brazil",
                        LY: "BR-Brazil",
                        LI: "BR-Brazil",
                        LT: "BR-Brazil",
                        LU: "BR-Brazil",
                        MO: "BR-Brazil",
                        MK: "BR-Brazil",
                        MG: "BR-Brazil",
                        MW: "BR-Brazil",
                        MY: "BR-Brazil",
                        MV: "BR-Brazil",
                        ML: "BR-Brazil",
                        MT: "BR-Brazil",
                        MH: "BR-Brazil",
                        MQ: "BR-Brazil",
                        MR: "BR-Brazil",
                        MU: "BR-Brazil",
                        YT: "BR-Brazil",
                        MX: "BR-Brazil",
                        FM: "BR-Brazil",
                        MD: "BR-Brazil",
                        MC: "BR-Brazil",
                        MN: "BR-Brazil",
                        ME: "BR-Brazil",
                        MS: "BR-Brazil",
                        MA: "BR-Brazil",
                        MZ: "BR-Brazil",
                        MM: "BR-Brazil",
                        NA: "BR-Brazil",
                        NR: "BR-Brazil",
                        NP: "BR-Brazil",
                        NL: "BR-Brazil",
                        NC: "BR-Brazil",
                        NZ: "BR-Brazil",
                        NI: "BR-Brazil",
                        NE: "BR-Brazil",
                        NG: "BR-Brazil",
                        NU: "BR-Brazil",
                        NF: "BR-Brazil",
                        MP: "BR-Brazil",
                        NO: "BR-Brazil",
                        OM: "BR-Brazil",
                        PK: "BR-Brazil",
                        PW: "BR-Brazil",
                        PS: "BR-Brazil",
                        PA: "BR-Brazil",
                        PG: "BR-Brazil",
                        PY: "BR-Brazil",
                        PE: "BR-Brazil",
                        PH: "BR-Brazil",
                        PN: "BR-Brazil",
                        PL: "BR-Brazil",
                        PT: "BR-Brazil",
                        PR: "BR-Brazil",
                        QA: "BR-Brazil",
                        RE: "BR-Brazil",
                        RO: "BR-Brazil",
                        RU: "BR-Brazil",
                        RW: "BR-Brazil",
                        BL: "BR-Brazil",
                        SH: "BR-Brazil",
                        KN: "BR-Brazil",
                        LC: "BR-Brazil",
                        MF: "BR-Brazil",
                        PM: "BR-Brazil",
                        VC: "BR-Brazil",
                        WS: "BR-Brazil",
                        SM: "BR-Brazil",
                        ST: "BR-Brazil",
                        SA: "BR-Brazil",
                        SN: "BR-Brazil",
                        RS: "BR-Brazil",
                        SC: "BR-Brazil",
                        SL: "BR-Brazil",
                        SG: "BR-Brazil",
                        SX: "BR-Brazil",
                        SK: "BR-Brazil",
                        SI: "BR-Brazil",
                        SB: "BR-Brazil",
                        SO: "BR-Brazil",
                        ZA: "BR-Brazil",
                        SS: "BR-Brazil",
                        ES: "BR-Brazil",
                        LK: "BR-Brazil",
                        SD: "BR-Brazil",
                        SR: "BR-Brazil",
                        SJ: "BR-Brazil",
                        SZ: "BR-Brazil",
                        SE: "BR-Brazil",
                        CH: "BR-Brazil",
                        SY: "BR-Brazil",
                        TW: "BR-Brazil",
                        TJ: "BR-Brazil",
                        TZ: "BR-Brazil",
                        TH: "BR-Brazil",
                        TL: "BR-Brazil",
                        TG: "BR-Brazil",
                        TK: "BR-Brazil",
                        TO: "BR-Brazil",
                        TT: "BR-Brazil",
                        TN: "BR-Brazil",
                        TR: "BR-Brazil",
                        TM: "BR-Brazil",
                        TC: "BR-Brazil",
                        TV: "BR-Brazil",
                        UG: "BR-Brazil",
                        UA: "BR-Brazil",
                        AE: "BR-Brazil",
                        GB: "BR-Brazil",
                        US: "BR-Brazil",
                        UM: "BR-Brazil",
                        VI: "BR-Brazil",
                        UY: "BR-Brazil",
                        UZ: "BR-Brazil",
                        VU: "BR-Brazil",
                        VE: "BR-Brazil",
                        VN: "BR-Brazil",
                        WF: "BR-Brazil",
                        EH: "BR-Brazil",
                        YE: "BR-Brazil",
                        ZM: "BR-Brazil",
                        ZW: "BR-Brazil"
                    },
                    O = null;
                d.connect = Ma;
                var ua = 500,
                    Xa = null,
                    xb = 0,
                    yb = -1,
                    zb = -1;
                d.refreshPlayerInfo = function() {
                    H(253)
                };
                var A = null,
                    G = 1,
                    Ca = null,
                    ib = function() {
                        var a = Date.now(),
                            b = 1E3 / 60;
                        return function() {
                            d.requestAnimationFrame(ib);
                            var c = Date.now(),
                                e = c - a;
                            e > b && (a = c - e % b, !$() || 240 > Date.now() - rb ? Ab() : console.warn("Skipping draw"), gc())
                        }
                    }(),
                    aa = {},
                    Lb = "poland;usa;china;russia;vinesauce;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing;hitler;nazi;godfather;nasa;pirate1;twitter;youtube;2ch;turkey;trabzonspor;thuglife;texas;stussy;steam;stalin;somalia;sir;sealand;scotland;romania;receita federal;quebec;prussia;prodota;pokerface;piccolo;pewdiepie;patriarchy;origin;nah;mhp;matriarchy;mars;luxembourg;kc;isis;ireland;india;imperial japan;gamerrocko;galatasaray;french kingdom;fenerbahce;feminism;facepunch;facebook;ea;doge;denmark;chp;cambodia;byzantium;besiktas;belgium;bait;ayy lmao;ataturk;argentina;aog;anonim;akp;8ch;8;berlusconi;blatter;boris;bush;cameron;chavez;clinton;cuba;dilma;fidel;hillary;hollande;irs;kim jong-un;merkel;obama;palin;putin;qing dynasty;queen;trump;tsarist russia;tsipras;ussr;wojak;venezuela;bruce lee;osmanli;google;alien;mr. bean;bruce lee;adolf hitler;chuck norris;gangnam style;pou;talking angela;talking tom;angry birds;barbie;schwarzenegger;barbıe;chucky;stallone;jeanclaudedamme;jackie chan;yip man;pierce brosnan;al pacino;hay day;pink panther;pinocchio;tom and jerry;bugs bunny;baby hazel;taz-mania;spiderman;fred and barney;russell crowe;jason statham;jim carrey;leonardo;batman;peter pan;beetle juice;superman;he-man;hulk;dracula;turkmenistan;kazakhstan;kyrgyzstan;tajikistan;uzbekistan;fiji;kiribati;marshallıslands;micronesia;nauru;new zealand;palau;papuanewguinea;samoa;solomon ıslands;tonga;tuvalu;vanuatu;egypt;ısrael;catalonia;czech republic;colombia;algeria;belarus;north brabant;friesland;albania;cyprus;ıceland;liechtenstein;macedonia;malta;moldova;serbia;slovakia;slovenia;soccer;baseball;rainbow;pacman;illuminati;alabama;alaska;baghdadi;baratheon;bart;beavis;brian;butthead;cartman;coca cola;creeper;death star;dirt block;dollar;donut;euro;eye of sauron;finn;forever alone;giraffe;girl;godzilla;google chrome;hello kitty;herobrine;hole;homer;ice king;jew;kirchner;lannister;lenny face;leopard;lgbt;marceline;marge;montgomery;pizza;pokemon;rockstar;sheep;skeleton1;steve;stewie;targaryen;tiger;zebra;zombie;yugoslavia;jolokia pepper;troll;sungerbob;el salvador;basketball;ınstagram;mona lisa;mario;erdogan;davutoglu;mortal kombat;mcdonald's;atarı;apple;army;banana;birdie;bite;bomb;bowling;breakfast;brofist;bug;candy;cat;cloud;cookie;crazy;dog;donuts;evil;eye;frog;galaxy;goldfish;halloween;heart;hockey;ıce king;jupiter;luchador;mercury;monster;mouse;mushroom;neptune;nose;nuclear;octopus;owl;panda;pluto;radar;saturn;scarecrow;seal;snowman;spy;sun;target;terrible;toxic;turtle;uranus;venus;virus;wolf;polıce;pirate;bubblegum;enderman;heisenberg;jake;lisa;peter;kirby;awesome;ı love google;anna frozen;cinderella;elsa;counter-strike;frogout;gaston;blobfish;luigi;mr. popo;spongegar;spurdo;stitch;garfield;ıron man;ninja turtles;joker;saw;santa claus1;christmas tree;kendall draeger;bat;bear;cougar;coyote;crocodile;fly;fox;hunter;kraken;lion;lizard;mammoth;master chief;panther;raptor;shark;shrek;snake;spider;sumo;t-rex;wasp;bonibon;jelibon;smurfs;eye illusions;airplane;helicopter;train;whatsapp;ship;google search;space shuttle;error;taylor swift;katy perry;jennifer lopez;rihanna;inna;i love google;kennedy;snoop dogg;casper;caillou;the jetsons;scooby doo;iron man;atari;instagram;wing chun;police;tintin;call of duty;robocop;terminator;everthrill;asterix;bart simpson;donald duck;daisy duck;mickey mouse;atom ant;yogi bear;boo boo;wile e. coyote;road runner;cedric;denver dinosaur;daffy duck;ghostbusters;heidi;speedy gonzales;red riding hood;the mask;e.t.;minecraft;killer clown;king kong;ariel;dora;rapunzel;sofia;black hole;halo;star ball;hot dog;piggie;blueberry;hamburger;moo;tomato;ghost;footprint;apple face;pineapple;toon;smile;sad;facepalm;brain;evil eye;ufo;spiderman2;shuttle;cs go;astronaut;rocket;rainbow1;boot;gold pot;hat;leprechaun;mr. bean1;meteor;alien1;space dog;choco egg;carrot;statue;rooster;rabbit;watermelon1;eye2;arcade;power;green man;slime face;jelly blob;alien x;space hunter;thirteen;crow;black cat;mask;witch;soccer ball;keeper;soccer boot;striker;star player;chihuahua;cactus;sombrero;chilli pepper;chupa cabra;earth day;april fool;gingerbread;cupcake;boy kiss;girl kiss;cupid;tender bear;funshine bear;bright raccoon;cozy penguin;lotsa elephant;brave lion;crazy ball;sky rocket;starsandstripes;mighty;uncle sam;mummy ball;eye ball;baseball smile;hornhead;skull face;cannon ball;eagle;sunbath;watermelon;star fish;icecream face;surfer;diver;liberty;birthday sanik;birthday wojak;birthday cia;birthday sir;birthday doge;birthday troll;birthday lol;hot coffee;soda can;jelly face;french fries;burger face;tortilha;chicken leg;tennis;gymnastic;judo fighter;swimmer;athletic;cake;leaf clover;blue;green;red;yellow;pinhata;alan;gordon;john;scott;the hood;sherbert;virgil;kayo;parrot;rascal;pirate maiden;captain skull;captain;bullseye;touche;jab;backswing;spike;flame;gamma;neila;omicron;vega;smyg;white horse;monk;water spirit;boar;kong;new basketball;bull king;inspectorgadget;richie rich;she-ra;snoopy;sylvester;tweety;popeye;transformers;terminita;sea explorer;jade dragon;golf;horse shoe;mico;monkey;ping pong;squiggly;toco;love;water drop;squirrel;acorn;maple;badger;prey;300 spartans;pine head;sea turtle;volcano;coco nuts;warrior;viper;biker;desert fox;ranger;devourer;toxic eater;ogre;scavenger;marauder;mutant;dead raider;undead;phantom;werewolf;mummy;vampire;masked;ooze;grey tiger;infernando;calavera;pumpkin;calaca;frankenstein;skeleton;poison rose;skull cactus;arachno kid;star girl;tiger man;dr. cosmos;infernando;iron knight;matjoy;n0psa;omega blast;sly;x-ray;aqua;dark matter;major eagle;colossus;ignis;terra;thanksgiving;pie slice;virginia;pilgrim;mr. pumpkin;aer;raider;faun;bread;croc;happy;hazmat;nuke;pug;berserker;champion;icy braid;jotun;viking;winter wolf;basilisk;firebird;dark wings;gryphon;magic gerbil;pixie;hobgoblin;root gnome;cosmo pirate;cyber guard;space warden;moon ship;star pilot;reindeer;penguin;polar bear;flying cork;happy soda;elf helper;santa claus;husky brawl;kempo tiger;street bull;rhino boxer;rogue bunny;bruiser goat;wicked cat;best friends;time dude;chrono ranger;time doctor;cool agent;neon bug;dynamite guy;duck target;jumper;bubblesaurus;kosovo;chicken;china dragon;fire rooster;carp;dumpling;bad boy;heartbreaker;poet;superstar;idol;rocker;virtuoso;drone;king;love arrow;choco heart;strawberry;sheriff;jade;thief;tiny jack;merry outlaw;trickster;bird mask;palm tree;samba;mountain;golden mask;icon;soloist;metal face;songsmith;diva;performer;dragon;gargoyle;gopher;blue swirl;bunny;evil master;ısland scar;sirius;tyt;behemoth;huntsman;war paint;general;giant skull;great zilla;bad clover;happy hat;horse boot;cat cauldron;excalibur;mystic bird;seal knight;air bag;cyber agent;detective;droid;funny face;gold rush;magic hat;red beard;smelly;frog thai;karate parrot;king lion;raccoon jutsu;coil;cool bunny;easter chick;wacky egg;destroyer;eyeball;storm fist;taurus;war hero;alien tree;crystal;hot taco;maracas;power badger;starfighter;crazy sombrero;primal;sabertooth;silver tusk;amber;fire face;gemini;stone tool;fallen;power girl;wacky hero;bat ball;eyepatch;jellyfish ball;mega power;sheep ball;skull ribbon;walrus ball;guy fawkes mask;apocalypse rider;eclipse hunter;universal ranger;elephant ball;pig ball;slaughter;slingblade;professional;lionel messi;tıtanıc;cyber scarab;haste;mechatron;psycho driller;sonic boom;zodiac cancer;celebration hat;mr. boss;star eagle;bitter;cursed blade;funky;gladiatrix;helm;hungry;lovesick;odd;orc grunt;orc warrior;queasy;reptilian;sad2;vicious;cool;full;mischievous;sweaty;tough;wicked;crazy brain;dry face;zombie dog;oyster;voltron;dumbo;archer;mage;paladin;rogue;tıtanıc;black hole;gold coin;super car;war tank;war wings;virgo;dazzled;delighted;hercules;medusa;nerdy;pixel kong;poseidon;power fighter;rabid;raid boss;rayday;scroll;silent fox;techno kid;the maw;zombie party;ınna;insectoid;olympus ares;zap;healing potion;irma hurricane;funny;dragon griffin;dragon hydra;dragon twin;Ä±sland scar;ajdar;cloud prism;cogs;football strike;nvr shadow;agar.lol;dr. static;steam freak;ankh;cleopatra;egyptian cat;pharaoh;ankh;anubis;cursed blade;elder master;geisha;hades;orc grunt;shogun;skull samurai;banshee;dragon viper;metal ghoul;psycho;balrog;blanka;chun lı;dhalsım;e.honda;guıle;ken;m.bıson;ryu;sagat;vega;zangıef;bean whistler;bolt samurai;mega mecha;spinner kid;power ninja;hmm;jason;snowboarder;white owl;goofy yeti;barbarian;dire wolf;frog Kid;frost giant;giant human;ımp;jackal;night hunter;nvr shuriken;sagittarius;salamander  ;leo;spark;walking hand;warlock;wendigo;wood elf;pepsi;agario.fun;agar.fun;burly man;firespitter;genie;ringmaster;the oracle;the gaunt;the miasma;the reaper;the scorcher;alpaca;aries;bullet man;capricorn;circus grizzly;libra;mad cap;raspy elf;scorpio;soul hunter;wicked clown;zany tree;devil;fire giant;little zilla;phoenix;purple dragon;sausage;snack shark;worm skull;red dragon;spooky;gouache;pencil;splatter;cave painting;cave troll;crazy eye;nice doggy;party mode;yeti;mr. bean face;circle;coolguy;duel master;furious;steam mask;robo kid;flying saucer;infernus;shadow man;big eyes;necktie cat;tea time;burner;candlelight;crazy bolt;eye five;future art;groovy canvas;hornet;sea wizard;spike flower;alien kid;bubble fish;cyber commando;elven noble;eternal snake;pyramid eye;reaper;snow biker;triceratops;wolf sigil;logan;supertank.io;slartie;chirpy raptor;frost hand;omega;radical smile;helmet;lead;wolf paw;idea;party time;skull bow;surprised cat;unicorn;bootlegger;madjawz;skull artifact;angel;deadly piranha;heavy metal;prankster;som theorist;wacky hyena;zone;birthday blob;death mouse;egyptian plague;grumpy frog;killer mask;cool lion;dark sorceress;princess swift;tooth troll;bad pigeon;bass bomb;feather dragon;lightning;merchant bionic;silly griffin;sugardash;ashwin;baby octopus;cyber demon;fallen one;goddess aona;golden axe;grandma;guinea pig;hunter leech;metal scorpion;midnight yeti;mutant herb;old one;olympus zeus;scarecrows;spike fish;techno ninja;zula gorgan;charming;cyber psychic;diamonds;dumboon;electro jelly;electronic girl;guardian;puzzled;strange;cursed samurai;fire golem;spectral owl;araneaphyx;necro strangler;neptunus spider;sinbad;blobby boy;dracool;frankie;chillpanzee;corsair;mad fragment;tape guy;think tank;cookie mouse;ice griffin;ironfist titus;nightmare;power mask;silent nun;space ink;space warrior;dapper dog;ice crystal;planet cat;bewitched;big banjo;masked menace;monday worker;of light;walrus art;pinkie pie;good morning;good bye;virus2;agar.love;candy troll;darts of fury;dynamite;getdeadkid;ısland seer;madness;squid;abductor;aquarius;astral deer;awkward;bad santa;beat box;beetoothven;bionic ram;birthosaur;blue skull;brute prankster;bull skull;cactus flower;candy genius;captain joe;cat burglar;cog attack;color runner;cosmic horse;crazy rudolph;cuppy;cyber monk;cyber punk;cybernaut;demonic helmet;divine pearl;dragon razor;dragon slayer;eager alien;egypt scarab;evil genie;forest spirit;fox mask;game host;gnome mage;golf battle;good boy;husky;hyper coffee;jelly bear;love cat;lucky doll;mad muffin;mariachi;mechanicat;melting man;mexican skull;moon alisa;mr goose;mummy king;murder ball;mushroom face;nutcracker;pepe loco;pisces;poker ace;power glove;psycho panda;punk;red fiend;rocket deer;rogue samurai;roller bot;sandworm;shrieker;skull magician;skull swords;sleepy fox;slime beast;smooth operator;snout;snowy joe;sour candy;spogh;steam diver;sunflower;suplex;techno quack;the stranger;tiny reaper;troldir;unknown totem;vampy;voracious;war mask;warhorse;wasted mouse;watson;wicked vendetta;wide eye;wilson;wolf man;yellow streak;demolition expert;awesome pug;coconuts;cool duck;crazy dog;cyclops;head ball 2;kristoffer;leviathan;mistik;odd shroom;purple hacker;rainbow slap;skull claus;snay;zone2;battle angel;jelly diver;songbird;tlingit mask;toco bones;bunny tron;carnivorous;chip cookie;clever;electro chick;meme rage;power2;titan cthulhu;bad bone;baddie;chilled homie;dog life;omnom gator;swag royalty;x-mas;ark raider;bad pepper;coronavirus;dollhouse;kobe;sonic;sweetie".split(";"),
                    hc = "8;nasa;kim jong-un;trump;queen;palin;fidel;hillary;berlusconi;blatter;boris;bush;cameron;chavez;clinton;cuba;venezuela;tsipras;putin;dilma;hollande;merkel;obama;aog;google;twitter;youtube;pirate1;alien;mr. bean;bruce lee;adolf hitler;chuck norris;gangnam style;pou;talking angela;talking tom;angry birds;barbie;schwarzenegger;barbıe;chucky;stallone;jeanclaudedamme;jackie chan;yip man;pierce brosnan;al pacino;hay day;pink panther;pinocchio;tom and jerry;bugs bunny;baby hazel;taz-mania;spiderman;fred and barney;russell crowe;jason statham;jim carrey;leonardo;batman;peter pan;beetle juice;superman;he-man;hulk;dracula;soccer;baseball;rainbow;pacman;baratheon;bart;beavis;brian;butthead;cartman;coca cola;creeper;death star;dirt block;dollar;donut;euro;eye of sauron;finn;forever alone;giraffe;girl;godzilla;google chrome;hello kitty;herobrine;hole;homer;ice king;jew;kirchner;lannister;lenny face;leopard;lgbt;marceline;marge;montgomery;pizza;pokemon;rockstar;sheep;skeleton1;steve;stewie;targaryen;tiger;zebra;zombie;jolokia pepper;troll;sungerbob;basketball;ınstagram;mona lisa;mario;erdogan;davutoglu;mortal kombat;mcdonald's;atarı;apple;army;banana;birdie;bite;bomb;bowling;breakfast;brofist;bug;candy;cat;cloud;cookie;crazy;dog;donuts;evil;eye;frog;goldfish;halloween;heart;hockey;ıce king;luchador;monster;mouse;mushroom;nose;nuclear;octopus;owl;panda;radar;scarecrow;seal;snowman;spy;target;terrible;toxic;turtle;;virus;wolf;polıce;pirate;bubblegum;enderman;heisenberg;jake;lisa;peter;kirby;awesome;ı love google;anna frozen;cinderella;elsa;counter-strike;frogout;gaston;blobfish;luigi;mr. popo;spongegar;spurdo;stitch;garfield;ıron man;ninja turtles;joker;saw;santa claus1;christmas tree;kendall draeger;bat;bear;cougar;coyote;crocodile;fly;fox;hunter;kraken;lion;lizard;mammoth;master chief;panther;raptor;shark;shrek;snake;spider;sumo;t-rex;wasp;bonibon;jelibon;smurfs;eye illusions;airplane;helicopter;train;whatsapp;ship;google search;space shuttle;error;taylor swift;katy perry;jennifer lopez;rihanna;inna;i love google;kennedy;snoop dogg;casper;caillou;the jetsons;scooby doo;iron man;atari;instagram;wing chun;police;tintin;call of duty;robocop;terminator;everthrill;asterix;bart simpson;donald duck;daisy duck;mickey mouse;atom ant;yogi bear;boo boo;wile e. coyote;road runner;cedric;denver dinosaur;daffy duck;ghostbusters;heidi;speedy gonzales;red riding hood;the mask;e.t.;minecraft;killer clown;king kong;ariel;dora;rapunzel;sofia;halo;star ball;hot dog;piggie;blueberry;hamburger;moo;smile;tomato;ghost;footprint;apple face;pineapple;toon;sad;facepalm;brain;evil eye;ufo;spiderman2;shuttle;cs go;astronaut;rocket;rainbow1;boot;gold pot;hat;leprechaun;mr. bean1;meteor;alien1;space dog;choco egg;carrot;statue;rooster;rabbit;watermelon1;eye2;arcade;power;green man;slime face;jelly blob;alien x;space hunter;thirteen;crow;black cat;mask;witch;soccer ball;keeper;soccer boot;striker;star player;chihuahua;cactus;sombrero;chilli pepper;chupa cabra;earth day;april fool;gingerbread;cupcake;boy kiss;girl kiss;cupid;tender bear;funshine bear;bright raccoon;cozy penguin;lotsa elephant;brave lion;crazy ball;sky rocket;starsandstripes;mighty;uncle sam;mummy ball;eye ball;baseball smile;hornhead;skull face;cannon ball;eagle;sunbath;watermelon;star fish;icecream face;surfer;diver;liberty;birthday sanik;birthday wojak;birthday cia;birthday sir;birthday doge;birthday troll;birthday lol;hot coffee;soda can;jelly face;french fries;burger face;tortilha;chicken leg;;tennis;gymnastic;judo fighter;swimmer;athletic;cake;leaf clover;blue;green;red;yellow;pinhata;alan;gordon;john;scott;the hood;sherbert;virgil;kayo;parrot;rascal;pirate maiden;captain skull;captain;bullseye;touche;jab;backswing;spike;flame;gamma;neila;omicron;vega;smyg;white horse;monk;water spirit;boar;kong;new basketball;bull king;inspectorgadget;richie rich;she-ra;snoopy;sylvester;tweety;popeye;transformers;terminita;sea explorer;jade dragon;golf;horse shoe;mico;monkey;ping pong;squiggly;toco;love;water drop;squirrel;acorn;maple;badger;prey;300 spartans;pine head;sea turtle;volcano;coco nuts;warrior;viper;biker;desert fox;ranger;devourer;toxic eater;ogre;scavenger;marauder;mutant;dead raider;undead;phantom;werewolf;mummy;vampire;masked;ooze;grey tiger;infernando;calavera;pumpkin;calaca;frankenstein;skeleton;poison rose;skull cactus;arachno kid;star girl;tiger man;dr. cosmos;infernando;iron knight;matjoy;n0psa;omega blast;sly;x-ray;aqua;dark matter;major eagle;colossus;ignis;terra;thanksgiving;pie slice;virginia;pilgrim;mr. pumpkin;aer;raider;faun;bread;croc;happy;hazmat;nuke;pug;berserker;champion;icy braid;jotun;viking;winter wolf;basilisk;firebird;dark wings;gryphon;magic gerbil;pixie;hobgoblin;root gnome;cosmo pirate;cyber guard;space warden;moon ship;star pilot;reindeer;penguin;polar bear;flying cork;happy soda;elf helper;santa claus;husky brawl;kempo tiger;street bull;rhino boxer;rogue bunny;bruiser goat;wicked cat;best friends;time dude;chrono ranger;time doctor;cool agent;neon bug;dynamite guy;duck target;jumper;bubblesaurus;chicken;china dragon;fire rooster;carp;dumpling;;bad boy;heartbreaker;poet;superstar;idol;rocker;virtuoso;drone;king;love arrow;choco heart;strawberry;sheriff;jade;thief;tiny jack;merry outlaw;trickster;bird mask;palm tree;samba;mountain;golden mask;icon;soloist;metal face;songsmith;diva;performer;dragon;gargoyle;gopher;blue swirl;bunny;evil master;ısland scar;sirius;tyt;behemoth;huntsman;war paint;general;giant skull;great zilla;bad clover;happy hat;horse boot;cat cauldron;excalibur;mystic bird;seal knight;air bag;cyber agent;detective;droid;funny face;gold rush;magic hat;red beard;smelly;frog thai;karate parrot;king lion;raccoon jutsu;coil;cool bunny;easter chick;wacky egg;destroyer;eyeball;storm fist;taurus;war hero;alien tree;crystal;hot taco;maracas;power badger;starfighter;crazy sombrero;primal;sabertooth;silver tusk;amber;fire face;gemini;stone tool;fallen;power girl;wacky hero;bat ball;eyepatch;jellyfish ball;mega power;sheep ball;skull ribbon;walrus ball;guy fawkes mask;rider;eclipse hunter;universal ranger;elephant ball;pig ball;slaughter;slingblade;professional;lionel messi;tıtanıc;cyber scarab;haste;mechatron;psycho driller;sonic boom;zodiac cancer;celebration hat;mr. boss;star eagle;bitter;cursed blade;funky;gladiatrix;helm;hungry;lovesick;odd;orc grunt;orc warrior;queasy;reptilian;sad2;vicious;cool;full;mischievous;sweaty;tough;wicked;crazy brain;dry face;zombie dog;oyster;voltron;dumbo;archer;mage;paladin;rogue;tıtanıc;black hole;gold coin;super car;war tank;war wings;virgo;dazzled;delighted;hercules;medusa;nerdy;pixel kong;poseidon;power fighter;rabid;raid boss;rayday;scroll;silent fox;techno kid;the maw;zombie party;ınna;insectoid;olympus ares;zap;healing potion;irma hurricane;funny;dragon griffin;dragon hydra;dragon twin;Ä±sland scar;ajdar;cloud prism;cogs;football strike;nvr shadow;agar.lol;dr. static;steam freakankh;cleopatra;egyptian cat;pharaoh;ankh;anubis;cursed blade;elder master;geisha;hades;orc grunt;shogun;skull samurai;banshee;dragon viper;metal ghoul;psycho;balrog;blanka;chun lı;dhalsım;e.honda;guıle;ken;m.bıson;ryu;sagat;vega;zangıef;bean whistler;bolt samurai;mega mecha;spinner kid;power ninja;hmm;jason;snowboarder;white owl;goofy yeti;barbarian;dire wolf;frog Kid;frost giant;giant human;ımp;jackal;night hunter;nvr shuriken;sagittarius;salamander  ;leo;spark;walking hand;warlock;wendigo;wood elf;pepsi;agario.fun;agar.fun;burly man;firespitter;genie;ringmaster;the oracle;the gaunt;the miasma;the reaper;the scorcher;alpaca;aries;bullet man;capricorn;circus grizzly;libra;mad cap;raspy elf;scorpio;soul hunter;wicked clown;zany tree;devil;fire giant;little zilla;phoenix;purple dragon;sausage;snack shark;worm skull;red dragon;spooky;gouache;pencil;splatter;cave painting;cave troll;crazy eye;nice doggy;party mode;yeti;mr. bean face;circle;coolguy;duel master;furious;steam mask;robo kid;flying saucer;infernus;shadow man;big eyes;necktie cat;tea time;burner;candlelight;crazy bolt;eye five;future art;groovy canvas;hornet;sea wizard;spike flower;alien kid;bubble fish;cyber commando;elven noble;eternal snake;pyramid eye;reaper;snow biker;triceratops;wolf sigil;logan;supertank.io;slartie;chirpy raptor;frost hand;omega;radical smile;helmet;lead;wolf paw;idea;party time;skull bow;surprised cat;unicorn;bootlegger;madjawz;skull artifact;angel;deadly piranha;heavy metal;prankster;som theorist;wacky hyena;zone;birthday blob;death mouse;egyptian plague;grumpy frog;killer mask;cool lion;dark sorceress;princess swift;tooth troll;bad pigeon;bass bomb;feather dragon;lightning;merchant bionic;silly griffin;sugardash;ashwin;baby octopus;cyber demon;fallen one;goddess aona;golden axe;grandma;guinea pig;hunter leech;metal scorpion;midnight yeti;mutant herb;old one;olympus zeus;scarecrows;spike fish;techno ninja;zula gorgan;charming;cyber psychic;diamonds;dumboon;electro jelly;electronic girl;guardian;puzzled;strange;cursed samurai;fire golem;spectral owl;araneaphyx;necro strangler;neptunus spider;sinbad;blobby boy;dracool;frankie;chillpanzee;corsair;mad fragment;tape guy;think tank;cookie mouse;ice griffin;ironfist titus;nightmare;power mask;silent nun;space ink;space warrior;dapper dog;ice crystal;planet cat;bewitched;big banjo;masked menace;monday worker;of light;walrus art;pinkie pie;good morning;good bye;virus2;agar.love;candy troll;darts of fury;dynamite;getdeadkid;ısland seer;madness;squid;abductor;aquarius;astral deer;awkward;bad santa;beat box;beetoothven;bionic ram;birthosaur;blue skull;brute prankster;bull skull;cactus flower;candy genius;captain joe;cat burglar;cog attack;color runner;cosmic horse;crazy rudolph;cuppy;cyber monk;cyber punk;cybernaut;demonic helmet;divine pearl;dragon razor;dragon slayer;eager alien;egypt scarab;evil genie;forest spirit;fox mask;game host;gnome mage;golf battle;good boy;husky;hyper coffee;jelly bear;love cat;lucky doll;mad muffin;mariachi;mechanicat;melting man;mexican skull;moon alisa;mr goose;mummy king;murder ball;mushroom face;nutcracker;pepe loco;pisces;poker ace;power glove;psycho panda;punk;red fiend;rocket deer;rogue samurai;roller bot;sandworm;shrieker;skull magician;skull swords;sleepy fox;slime beast;smooth operator;snout;snowy joe;sour candy;spogh;steam diver;sunflower;suplex;techno quack;the stranger;tiny reaper;troldir;unknown totem;vampy;voracious;war mask;warhorse;wasted mouse;watson;wicked vendetta;wide eye;wilson;wolf man;yellow streak;demolition expert;awesome pug;coconuts;cool duck;crazy dog;cyclops;head ball 2;kristoffer;leviathan;mistik;odd shroom;purple hacker;rainbow slap;skull claus;snay;zone2;battle angel;jelly diver;songbird;tlingit mask;toco bones;bunny tron;carnivorous;chip cookie;clever;electro chick;meme rage;power2;titan cthulhu;bad bone;baddie;chilled homie;dog life;omnom gator;swag royalty;x-mas;ark raider;bad pepper;coronavirus;dollhouse;kobe;sonic;sweetie".split(";"),
                    ba = {};
                $a.prototype = {
                    P: null,
                    x: 0,
                    y: 0,
                    g: 0,
                    b: 0
                };
                Z.prototype = {
                    id: 0,
                    a: null,
                    name: null,
                    k: null,
                    I: null,
                    x: 0,
                    y: 0,
                    size: 0,
                    o: 0,
                    p: 0,
                    n: 0,
                    C: 0,
                    D: 0,
                    m: 0,
                    T: 0,
                    K: 0,
                    W: 0,
                    A: !1,
                    f: !1,
                    j: !1,
                    L: !0,
                    S: 0,
                    V: null,
                    R: function() {
                        var a;
                        for (a = 0; a < v.length; a++)
                            if (v[a] == this) {
                                v.splice(a, 1);
                                break
                            }
                        delete J[this.id];
                        a = l.indexOf(this); - 1 != a && (Ra = !0, l.splice(a, 1));
                        a = z.indexOf(this.id); - 1 != a && z.splice(a, 1);
                        this.A = !0;
                        0 < this.S && X.push(this)
                    },
                    i: function() {
                        return Math.max(~~(.3 * this.size), 24)
                    },
                    t: function(a) {
                        if (this.name = a) null == this.k ? this.k = new Da(this.i(), "#FFFFFF", !0, "#000000") : this.k.G(this.i()), this.k.u(this.name)
                    },
                    Q: function() {
                        for (var a = this.B(); this.a.length > a;) {
                            var b = ~~(Math.random() * this.a.length);
                            this.a.splice(b, 1)
                        }
                        for (0 == this.a.length && 0 < a && this.a.push(new $a(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < a;) b = ~~(Math.random() * this.a.length), b = this.a[b], this.a.push(new $a(this, b.x, b.y, b.g, b.b))
                    },
                    B: function() {
                        var a = 10;
                        20 > this.size && (a = 0);
                        this.f && (a = 30);
                        var b = this.size;
                        this.f || (b *= g);
                        b *= G;
                        this.T & 32 && (b *= .25);
                        return ~~Math.max(b, a)
                    },
                    da: function() {
                        this.Q();
                        for (var a = this.a, b = a.length, c = 0; c < b; ++c) {
                            var d = a[(c - 1 + b) % b].b,
                                e = a[(c + 1) % b].b;
                            a[c].b += (Math.random() - .5) * (this.j ? 3 : 1);
                            a[c].b *= .7;
                            10 < a[c].b && (a[c].b = 10); - 10 > a[c].b && (a[c].b = -10);
                            a[c].b = (d + e + 8 * a[c].b) / 10
                        }
                        for (var f = this, l = this.f ? 0 : (this.id / 1E3 + F / 1E4) % (2 * Math.PI), c = 0; c < b; ++c) {
                            var k = a[c].g,
                                d = a[(c - 1 + b) % b].g,
                                e = a[(c + 1) % b].g;
                            if (15 < this.size && null != da && 20 < this.size * g && 0 < this.id) {
                                var h = !1,
                                    m = a[c].x,
                                    K = a[c].y;
                                da.ea(m - 5, K - 5, 10, 10, function(a) {
                                    a.P != f && 25 > (m - a.x) * (m - a.x) + (K - a.y) * (K - a.y) && (h = !0)
                                });
                                !h && (a[c].x < xa || a[c].y < ya || a[c].x > za || a[c].y > Aa) && (h = !0);
                                h && (0 < a[c].b && (a[c].b = 0), a[c].b -= 1)
                            }
                            k += a[c].b;
                            0 > k && (k = 0);
                            k = this.j ? (19 * k + this.size) / 20 : (12 * k + this.size) / 13;
                            a[c].g = (d + e + 8 * k) / 10;
                            d = 2 * Math.PI / b;
                            e = this.a[c].g;
                            this.f && 0 == c % 2 && (e += 5);
                            a[c].x = this.x + Math.cos(d * c + l) * e;
                            a[c].y = this.y + Math.sin(d * c + l) * e
                        }
                    },
                    J: function() {
                        if (0 >= this.id) return 1;
                        var a;
                        a = (F - this.K) / 120;
                        a = 0 > a ? 0 : 1 < a ? 1 : a;
                        var b = 0 > a ? 0 : 1 < a ? 1 : a;
                        this.i();
                        if (this.A && 1 <= b) {
                            var c = X.indexOf(this); - 1 != c && X.splice(c, 1)
                        }
                        this.x = a * (this.C - this.o) + this.o;
                        this.y = a * (this.D - this.p) + this.p;
                        this.size = b * (this.m - this.n) + this.n;
                        return b
                    },
                    H: function() {
                        return 0 >= this.id ? !0 : this.x + this.size + 40 < t - h / 2 / g || this.y + this.size + 40 < u - q / 2 / g || this.x - this.size - 40 > t + h / 2 / g || this.y - this.size - 40 > u + q / 2 / g ? !1 : !0
                    },
                    s: function(a) {
                        if (this.H()) {
                            ++this.S;
                            var b = 0 < this.id && !this.f && !this.j && .4 > g;
                            5 > this.B() && 0 < this.id && (b = !0);
                            if (this.L && !b)
                                for (var c = 0; c < this.a.length; c++) this.a[c].g = this.size;
                            this.L = b;
                            a.save();
                            this.W = F;
                            c = this.J();
                            this.A && (a.globalAlpha *= 1 - c);
                            a.lineWidth = 10;
                            a.lineCap = "round";
                            a.lineJoin = this.f ? "miter" : "round";
                            db ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = this.color, a.strokeStyle = this.color);
                            if (b) a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, !1);
                            else {
                                this.da();
                                a.beginPath();
                                var d = this.B();
                                a.moveTo(this.a[0].x, this.a[0].y);
                                for (c = 1; c <= d; ++c) {
                                    var e = c % d;
                                    a.lineTo(this.a[e].x, this.a[e].y)
                                }
                            }
                            a.closePath();
                            c = this.name.toLowerCase();
                            !this.j && Hb && ":teams" != W ? (d = this.V, null == d ? d = null : ":" == d[0] ? (ba.hasOwnProperty(d) || (ba[d] = new Image, ba[d].src = d.slice(1)), d = 0 != ba[d].width && ba[d].complete ? ba[d] : null) : d = null, d || (-1 != Lb.indexOf(c) ? (aa.hasOwnProperty(c) || (aa[c] = new Image, aa[c].src = "\x73\x6b\x69\x6e\x73\x2f\x6c\x6f\x6c\x2f" + c + ".png"), d = 0 != aa[c].width && aa[c].complete ? aa[c] : null) : d = null)) : d = null;
                            e = d;
                            b || a.stroke();
                            a.fill();
                            null != e && (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
                            (db || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                            a.globalAlpha = 1;
                            d = -1 != l.indexOf(this);
                            b = ~~this.y;
                            if (0 != this.id && (Ea || d) && this.name && this.k && (null == e || -1 == hc.indexOf(c))) {
                                e = this.k;
                                e.u(this.name);
                                e.G(this.i());
                                c = 0 >= this.id ? 1 : Math.ceil(10 * g) / 10;
                                e.U(c);
                                var e = e.F(),
                                    f = ~~(e.width / c),
                                    h = ~~(e.height / c);
                                a.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(h / 2), f, h);
                                b += e.height / 2 / c + 4
                            }
                            0 < this.id && Ib && (d || 0 == l.length && (!this.f || this.j) && 20 < this.size) && (null == this.I && (this.I = new Da(this.i() / 2, "#FFFFFF", !0, "#000000")), d = this.I, d.G(this.i() / 2), d.u(~~(this.size * this.size / 100)), c = Math.ceil(10 * g) / 10, d.U(c), e = d.F(), f = ~~(e.width / c), h = ~~(e.height / c), a.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(h / 2), f, h));
                            a.restore()
                        }
                    }
                };
                Da.prototype = {
                    w: "",
                    M: "#000000",
                    O: !1,
                    r: "#000000",
                    q: 16,
                    l: null,
                    N: null,
                    h: !1,
                    v: 1,
                    G: function(a) {
                        this.q != a && (this.q = a, this.h = !0)
                    },
                    U: function(a) {
                        this.v != a && (this.v = a, this.h = !0)
                    },
                    setStrokeColor: function(a) {
                        this.r != a && (this.r = a, this.h = !0)
                    },
                    u: function(a) {
                        a != this.w && (this.w = a, this.h = !0)
                    },
                    F: function() {
                        null == this.l && (this.l = document.createElement("canvas"), this.N = this.l.getContext("2d"));
                        if (this.h) {
                            this.h = !1;
                            var a = this.l,
                                b = this.N,
                                c = this.w,
                                d = this.v,
                                e = this.q,
                                f = e + "px Ubuntu";
                            b.font = f;
                            var g = ~~(.2 * e);
                            a.width = (b.measureText(c).width + 6) * d;
                            a.height = (e + g) * d;
                            b.font = f;
                            b.scale(d, d);
                            b.globalAlpha = 1;
                            b.lineWidth = 3;
                            b.strokeStyle = this.r;
                            b.fillStyle = this.M;
                            this.O && b.strokeText(c, 3, e - g / 2);
                            b.fillText(c, 3, e - g / 2)
                        }
                        return this.l
                    }
                };
                Date.now || (Date.now = function() {
                    return (new Date).getTime()
                });
                (function() {
                    for (var a = ["ms", "moz", "webkit", "o"], b = 0; b < a.length && !d.requestAnimationFrame; ++b) d.requestAnimationFrame = d[a[b] + "RequestAnimationFrame"], d.cancelAnimationFrame = d[a[b] + "CancelAnimationFrame"] || d[a[b] + "CancelRequestAnimationFrame"];
                    d.requestAnimationFrame || (d.requestAnimationFrame = function(a) {
                        return setTimeout(a, 1E3 / 60)
                    }, d.cancelAnimationFrame = function(a) {
                        clearTimeout(a)
                    })
                })();
                var Ob = {
                        X: function(a) {
                            function b(a) {
                                a < d && (a = d);
                                a > f && (a = f);
                                return ~~((a - d) / 32)
                            }

                            function c(a) {
                                a < e && (a = e);
                                a > g && (a = g);
                                return ~~((a - e) / 32)
                            }
                            var d = a.ba,
                                e = a.ca,
                                f = a.Z,
                                g = a.$,
                                k = ~~((f - d) / 32) + 1,
                                h = ~~((g - e) / 32) + 1,
                                m = Array(k * h);
                            return {
                                Y: function(a) {
                                    var d = b(a.x) + c(a.y) * k;
                                    null == m[d] ? m[d] = a : Array.isArray(m[d]) ? m[d].push(a) : m[d] = [m[d], a]
                                },
                                ea: function(a, d, e, f, g) {
                                    var n = b(a),
                                        p = c(d);
                                    a = b(a + e);
                                    d = c(d + f);
                                    if (0 > n || n >= k || 0 > p || p >= h) debugger;
                                    for (; p <= d; ++p)
                                        for (f = n; f <= a; ++f)
                                            if (e = m[f + p * k], null != e)
                                                if (Array.isArray(e))
                                                    for (var l = 0; l < e.length; l++) g(e[l]);
                                                else g(e)
                                }
                            }
                        }
                    },
                    sb = function() {
                        var a = new Z(0, 0, 0, 32, "#ED1C24", ""),
                            b = document.createElement("canvas");
                        b.width = 32;
                        b.height = 32;
                        var c = b.getContext("2d");
                        return function() {
                            0 < l.length && (a.color = l[0].color, a.t(l[0].name));
                            c.clearRect(0, 0, 32, 32);
                            c.save();
                            c.translate(16, 16);
                            c.scale(.4, .4);
                            a.s(c);
                            c.restore();
                            var d = document.getElementById("favicon"),
                                e = d.cloneNode(!0);
                            e.setAttribute("href", b.toDataURL("image/png"));
                            d.parentNode.replaceChild(e, d)
                        }
                    }();
                e(function() {
                    sb()
                });
                var U = "loginCache3";
                e(function() {
                    +d.localStorage.wannaLogin && (d.localStorage[U] && Fb(d.localStorage[U]), d.localStorage.fbPictureCache && e(".agario-profile-picture").attr("src", d.localStorage.fbPictureCache))
                });
                d.facebookLogin = function() {
                    d.localStorage.wannaLogin = 1
                };
                d.fbAsyncInit = function() {
                    function a() {
                        d.localStorage.wannaLogin = 1;
                        null == d.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : d.FB.login(function(a) {
                            ab(a)
                        }, {
                            scope: "public_profile, email"
                        })
                    }
                    d.FB.init({
                        appId: "1023344604389308",
                        cookie: !0,
                        xfbml: !0,
                        status: !0,
                        version: "v2.2"
                    });
                    d.FB.Event.subscribe("auth.statusChange", function(b) {
                        +d.localStorage.wannaLogin && ("connected" == b.status ? ab(b) : a())
                    });
                    d.facebookLogin = a
                };
                d.logout = function() {
                    D = null;
                    e("#helloContainer").attr("data-logged-in", "0");
                    e("#helloContainer").attr("data-has-account-data", "0");
                    delete d.localStorage.wannaLogin;
                    delete d.localStorage[U];
                    delete d.localStorage.fbPictureCache;
                    M()
                };
                var gc = function() {
                    function a(a, b, c, d, e) {
                        var f = b.getContext("2d"),
                            g = b.width;
                        b = b.height;
                        a.color = e;
                        a.t(c);
                        a.size = d;
                        f.save();
                        f.translate(g / 2, b / 2);
                        a.s(f);
                        f.restore()
                    }
                    for (var b = new Z(-1, 0, 0, 32, "#5bc0de", ""), c = new Z(-1, 0, 0, 32, "#5bc0de", ""), d = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "), f = [], g = 0; g < d.length; ++g) {
                        var h = g / d.length * 12,
                            k = 30 * Math.sqrt(g / d.length);
                        f.push(new Z(-1, Math.cos(h) * k, Math.sin(h) * k, 10, d[g], ""))
                    }
                    dc(f);
                    var l = document.createElement("canvas");
                    l.getContext("2d");
                    l.width = l.height = 70;
                    a(c, l, "", 26, "#ebc0de");
                    return function() {
                        e(".cell-spinner").filter(":visible").each(function() {
                            var c = e(this),
                                d = Date.now(),
                                f = this.width,
                                g = this.height,
                                h = this.getContext("2d");
                            h.clearRect(0, 0, f, g);
                            h.save();
                            h.translate(f / 2, g / 2);
                            for (var k = 0; 10 > k; ++k) h.drawImage(l, (.1 * d + 80 * k) % (f + 140) - f / 2 - 70 - 35, g / 2 * Math.sin((.001 * d + k) % Math.PI * 2) - 35, 70, 70);
                            h.restore();
                            (c = c.attr("data-itr")) && (c = ha(c));
                            a(b, this, c || "", +e(this).attr("data-size"), "#5bc0de")
                        });
                        e("#statsPellets").filter(":visible").each(function() {
                            e(this);
                            var b = this.width,
                                c = this.height;
                            this.getContext("2d").clearRect(0, 0, b, c);
                            for (b = 0; b < f.length; b++) a(f[b], this, "", f[b].size, f[b].color)
                        })
                    }
                }();
                d.createParty = function() {
                    ga(":party");
                    O = function(a) {
                        bb("/#" + d.encodeURIComponent(a));
                        e(".partyToken").val("//agario.fun/" + d.encodeURIComponent(a));
                        e("#helloContainer").attr("data-party-state", "1")
                    };
                    M()
                };
                d.joinParty = kb;
                d.cancelParty = function() {
                    bb("index.html");
                    e("#helloContainer").attr("data-party-state", "0");
                    ga("");
                    M()
                };
                var x = [],
                    Sa = 0,
                    Ta = "#000000",
                    V = !1,
                    Ua = !1,
                    tb = 0,
                    ub = 0,
                    Wa = 0,
                    Va = 0,
                    T = 0,
                    vb = !0;
                setInterval(function() {
                    Ua && x.push(Cb() / 100)
                }, 1E3 / 60);
                setInterval(function() {
                    var a = fc();
                    0 != a && (++Wa, 0 == T && (T = a), T = Math.min(T, a))
                }, 1E3);
                d.closeStats = function() {
                    V = !1;
                    e("#stats").hide();
                    mb(d.ab);
                    pa(0);
                };
                d.setSkipStats = function(a) {
                    vb = !a
                };
                e(function() {
                    e(Mb)
                })
            }
        }
    }
})(window, window.jQuery);