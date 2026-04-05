(function(d, e) {
    function initializeClient() {
        Ga = !0;
        L = Ha = document.getElementById("canvas");
        f = L.getContext("2d");
        L.onmousedown = function(a) {
            if (spectateInputEnabled && 0 == playerCells.length) return;
            if (fb) {
                var b = a.clientX - (5 + viewportWidth / 5 / 2),
                    c = a.clientY - (5 + viewportWidth / 5 / 2);
                if (Math.sqrt(b * b + c * c) <= viewportWidth / 5 / 2) {
                    sendMousePosition();
                    sendActionOpcode(17);
                    return
                }
            }
            mouseScreenX = 1 * a.clientX;
            mouseScreenY = 1 * a.clientY;
            updateMouseWorldTarget();
            sendMousePosition()
        };
        L.onmousemove = function(a) {
            if (spectateInputEnabled && 0 == playerCells.length) return;
            mouseScreenX = 1 * a.clientX;
            mouseScreenY = 1 * a.clientY;
            updateMouseWorldTarget()
        };
        L.onmouseup = function() {};
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", handleZoomScroll, !1) : document.body.onmousewheel = handleZoomScroll;
        var a = !1,
            b = !1,
            c = !1;
        d.onkeydown = function(n) {
            32 != n.keyCode || a || (sendMousePosition(), sendActionOpcode(17), a = !0);
            81 != n.keyCode || b || (sendActionOpcode(18), b = !0);
            if (87 == n.keyCode) {
                spectateMoveUp = !0;
                spectateInputEnabled && 0 == playerCells.length ? sendMousePosition() : c || (sendMousePosition(), sendActionOpcode(21), c = !0)
            }
            65 == n.keyCode && (spectateMoveLeft = !0, spectateInputEnabled && 0 == playerCells.length && sendMousePosition());
            83 == n.keyCode && (spectateMoveDown = !0, spectateInputEnabled && 0 == playerCells.length && sendMousePosition());
            68 == n.keyCode && (spectateMoveRight = !0, spectateInputEnabled && 0 == playerCells.length && sendMousePosition());
            27 == n.keyCode && showMainMenu(300)
        };
        d.onkeyup = function(n) {
            32 == n.keyCode && (a = !1);
            87 == n.keyCode && (spectateMoveUp = !1, c = !1);
            65 == n.keyCode && (spectateMoveLeft = !1);
            83 == n.keyCode && (spectateMoveDown = !1);
            68 == n.keyCode && (spectateMoveRight = !1);
            81 == n.keyCode && b && (sendActionOpcode(19), b = !1)
        };
        d.onblur = function() {
            sendActionOpcode(19);
            spectateMoveUp = !1;
            spectateMoveLeft = !1;
            spectateMoveDown = !1;
            spectateMoveRight = !1;
            c = b = a = !1
        };
        d.onresize = handleWindowResize;
        d.requestAnimationFrame(mainAnimationLoop);
        setInterval(sendMousePosition, 20);
        setRegionSelection("EU-London");
        showMainMenu(0);
        handleWindowResize();
        d.location.hash && 6 <= d.location.hash.length && joinPartyByHash(d.location.hash)
    }

    function handleZoomScroll(a) {
        var b = a.wheelDelta / -120 || a.detail || 0;
        if (spectateInputEnabled && 0 == playerCells.length && isSocketOpen() && 0 != b) {
            for (var c = Math.max(1, Math.round(Math.abs(b))), n = 0; n < c; n++) sendActionOpcode(0 > b ? 22 : 23);
            a.preventDefault && a.preventDefault();
            return !1
        }
        // Apply exponential zoom steps so wheel input feels consistent across devices.
        N *= Math.pow(.9, b);
        1 > N && (N = 1);
        N > 4 / g && (N = 4 / g)
    }

    function applySpectateKeyboardTarget() {
        var a = (spectateMoveRight ? 1 : 0) - (spectateMoveLeft ? 1 : 0),
            b = (spectateMoveDown ? 1 : 0) - (spectateMoveUp ? 1 : 0);
        if (0 == a && 0 == b) {
            mouseWorldTargetX = cameraX;
            mouseWorldTargetY = cameraY;
            return !1
        }
        var c = Math.sqrt(a * a + b * b);
        a /= c;
        b /= c;
        c = 1E4 / Math.max(g, .01);
        mouseWorldTargetX = cameraX + a * c;
        mouseWorldTargetY = cameraY + b * c;
        return !0
    }

    function rebuildSpatialIndex() {
        if (.4 > g) da = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, n = Number.NEGATIVE_INFINITY, d = 0; d < allCells.length; d++) {
                var e = allCells[d];
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
            for (d = 0; d < allCells.length; d++)
                if (e = allCells[d], e.H() && !(20 >= e.size * g))
                    for (a = 0; a < e.a.length; ++a) b = e.a[a].x, c = e.a[a].y, b < cameraX - viewportWidth / 2 / g || c < cameraY - viewportHeight / 2 / g || b > cameraX + viewportWidth / 2 / g || c > cameraY + viewportHeight / 2 / g || da.Y(e.a[a])
        }
    }

    function updateMouseWorldTarget() {
        mouseWorldTargetX = (mouseScreenX - viewportWidth / 2) / g + cameraX;
        mouseWorldTargetY = (mouseScreenY - viewportHeight / 2) / g + cameraY
    }

    function hideMainPanels() {
        e("#overlays").hide();
        e("#stats").hide();
        e("#mainPanel").hide();
        V = fa = !1;
    }

    function setRegionSelection(a) {
        a && a != y && ("EU-London" != a && e("#region").val(a), y = d.localStorage.location = a, e(".region-message").hide(), e(".region-message." + a).show(), e(".btn-needs-server").prop("disabled", !1))
    }

    function showMainMenu(a) {
        fa || V || (I = null, isFirstMenuOpen || null, isFirstMenuOpen = !1, 1E3 > a && (s = 1), fa = !0, e("#mainPanel").show(), 0 < a ? e("#overlays").fadeIn(a) : e("#overlays").show())
    }

    function setGameModeUiState(a) {
        e("#helloContainer").attr("data-gamemode", a);
        W = a;
        e("#gamemode").val(a)
    }

    function translateKey(a) {
        return d.i18n[a] || d.i18n_dict.en[a] || a
    }

    function startConnectionFlow() {
        var a = ++connectionAttemptId;
        if (W == "") W = "ws://127.0.0.1:8080";
        a == connectionAttemptId && connectToServer(0);
    }

    function connectIfReady() {
        Ga && y && (e("#connecting").show(), startConnectionFlow())
    }

    function connectToServer(b) {
        b = "string" == typeof b ? b : "";
        let a = "ws://127.0.0.1:8080";
        if (!["", null].includes(e("#region").val())) {
            a = e("#region").val();
        }
        if (gameSocket) {
            gameSocket.onopen = null;
            gameSocket.onmessage = null;
            gameSocket.onclose = null;
            try {
                gameSocket.close()
            } catch (c) {}
            gameSocket = null
        }
        Na.ip && (a = "ws://" + Na.ip);
        if (null != O) {
            var n = O;
            O = function() {
                n(b)
            }
        }
        playerCellIds = [];
        playerCells = [];
        cellsById = {};
        allCells = [];
        fadingCells = [];
        w = [];
        A = B = null;
        resetTeamMassGraphHistory();
        P = 0;
        ia = !1;
        console.log("Connecting to " + a);
        gameSocket = new WebSocket(a);
        gameSocket.binaryType = "arraybuffer";
        gameSocket.onopen = function() {
            var a;
            console.log("socket open");
            a = createPacketView(5);
            a.setUint8(0, 254);
            a.setUint32(1, 5, !0);
            sendPacket(a);
            a = createPacketView(5);
            a.setUint8(0, 255);
            a.setUint32(1, 154669603, !0);
            sendPacket(a);
            a = createPacketView(1 + b.length);
            a.setUint8(0, 80);
            for (var c = 0; c < b.length; ++c) a.setUint8(c + 1, b.charCodeAt(c));
            sendPacket(a);
            sendAuthTokenIfAvailable()
        };
        gameSocket.onmessage = handleSocketMessageEvent;
        gameSocket.onclose = handleSocketClosed;
        gameSocket.onerror = function() {
            console.log("socket error")
        }
    }

    function createPacketView(a) {
        return new DataView(new ArrayBuffer(a))
    }

    function sendPacket(a) {
        gameSocket.send(a.buffer)
    }

    function handleSocketClosed() {
        console.log("socket close");
        showMainMenu(0);
    }

    function handleSocketMessageEvent(a) {
        parseServerPacket(new DataView(a.data))
    }

    function parseServerPacket(a) {
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
                handleWorldUpdatePacket(a, c);
                break;
            case 17:
                lastCameraTargetX = a.getFloat32(c, !0);
                c += 4;
                lastCameraTargetY = a.getFloat32(c, !0);
                c += 4;
                lastTargetScale = a.getFloat32(c, !0);
                c += 4;
                break;
            case 20:
                playerCells = [];
                playerCellIds = [];
                resetTeamMassGraphHistory();
                rebuildLeaderboardCanvas();
                break;
            case 21:
                Oa = a.getInt16(c, !0);
                c += 2;
                Pa = a.getInt16(c, !0);
                c += 2;
                Qa || (Qa = !0, va = Oa, wa = Pa);
                break;
            case 32:
                spectateInputEnabled = !1;
                spectateMoveUp = !1;
                spectateMoveLeft = !1;
                spectateMoveDown = !1;
                spectateMoveRight = !1;
                playerCellIds.push(a.getUint32(c, !0));
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
                rebuildLeaderboardCanvas();
                break;
            case 50:
                B = [];
                n = a.getUint32(c, !0);
                c += 4;
                for (d = 0; d < n; ++d) B.push(a.getFloat32(c, !0)), c += 4;
                sampleTeamMassGraphHistory();
                rebuildLeaderboardCanvas();
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
                lastCameraTargetX = (za + xa) / 2;
                lastCameraTargetY = (Aa + ya) / 2;
                lastTargetScale = 1;
                0 == playerCells.length && (cameraX = lastCameraTargetX, cameraY = lastCameraTargetY, g = lastTargetScale);
                break;
            case 81:
                var f = a.getUint32(c, !0),
                    c = c + 4,
                    k = a.getUint32(c, !0),
                    c = c + 4,
                    h = a.getUint32(c, !0),
                    c = c + 4;
                setTimeout(function() {
                    updateProfileProgress({
                        d: f,
                        e: k,
                        c: h
                    })
                }, 1200)
                break;
            case 90:
                resetTeamMassGraphHistory();
                rebuildLeaderboardCanvas();
                break;
        }
    }

    function handleWorldUpdatePacket(a, b) {
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
        rb = currentFrameTimeMs = Date.now();
        ia || (ia = !0, onConnectionEstablished());
        Ra = !1;
        var p = a.getUint16(b, !0);
        b += 2;
        for (var f = 0; f < p; ++f) {
            var C = cellsById[a.getUint32(b, !0)],
                k = cellsById[a.getUint32(b + 4, !0)];
            b += 8;
            C && k && (k.R(), k.o = k.x, k.p = k.y, k.n = k.size, k.C = C.x, k.D = C.y, k.m = k.size, k.K = currentFrameTimeMs, trackCellEatStats(C, k))
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
                K = rgbIntToHex(m << 16 | K << 8 | S),
                S = a.getUint8(b++),
                h = !!(S & 1),
                q = !!(S & 16),
                r = null;
            S & 2 && (b += 4 + a.getUint32(b, !0));
            S & 4 && (r = n());
            var s = c(),
                m = null;
            cellsById.hasOwnProperty(p) ? (m = cellsById[p], m.J(), m.o = m.x, m.p = m.y, m.n = m.size, m.color = K) : (m = new CellEntity(p, C, k, g, K, s), allCells.push(m), cellsById[p] = m, m.ia = C, m.ja = k);
            m.f = h;
            m.j = q;
            m.C = C;
            m.D = k;
            m.m = g;
            m.K = currentFrameTimeMs;
            m.T = S;
            r && (m.V = r);

            s && m.t(s); -1 != playerCellIds.indexOf(p) && -1 == playerCells.indexOf(m) && (playerCells.push(m), 1 == playerCells.length && (cameraX = m.x, cameraY = m.y, updateLiveFavicon(), document.getElementById("overlays").style.display = "none", x = [], Sa = 0, Ta = playerCells[0].color, Ua = !0, tb = Date.now(), T = Va = Wa = 0))
        }
        C = a.getUint32(b, !0);
        b += 4;
        for (f = 0; f < C; f++) p = a.getUint32(b, !0), b += 4, m = cellsById[p], null != m && m.R();
        if (0 < C && null != B && 0 == playerCells.length && 0 < lastKnownTeamMassTotal) {
            for (var L = computeTeamMassTotals(B.length), M = 0, R = 0; R < L.length; ++R) M += L[R];
            0 >= M && (resetTeamMassGraphHistory(), rebuildLeaderboardCanvas());
            lastKnownTeamMassTotal = M
        }
        Ra && 0 == playerCells.length && (ub = Date.now(), Ua = !1, fa || V || (vb ? (renderStatsPanel(), V = !0, e("#overlays").fadeIn(3E3), e("#stats").show()) : showMainMenu(3E3)))
    }

    function onConnectionEstablished() {
        e("#connecting").hide();
        sendPendingNick();
        pendingSpectate && (sendActionOpcode(1), pendingSpectate = !1);
        O && (O(), O = null);
        null != Xa && clearTimeout(Xa)
    }

    function sendMousePosition() {
        if (isSocketOpen()) {
            spectateInputEnabled && 0 == playerCells.length && applySpectateKeyboardTarget();
            var a = mouseScreenX - viewportWidth / 2,
                b = mouseScreenY - viewportHeight / 2;
            64 > a * a + b * b || .01 > Math.abs(yb - mouseWorldTargetX) && .01 > Math.abs(zb - mouseWorldTargetY) || (yb = mouseWorldTargetX, zb = mouseWorldTargetY, a = createPacketView(13), a.setUint8(0, 16), a.setInt32(1, mouseWorldTargetX, !0), a.setInt32(5, mouseWorldTargetY, !0), a.setUint32(9, 0, !0), sendPacket(a))
        }
    }

    function sendPendingNick() {
        if (isSocketOpen() && ia && null != I) {
            var a = createPacketView(1 + 2 * I.length);
            a.setUint8(0, 0);
            for (var b = 0; b < I.length; ++b) a.setUint16(1 + 2 * b, I.charCodeAt(b), !0);
            sendPacket(a);
            I = null
        }
    }

    function isSocketOpen() {
        return null != gameSocket && gameSocket.readyState == gameSocket.OPEN
    }

    function sendActionOpcode(a) {
        if (isSocketOpen()) {
            var b = createPacketView(1);
            b.setUint8(0, a);
            sendPacket(b)
        }
    }

    function sendAuthTokenIfAvailable() {
        if (isSocketOpen() && null != D) {
            var a = createPacketView(1 + D.length);
            a.setUint8(0, 81);
            for (var b = 0; b < D.length; ++b) a.setUint8(b + 1, D.charCodeAt(b));
            sendPacket(a)
        }
    }

    function handleWindowResize() {
        viewportWidth = 1 * d.innerWidth;
        viewportHeight = 1 * d.innerHeight;
        Ha.width = L.width = viewportWidth;
        Ha.height = L.height = viewportHeight;
        var a = e("#helloContainer");
        a.css("transform", "none");
        var b = a.height(),
            c = d.innerHeight;
        b > c / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + c / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
        renderGameFrame()
    }

    function computeViewportScale() {
        var a;
        a = 1 * Math.max(viewportHeight / 1080, viewportWidth / 1920);
        return a *= N
    }

    function updateCameraScale() {
        if (0 != playerCells.length) {
            for (var a = 0, b = 0; b < playerCells.length; b++) a += playerCells[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * computeViewportScale();
            g = (9 * g + a) / 10
        }
    }

    function updateSpectateCameraStep() {
        var a = lastCameraTargetX - cameraX,
            b = lastCameraTargetY - cameraY,
            c = Math.sqrt(a * a + b * b);
        if (.01 >= c) {
            cameraX = lastCameraTargetX;
            cameraY = lastCameraTargetY;
            return
        }
        var d = spectateMoveUp || spectateMoveLeft || spectateMoveDown || spectateMoveRight,
            e = 1.4 / Math.max(g, .01),
            f = d ? .45 : .28,
            h = d ? 24 / Math.max(g, .01) : 18 / Math.max(g, .01),
            k = c * f;
        c <= e ? (cameraX = lastCameraTargetX, cameraY = lastCameraTargetY) : (k = Math.min(k, h), cameraX += a / c * k, cameraY += b / c * k)
    }

    function renderGameFrame() {
        var a, b = Date.now();
        currentFrameTimeMs = b;
        if (0 < playerCells.length) {
            updateCameraScale();
            for (var c = a = 0, d = 0; d < playerCells.length; d++) playerCells[d].J(), a += playerCells[d].x / playerCells.length, c += playerCells[d].y / playerCells.length;
            lastCameraTargetX = a;
            lastCameraTargetY = c;
            lastTargetScale = g;
            cameraX = (cameraX + a) / 2;
            cameraY = (cameraY + c) / 2
        // Spectate mode uses step-based camera movement for sharper tracking.
        } else {
            var c = lastTargetScale * computeViewportScale();
            if (spectateInputEnabled) g = (7 * g + c) / 8, updateSpectateCameraStep();
            else cameraX = (29 * cameraX + lastCameraTargetX) / 30, cameraY = (29 * cameraY + lastCameraTargetY) / 30, g = (9 * g + c) / 10
        }
        rebuildSpatialIndex();
        updateMouseWorldTarget();
        Ya || f.clearRect(0, 0, viewportWidth, viewportHeight);
        Ya ? (f.fillStyle = Ba ? "#111111" : "#F2FBFF", f.globalAlpha = .05, f.fillRect(0, 0, viewportWidth, viewportHeight), f.globalAlpha = 1) : drawBackgroundGrid();
        allCells.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size
        });
        rebuildSpectateRenderAggregates();
        f.save();
        f.translate(viewportWidth / 2, viewportHeight / 2);
        f.scale(g, g);
        f.translate(-cameraX, -cameraY);
        drawMapBorder();
        for (d = 0; d < fadingCells.length; d++) fadingCells[d].s(f);
        for (d = 0; d < allCells.length; d++) allCells[d].s(f);
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
            for (d = 0; d < playerCells.length; d++) f.moveTo(playerCells[d].x, playerCells[d].y), f.lineTo(va, wa);
            f.stroke();
            f.restore()
        }
        f.restore();
        A && A.width && f.drawImage(A, viewportWidth - A.width - 10, 10);
        P = Math.max(P, computeCurrentMass());
        0 != P && (null == Ca && (Ca = new TextSprite(12, "#FFFFFF")), Ca.u(translateKey("score") + ": " + ~~(P / 100)), c = Ca.F(), a = c.width, f.globalAlpha = .3, f.fillStyle = "#000000", f.fillRect(4, viewportHeight - 5 - 12 - 5, a + 5, 17), f.globalAlpha = 1, f.drawImage(c, 6, viewportHeight - 5 - 12 - 3));
        drawTouchIndicator();
        b = Date.now() - b;
        b > 1E3 / 60 ? G -= .01 : b < 1E3 / 65 && (G += .01);
        .4 > G && (G = .4);
        1 < G && (G = 1);
        b = currentFrameTimeMs - previousFrameTimeMs;
        !isSocketOpen() || fa || V ? (s += b / 2E3, 1 < s && (s = 1)) : (s -= b / 300, 0 > s && (s = 0));
        0 < s ? (f.fillStyle = "#000000", Eb ? (f.globalAlpha = s, f.fillRect(0, 0, viewportWidth, viewportHeight), E.complete && E.width && (E.width / E.height < viewportWidth / viewportHeight ? (b = viewportWidth, a = E.height * viewportWidth / E.width) : (b = E.width * viewportHeight / E.height, a = viewportHeight), f.drawImage(E, (viewportWidth - b) / 2, (viewportHeight - a) / 2, b, a), f.globalAlpha = .5 * s, f.fillRect(0, 0, viewportWidth, viewportHeight))) : (f.globalAlpha = .5 * s, f.fillRect(0, 0, viewportWidth, viewportHeight)), f.globalAlpha = 1) : Eb = !1;
        previousFrameTimeMs = currentFrameTimeMs
    }

    function drawBackgroundGrid() {
        f.fillStyle = Ba ? "#111111" : "#F2FBFF";
        f.fillRect(0, 0, viewportWidth, viewportHeight);
        if (.08 > g) return;
        f.save();
        f.strokeStyle = Ba ? "#AAAAAA" : "#000000";
        var step = 50,
            minPixelSpacing = 18,
            pixelSpacing = step * g;
        pixelSpacing < minPixelSpacing && (step *= Math.ceil(minPixelSpacing / Math.max(pixelSpacing, .001)));
        f.globalAlpha = .2 * g;
        for (var a = viewportWidth / g, b = viewportHeight / g, c = (-cameraX + a / 2) % step; c < a; c += step) f.beginPath(), f.moveTo(c * g - .5, 0), f.lineTo(c * g - .5, b * g), f.stroke();
        for (c = (-cameraY + b / 2) % step; c < b; c += step) f.beginPath(), f.moveTo(0, c * g - .5), f.lineTo(a * g, c * g - .5), f.stroke();
        f.restore()
    }

    function drawMapBorder() {
        if (!(za > xa && Aa > ya)) return;
        f.save();
        f.strokeStyle = Ba ? "#D8D8D8" : "#222222";
        f.globalAlpha = .9;
        f.lineWidth = 4 / g;
        f.strokeRect(xa, ya, za - xa, Aa - ya);
        f.restore()
    }

    function drawTouchIndicator() {
        if (fb && Za.width) {
            var a = viewportWidth / 5;
            f.drawImage(Za, 5, 5, a, a)
        }
    }

    function computeCurrentMass() {
        for (var a = 0, b = 0; b < playerCells.length; b++) a += playerCells[b].m * playerCells[b].m;
        return a
    }

    function rebuildSpectateRenderAggregates() {
        spectateLargestCellIdsByName = {};
        spectateTotalMassByName = {};
        if (0 != playerCells.length) return;
        for (var a = {}, b = 0; b < allCells.length; ++b) {
            var c = allCells[b];
            if (0 < c.id && c.name) {
                var d = c.name.toLowerCase(),
                    e = c.size * c.size / 100;
                spectateTotalMassByName[d] = (spectateTotalMassByName[d] || 0) + e;
                (!a[d] || c.size > a[d].size) && (a[d] = c)
            }
        }
        for (d in a) a.hasOwnProperty(d) && (spectateLargestCellIdsByName[a[d].id] = !0)
    }

    function resetTeamMassGraphHistory() {
        teamMassGraphHistory = [];
        lastKnownTeamMassTotal = 0
    }

    function computeTeamMassTotals(a) {
        function b(a) {
            return 7 == a.length && "#" == a.charAt(0) ? {
                r: parseInt(a.substr(1, 2), 16),
                g: parseInt(a.substr(3, 2), 16),
                b: parseInt(a.substr(5, 2), 16)
            } : null
        }
        for (var c = [], d = [], e = 0; e < a; ++e) {
            c[e] = 0;
            var f = b(cc[e + 1] || "");
            d.push(f || {
                r: 255,
                g: 255,
                b: 255
            })
        }
        for (e = 0; e < allCells.length; ++e) {
            var g = allCells[e];
            if (0 < g.id && !g.f && 12 < g.size) {
                var h = b((g.color || "").toLowerCase());
                if (h) {
                    for (var k = 0, l = Number.MAX_VALUE, m = 0; m < d.length; ++m) {
                        var n = h.r - d[m].r,
                            p = h.g - d[m].g,
                            q = h.b - d[m].b,
                            r = n * n + p * p + q * q;
                        r < l && (l = r, k = m)
                    }
                    c[k] += g.size * g.size / 100
                }
            }
        }
        return c
    }

    function sampleTeamMassGraphHistory() {
        if (null == B || 0 != playerCells.length) return;
        var a = computeTeamMassTotals(B.length),
            b = 0,
            c;
        for (c = 0; c < a.length; ++c) b += a[c];
        if (0 >= b) {
            0 < lastKnownTeamMassTotal && resetTeamMassGraphHistory();
            lastKnownTeamMassTotal = 0;
            return
        }
        if (teamMassGraphHistory.length != a.length) {
            teamMassGraphHistory = [];
            for (c = 0; c < a.length; ++c) teamMassGraphHistory[c] = []
        }
        for (c = 0; c < a.length; ++c) {
            var d = teamMassGraphHistory[c];
            d.push(a[c]);
            d.length > teamMassGraphMaxSamples && d.shift()
        }
        lastKnownTeamMassTotal = b
    }

    function rebuildLeaderboardCanvas() {
        A = null;
        if (null != B || 0 != w.length)
            if (null != B || Ea) {
                A = document.createElement("canvas");
                var a = A.getContext("2d"),
                    teamBaseY = 251,
                    teamRowSpacing = 25,
                    teamBottomPad = 22,
                    showTeamMassGraphs = null != B && 0 == playerCells.length,
                    teamCount = null == B ? 0 : B.length,
                    graphTopPad = 26,
                    graphRowHeight = 42,
                    graphRowGap = 12,
                    graphBottomPad = 6,
                    graphSectionHeight = showTeamMassGraphs ? graphTopPad + graphRowHeight * Math.max(teamCount, 1) + graphRowGap * Math.max(teamCount - 1, 0) + graphBottomPad - 10 : 0,
                    b = null == B ? 60 + 24 * w.length : Math.max(240, teamBaseY + teamBottomPad + teamRowSpacing * Math.max(teamCount - 1, 0) + graphSectionHeight),
                    c = Math.min(140, .3 * viewportWidth) / 200;
                A.width = 200 * c;
                A.height = b * c;
                a.scale(c, c);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha = 1;
                a.fillStyle = "#FFFFFF";
                c = null;
                c = translateKey("leaderboard");
                a.font = "30px ServerFont";
                a.fillText(c, 100 - a.measureText(c).width / 2, 40);
                if (null == B)
                    for (a.font = "18px ServerFont", b = 0; b < w.length; ++b) c = w[b].name || translateKey("unnamed_cell"), Ea || (c = translateKey("unnamed_cell")), -1 != playerCellIds.indexOf(w[b].id) ? (playerCells[0] && playerCells[0].name && (c = playerCells[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
                else {
                    var teamNames = ["Red", "Orange", "Yellow", "Green", "Teal", "Blue", "Purple", "Magenta", "Rose", "Brown", "Olive", "Slate"];
                    for (b = c = 0; b < B.length; ++b) {
                        var d = c + B[b] * Math.PI * 2;
                        a.fillStyle = cc[b + 1] || cc[b % (cc.length - 1) + 1];
                        a.beginPath();
                        a.moveTo(100, 140);
                        a.arc(100, 140, 80, c, d, !1);
                        a.fill();
                        c = d
                    }
                    var teams = [];
                    for (b = 0; b < B.length; ++b) teams.push({
                        index: b,
                        pct: B[b],
                        color: cc[b + 1] || cc[b % (cc.length - 1) + 1],
                        name: teamNames[b] || ("Team " + (b + 1))
                    });
                    teams.sort(function(a, b) {
                        return b.pct - a.pct;
                    });
                    var baseY = teamBaseY;
                    a.font = "16px ServerFont";
                    a.textBaseline = "middle";
                    for (b = 0; b < teams.length; ++b) {
                        var rowY = baseY + teamRowSpacing * b;
                        var row = teams[b];
                        a.fillStyle = row.color;
                        a.fillRect(16, rowY - 6, 12, 12);
                        a.fillStyle = "#FFFFFF";
                        var pctText = (100 * row.pct).toFixed(1) + "%";
                        var leftText = row.name;
                        a.textAlign = "left";
                        a.fillText(leftText, 34, rowY);
                        a.textAlign = "right";
                        a.fillText(pctText, 184, rowY);
                    }
                    if (showTeamMassGraphs) {
                        var graphStartY = teamBaseY + teamRowSpacing * Math.max(teamCount - 1, 0) + graphTopPad,
                            graphX = 16,
                            graphWidth = 168,
                            graphStep = graphRowHeight + graphRowGap,
                            graphInnerPadX = 6,
                            graphInnerPadY = 8;
                        if (teamMassGraphHistory.length != teamCount)
                            for (teamMassGraphHistory = [], b = 0; b < teamCount; ++b) teamMassGraphHistory[b] = [];
                        for (b = 0; b < teamCount; ++b) {
                            rowY = graphStartY + graphStep * b + graphRowHeight / 2;
                            var rowColor = cc[b + 1] || cc[b % (cc.length - 1) + 1],
                                points = teamMassGraphHistory[b] || [],
                                rowMaxMass = 6000,
                                graphTop = rowY - graphRowHeight / 2,
                                lineX = graphX + graphInnerPadX,
                                lineY = graphTop + graphInnerPadY,
                                lineWidth = graphWidth - 2 * graphInnerPadX,
                                lineHeight = graphRowHeight - 2 * graphInnerPadY;
                            for (c = 0; c < points.length; ++c) rowMaxMass = Math.max(rowMaxMass, points[c]);
                            a.globalAlpha = .28;
                            a.fillStyle = "#000000";
                            a.fillRect(graphX, graphTop, graphWidth, graphRowHeight);
                            a.globalAlpha = .36;
                            a.fillStyle = rowColor;
                            a.fillRect(graphX, graphTop, graphWidth, graphRowHeight);
                            a.globalAlpha = .22;
                            a.strokeStyle = "#FFFFFF";
                            a.lineWidth = 1;
                            a.strokeRect(graphX + .5, graphTop + .5, graphWidth - 1, graphRowHeight - 1);
                            a.globalAlpha = 1;
                            if (1 < points.length) {
                                a.strokeStyle = "rgba(0,0,0,0.35)";
                                a.lineWidth = 3;
                                a.beginPath();
                                for (c = 0; c < points.length; ++c) {
                                    var px = lineX + c / (points.length - 1) * lineWidth,
                                        py = lineY + lineHeight - points[c] / rowMaxMass * lineHeight;
                                    0 == c ? a.moveTo(px, py) : a.lineTo(px, py)
                                }
                                a.stroke();
                                a.strokeStyle = "rgba(0,0,0,0.2)";
                                a.lineWidth = 2;
                                a.beginPath();
                                for (c = 0; c < points.length; ++c) {
                                    px = lineX + c / (points.length - 1) * lineWidth,
                                        py = lineY + lineHeight - points[c] / rowMaxMass * lineHeight;
                                    0 == c ? a.moveTo(px, py) : a.lineTo(px, py)
                                }
                                a.stroke()
                            } else 1 == points.length && (a.fillStyle = "rgba(0,0,0,0.45)", a.fillRect(lineX + lineWidth - 2, rowY - 1, 2, 2), a.fillStyle = "rgba(0,0,0,0.2)", a.fillRect(lineX + lineWidth - 1, rowY - 1, 2, 2));
                        }
                    }
                    a.textAlign = "left";
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

    function CellEntity(a, b, c, d, e, f) {
        this.id = a;
        this.o = this.x = b;
        this.p = this.y = c;
        this.n = this.size = d;
        this.color = e;
        this.a = [];
        this.Q();
        this.t(f)
    }

    function rgbIntToHex(a) {
        for (a = a.toString(16); 6 > a.length;) a = "0" + a;
        return "#" + a
    }

    function TextSprite(a, b, c, d) {
        a && (this.q = a);
        b && (this.M = b);
        this.O = !!c;
        d && (this.r = d)
    }

    function shuffleInPlace(a) {
        for (var b = a.length, c, d; 0 < b;) d = Math.floor(Math.random() * b), b--, c = a[b], a[b] = a[d], a[d] = c
    }

    function updateProfileProgress(a, b) {
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
            if (n != a.d) updateProfileProgress({
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
                    updateProfileProgress({
                        e: 0,
                        c: a.c,
                        d: a.d
                    }, function() {
                        updateProfileProgress(a, b)
                    })
                }, 1E3)
            });
            else {
                var f = Date.now(),
                    g = function() {
                        var c;
                        c = (Date.now() - f) / 1E3;
                        c = 0 > c ? 0 : 1 < c ? 1 : c;
                        // Smoothstep easing keeps progress animation fast at the ends and smooth in the middle.
                        c = c * c * (3 - 2 * c);
                        e(".agario-exp-bar .progress-bar-text").text(~~(p + (a.e - p) * c) + "/" + a.c + " XP");
                        e(".agario-exp-bar .progress-bar").css("width", (88 * (p + (a.e - p) * c) / a.c).toFixed(2) + "%");
                        1 > c ? d.requestAnimationFrame(g) : b && b()
                    };
                d.requestAnimationFrame(g)
            }
        } else e(".agario-profile-panel .progress-bar-star").text(a.d), e(".agario-exp-bar .progress-bar-text").text(a.e + "/" + a.c + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.e / a.c).toFixed(2) + "%"), b && b()
    }

    function applyLoginData(a) {
        "string" == typeof a && (a = JSON.parse(a));
        Date.now() + 18E5 > a.expires ? e("#helloContainer").attr("data-logged-in", "0") : (d.localStorage[U] = JSON.stringify(a), D = a.authToken, e(".agario-profile-name").text(a.name), sendAuthTokenIfAvailable(), updateProfileProgress({
            e: a.xp,
            c: a.xpNeeded,
            d: a.level
        }), e("#helloContainer").attr("data-logged-in", "1"))
    }

    function parseLoginResponsePayload(a) {
        a = a.split("\n");
        applyLoginData({
            name: a[0],
            fbid: a[1],
            authToken: a[2],
            expires: 1E3 * +a[3],
            level: +a[4],
            xp: +a[5],
            xpNeeded: +a[6]
        })
    }

    function joinPartyByHash(a) {
        setGameModeUiState(":party");
        e("#helloContainer").attr("data-party-state", "5");
        a = decodeURIComponent(a).replace(/.*#/gim, "");
        replaceHistoryHash("#" + d.encodeURIComponent(a));
        connectToServer(a)
    }

    function replaceHistoryHash(a) {
        d.history && d.history.replaceState && d.history.replaceState({}, d.document.title, a)
    }

    function trackCellEatStats(a, b) {
        var c = -1 != playerCellIds.indexOf(a.id),
            d = -1 != playerCellIds.indexOf(b.id),
            e = 30 > b.size;
        c && e && ++Sa;
        e || !c || d || ++Va
    }

    function formatElapsedTime(a) {
        a = ~~a;
        var b = (a % 60).toString();
        a = (~~(a / 60)).toString();
        2 > b.length && (b = "0" + b);
        return a + ":" + b
    }

    function getCurrentTopPosition() {
        if (null == w) return 0;
        for (var a = 0; a < w.length; ++a)
            if (-1 != playerCellIds.indexOf(w[a].id)) return a + 1;
        return 0
    }

    function renderStatsPanel() {
        e(".stats-food-eaten").text(Sa);
        e(".stats-time-alive").text(formatElapsedTime((ub - tb) / 1E3));
        e(".stats-leaderboard-time").text(formatElapsedTime(Wa));
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
        var userAgent = d.navigator.userAgent;
        if (-1 != userAgent.indexOf("Android")) setTimeout(function() {}, 1E3);
        else if (-1 != userAgent.indexOf("iPhone") || -1 != userAgent.indexOf("iPad") || -1 != userAgent.indexOf("iPod")) setTimeout(function() {}, 1E3);
        else {
            var Ha, f, L, viewportWidth, viewportHeight, da = null,
                gameSocket = null,
                cameraX = 0,
                cameraY = 0,
                playerCellIds = [],
                playerCells = [],
                cellsById = {},
                allCells = [],
                fadingCells = [],
                w = [],
                mouseScreenX = 0,
                mouseScreenY = 0,
                mouseWorldTargetX = -1,
                mouseWorldTargetY = -1,
                currentFrameTimeMs = 0,
                previousFrameTimeMs = 0,
                spectateLargestCellIdsByName = {},
                spectateTotalMassByName = {},
                I = null,
                xa = 0,
                ya = 0,
                za = 1E4,
                Aa = 1E4,
                g = 1,
                y = null,
                Hb = 0,
                Ea = !0,
                db = !1,
                Ra = !1,
                P = 0,
                Ba = !1,
                Ib = !1,
                lastCameraTargetX = cameraX = ~~((xa + za) / 2),
                lastCameraTargetY = cameraY = ~~((ya + Aa) / 2),
                lastTargetScale = 1,
                W = "",
                B = null,
                teamMassGraphHistory = [],
                teamMassGraphMaxSamples = 250,
                lastKnownTeamMassTotal = 0,
                Ga = !1,
                Qa = !1,
                Oa = 0,
                Pa = 0,
                va = 0,
                wa = 0,
                Jb = 0,
                cc = ["#333333", "#d24646", "#d2823c", "#c8b43c", "#78aa46", "#3caa8c", "#3c8cd2", "#7864d2", "#aa5abe", "#b46478", "#8c6e46", "#5a8246", "#5a8296"],
                Ya = !1,
                ia = !1,
                rb = 0,
                D = null,
                N = 1,
                s = 1,
                fa = !1,
                connectionAttemptId = 0,
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
            var fb = "ontouchstart" in d && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(d.navigator.userAgent);
            var Kb = document.createElement("canvas");
            if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == Kb || null == Kb.getContext || null == d.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
            else {
                d.setNick = function(a) {
                    hideMainPanels();
                    pendingSpectate = !1;
                    spectateInputEnabled = !1;
                    spectateMoveUp = !1;
                    spectateMoveLeft = !1;
                    spectateMoveDown = !1;
                    spectateMoveRight = !1;
                    I = a;
                    isSocketOpen() || connectIfReady();
                    sendPendingNick();
                    P = 0
                };
                d.setRegion = setRegionSelection;
                var isFirstMenuOpen = !0;
                d.setJelloPhysics = function(a) {
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
                    hideMainPanels();
                    spectateInputEnabled = !0;
                    if (isSocketOpen()) sendActionOpcode(1);
                    else pendingSpectate = !0, connectIfReady()
                };
                d.setGameMode = function(a) {
                    a != W && (":party" == W && e("#helloContainer").attr("data-party-state", "0"), setGameModeUiState(a))
                };
                d.setAcid = function(a) {
                    Ya = a
                };
                null != d.localStorage && (null == d.localStorage.AB9 && (d.localStorage.AB9 = 0 + ~~(100 * Math.random())), Jb = +d.localStorage.AB9, d.ABGroup = Jb);
                var O = null;
                d.connect = connectToServer;
                var Xa = null,
                    pendingSpectate = !1,
                    spectateInputEnabled = !1,
                    spectateMoveUp = !1,
                    spectateMoveLeft = !1,
                    spectateMoveDown = !1,
                    spectateMoveRight = !1,
                    xb = 0,
                    yb = -1,
                    zb = -1;
                d.refreshPlayerInfo = function() {
                    sendActionOpcode(253)
                };
                var A = null,
                    G = 1,
                    Ca = null,
                    Lb = [],
                    hc = [];
                function mainAnimationLoop() {
                    d.requestAnimationFrame(mainAnimationLoop);

                    if (!isSocketOpen() || Date.now() - rb < 240) {
                        renderGameFrame(); // game render
                    } else {
                        console.warn("Skipping draw");
                    }

                    renderUiCanvases(); // UI render
                }

                // Static-client mode: disable remote skin keyword lists and social-name filters.
                if (Array.isArray(Lb)) Lb.length = 0;
                if (Array.isArray(hc)) hc.length = 0;

                $a.prototype = {
                    P: null,
                    x: 0,
                    y: 0,
                    g: 0,
                    b: 0
                };
                CellEntity.prototype = {
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
                        for (a = 0; a < allCells.length; a++)
                            if (allCells[a] == this) {
                                allCells.splice(a, 1);
                                break
                            }
                        delete cellsById[this.id];
                        a = playerCells.indexOf(this); - 1 != a && (Ra = !0, playerCells.splice(a, 1));
                        a = playerCellIds.indexOf(this.id); - 1 != a && playerCellIds.splice(a, 1);
                        this.A = !0;
                        0 < this.S && fadingCells.push(this)
                    },
                    i: function() {
                        return Math.max(~~(.3 * this.size), 24)
                    },
                    t: function(a) {
                        if (this.name = a) null == this.k ? this.k = new TextSprite(this.i(), "#FFFFFF", !0, "#000000") : this.k.G(this.i()), this.k.u(this.name)
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
                        if (Hb) { 20 > this.size && (a = 6); }
                        else { 20 > this.size && (a = 0); }
                        this.f && (a = 30);
                        var b = this.size;
                        this.f || (b *= g);
                        b *= G;
                        this.T & 32 && (b *= .25);
                        if (Hb) { return Math.max(Math.min(~~Math.max(b, a), 60), a); }
                        return ~~Math.max(b, a)
                    },
                    da: function() {
                        // Smooth each blob point with neighbor averaging to keep the wobble organic but stable.
                        this.Q();
                        for (var a = this.a, b = a.length, c = 0; c < b; ++c) {
                            var d = a[(c - 1 + b) % b].b,
                                e = a[(c + 1) % b].b;
                            a[c].b += (Math.random() - .5) * (this.j ? 3 : 1);
                            a[c].b *= .7;
                            10 < a[c].b && (a[c].b = 10); - 10 > a[c].b && (a[c].b = -10);
                            a[c].b = (d + e + 8 * a[c].b) / 10
                        }
                        for (var f = this, l = this.f ? 0 : (this.id / 1E3 + currentFrameTimeMs / 1E4) % (2 * Math.PI), c = 0; c < b; ++c) {
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
                        a = (currentFrameTimeMs - this.K) / 120;
                        a = 0 > a ? 0 : 1 < a ? 1 : a;
                        var b = 0 > a ? 0 : 1 < a ? 1 : a;
                        this.i();
                        if (this.A && 1 <= b) {
                            var c = fadingCells.indexOf(this); - 1 != c && fadingCells.splice(c, 1)
                        }
                        this.x = a * (this.C - this.o) + this.o;
                        this.y = a * (this.D - this.p) + this.p;
                        this.size = b * (this.m - this.n) + this.n;
                        return b
                    },
                    H: function() {
                        return 0 >= this.id ? !0 : this.x + this.size + 40 < cameraX - viewportWidth / 2 / g || this.y + this.size + 40 < cameraY - viewportHeight / 2 / g || this.x - this.size - 40 > cameraX + viewportWidth / 2 / g || this.y - this.size - 40 > cameraY + viewportHeight / 2 / g ? !1 : !0
                    },
                    s: function(a) {
                        if (this.H()) {
                            ++this.S;
                            if (Hb) { var b = false; }
                            else { 
                                var b = 0 < this.id && !this.f && !this.j && .4 > g;
                                5 > this.B() && 0 < this.id && (b = !0);
                            }
                            if (this.L && !b)
                                for (var c = 0; c < this.a.length; c++) this.a[c].g = this.size;
                            this.L = b;
                            a.save();
                            this.W = currentFrameTimeMs;
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
                            c = this.name ? this.name.toLowerCase() : "";
                            d = null;
                            e = d;
                            b || a.stroke();
                            a.fill();
                            null != e && (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
                            (db || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                            a.globalAlpha = 1;
                            d = -1 != playerCells.indexOf(this);
                            var isSpectating = 0 == playerCells.length,
                                isLargeEnoughSpectateCell = !isSpectating || 50 <= 2 * this.size * g;
                            b = ~~this.y;
                            if (0 != this.id && (Ea || d) && this.name && this.k && (null == e || -1 == hc.indexOf(c)) && isLargeEnoughSpectateCell) {
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
                            0 < this.id && Ib && (d || 0 == playerCells.length && (!this.f || this.j) && 20 < this.size) && isLargeEnoughSpectateCell && (null == this.I && (this.I = new TextSprite(this.i() / 2, "#FFFFFF", !0, "#000000")), d = this.I, d.G(this.i() / 2), d.u(~~(this.size * this.size / 100)), c = Math.ceil(10 * g) / 10, d.U(c), e = d.F(), f = ~~(e.width / c), h = ~~(e.height / c), a.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(h / 2), f, h));
                            a.restore()
                        }
                    }
                };
                TextSprite.prototype = {
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
                                f = e + "px ServerFont";
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
                    updateLiveFavicon = function() {
                        var a = new CellEntity(0, 0, 0, 32, "#ED1C24", ""),
                            b = document.createElement("canvas");
                        b.width = 32;
                        b.height = 32;
                        var c = b.getContext("2d");
                        return function() {
                            0 < playerCells.length && (a.color = playerCells[0].color, a.t(playerCells[0].name));
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
                    updateLiveFavicon()
                });
                var U = "loginCache3";
                e(function() {
                    d.localStorage[U] && applyLoginData(d.localStorage[U])
                });
                d.logout = function() {
                    D = null;
                    e("#helloContainer").attr("data-logged-in", "0");
                    e("#helloContainer").attr("data-has-account-data", "0");
                    delete d.localStorage[U];
                    connectIfReady()
                };
                var renderUiCanvases = function() {
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
                    for (var b = new CellEntity(-1, 0, 0, 32, "#5bc0de", ""), c = new CellEntity(-1, 0, 0, 32, "#5bc0de", ""), d = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "), f = [], g = 0; g < d.length; ++g) {
                        var h = g / d.length * 12,
                            k = 30 * Math.sqrt(g / d.length);
                        f.push(new CellEntity(-1, Math.cos(h) * k, Math.sin(h) * k, 10, d[g], ""))
                    }
                    shuffleInPlace(f);
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
                            (c = c.attr("data-itr")) && (c = translateKey(c));
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
                    setGameModeUiState(":party");
                    O = function(a) {
                        replaceHistoryHash("/#" + d.encodeURIComponent(a));
                        e(".partyToken").val("#" + d.encodeURIComponent(a));
                        e("#helloContainer").attr("data-party-state", "1")
                    };
                    connectIfReady()
                };
                d.joinParty = joinPartyByHash;
                d.cancelParty = function() {
                    replaceHistoryHash("index.html");
                    e("#helloContainer").attr("data-party-state", "0");
                    setGameModeUiState("");
                    connectIfReady()
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
                    Ua && x.push(computeCurrentMass() / 100)
                }, 1E3 / 60);
                setInterval(function() {
                    var a = getCurrentTopPosition();
                    0 != a && (++Wa, 0 == T && (T = a), T = Math.min(T, a))
                }, 1E3);
                d.closeStats = function() {
                    V = !1;
                    e("#stats").hide();
                    showMainMenu(0);
                };
                d.setSkipStats = function(a) {
                    vb = !a
                };
                e(function() {
                    e(initializeClient)
                })
            }
        }
    }
})(window, window.jQuery);