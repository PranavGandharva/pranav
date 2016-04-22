!function e(t, n, r) {
    function i(a, l) {
        if (!n[a]) {
            if (!t[a]) {
                var s = "function" == typeof require && require;
                if (!l && s) return s(a, !0);
                if (o) return o(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND", c;
            }
            var u = n[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                var n = t[a][1][e];
                return i(n ? n : e);
            }, u, u.exports, e, t, n, r);
        }
        return n[a].exports;
    }
    for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
    return i;
}({
    "/project/src/js/index.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i() {
            if ("about:" == document.location.protocol) return a["default"].setStatus("index_load", !0);
            document.grCSLoaded = !0;
            var t = e("./lib/app");
            t.run();
        }
        var o = e("./lib/failover.js"), a = r(o);
        e("babel/polyfill"), a["default"].init(), "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", i, !1) : i();
    }, {
        "./lib/app": "/project/src/js/lib/app.js",
        "./lib/failover.js": "/project/src/js/lib/failover.js",
        "babel/polyfill": "babel/polyfill"
    } ],
    "/project/src/js/lib/app.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i() {
            v["default"].emitBackground("test-bg-page-reload", {});
        }
        function o(e) {
            e = parseInt(e), isNaN(e) || y["default"].incFixed(e);
        }
        function a() {
            v["default"].emitTabs("changed-plan", {});
        }
        function l() {
            M.listen(q, M.visibilityEvent(q), l), M.docHidden(q) || v["default"].emitBackground("current-domain", S.getDomain());
        }
        function s() {
            U.version = j.getVersion();
            var e = _["default"](q);
            U.pageFields = e, U.external = C["default"](), U.external.on("fixed_errors", o), 
            U.external.on("changed_plan", a), z = k["default"](U), g["default"]({
                doc: q
            });
            var t = N["default"](q);
            t.customizeElements(), t.addDomainClass(), c(e.get()), e.on("add", c), P.call("statsc.ui.increment", "stability:found_editors");
        }
        function c(e) {
            console.log(e), e.textareas.forEach(z.createTextarea), e.contenteditables.forEach(z.createContenteditable), 
            e.iframes.forEach(z.createIframe), e.htmlghosts.forEach(z.createHtmlGhost);
        }
        function u() {
            var e = S.getDomain();
            v["default"].emitBackground("page-opened"), e.indexOf("ed.grammarly.com") > -1 || (e.indexOf("grammarly.com") > -1 && (m(), 
            S.isSafari() && U.login(), P.initContentScript()), j.enabled(e).then(j.checkEnv).then(function() {
                y["default"].get("debug", function(e) {
                    return F["default"](Boolean(e));
                }), l(), y["default"].enabled(function(e) {
                    return e && s();
                }), y["default"].on("enabled", function(e) {
                    return S.getDomain() === e.domain ? e.value ? s() : f() : void 0;
                }), S.isSafari() && d(), L["default"].setStatus("index_load", !0);
            })["catch"](function() {
                return L["default"].setStatus("index_load", !0);
            }));
        }
        function d() {
            function e() {
                var n = window.getComputedStyle(t), r = n.getPropertyValue("opacity");
                "0.5" != r ? (z.clear(), f()) : setTimeout(e, 200);
            }
            var t = q.createElement("div");
            q.body.appendChild(t), t.classList.add("grammarly-disable-indicator"), setTimeout(e, 1e3);
        }
        function f() {
            console.log("cleanup page from extension"), U.pageFields && (U.pageFields.un("add", c), 
            U.pageFields.reset(), U.pageFields.stop(), U.pageFields = null), z.clear(), document.removeEventListener("test-bg-page-reload", i);
        }
        function m() {
            var e = document.createElement("script");
            e.innerText = "window.GR_EXTENSION_ID='" + j.getUuid() + "'", document.head.appendChild(e), 
            e.parentNode.removeChild(e);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var p = e("./dictionary"), g = r(p), h = e("./message"), v = r(h), b = e("./prefs"), y = r(b), j = e("./config"), w = e("./page-fields"), _ = r(w), x = e("./editors"), k = r(x), E = e("./external"), C = r(E), T = e("./sites"), N = r(T), S = e("./util"), M = e("./dom"), P = e("./tracking/index"), O = e("./referral"), D = r(O), A = e("emitter"), R = r(A), I = e("./failover.js"), L = r(I), B = e("./console.js"), F = r(B), H = function(e) {
            var t = setTimeout(function() {
                P.fire("login-timeout");
            }, 6e4);
            v["default"].emitBackground("login", {}, function(n) {
                clearTimeout(t), P.call("statsc.ui.increment", "stability:app_login_success"), U.user = n, 
                D["default"].init(document, U), e && e(n);
            });
        };
        j.isTest && (H = function(e) {
            U.user = window.gr___user, e && e(U.user);
        }), S.isBg() || document.addEventListener("test-bg-page-reload", i);
        var U = R["default"]({
            run: u,
            login: H
        }), z = void 0, q = document;
        n["default"] = U, t.exports = n["default"];
    }, {
        "./config": "/project/src/js/lib/config.js",
        "./console.js": "/project/src/js/lib/console.js",
        "./dictionary": "/project/src/js/lib/dictionary.js",
        "./dom": "/project/src/js/lib/dom.js",
        "./editors": "/project/src/js/lib/editors.js",
        "./external": "/project/src/js/lib/external.js",
        "./failover.js": "/project/src/js/lib/failover.js",
        "./message": "/project/src/js/lib/message.js",
        "./page-fields": "/project/src/js/lib/page-fields.js",
        "./prefs": "/project/src/js/lib/prefs.js",
        "./referral": "/project/src/js/lib/referral.js",
        "./sites": "/project/src/js/lib/sites.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter"
    } ],
    "/project/src/js/lib/auth.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("./config"), a = e("./prefs"), l = i(a), s = e("./request"), c = e("./bg/cookie"), u = i(c), d = e("./tracking/index"), f = e("./util"), m = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, p = i(m), g = function() {
                function e(e) {
                    d.call("felog.warn", "ajax_error", {
                        e: e
                    }), console.error("request failed", e);
                }
                function t(e) {
                    return j.promise.then(w).then(e);
                }
                function n(e) {
                    return e instanceof Object ? s.fetch(o.URLS.authUser + "/settings", {
                        method: "post",
                        data: JSON.stringify(e),
                        type: "json",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        crossDomain: !0,
                        xhrFields: {
                            withCredentials: !0
                        }
                    }) : void 0;
                }
                function r() {
                    return f.isSafari() ? s.fetch(o.URLS.authUser, {
                        data: {
                            field: "mixpanel.distinct_id"
                        },
                        method: "get"
                    }).then(function(e) {
                        return "user_not_authorized" == e.error ? new Promise(function(e, t) {
                            _ > 1 ? (d.call("felog.error", "too_many_tabs", {
                                tabCount: _,
                                cookiesEnabled: window.navigator.cookieEnabled,
                                cookies: document.cookie
                            }), e()) : (p["default"].tabs.open(o.URLS.authCreatePage, !0, e, t), _++);
                        }) : Promise.resolve(e);
                    }) : Promise.resolve();
                }
                function i(e) {
                    return e && "navigate" != e.type ? e : s.fetch(o.URLS.userOrAnonymous, {
                        data: {
                            field: "mixpanel.distinct_id"
                        },
                        method: "get"
                    });
                }
                function a() {
                    return d.call("felog.info", "auth_request", {
                        type: "fetchUser"
                    }), r().then(i).then(function(e) {
                        return e.token = e.grauth, e.premium = "Premium" == e.type, e.fixed_errors = 0, 
                        e.anonymous = h(e.email), e;
                    }).then(b).then(c).then(m)["catch"](e);
                }
                function c(e) {
                    return !e.token || e.anonymous || !e.free || e.premium ? e : s.fetch(o.URLS.dapiMimic + "?token=" + e.token, {
                        method: "get"
                    }).then(function(t) {
                        return e.mimic = t && t.groups ? t.groups : [], e;
                    });
                }
                function m(e) {
                    return d.call("felog.info", "auth_request", {
                        type: "setUser"
                    }), l["default"].get([ "id", "email", "token" ], function(t) {
                        var n = t.email, r = t.id, i = t.token;
                        n && !h(n) && h(e.email) && d.call("felog.warn", "unexpected_user_convert_to_anonymous", {
                            email: n
                        }), [ "token", "email", "firstName", "anonymous", "id", "premium", "settings" ].forEach(function(t) {
                            return l["default"].set(t, e[t]);
                        }), (r != e.id || i != e.token) && (y = !1), y || (y = !0, d.call("mixpanel.setToken", e.token), 
                        d.call("gnar.setUser", e.id), d.call("gnar.trackTrackTrack"), d.fire("daily-ping"), 
                        d.call("felog.setUser", {
                            firstName: e.firstName,
                            anonymous: e.anonymous,
                            premium: e.premium,
                            email: e.email,
                            token: e.token,
                            type: e.type,
                            id: e.id
                        }));
                    }), e;
                }
                function g(e) {
                    return d.call("felog.info", "auth_request", {
                        type: "onCookieToken"
                    }), w();
                }
                function h(e) {
                    return !e || "undefined" == e || -1 != e.indexOf("@anonymous");
                }
                function v(e) {
                    l["default"].get("email", function(t) {
                        return e(h(t));
                    });
                }
                function b(e) {
                    return e ? e.freemium || e.premium ? Promise.resolve(e) : s.fetch(o.URLS.authGroup, {
                        method: "post",
                        data: {
                            group: "freemium"
                        }
                    }).then(function(t) {
                        return t.error ? Promise.reject(t.error) : Promise.resolve(e);
                    }) : Promise.reject("bad user data");
                }
                var y = void 0, j = function() {
                    var e = {};
                    return e.promise = new Promise(function(t) {
                        e.resolve = t, l["default"].get("version", function(e) {
                            return e && t();
                        });
                    }), e;
                }();
                f.isBg() && (l["default"].on("email", function(e) {
                    h(e) && l["default"].set("premium", !1);
                }), u["default"].watchToken(g));
                var w = f.memoize(a, null, 100), _ = 0;
                return {
                    login: t,
                    isAnonymous: v,
                    setSettings: n,
                    welcomePageLoad: j
                };
            }();
            n["default"] = g, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./bg/cookie": "/project/src/js/lib/bg/cookie.js",
        "./config": "/project/src/js/lib/config.js",
        "./prefs": "/project/src/js/lib/prefs.js",
        "./request": "/project/src/js/lib/request.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js"
    } ],
    "/project/src/js/lib/bg/cookie.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, a = i(o), l = e("../util"), s = a["default"];
            s || (s = {
                cookies: {
                    get: l._f,
                    set: l._f,
                    watch: l._f
                }
            });
            var c = function(e) {
                return s.cookies.get("grammarly.com", "/", "grauth", e), !0;
            }, u = function(e) {
                return s.cookies.watch("grammarly.com", "/", "grauth", e), !0;
            }, d = function(e, t, n) {
                return s.cookies.watch(e, "/", t, n), !0;
            }, f = function(e, t, n) {
                return s.cookies.get(e, "/", t, n), !0;
            }, m = function(e) {
                s.cookies.set(e);
            };
            n["default"] = {
                getCookie: f,
                get: f,
                set: m,
                watch: d,
                getToken: c,
                watchToken: u
            }, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "../util": "/project/src/js/lib/util.js"
    } ],
    "/project/src/js/lib/btn-hover-menu.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            function t(e) {
                if (!T.isOffline()) {
                    var t = e.target, n = o.selectorAll(o.classSelector(C("plus-empty")), o.classSelector(C("plus")));
                    if (!o.parentHasClass(t, E("line-referral"))) {
                        if (o.matchesSelector(t, n) && !N.premium) {
                            var r = p["default"].getUpgradeUrlFromMatches({
                                baseUrl: s.URLS.upgrade,
                                returnUrl: "",
                                appType: "popup",
                                matches: T.getMatches()
                            });
                            return w.call("felog.info", "g_button_hover_update_click"), w.call("mixpanel.track", "Ext:Upgrade_To_Plus_Clicked", {
                                domain: l.getDomain()
                            }), u["default"].emitBackground("open-url", r);
                        }
                        T.showDialog(), setTimeout(m, 200), w.call("mixpanel.track", "Ext:Gbutton_Clicked", {
                            domain: l.getDomain()
                        }), j["default"].start("open_editor"), w.call("statsc.ui.increment", "stability:editor.open_from_button"), 
                        w.call("felog.event", "g_button_hover_open_popup");
                    }
                }
            }
            function n(e) {
                var t = o.resolveEl(e.target, f["default"].baseCls);
                if (t && t != _) return m();
                if (o.hasClass(_, f["default"].cls("offline"))) return m();
                var n = o.resolveEl(e.target, k);
                return t || n == A ? void c() : m();
            }
            function r(e) {
                N = e, i(), q();
            }
            function i() {
                var e = N, t = e.premium, n = function() {
                    d(), i();
                }, r = h["default"].render(h["default"].createElement(S, {
                    premium: t,
                    critical: e.critical,
                    plus: e.plus,
                    opened: I,
                    referral: M,
                    closeReferral: P,
                    updateSize: n
                }), D);
                return I && d(), r;
            }
            function c() {
                L && (I || (D.style.visibility = "hidden", I = !0, i(), M && w.call("mixpanel.track", "WE:Referral_Notification_Shown", {
                    placement: "referral_gbutton",
                    product: "extension"
                }), w.call("felog.info", "g_button_hover_show"), w.call("mixpanel.track", "Ext:Gbutton_Shown", {
                    domain: l.getDomain()
                }), w.call("gnar.send", l.getBrowser() + "Ext/gButtonHover", {
                    pageDomain: l.getDomain()
                })));
            }
            function d() {
                var e = R.clientWidth, t = R.clientHeight, n = 38, r = a.getAbsRect(_);
                x["default"].extend(r, {
                    marginLeft: n - e,
                    marginTop: n - t,
                    width: e,
                    height: t
                }), B = B || {}, B.top != r.top || B.left != r.left ? (B = r, o.addClass(D, "no-transition"), 
                o.removeClass(A, E("show")), A.style.cssText = F(x["default"].extend(r, H)), setTimeout(d, 10)) : (o.removeClass(D, "no-transition"), 
                o.addClass(A, E("show")), A.style.cssText = F(r), D.style.visibility = ""), B = r;
            }
            function m() {
                if (I) {
                    var e = a.getAbsRect(_);
                    x["default"].extend(e, H), A.style.cssText = F(e), A.style.zIndex = "-1", I = !1, 
                    i(), o.isVisible(_) || v();
                }
            }
            function g() {
                o.listen(O.documentElement, "mousemove", n), T.on("iframe-mousemove", n);
            }
            function v(e) {
                (!I || e) && (o.unlisten(O.documentElement, "mousemove", n), T.un("iframe-mousemove", n));
            }
            function y() {
                v(), o.unlisten(A, "click", t), A.parentNode && A.parentNode.removeChild(A);
            }
            var _ = e.el, T = e.editor, N = {
                critical: 0,
                plus: 0
            }, M = e.referral, P = e.closeReferral, O = _.ownerDocument, D = O.createElement("div"), A = i().getDOMNode(), R = A.firstElementChild, I = void 0, L = !0, B = void 0;
            o.addClass(D, "gr-top-z-index"), o.addClass(D, "gr-top-zero"), O.documentElement.insertBefore(D, O.body), 
            o.unlisten(A, "click", t), v(!0), o.listen(A, "click", t), g();
            var F = x["default"].template("width:  <%= width %>px; height: <%= height %>px; margin-left: <%= marginLeft %>px; margin-top: <%= marginTop %>px;top: <%= top %>px; left: <%= left %>px;visibility: visible;"), H = {
                width: 24,
                height: 24,
                marginLeft: 0,
                marginTop: 0
            }, U = function(e) {
                return x["default"].chain(e).groupBy(function(e) {
                    var t = (e.critical, e.plus, e.premium), n = e.editorId;
                    return [ t, n ].join("");
                }).map(function(e) {
                    return e.pop();
                }).each(function(e) {
                    return w.call("statsc.ui.increment", "activity:errors_update");
                });
            }, z = b["default"](U, 1e4), q = x["default"].throttle(function() {
                return z.push(x["default"].extend({}, N, {
                    editorId: T.id
                }));
            }, 1e3);
            return {
                update: r,
                remove: y,
                show: c,
                bind: g,
                unbind: v,
                isOpened: function() {
                    return I;
                },
                disable: function() {
                    return L = !1;
                },
                enable: function() {
                    return L = !0;
                }
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./dom"), a = e("./position"), l = e("./util"), s = e("./config"), c = e("./message"), u = r(c), d = e("./textarea-btn"), f = r(d), m = e("grammarly-editor"), p = r(m), g = e("react"), h = r(g), v = e("./tracking/cargo"), b = r(v), y = e("./timers"), j = r(y), w = e("./tracking/index"), _ = e("lodash"), x = r(_), k = "gr-btn-hover-menu", E = function(e) {
            return k + "_" + e;
        }, C = function(e) {
            return E("line") + " " + E("line-" + e);
        }, T = function(e) {
            return E("btn") + " " + E("btn-" + e);
        };
        n["default"] = i;
        var N = h["default"].createClass({
            displayName: "ReferralLine",
            handleClose: function() {
                this.props.hideReferral(), this.props.updateSize(), this.props.closeReferral("gButton"), 
                w.call("mixpanel.track", "WE:Referral_Notification_Closed", {
                    placement: "gButton"
                });
            },
            goPremium: function() {
                u["default"].emitFocusedTab("referral-open-page", {
                    placement: "referral_gbutton",
                    type: "gButton"
                });
            },
            render: function() {
                return h["default"].createElement("div", {
                    className: C("referral")
                }, h["default"].createElement("div", {
                    className: E("referral-description")
                }, "Get a friend to try Grammarly, and you’ll both get one FREE week of Premium."), h["default"].createElement("div", {
                    className: E("referral-btn-container")
                }, h["default"].createElement("span", {
                    className: T("referral"),
                    onClick: this.goPremium
                }, "Go Premium!"), h["default"].createElement("span", {
                    className: E("referral-later"),
                    onClick: this.handleClose
                }, "Maybe later")));
            }
        }), S = h["default"].createClass({
            displayName: "HoveMenuComponent",
            getInitialState: function() {
                return {
                    showReferral: !0
                };
            },
            hideReferral: function() {
                this.setState({
                    showReferral: !1
                });
            },
            render: function() {
                var e = this.props, t = o.cs({
                    show: e.opened,
                    "premium-user": e.premium,
                    "freemium-user": !e.premium,
                    "critical-empty": !e.critical,
                    referral: this.state.showReferral && e.referral,
                    "plus-empty": !e.plus,
                    "plus-present": e.plus,
                    _10: e.plus > 9 || e.critical > 9,
                    _100: e.plus > 99 || e.critical > 99
                }, E), n = function(e) {
                    return l.declension(e, [ "issue", "issues", "issues" ]);
                }, r = e.referral ? h["default"].createElement(N, {
                    hideReferral: this.hideReferral,
                    closeReferral: this.props.closeReferral,
                    updateSize: this.props.updateSize
                }) : "";
                return h["default"].createElement("div", {
                    className: k + " " + t
                }, h["default"].createElement("div", {
                    className: E("wrap")
                }, r, h["default"].createElement("div", {
                    className: C("plus")
                }, h["default"].createElement("div", {
                    className: E("count")
                }, e.plus), h["default"].createElement("div", {
                    className: E("lbl")
                }, h["default"].createElement("div", {
                    className: E("lbl-wrap")
                }, h["default"].createElement("div", {
                    className: E("menu-plus")
                }, "ADVANCED"), " ", h["default"].createElement("br", null), h["default"].createElement("div", {
                    className: E("plus-lbl")
                }, n(e.plus)))), h["default"].createElement("div", {
                    className: T("upgrade")
                }, "Learn more")), h["default"].createElement("div", {
                    className: C("plus-empty")
                }, h["default"].createElement("div", {
                    className: E("lbl")
                }, h["default"].createElement("div", {
                    className: E("lbl-wrap")
                }, "No ", h["default"].createElement("div", {
                    className: E("menu-plus")
                }, "ADVANCED"), h["default"].createElement("br", null), " issues")), h["default"].createElement("div", {
                    className: T("upgrade")
                }, "Learn more")), h["default"].createElement("div", {
                    className: C("critical")
                }, h["default"].createElement("div", {
                    className: E("count")
                }, e.critical), h["default"].createElement("div", {
                    className: E("lbl")
                }, h["default"].createElement("div", {
                    className: E("lbl-wrap")
                }, "critical ", h["default"].createElement("br", null), h["default"].createElement("div", null, n(e.critical)))), h["default"].createElement("div", {
                    className: T("critical")
                }, "Correct")), h["default"].createElement("div", {
                    className: C("critical-empty")
                }, h["default"].createElement("div", {
                    className: E("lbl")
                }, h["default"].createElement("div", {
                    className: E("lbl-wrap")
                }, "No critical", h["default"].createElement("br", null), " issues")), h["default"].createElement("div", {
                    className: T("critical")
                }, "Open Grammarly"))));
            }
        });
        t.exports = n["default"];
    }, {
        "./config": "/project/src/js/lib/config.js",
        "./dom": "/project/src/js/lib/dom.js",
        "./message": "/project/src/js/lib/message.js",
        "./position": "/project/src/js/lib/position.js",
        "./textarea-btn": "/project/src/js/lib/textarea-btn.js",
        "./timers": "/project/src/js/lib/timers.js",
        "./tracking/cargo": "/project/src/js/lib/tracking/cargo.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js",
        "grammarly-editor": "grammarly-editor",
        lodash: "lodash",
        react: "react"
    } ],
    "/project/src/js/lib/btn-pos.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./position"), o = e("./dom"), a = e("./util"), l = e("./window-events"), s = r(l), c = e("emitter"), u = r(c), d = e("lodash"), f = r(d), m = e("./sites"), p = r(m), g = function(e) {
            function t() {
                setTimeout(l, 10);
            }
            function n() {
                o.isFocused(_) && l();
            }
            function r() {
                try {
                    var e = i.getPos(k), t = e.x != E.x || e.y != E.y;
                    (P != j.clientWidth || O != j.clientHeight || t) && (E = e, l());
                } catch (n) {
                    console.log(n), a.cancelInterval(r, 200);
                }
            }
            function l() {
                var e = {};
                if (S && M) return R.emit("update", {
                    addClass: "show",
                    visibility: ""
                });
                R.emit("update", {
                    addClass: "show",
                    visibility: "hidden"
                });
                var t = i.getAbsRect(k), n = i.getAbsRect(b), r = o.compStyle(k, "border-top-width", "border-left-width", "resize"), a = -1 == [ "both", "horizontal", "vertical" ].indexOf(r.resize) ? 0 : -5, l = -8;
                (0 == t.width || 0 == t.height) && o.removeClass(b, "show"), P = j.clientWidth, 
                O = j.clientHeight;
                var s = o.compStyle(j, "padding-top", "padding-bottom", "overflowX", "overflow", "height");
                x || "scroll" == s.overflowX || "scroll" == s.overflow || (t.height = Math.max(parseInt(s.height), j.offsetHeight));
                var c = O - parseInt(s["padding-top"]) - parseInt(s["padding-bottom"]);
                C > O && (l = -3);
                var u = t.left + t.width - n.left - n.width - (b.offsetWidth - b.clientWidth - parseInt(r["border-left-width"]) + k.offsetWidth - k.clientWidth), d = t.top + t.height - n.top - n.height - (b.offsetHeight - b.clientHeight - parseInt(r["border-top-width"]));
                f["default"].extend(e, {
                    "margin-left": Math.floor(parseInt(o.compStyle(b, "margin-left")) + u + l + a),
                    "margin-top": Math.floor(parseInt(o.compStyle(b, "margin-top")) + d + l)
                });
                var p = o.compStyle(j, "overflow-x", "overflow-y");
                p["overflow-y"] != k.style.overflowY && (k.style.overflowY = p["overflow-y"]), p["overflow-x"] != k.style.overflowX && (k.style.overflowX = p["overflow-x"]), 
                D && D.btnMargin(e, _), C > c && m(), e.visibility = "", R.emit("update", e);
            }
            function c() {
                var e = {
                    "z-index": (parseInt(o.css(_, "z-index")) || 1) + 1
                };
                if (a.isGmail(w)) {
                    var t = o.getParentByTag(k, "TABLE"), n = t && o.getParentByTag(t, "TABLE"), r = void 0, i = n && n.querySelector('[command="Files"]');
                    n && i ? (r = o.getParentByTag(i, "TABLE"), o.insertAfter(y, r), S = !0, f["default"].extend(e, {
                        right: 10,
                        top: -20,
                        left: "auto"
                    })) : o.insertAfter(y, k);
                } else o.insertAfter(y, k);
                R.emit("update", e);
            }
            function d(e) {
                function t() {
                    N = 0, R.emit("update", {
                        opacity: "1"
                    });
                }
                return e ? t() : void (3 > N ? (N++, clearTimeout(T), T = setTimeout(function() {
                    return N = 0;
                }, 3e3)) : R.emit("update", {
                    opacity: "0.2"
                }));
            }
            function m() {
                M = !1, R.emit("update", {
                    removeClass: "show"
                });
            }
            function g() {
                d(!0), h(), M || l();
            }
            function h() {
                _.clientHeight < C || (R.emit("update", {
                    addClass: "show"
                }), M = !0);
            }
            function v() {
                a.cancelInterval(r), s["default"].off(A);
            }
            var b = e.el, y = e.container, j = e.srcEl, w = b.ownerDocument, _ = e.editorEl, x = e.isTextarea, k = e.posSourceEl || _, E = i.getPos(k), C = 25, T = void 0, N = 0, S = void 0, M = void 0, P = void 0, O = void 0, D = p["default"](w).getFixesForCurrentDomain(), A = {
                resize: l,
                keyup: n,
                paste: t
            };
            s["default"].on(A), a.interval(r, 200);
            var R = u["default"]({
                update: l,
                insert: c,
                camouflage: d,
                show: g,
                hide: m,
                remove: v
            });
            return R;
        };
        n["default"] = g, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./position": "/project/src/js/lib/position.js",
        "./sites": "/project/src/js/lib/sites.js",
        "./util": "/project/src/js/lib/util.js",
        "./window-events": "/project/src/js/lib/window-events.js",
        emitter: "emitter",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/chrome-permissions.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./message"), o = r(i), a = e("./util"), l = e("./dom"), s = e("react"), c = r(s), u = e("./tracking/index"), d = "gr_-permission-explanation", f = function(e) {
            return d + "_" + e;
        }, m = function(e) {
            function t(t) {
                var n = t.replace;
                t.replace = function() {
                    for (var i = arguments.length, o = Array(i), l = 0; i > l; l++) o[l] = arguments[l];
                    d() || n.apply(void 0, o), r(function(r) {
                        if (r) {
                            var i = e.getText(!0), l = t.value;
                            n.apply(void 0, o), setTimeout(function() {
                                var n = e.getText(!0), r = n.substring(t.s, t.e);
                                r == t.value ? (u.call("felog.info", "clipboard_replacement_success"), u.call("mixpanel.track", "Ext:Clipboard_Preplacement_success", {
                                    domain: a.getDomain()
                                })) : u.call("mixpanel.track", "Ext:Clipboard_Replacement_error", {
                                    expected: t.value,
                                    domain: a.getDomain(),
                                    actual: r
                                });
                                var o = Math.abs(t.value.length - l.length), s = Math.abs(n.length - i.length);
                                s > o && u.call("mixpanel.track", "Ext:Clipboard_Replacement_error_text_length", {
                                    diff: s,
                                    domain: a.getDomain()
                                });
                            }, 200);
                        }
                    });
                };
            }
            function n() {
                d() && o["default"].emitBackground("contains-chrome-permissions", [ "clipboardRead" ], function(n) {
                    if (s = n, !n) {
                        e.on("matchExtend", function(e) {
                            return d() && t(e);
                        });
                        var i = e.showDialog;
                        e.showDialog = function() {
                            d() || i(), r(function(e) {
                                e && (i(), u.call("felog.info", "clipboard_popup_shown"), u.call("mixpanel.track", "Ext:Clipboard_Popup_shown", {
                                    domain: a.getDomain()
                                }));
                            });
                        };
                    }
                });
            }
            function r(e) {
                d() && (i(), u.call("felog.info", "clipboard_permission_shown"), u.call("mixpanel.track", "Ext:Clipboard_Permission_Shown", {
                    domain: a.getDomain()
                }), o["default"].emitBackground("ask-chrome-permissions", [ "clipboardRead" ], function(t) {
                    s = t, f.remove(), t ? (u.call("felog.info", "clipboard_permission_allow"), u.call("mixpanel.track", "Ext:Clipboard_Permission_Allow", {
                        domain: a.getDomain()
                    })) : (u.call("felog.info", "clipboard_permission_deny"), u.call("mixpanel.track", "Ext:Clipboard_Permission_Deny", {
                        domain: a.getDomain()
                    })), e(t);
                }));
            }
            function i() {
                f = l.renderReactWithParent(c["default"].createElement(p, null), e.el.ownerDocument.documentElement, a.guid());
            }
            var s = !1, d = function() {
                return e.isHtmlGhost && a.isChrome() && !s;
            }, f = void 0;
            return {
                checkClipboard: n
            };
        };
        n["default"] = m;
        var p = c["default"].createClass({
            displayName: "Explanation",
            render: function() {
                return c["default"].createElement("div", {
                    className: d
                }, c["default"].createElement("div", {
                    className: f("arr")
                }), c["default"].createElement("div", {
                    className: f("message")
                }, c["default"].createElement("div", {
                    className: f("message-title")
                }, "To fix mistakes, Grammarly needs", c["default"].createElement("br", null), " your permission to access text fields."), c["default"].createElement("br", null), "This site currently blocks all browser extensions from", c["default"].createElement("br", null), " changes to its text fields via copy and paste.", c["default"].createElement("br", null), "Please click ", c["default"].createElement("span", {
                    className: f("allow")
                }, "Allow"), " to give your permission."));
            }
        });
        t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./message": "/project/src/js/lib/message.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js",
        react: "react"
    } ],
    "/project/src/js/lib/client-script.js": [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("dompurify"), i = function() {
            function e(e) {
                function n(e) {
                    function t(e) {
                        if (e.parentNode) if (e.childNodes.length > 1) {
                            for (var t = document.createDocumentFragment(); e.childNodes.length > 0; ) {
                                var n = e.childNodes[0];
                                t.appendChild(n);
                            }
                            e.parentNode.replaceChild(t, e);
                        } else e.firstChild ? e.parentNode.replaceChild(e.firstChild, e) : e.parentNode.removeChild(e);
                    }
                    function n(e) {
                        if (e) try {
                            for (var n = e.querySelectorAll(".gr_"), r = n.length, i = 0; r > i; i++) t(n[i]);
                        } catch (o) {}
                    }
                    function r(e) {
                        try {
                            Object.defineProperty(e, "innerHTML", {
                                get: function() {
                                    try {
                                        var t = e.ownerDocument.createRange();
                                        t.selectNodeContents(e);
                                        var r = t.cloneContents(), i = document.createElement("div");
                                        return i.appendChild(r), n(i), i.innerHTML;
                                    } catch (o) {}
                                },
                                set: function(t) {
                                    try {
                                        var n = e.ownerDocument.createRange();
                                        n.selectNodeContents(e), n.deleteContents();
                                        var r = n.createContextualFragment(t);
                                        e.appendChild(r);
                                    } catch (i) {}
                                }
                            });
                        } catch (t) {}
                    }
                    if (e) {
                        var i = e.cloneNode;
                        e.cloneNode = function(t) {
                            var o = i.call(e, t);
                            if (e.classList.contains("mceContentBody")) o.innerHTML = e.innerHTML, n(o); else try {
                                r(o);
                            } catch (a) {}
                            return o;
                        }, r(e);
                    }
                }
                if ("TEXTAREA" != e.tagName) try {
                    var i = e.ownerDocument, o = e.getAttribute("data-gramm_id");
                    o = r.sanitize(o);
                    var a = '[data-gramm_id="' + o + '"]', l = "document.querySelector('" + a + "')";
                    t(i, [ n ], [ l ]);
                } catch (s) {
                    console.log("error rewrite " + s);
                }
            }
            function t(e, t, n) {
                var r = e.createElement("script");
                n = n || [];
                var i = t.join(" "), o = (t[t.length - 1].name, n.join(","));
                r.innerHTML = "(function(){(" + i + ")(" + o + ") })()", e.head.appendChild(r);
            }
            return {
                rewriteInnerHTML: e,
                addScript: t
            };
        }();
        n["default"] = i, t.exports = n["default"];
    }, {
        dompurify: "dompurify"
    } ],
    "/project/src/js/lib/config.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o() {
                return new Promise(function(e) {
                    return g["default"].get("qa", function(t) {
                        if (e(), t) {
                            console.log("QA MODE ON");
                            var n = "https://qane.grammarly.com", r = "https://qaauth.grammarly.com/user", i = "https://qanf.grammarly.com/after_install_page", o = {
                                app: n,
                                capi: "wss://qacapi.grammarly.com/freews",
                                dapiMimic: "https://qadata.grammarly.com/api/mimic",
                                editor: n + "/popup2",
                                referralSmokeUpgrade: "https://qairbis.grammarly.com/api/discounts/ntuDkR",
                                referralSmokeBitly: "https://irbis.grammarly.com/api/discounts/refsmk70",
                                dictionary: "https://qacapi.grammarly.com/api/defs",
                                upgrade: "https://qanf.grammarly.com/upgrade?app_type=popup",
                                authUser: r,
                                authGroup: r + "/group",
                                authPing: r + "/sync",
                                authCreateAnonymous: r + "/anonymous",
                                authCreatePage: "https://qaauth.grammarly.com/redirect-anonymous?location=" + i,
                                docs: n + "/docs",
                                docsApi: "https://qadox2.grammarly.com/documents",
                                offline: "https://ed.grammarly.com/download/firefox/update.json",
                                welcomeC: "https://qanf.grammarly.com/extension-success",
                                uninstall: "https://qanf.grammarly.com/extension-uninstall",
                                userOrAnonymous: "https://qaauth.grammarly.com/user/oranonymous",
                                welcomeFandS: i,
                                raven: "felog.grammarly.io"
                            };
                            Object.assign(T, o);
                        }
                    });
                });
            }
            function a() {
                return d["default"] ? d["default"].config.modules.parameters.version : void 0;
            }
            function l() {
                return d["default"] ? d["default"].config.uuid : void 0;
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var s = e("./util"), c = i(s), u = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, d = i(u), f = e("lodash"), m = i(f), p = e("./prefs"), g = i(p), h = {
                "mail.google.com": {
                    fields: [ {
                        name: "to"
                    }, {
                        name: "cc"
                    }, {
                        name: "bcc"
                    }, {
                        className: "vO"
                    } ],
                    subframes: !1
                },
                newtab: {
                    enabled: !1
                },
                version: {
                    enabled: !1
                },
                extensions: {
                    enabled: !1
                },
                "grammarly.com": {
                    enabled: !1
                },
                "free.grammarly.com": {
                    enabled: !1
                },
                "app.grammarly.com": {
                    enabled: !1
                },
                "ed.grammarly.com": {
                    enabled: !1
                },
                "app.asana.com": {
                    enabled: !1
                },
                "hootsuite.com": {
                    enabled: !1
                },
                "plus.google.com": {
                    enabled: !1
                },
                "chrome.google.com": {
                    enabled: !1
                },
                "facebook.com": {
                    enabled: !0,
                    minFieldHeight: 0
                },
                "onedrive.live.com": {
                    enabled: !1
                },
                "docs.com": {
                    enabled: !1
                },
                "sp.docs.com": {
                    enabled: !1
                },
                "docs.google.com": {
                    enabled: !1,
                    track: !0
                },
                "jsbin.com": {
                    enabled: !1
                },
                "jsfiddle.net": {
                    enabled: !1
                },
                "quora.com": {
                    enabled: !1
                },
                "twitter.com": {
                    enabled: !c["default"].isFF() && !c["default"].isSafari()
                },
                "com.safari.grammarlyspellcheckergrammarchecker": {
                    enabled: !1,
                    matchPartOfUrl: !0
                },
                "mail.live.com": {
                    enabled: !1,
                    matchPartOfUrl: !0
                }
            }, v = m["default"].filter(h, function(e, t) {
                return e.matchPartOfUrl ? (e.key = t, e) : void 0;
            }), b = [ "mail.google.com", "yahoo.com", "mail.live.com", "facebook.com", "tumblr.com", "stackoverflow.com", "wordpress.com", "wordpress.org", "blogspot.com" ], y = {
                key: "b37252e300204b00ad697fe1d3b979e1",
                project: "15",
                pingTimeout: 6e5
            }, j = {
                url: "https://gnar.grammarly.com",
                qaUrl: "https://qagnar.grammarly.com"
            }, w = "c10dd64c87f70ef5563a63c368797e8c", _ = {
                qaKey: "7a5c95b5cba1b225d00cc3ba1c410c78",
                key: w,
                cookie: "mp_" + w + "_mixpanel"
            }, x = {
                URL: "https://stats-public.grammarly.io/",
                PREFIX: "grammarly.ui"
            }, k = "https://app.grammarly.com", E = "https://auth.grammarly.com/user", C = "https://www.grammarly.com/after_install_page", T = {
                app: k,
                capi: "wss://capi.grammarly.com/freews",
                dapiMimic: "https://data.grammarly.com/api/mimic",
                editor: k + "/popup2",
                referralSmokeUpgrade: "https://irbis.grammarly.com/api/discounts/ntuDkR",
                referralSmokeBitly: "http://bit.ly/gramm70off",
                dictionary: "https://capi.grammarly.com/api/defs",
                upgrade: "https://grammarly.com/upgrade?app_type=popup",
                authUser: E,
                authGroup: E + "/group",
                authPing: E + "/sync",
                authCreateAnonymous: E + "/anonymous",
                authCreatePage: "https://auth.grammarly.com/redirect-anonymous?location=" + C,
                docs: k + "/docs",
                docsApi: "https://dox.grammarly.com/documents",
                offline: "https://ed.grammarly.com/download/firefox/update.json",
                welcomeC: "https://www.grammarly.com/extension-success",
                uninstall: "https://www.grammarly.com/extension-uninstall",
                userOrAnonymous: "https://auth.grammarly.com/user/oranonymous",
                welcomeFandS: C,
                raven: "felog.grammarly.io"
            };
            n["default"] = {
                PAGE_CONFIG: h,
                URLS: T,
                FELOG: y,
                STATSC: x,
                MIXPANEL: _,
                GNAR: j,
                SITES_TO_RELOAD: b,
                getVersion: a,
                getUuid: l,
                checkEnv: o,
                isTest: !d["default"],
                restrictedAttrs: [ "data-gramm_editor", "data-gramm", "data-gramm_id", "gramm_editor" ],
                enabled: function(e) {
                    return new Promise(function(t, n) {
                        var r = h[e], i = r ? r.enabled !== !1 : !0;
                        return i ? void c["default"].getDomain(function(r) {
                            var i = h[r];
                            return r == e || !i || i.subframes !== !1 && i.enabled !== !1 ? void (0 == m["default"].filter(v, function(t) {
                                return e.indexOf(t.key) > -1 && !t.enabled;
                            }).length ? t() : n("domain is a part of site banned by black list")) : n("not allowed on subframes on this page");
                        }) : n("domain banned by black list");
                    });
                },
                development: "127.0.0.1:3117" == document.location.host
            }, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./prefs": "/project/src/js/lib/prefs.js",
        "./util": "/project/src/js/lib/util.js",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/console.js": [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./util"), i = void 0;
        i = r.isBgOrPopup() ? window.console : window.gdebug = function() {
            var e = console;
            return function(t) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
                t === !1 ? (window.console = {}, window.console.log = r._f, n ? (window.console.info = r._f, 
                window.console.warn = r._f, window.console.error = r._f) : (window.console.info = e.info, 
                window.console.warn = e.warn, window.console.error = e.error)) : window.console = e;
            };
        }(), n["default"] = i, t.exports = n["default"];
    }, {
        "./util": "/project/src/js/lib/util.js"
    } ],
    "/project/src/js/lib/dialog.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            function t(e) {
                var t = "off" == e;
                a.toggleClass(M.body, t, "gr-disable-scroll"), a.toggleClass(M.documentElement, t, "gr-disable-scroll");
            }
            function n(e) {
                B && e == B.editorId && m();
            }
            function r() {
                L = !0, t("off");
                var e = u["default"]({
                    doc: M
                });
                e.on("hide", function() {
                    t("on"), v.call("felog.info", "signin_close", {
                        active_time: h["default"].stop(O)
                    });
                }), v.call("felog.info", "signin_open");
            }
            function i() {
                k.user() && (I = !0, A = M.querySelector(w), A || (A = a.renderReactWithParent(p["default"].createElement(E, null), M.documentElement, o.guid()).component.getDOMNode()), 
                R = A.querySelector(_("back")));
            }
            function l() {
                var e = {
                    "mail.google.com": "Gmail",
                    "facebook.com": "Facebook",
                    "twitter.com": "Twitter"
                };
                return "Back to " + (e[o.getDomain()] || document.title);
            }
            function s(e) {
                e.stopPropagation(e), T();
            }
            function c(e) {
                f["default"].emitTabs("editor-set-state", e);
            }
            function d() {
                f["default"].emitTabs("dialog-closed", B.editorId);
            }
            function m() {
                if (D) {
                    var e = function() {
                        P.el.style.background = "";
                        var e = c;
                        return c = function(t) {
                            c = e, P.refresh(), f["default"].emitTabs("after-refresh-dialog", t);
                        }, T(), {
                            v: void 0
                        };
                    }();
                    if ("object" == typeof e) return e.v;
                }
                P.refresh();
            }
            function g(e) {
                f["default"].emitBackground("iframe-mode", {
                    iframeMode: e,
                    id: B.socketId
                });
            }
            function b(e) {
                function n() {
                    L = !1, I || i(), A.style.opacity = 0, a.addClass(A, "gr-_show");
                    var n = y["default"].extend({
                        favicon: a.getFavicon(),
                        page: l()
                    }, e);
                    P.send(n), g(!0), setTimeout(function() {
                        return A.style.opacity = 1;
                    }, 10), t("off"), a.listen(M.body, "keydown", S), a.listen(R, "click", s), a.listen(A, "click", s), 
                    D = !0;
                }
                return h["default"].start(O), B = e, k.isAnonymous() ? r() : void P.activate({
                    doc: M,
                    editorId: e.editorId,
                    matches: e.matches,
                    isUpdateUrl: L
                }, function(e) {
                    return e ? r() : void n();
                });
            }
            function j(e) {
                "edit" == e.action && c(e), "close" == e.action && T(), "initialized" == e.action && (C(e), 
                setTimeout(function() {
                    return P.el.style.background = "transparent";
                }, 300)), "socket" == e.action && f["default"].emitBackground("socket-client", e);
            }
            function x(e, t) {
                B && e.socketId == B.socketId && (t("ok"), console.log("SENDING OK"), e.action = "socket", 
                P.send(e));
            }
            function C(e) {
                var t = "Premium" == e.userType ? "freemium-plus" : "freemium";
                M.documentElement.setAttribute("data-type", t);
            }
            function T() {
                if (D) {
                    D = !1, t("on"), A.style.opacity = 0, a.removeClass(A, "gr-_show"), a.unlisten(M.body, "keydown", S), 
                    a.unlisten(R, "click", s), a.unlisten(A, "click", s), P.send({
                        action: "hide"
                    }), g(!1), d();
                    var e = {
                        active_time: h["default"].stop(O)
                    };
                    v.call("statsc.ui.timing", "stability:editor.close", e.active_time), v.call("felog.event", "close_popup", e);
                }
            }
            function N() {
                window == window.top && (f["default"].off("show-dialog", b), f["default"].off("hide-dialog", T), 
                f["default"].off("refresh-dialog", n), f["default"].off("socket-server-iframe", x)), 
                P.un("message", j), A.parentNode.removeChild(A);
            }
            function S(e) {
                return 27 == e.keyCode && D ? (e.stopPropagation(), e.preventDefault(), T()) : void 0;
            }
            var M = e.doc, P = e.iframe, O = Symbol("Dialog"), D = !1, A = void 0, R = void 0, I = void 0, L = void 0, B = void 0, F = {
                show: b,
                hide: T,
                remove: N,
                refresh: m
            };
            return P.on("message", j), window == window.top && (f["default"].on("show-dialog", b), 
            f["default"].on("hide-dialog", T), f["default"].on("refresh-dialog", n), f["default"].on("socket-server-iframe", x)), 
            i(), F;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./util"), a = e("./dom"), l = e("./iframe"), s = r(l), c = e("./signin"), u = r(c), d = e("./message"), f = r(d), m = e("react"), p = r(m), g = e("./timers"), h = r(g), v = e("./tracking/index"), b = e("lodash"), y = r(b), j = "gr_-editor", w = "." + j, _ = function(e) {
            return "." + j + "_" + e;
        }, x = function(e) {
            return j + "_" + e;
        }, k = {
            isAnonymous: o._f,
            user: o._F
        };
        n["default"] = i;
        var E = p["default"].createClass({
            displayName: "DialogComponent",
            render: function() {
                var e = {
                    display: "none"
                };
                return p["default"].createElement("div", {
                    className: j,
                    style: e
                }, p["default"].createElement("div", {
                    className: x("back")
                }), p["default"].createElement("iframe", {
                    className: s["default"].baseCls + " gr-_dialog-content"
                }));
            }
        });
        t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./iframe": "/project/src/js/lib/iframe.js",
        "./message": "/project/src/js/lib/message.js",
        "./signin": "/project/src/js/lib/signin.js",
        "./timers": "/project/src/js/lib/timers.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js",
        lodash: "lodash",
        react: "react"
    } ],
    "/project/src/js/lib/dictionary-card.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        }
        function o() {
            function e(e) {
                b.innerHTML = g["default"].sanitize(e);
                var t = b.querySelector("span.qualifier");
                return t ? (t.innerHTML = t.innerHTML.replace("(", "").replace(")", ""), b.innerHTML) : e;
            }
            function t(e) {
                return e.replace(/&lt;(sup|sub)&gt;(.*?)&lt;(\/sup|\/sub)&gt;/, "<$1>$2<$3>").replace(/&amp;(?=\w{1,8};)/, "&");
            }
            function n(n, i) {
                var o = {
                    ownerDocument: f,
                    getBoundingClientRect: function() {
                        return i.pos;
                    },
                    getClientRects: function() {
                        return [ i.pos ];
                    }
                };
                if (N = n, N.defs && N.defs.length) {
                    var a = c["default"].getAbsRect(o);
                    N.title = i.el.toString(), N.defs = N.defs.splice(0, 3).map(e).map(t), C = r(!1), 
                    T = C.component.getDOMNode(), S = c["default"].posToRect(T, a), r();
                } else x.enable(), x.show({
                    posEl: i.el,
                    text: "No definition found"
                });
                v["default"].on(M, !0), y["default"].start(w), j.call("felog.event", "dictionary_open");
            }
            function r() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
                return l["default"].renderReactWithParent(m["default"].createElement(E, {
                    pos: S,
                    data: N,
                    visible: e,
                    className: h
                }), f.documentElement, w, "grammarly-card");
            }
            function i() {
                C && C.remove(), v["default"].off(M, !0), P.emit("hide"), x.disable(), x.hide(), 
                C = null, j.call("felog.info", "dictionary_close", {
                    active_time: y["default"].stop(w)
                });
            }
            function o(e) {
                27 == e.keyCode && i();
            }
            function a(e) {
                var t = l["default"].inEl(e.target, T);
                (!t || t && l["default"].hasClass(e.target, k("btn-close"))) && i();
            }
            var s = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], u = s.doc, f = void 0 === u ? document : u, p = s.domCls, h = void 0 === p ? "" : p, b = f.createElement("div"), w = Symbol("DictionaryCard"), x = _["default"]({
                cls: "gr-notfound-tooltip",
                enabled: !1,
                doc: f
            }), C = void 0, T = void 0, N = void 0, S = void 0, M = {
                click: a,
                keydown: o,
                scroll: i,
                resize: i
            }, P = d["default"]({
                show: n,
                hide: i,
                unescapeSuperscript: t
            });
            return P;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("./dom"), l = r(a), s = e("./position"), c = r(s), u = e("emitter"), d = r(u), f = e("react"), m = r(f), p = e("dompurify"), g = r(p), h = e("./window-events"), v = r(h), b = e("./timers"), y = r(b), j = e("./tracking/index"), w = e("./tooltip"), _ = r(w), x = "gr-dictionary-card", k = function(e) {
            return x + "_" + e;
        }, E = m["default"].createClass({
            displayName: "DictionaryCard",
            getDefaultProps: function() {
                return {
                    pos: {
                        rect: {
                            top: 0,
                            left: 0,
                            width: 0
                        },
                        sourceRect: {
                            width: 0
                        },
                        delta: {
                            right: 0
                        },
                        className: "",
                        visible: !1
                    }
                };
            },
            getTriangleMargin: function() {
                var e = this.props.pos.sourceRect.width / 2;
                return this.props.pos.delta.right > 0 ? e : -this.props.pos.delta.right + e;
            },
            renderContent: function() {
                var e = this.props.data;
                return e.defs.map(function(t, n) {
                    var r, o = t.replace(/^([:,]\s)/, "");
                    o = o[0].toUpperCase() + o.substring(1, o.length);
                    var a = l["default"].cs((r = {}, i(r, k("item-single"), 1 == e.defs.length), i(r, k("item"), !0), 
                    r));
                    return m["default"].createElement("div", {
                        key: n,
                        className: a,
                        dangerouslySetInnerHTML: {
                            __html: g["default"].sanitize(o)
                        }
                    });
                });
            },
            renderFooterLink: function() {
                var e = this.props.data;
                if (e.url) {
                    var t = function() {
                        var t = "wiki" == e.origin ? "More on Wikipedia" : "More on Grammarly Words";
                        return {
                            v: m["default"].createElement("a", {
                                className: k("link"),
                                href: encodeURI(e.url),
                                onClick: function() {
                                    return j.call("felog.info", "dictionary_goto", {
                                        type: t
                                    });
                                },
                                target: "_blank"
                            }, t)
                        };
                    }();
                    if ("object" == typeof t) return t.v;
                }
            },
            render: function() {
                var e, t = {}, n = this.props.pos, r = l["default"].cs((e = {}, i(e, x, !0), i(e, k("empty"), 0 == this.props.data.defs.length), 
                i(e, k("flip"), n.rect.flip), i(e, this.props.className, this.props.className), 
                e)), o = {
                    marginLeft: this.getTriangleMargin()
                };
                return t.top = n.rect.top, t.left = n.rect.left, t.visibility = this.props.visible ? "" : "hidden", 
                m["default"].createElement("div", {
                    style: t,
                    className: r
                }, m["default"].createElement("span", {
                    style: o,
                    className: k("triangle")
                }), m["default"].createElement("div", {
                    className: k("title")
                }, this.props.data.title), m["default"].createElement("div", {
                    className: k("content")
                }, this.renderContent()), m["default"].createElement("div", {
                    className: k("footer")
                }, this.renderFooterLink(), m["default"].createElement("div", {
                    className: k("btn-close")
                }, "Close")));
            }
        });
        o.component = E, n["default"] = o, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./position": "/project/src/js/lib/position.js",
        "./timers": "/project/src/js/lib/timers.js",
        "./tooltip": "/project/src/js/lib/tooltip.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./window-events": "/project/src/js/lib/window-events.js",
        dompurify: "dompurify",
        emitter: "emitter",
        react: "react"
    } ],
    "/project/src/js/lib/dictionary.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        }, o = e("emitter"), a = r(o), l = e("./util"), s = e("./config"), c = e("./dom"), u = e("./selection"), d = r(u), f = e("./selection-animator"), m = r(f), p = e("./dictionary-card"), g = r(p), h = e("./request"), v = e("./prefs"), b = r(v), y = r(s), j = function(e) {
            function t() {
                m["default"].remove(), u = null;
            }
            function n(e) {
                y["default"].enabled(l.getDomain(f)) && b["default"].enabled(function(t) {
                    t && r(e);
                });
            }
            function r(e) {
                var t = e.el.startContainer ? e.el.startContainer.parentNode : e.el;
                c.matchesSelector(t, ".gr-grammar-card, .gr-grammar-card *, .gr-dictionary-card, .gr-dictionary-card *") || (m["default"].animate(e.el, f, "gr-selection-anim-dict"), 
                u = e, b["default"].get("token", function(t) {
                    return h.fetch(s.URLS.dictionary, {
                        data: i({}, e.data, {
                            c: t
                        })
                    }).then(function(t) {
                        u == e && o(t, e);
                    })["catch"](function(e) {
                        m["default"].remove(), console.log("request failed", e);
                    });
                }));
            }
            function o(e, t) {
                m["default"].complete(), v.show(e, t);
            }
            var u = void 0, f = e.doc, p = d["default"](f), v = g["default"]({
                doc: f
            });
            return p.on("select", n), p.on("unselect", t), v.on("hide", t), a["default"]({});
        };
        n["default"] = j, t.exports = n["default"];
    }, {
        "./config": "/project/src/js/lib/config.js",
        "./dictionary-card": "/project/src/js/lib/dictionary-card.js",
        "./dom": "/project/src/js/lib/dom.js",
        "./prefs": "/project/src/js/lib/prefs.js",
        "./request": "/project/src/js/lib/request.js",
        "./selection": "/project/src/js/lib/selection.js",
        "./selection-animator": "/project/src/js/lib/selection-animator.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter"
    } ],
    "/project/src/js/lib/dom.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e, t) {
            var n = (t || document).createElement("div");
            return n.innerHTML = e.trim(), n.firstElementChild;
        }
        function o(e, t, n) {
            var r = arguments.length <= 3 || void 0 === arguments[3] ? "div" : arguments[3], i = t[n] || {};
            t[n] = i, i.el || (i.el = t.ownerDocument.createElement(r), t.appendChild(i.el));
            var o = G["default"].render(e, i.el);
            return i.remove || (i.remove = function() {
                delete t[n], t.removeChild(i.el), G["default"].unmountComponentAtNode(i.el);
            }), {
                component: o,
                remove: i.remove,
                el: i.el
            };
        }
        function a(e, t) {
            for (var n = arguments.length <= 2 || void 0 === arguments[2] ? 1e3 : arguments[2], r = 0; e.parentNode && n > r; ) {
                if ("string" != typeof t && t == e) return !0;
                if (e.id == t || e == t) return !0;
                e = e.parentNode;
            }
            return !1;
        }
        function l(e, t) {
            return e && void 0 != e.className ? e.classList.contains(t) : !1;
        }
        function s(e, t) {
            return e && e.classList ? e.classList.remove(t) : void 0;
        }
        function c(e, t) {
            if (e) {
                if (-1 == t.indexOf(" ")) return e.classList.add(t);
                t = t.split(" ");
                for (var n = 0; n < t.length; n++) e.classList.add(t[n]);
            }
        }
        function u(e, t, n) {
            t ? c(e, n) : s(e, n);
        }
        function d(e, t) {
            for (;e = e.parentNode; ) if (f(e, t)) return e;
            return !1;
        }
        function f(e, t) {
            return e.matches ? e.matches(t) : e.matchesSelector ? e.matchesSelector(t) : e.webkitMatchesSelector ? e.webkitMatchesSelector(t) : e.mozMatchesSelector ? e.mozMatchesSelector(t) : window.$ && window.$.is ? window.$(e).is(t) : void 0;
        }
        function m(e) {
            return V.isFF() ? e.ownerDocument.activeElement == e : document.activeElement && "IFRAME" == document.activeElement.tagName ? e === e.ownerDocument.activeElement : document.activeElement && "BODY" == document.activeElement.tagName ? e === document.activeElement : e === document.activeElement;
        }
        function p(e, t, n, r) {
            var i = arguments.length <= 4 || void 0 === arguments[4] ? !1 : arguments[4];
            if (e) {
                if (z["default"].isObject(t)) return z["default"].each(t, function(t, n) {
                    p(e, n, t, r);
                });
                var o = r ? "removeEventListener" : "addEventListener", a = e[W] || [];
                return e[W] = a, r ? e[W] = a.filter(function(e) {
                    return !(e.event == t && e.cb == n);
                }) : a.push({
                    event: t,
                    cb: n
                }), e[o](t, n, i), n.__wrapFunc = n.__wrapFunc || function(e) {
                    e = e || {}, n(z["default"].extend({
                        originalEvent: e,
                        preventDefault: V._f,
                        stopPropagation: V._f
                    }, e.detail));
                }, e[o](t + "-gr", n.__wrapFunc, i), {
                    el: e,
                    event: t,
                    cb: n,
                    bubble: i
                };
            }
        }
        function g(e, t, n, r) {
            return !t && e[W] ? e[W].each(function(t) {
                return g(e, t.event, t.cb, t.bubble);
            }) : void p(e, t, n, !0, r);
        }
        function h(e) {
            var t = getComputedStyle(e, null), n = "none" != t.getPropertyValue("display") && "hidden" != t.getPropertyValue("visibility") && e.clientHeight > 0;
            return n;
        }
        function v(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? function(e) {
                return e;
            } : arguments[1];
            return z["default"].keys(e).filter(function(t) {
                return e[t];
            }).map(function(e) {
                return t(e);
            }).join(" ");
        }
        function b(e, t) {
            return "number" != typeof t || X[w(e)] ? t : t + "px";
        }
        function y(e) {
            return e.replace(/-+(.)?/g, function(e, t) {
                return t ? t.toUpperCase() : "";
            });
        }
        function j(e) {
            return z["default"].transform(e, function(e, t, n) {
                return e[y(n)] = t;
            });
        }
        function w(e) {
            return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
        }
        function _(e, t, n) {
            if (arguments.length < 3) {
                var r = function() {
                    var n = e, r = getComputedStyle(n, "");
                    if (!n) return {
                        v: void 0
                    };
                    if ("string" == typeof t) return {
                        v: n.style[y(t)] || r.getPropertyValue(t)
                    };
                    if (z["default"].isArray(t)) {
                        var i = function() {
                            var e = {};
                            return z["default"].each(t, function(t, i) {
                                e[y(t)] = n.style[y(t)] || r.getPropertyValue(t);
                            }), {
                                v: {
                                    v: e
                                }
                            };
                        }();
                        if ("object" == typeof i) return i.v;
                    }
                }();
                if ("object" == typeof r) return r.v;
            }
            var i = "";
            if (z["default"].isString(t)) n || 0 === n ? i = w(t) + ":" + b(t, n) : e.style.removeProperty(w(t)); else for (var o in t) t[o] || 0 === t[o] ? i += w(o) + ":" + b(o, t[o]) + ";" : e.style.removeProperty(w(o));
            return e.style.cssText += ";" + i;
        }
        function x(e, t) {
            for (;e = e.parentNode; ) if (e.tagName == t) return e;
            return !1;
        }
        function k(e, t) {
            return l(e, t) ? e : E(e, t);
        }
        function E(e, t) {
            for (;e = e.parentNode; ) if (l(e, t)) return e;
            return !1;
        }
        function C(e, t) {
            if (!e) return !1;
            for (;e.parentNode; ) {
                if (l(e, t)) return e;
                e = e.parentNode;
            }
            return !1;
        }
        function T(e, t) {
            if (!e) return !1;
            for (;e.parentNode; ) {
                if (t == e.parentNode) return e;
                e = e.parentNode;
            }
            return !1;
        }
        function N(e, t) {
            var n = t.parentNode;
            n.lastChild == t ? n.appendChild(e) : n.insertBefore(e, t.nextSibling);
        }
        function S(e, t) {
            t.parentNode.insertBefore(e, t);
        }
        function M(e, t) {
            for (t = t || document; e; ) {
                if (e == t) return !0;
                e = e.parentNode;
            }
            return !1;
        }
        function P(e) {
            var t = void 0, n = {
                ctrl: !1,
                meta: !1,
                shift: !1,
                alt: !1
            };
            e = z["default"].extend(n, e);
            try {
                t = e.el.ownerDocument.createEvent("KeyEvents"), t.initKeyEvent(e.type, !0, !0, e.el.ownerDocument.defaultView, e.ctrl, e.alt, e.shift, e.meta, e.keyCode, e.keyCode);
            } catch (r) {
                t = e.el.ownerDocument.createEvent("UIEvents"), t.initUIEvent(e.name, !0, !0, window, 1), 
                t.keyCode = e.keyCode, t.which = e.keyCode, t.charCode = e.keyCode, t.ctrlKey = e.ctrl, 
                t.altKey = e.alt, t.shiftKey = e.shift, t.metaKey = e.metaKey;
            }
            e.el.dispatchEvent(t);
        }
        function O(e) {
            return "undefined" != typeof e.hidden ? e.hidden : "undefined" != typeof e.mozHidden ? e.mozHidden : "undefined" != typeof e.webkitHidden ? e.webkitHidden : "undefined" != typeof e.msHidden ? e.msHidden : !1;
        }
        function D(e) {
            return "undefined" != typeof e.hidden ? "visibilitychange" : "undefined" != typeof e.mozHidden ? "mozvisibilitychange" : "undefined" != typeof e.webkitHidden ? "webkitvisibilitychange" : "undefined" != typeof e.msHidden ? "msvisibilitychange" : !1;
        }
        function A() {
            var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
            if (e) {
                var n = e.ownerDocument;
                if (n) {
                    var r = n.defaultView || window;
                    if (r) {
                        var i = r.getComputedStyle(e, null);
                        if (i) {
                            if (1 == t.length) return i.getPropertyValue(t[0]);
                            for (var o = {}, a = 0; a < t.length; a++) o[t[a]] = i.getPropertyValue(t[a]);
                            return o;
                        }
                    }
                }
            }
        }
        function R(e) {
            return e.split(" ").map(function(e) {
                return "." != e[0] ? "." + e : e;
            }).join("").trim();
        }
        function I(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; t > r; r++) n[r - 1] = arguments[r];
            if (n.length > 0) {
                var i = function() {
                    var t = [];
                    return t.push(I(e)), n.forEach(function(e) {
                        return t.push(I(e));
                    }), {
                        v: t.join(", ")
                    };
                }();
                if ("object" == typeof i) return i.v;
            }
            return e = e.split(", ").map(function(e) {
                return "." != e[0] ? "." + e : e;
            }).join(", ").trim(), e + ", " + e + " *";
        }
        function L() {
            for (var e = new RegExp("^(?:[a-z]+:)?//", "i"), t = "", n = document.getElementsByTagName("link"), r = 0; r < n.length; r++) {
                var i = n[r], o = '"' + i.getAttribute("rel") + '"', a = /(\"icon )|( icon\")|(\"icon\")|( icon )/i;
                -1 != o.search(a) && (t = i.getAttribute("href"));
            }
            return t || (t = "favicon.ico"), e.test(t) ? t : "/" != t[0] ? "//" + document.location.host + document.location.pathname + t : "//" + document.location.host + t;
        }
        function B(e, t) {
            if (t == e) return !0;
            if (!e.children) return !1;
            for (var n = 0; n < e.children.length; n++) if (B(e.children[n], t)) return !0;
            return !1;
        }
        function F(e, t) {
            var n = function(n) {
                n.map(function(n) {
                    if (0 != n.removedNodes.length) for (var i = n.removedNodes, o = i.length, a = 0; o > a; a++) {
                        var l = i[a];
                        (l.contains && l.contains(e) || B(l, e)) && (r.disconnect(), t());
                    }
                });
            }, r = new MutationObserver(n);
            r.observe(e.ownerDocument.body, {
                childList: !0,
                subtree: !0
            });
        }
        function H() {
            var e = void 0, t = document.createElement("fakeelement"), n = {
                animation: "animationend",
                MozAnimation: "animationend",
                WebkitAnimation: "webkitAnimationEnd"
            };
            for (e in n) if (void 0 != t.style[e]) return n[e];
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var U = e("lodash"), z = r(U), q = e("react"), G = r(q), V = e("./util"), W = V.guid(), X = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        };
        n["default"] = {
            isVisible: h,
            createEl: i,
            renderReactWithParent: o,
            inEl: a,
            hasClass: l,
            addClass: c,
            removeClass: s,
            toggleClass: u,
            matchesSelector: f,
            getParentBySel: d,
            isFocused: m,
            listen: p,
            unlisten: g,
            css: _,
            compStyle: A,
            camelize: y,
            camelizeAttrs: j,
            insertBefore: S,
            insertAfter: N,
            elementInDocument: M,
            getParentByTag: x,
            parentHasClass: C,
            isParent: T,
            resolveEl: k,
            getParent: E,
            runKeyEvent: P,
            docHidden: O,
            visibilityEvent: D,
            cs: v,
            selectorAll: I,
            classSelector: R,
            getFavicon: L,
            watchNodeRemove: F,
            whichAnimationEndEvent: H
        }, t.exports = n["default"];
    }, {
        "./util": "/project/src/js/lib/util.js",
        lodash: "lodash",
        react: "react"
    } ],
    "/project/src/js/lib/editor.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./util"), o = e("./dom"), a = e("./position"), l = e("./config"), s = e("./textarea-btn"), c = r(s), u = e("./onboarding"), d = r(u), f = e("./client-script"), m = r(f), p = e("./message"), g = r(p), h = e("grammarly-editor"), v = r(h), b = e("lodash"), y = r(b), j = e("./socket"), w = r(j), _ = e("./prefs"), x = r(_), k = e("./referral"), E = r(k), C = e("./auth"), T = r(C), N = e("./chrome-permissions"), S = r(N), M = e("./window-events"), P = r(M), O = e("./timers"), D = r(O), A = e("./tracking/index"), R = e("./tracker.editor"), I = r(R), L = function(e) {
            function t() {
                D["default"].start(te + "run"), ge(), r(), m["default"].rewriteInnerHTML(ae), ve || M(), 
                oe.on("sending", fe.checking), oe.on("finish", function() {
                    fe.cancelChecking(), fe.update();
                }), oe.on("rendered", fe.update), oe.getText() && oe.emit("sending"), x["default"].on("enabled", Q), 
                x["default"].on("token", s), o.listen(pe, o.visibilityEvent(pe), X), le && o.listen(pe.documentElement, "mousemove", n), 
                x["default"].get("seenMatchTooltip", function(e) {
                    e || d["default"]({
                        editor: oe
                    });
                }), E["default"].isGmail(ne.user) && E["default"].initGmail(ne.user, ae), navigator.onLine || F();
            }
            function n(e) {
                oe.emit("iframe-mousemove", e);
            }
            function r() {
                fe = c["default"]({
                    isGbuttonReferral: re,
                    closeGbuttonReferral: ie,
                    editor: oe,
                    doc: pe,
                    posSourceEl: e.posSourceEl
                }), y["default"].extend(oe, {
                    showBtn: fe.show,
                    hideBtn: fe.hide,
                    toggleBtn: fe.toggle
                });
            }
            function s(e) {
                v["default"].Capi.token != e && (v["default"].Capi.token = e, f());
            }
            function u() {
                f();
            }
            function f(e) {
                ce = !1, e && oe.setState(e), oe.hardReset(), oe.api.close(), oe.api.ws.connect(), 
                oe.api.start(), oe.hardReset();
            }
            function p(e) {
                var t = oe.matches.byId(e);
                t && (oe.emit("context"), t.editorId = oe.id, t.select(), ne.card.setData(t));
            }
            function h() {
                L();
            }
            function b(e) {
                e == oe.id && (oe.showDialog(), D["default"].start("open_editor"), A.call("statsc.ui.increment", "stability:editor.open_from_card"), 
                A.call("felog.event", "context_menu_open_popup"));
            }
            function j(e) {
                return e.match.editorId == oe.id && T["default"].isAnonymous(function(t) {
                    return t ? e.hide() && oe.showDialog() : e.animHide() && e.match.addToDict();
                });
            }
            function _(e) {
                e.editorId = oe.id, ne.card.showSynonyms(e);
            }
            function k(e) {
                ne.card.setOuterIframe(me);
            }
            function C() {
                ce ? g["default"].emitTabs("refresh-dialog", oe.id) : f();
            }
            function N(e) {
                return "capi" == e.type ? e.available ? void (ue && U()) : F("Error checking is temporarily unavailable") : void 0;
            }
            function M() {
                ve = !0;
                var e = function(e) {
                    return console.error(e);
                };
                g["default"].on("editor-set-state", O, e), g["default"].on("dialog-closed", R, e), 
                g["default"].on("after-refresh-dialog", B, e);
            }
            function O(e) {
                e.editorId == oe.id && (oe.setState(e), he && (he = !1, ee()));
            }
            function R(e) {
                e == oe.id && (L(), oe.isHtmlGhost || oe.srcEl.focus(), ce = !1);
            }
            function L() {
                oe.selectedMatch && (ne.card.removeLoading(oe.selectedMatch.getEl()), oe.selectedMatch.deselect());
            }
            function B(e) {
                e.editorId == oe.id && f(e);
            }
            function F(e) {
                ue = !0, fe && (fe.offline(e), oe.render());
            }
            function H() {
                return ue;
            }
            function U() {
                ue = !1, fe.online(), f();
            }
            function z(e) {
                console.log("Can't connect to bg page: " + e), q(e), de || (de = !0, setTimeout(F, 10));
            }
            function q(e) {
                var t = e.message, n = e.stack;
                A.call("statsc.ui.increment", "stability:cant_connect_to_bg_page"), A.call("felog.event", "stability.cant_connect_to_bg_page", {
                    message: t,
                    stack: n
                });
            }
            function G() {
                ce = !0, fe.cancelChecking(), g["default"].emitFocusedTab("show-dialog", oe.getState());
            }
            function V() {
                var e = ae.ownerDocument.createRange();
                e.selectNodeContents(ae);
                var t = e.cloneContents(), n = document.createElement("div");
                n.appendChild(t);
                for (var r = n.querySelectorAll("img"), i = r.length, o = 0; i > o; o++) r[o].src = r[o].src;
                return n.innerHTML;
            }
            function W() {
                fe.camouflage();
            }
            function X() {
                return o.docHidden(pe) ? K() : void $();
            }
            function Y(e) {
                return o.matchesSelector(e, ".b-card.Synonyms .btn-close") ? !0 : !o.matchesSelector(e, ".b-card.Synonyms, .b-card.Synonyms *");
            }
            function K() {}
            function $() {}
            function J(e) {
                return ue ? [] : e.filter(function(e) {
                    return e.free && !e.hidden;
                });
            }
            function Z() {
                var e = oe.getMatches();
                return {
                    critical: e.filter(function(e) {
                        return e.free && e.inDom;
                    }).length,
                    plus: e.filter(function(e) {
                        return !e.free;
                    }).length
                };
            }
            function Q() {
                x["default"].enabled(null, i.getDomain(), function(e) {
                    return e ? void 0 : ce ? (g["default"].emitFocusedTab("hide-dialog", {}), void (he = !0)) : void ee();
                });
            }
            function ee() {
                if (!se) {
                    var t = oe.dom.getCleanHtml && oe.dom.getCleanHtml();
                    t && (oe.el.innerHTML = t), oe.exit(), console.log("exit"), g["default"].off("reset", u), 
                    g["default"].off("changed-plan", C), g["default"].off("offline", F), g["default"].off("online", U), 
                    g["default"].off("editor-set-state", O), g["default"].off("dialog-closed", R), g["default"].off("after-refresh-dialog", B), 
                    l.restrictedAttrs.forEach(ae.removeAttribute.bind(ae)), le && l.restrictedAttrs.forEach(oe.srcEl.removeAttribute.bind(oe.srcEl)), 
                    x["default"].un("enabled", Q), x["default"].un("token", s), g["default"].off("__bgerror", z), 
                    fe && fe.remove(), se = !0, o.unlisten(pe, o.visibilityEvent(pe), X), le && o.unlisten(pe.documentElement, "mousemove", n), 
                    e.pageFields.remove(ae), oe.emit("exit");
                }
            }
            var te = (e.el || e.srcEl).getAttribute("gramm_id") || i.guid(), ne = e.app, re = E["default"].isGbutton(ne.user), ie = E["default"].close(ne.user);
            v["default"].Capi.token = ne.user.token, y["default"].extend(e, {
                capiUrl: l.URLS.capi,
                createWs: w["default"],
                docid: te,
                textareaWrapSelector: '[gramm_id="' + te + '"]',
                animatorContainer: e.el.ownerDocument.documentElement,
                getAnimatorElPos: a.getAbsRect,
                updateTextareaHeight: i._f,
                canRemoveSynonym: Y,
                filter: J
            }), y["default"].extend(v["default"].Capi, {
                CLIENT_NAME: "extension",
                clientVersion: ne.version,
                extDomain: i.getDomain()
            }), v["default"].MatchPositions = function() {
                return {
                    generateMatchPositions: i._f
                };
            };
            var oe = v["default"](e), ae = oe.el, le = e.posSourceEl && "IFRAME" == e.posSourceEl.tagName, se = !1, ce = !1, ue = void 0, de = void 0, fe = void 0, me = e.srcEl || ae, pe = ae.ownerDocument, ge = oe.run, he = !1, ve = !1;
            P["default"].on("beforeunload", ee), y["default"].extend(oe, {
                id: te,
                srcEl: me,
                camouflage: W,
                run: t,
                errorData: Z,
                showDialog: G,
                isOffline: H,
                outerIframe: e.outerIframe,
                cleanupText: i._f,
                enable: i._f,
                disable: i._f,
                activate: i._f,
                toggleBtn: i._f,
                remove: ee
            }), oe.dom.changeSelection = i._f, g["default"].on("__bgerror", z), oe.on("afterReplace", function(e) {
                return e && e.remove();
            }), oe.on("serviceState", N), oe.on("fix", function() {
                return x["default"].incFixed();
            }), oe.on("track", I["default"]), ne.card && (ne.card.on("show", p), ne.card.on("hide", h), 
            ne.card.on("toeditor", b), ne.card.on("addtodict", j), oe.on("addedSynonym", _), 
            oe.on("iframe-mousemove", k)), oe.matches.fromReplaced = oe.matches.fromReplace = oe.matches.byId, 
            oe.current = oe.getFiltered, e.pageFields.on("remove", function(e) {
                return ae == e && ee();
            }), oe.started = !1, oe.el.setAttribute("data-gramm_editor", !0), oe.getHtml && (oe.getHtml = V);
            var be = S["default"](oe);
            return be.checkClipboard(), e.run && t(), g["default"].on("offline", F), g["default"].on("online", U), 
            g["default"].on("changed-plan", C), g["default"].on("reset", u), oe;
        };
        n["default"] = L, t.exports = n["default"];
    }, {
        "./auth": "/project/src/js/lib/auth.js",
        "./chrome-permissions": "/project/src/js/lib/chrome-permissions.js",
        "./client-script": "/project/src/js/lib/client-script.js",
        "./config": "/project/src/js/lib/config.js",
        "./dom": "/project/src/js/lib/dom.js",
        "./message": "/project/src/js/lib/message.js",
        "./onboarding": "/project/src/js/lib/onboarding.js",
        "./position": "/project/src/js/lib/position.js",
        "./prefs": "/project/src/js/lib/prefs.js",
        "./referral": "/project/src/js/lib/referral.js",
        "./socket": "/project/src/js/lib/socket.js",
        "./textarea-btn": "/project/src/js/lib/textarea-btn.js",
        "./timers": "/project/src/js/lib/timers.js",
        "./tracker.editor": "/project/src/js/lib/tracker.editor.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js",
        "./window-events": "/project/src/js/lib/window-events.js",
        "grammarly-editor": "grammarly-editor",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/editors.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o(e) {
                function t(e) {
                    c(e, m);
                }
                function n(e) {
                    c(e, v);
                }
                function i(e) {
                    c(e, E);
                }
                function o(e) {
                    c(e, d);
                }
                function l(e) {
                    return A.push(e), e.on("exit", function() {
                        var t = A.indexOf(e);
                        t > -1 && A.splice(t, 1);
                    }), e;
                }
                function c(t, n) {
                    var r = document;
                    return e.iframe = e.iframe || u["default"](), e.dialog = e.dialog || f["default"]({
                        doc: r,
                        iframe: e.iframe
                    }), e.card = e.card || new p["default"]({
                        doc: r
                    }), e.user ? void n(t) : e.login(function() {
                        return n(t);
                    });
                }
                function d(e) {
                    m(e, {
                        htmlghost: !0,
                        value: "htmlghost"
                    });
                }
                function m(e, t) {
                    if (!(e.hasAttribute("noact") || e.clientWidth < 60)) {
                        t = t || {
                            textarea: !0,
                            value: "textarea"
                        };
                        var n = h["default"]({
                            el: e,
                            id: a.guid(),
                            createEditor: x["default"].partialRight(g, t)
                        });
                        return C(n), T(e, t.value), n;
                    }
                }
                function g(t, n) {
                    var r = t.el;
                    return y(r, t.id), r.setAttribute("spellcheck", !1), l(s["default"]({
                        el: r,
                        editorType: n,
                        pageFields: M,
                        freemiumIframe: P,
                        app: e
                    }));
                }
                function v(e) {
                    function t() {
                        return e.setAttribute("spellcheck", !1), _(e, {
                            contenteditable: !0,
                            value: "contenteditable"
                        });
                    }
                    C(b["default"]({
                        el: e,
                        focusEl: e,
                        createEditor: t,
                        listenKeyup: !0
                    })), T(e, "contenteditable");
                }
                function y(e, t) {
                    e.setAttribute("data-gramm_id", t), e.setAttribute("data-gramm", !0);
                }
                function _(t, n) {
                    var r = a.guid();
                    return y(t, r), l(s["default"]({
                        el: t,
                        id: r,
                        editorType: n,
                        freemiumIframe: P,
                        pageFields: M,
                        app: e,
                        run: !0
                    }));
                }
                function k(e) {
                    if ("undefined" != typeof GR_INLINE_STYLES) {
                        var t = e.createElement("style");
                        t.innerHTML = GR_INLINE_STYLES;
                        try {
                            e.querySelector("head").appendChild(t);
                        } catch (n) {
                            console.log("can't append style", n);
                        }
                    }
                }
                function E(t) {
                    function n() {
                        return l(s["default"]({
                            el: c,
                            srcEl: t,
                            posSourceEl: t,
                            editorType: {
                                contenteditable: !0,
                                value: "contenteditable"
                            },
                            run: !0,
                            freemiumIframe: P,
                            app: e,
                            pageFields: M
                        }, r));
                    }
                    var i = a.guid();
                    y(t, i), t.setAttribute("gramm-ifr", !0);
                    var o = t.contentDocument;
                    k(o), y(o.body, i), t.style.height = t.style.height || getComputedStyle(t).height;
                    var c = o.body, u = a.isFF() ? o.defaultView : c;
                    c.setAttribute("spellcheck", !1), C(b["default"]({
                        el: c,
                        focusEl: u,
                        createEditor: n,
                        freemiumIframe: {}
                    })), T(c, "iframe");
                }
                function C(e) {
                    O.push(e);
                }
                function T(e, t) {
                    D.push({
                        type: t,
                        total: O.length,
                        domain: a.getDomain(e),
                        url: a.getUrl(e)
                    });
                }
                function N(e) {
                    x["default"].chain(e).groupBy(function(e) {
                        var t = e.type, n = e.domain, r = e.url;
                        return [ t, n, r ].join("");
                    }).map(function(e) {
                        return e.reduce(function(e, t) {
                            return e.total > t.total ? e : t;
                        }, {});
                    }).each(function(e) {
                        return w.call("statsc.ui.increment", "activity:editor_created");
                    });
                }
                function S() {
                    O.forEach(function(e) {
                        return e.remove();
                    }), O = [], e.dialog && e.dialog.remove(), e.dialog = null, e.card && e.card.destroy(), 
                    e.card = null, e.iframe = null;
                }
                var M = e.pageFields, P = e.freemiumIframe, O = [], D = j["default"](N, 1e4), A = [];
                return {
                    createTextarea: t,
                    createContenteditable: n,
                    createHtmlGhost: o,
                    createIframe: i,
                    clear: S
                };
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var a = e("./util"), l = e("./editor"), s = i(l), c = e("./iframe"), u = i(c), d = e("./dialog"), f = i(d), m = e("./grammar-card"), p = i(m), g = e("./textarea"), h = i(g), v = e("./focus-activator"), b = i(v), y = e("./tracking/cargo"), j = i(y), w = e("./tracking/index"), _ = e("lodash"), x = i(_);
            n["default"] = o, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./dialog": "/project/src/js/lib/dialog.js",
        "./editor": "/project/src/js/lib/editor.js",
        "./focus-activator": "/project/src/js/lib/focus-activator.js",
        "./grammar-card": "/project/src/js/lib/grammar-card.js",
        "./iframe": "/project/src/js/lib/iframe.js",
        "./textarea": "/project/src/js/lib/textarea.js",
        "./tracking/cargo": "/project/src/js/lib/tracking/cargo.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/error-tooltip.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./tooltip"), o = r(i), a = e("./dom"), l = e("./tracking/index"), s = function(e) {
            function t(e) {
                a.hasClass(e.target, "fr-reload-tab") && (l.call("felog.info", "g_button_hover_reload_click"), 
                setTimeout(function() {
                    return window.location.reload(!0);
                }, 200));
            }
            var n = e.el, r = e.win, i = e.outerIframe, s = o["default"]({
                posEl: n,
                html: "<span class='fr-tooltip-title'>Cannot connect to Grammarly.</span> Please <span class='fr-reload-tab'>reload</span> the browser tab and check your internet connection. <span class='fr-dialog-br'></span>Don't lose your work! Copy any unsaved text before you reload the tab.",
                doc: n.ownerDocument,
                cls: "fr-btn-offline-tooltip",
                outerIframe: i,
                enabled: !1
            });
            a.listen(r, "click", t);
            var c = s.remove;
            return s.remove = function() {
                c(), a.unlisten(r, "click", t);
            }, s;
        };
        n["default"] = s, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./tooltip": "/project/src/js/lib/tooltip.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js"
    } ],
    "/project/src/js/lib/external.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i() {
            function e() {
                var e = !0, n = !1, i = void 0;
                try {
                    for (var o, a = r[Symbol.iterator](); !(e = (o = a.next()).done); e = !0) {
                        var l = o.value, s = void 0, c = "gr__" + l;
                        try {
                            s = localStorage[c];
                        } catch (u) {
                            console.error(u);
                        }
                        void 0 != s && (localStorage[c] = void 0, delete localStorage[c], t.emit(l, s));
                    }
                } catch (d) {
                    n = !0, i = d;
                } finally {
                    try {
                        !e && a["return"] && a["return"]();
                    } finally {
                        if (n) throw i;
                    }
                }
            }
            var t = l["default"]({}), n = t.on, r = [];
            return t.on = function(e, t) {
                -1 == r.indexOf(e) && r.push(e), n(e, t);
            }, -1 != o.getDomain().indexOf("grammarly.com") && o.interval(e, 1e3), t;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./util"), a = e("emitter"), l = r(a);
        n["default"] = i, t.exports = n["default"];
    }, {
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter"
    } ],
    "/project/src/js/lib/failover.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i() {
            function e() {
                setTimeout(r, 6e4), u.index_load = !1;
            }
            function t(e) {
                u[e] = !0;
            }
            function n(e) {
                return u[e];
            }
            function r() {
                u.index_load ? c.call("statsc.ui.increment", "stability:extension_loading_success") : (s["default"]("increment", [ "stability:extension_loading_timeout" ]), 
                a["default"]("stability.extension_loading_timeout"));
            }
            var i = {
                init: e,
                setStatus: t,
                getStatus: n
            };
            return i;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./tracking/felogPixel.js"), a = r(o), l = e("./tracking/statscPixel.js"), s = r(l), c = e("./tracking/index.js"), u = {};
        n["default"] = i(), t.exports = n["default"];
    }, {
        "./tracking/felogPixel.js": "/project/src/js/lib/tracking/felogPixel.js",
        "./tracking/index.js": "/project/src/js/lib/tracking/index.js",
        "./tracking/statscPixel.js": "/project/src/js/lib/tracking/statscPixel.js"
    } ],
    "/project/src/js/lib/focus-activator.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            function t() {
                g = f(), g.showBtn(), o.listen(u.ownerDocument, "mousemove", g.toggleBtn), p = !0, 
                g.on("exit", l), a.call("statsc.ui.increment", "stability:focus_active");
            }
            function n() {
                g && g.camouflage();
            }
            function r() {
                return p ? g && g.showBtn() : void (h || (h = !0, setTimeout(function() {
                    h = !1, t();
                }, 10)));
            }
            function i(e) {
                p && g && g && !o.isFocused(g.el) && g.toggleBtn(e);
            }
            function l() {
                m.emit("exit"), o.unlisten(u, "focus", r), o.unlisten(u, "blur", i), d && o.unlisten(u, "keyup", n), 
                g && (g.un("exit", l), g.remove(), o.unlisten(u.ownerDocument, "mousemove", g.toggleBtn));
            }
            var c = e.el, u = e.focusEl, d = e.listenKeyup, f = e.createEditor, m = s["default"]({
                remove: l
            });
            o.listen(u, "focus", r), o.listen(u, "blur", i), d && o.listen(u, "keyup", n);
            var p = !1, g = void 0, h = void 0;
            return o.isFocused(c) && r(), m;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./dom"), a = e("./tracking/index"), l = e("emitter"), s = r(l);
        n["default"] = i, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        emitter: "emitter"
    } ],
    "/project/src/js/lib/ghost.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            function t() {
                j();
            }
            function n(e) {
                var t = T.getBoundingClientRect(), n = _(e.clientX - t.left, e.clientY - t.top, t.left, t.top);
                if (n) {
                    n.e = e, e.stopPropagation();
                    var r = document.createEvent("CustomEvent");
                    r.initCustomEvent("gramMouse", !0, !0, n), N.dispatchEvent(r);
                }
            }
            function r(e) {
                try {
                    F.child.height = T.scrollHeight, D.scrollTop = T.scrollTop, clearTimeout(z), z = setTimeout(r, 100);
                } catch (e) {
                    console.log(e), r = f._f;
                }
            }
            function i(e) {
                return e ? e.split(" ").map(function(e) {
                    return isNaN(parseFloat(e)) && -1 == e.indexOf("px") ? e : Math.floor(parseFloat(e)) + "px";
                }).join(" ") : e;
            }
            function o() {
                var e = {}, t = S.getComputedStyle(T, null);
                if (!t) return e;
                var n = function(e) {
                    return t.getPropertyValue(e);
                }, r = function(e) {
                    var t = {};
                    return e.map(function(e) {
                        t[e] = n(e), "z-index" == e && "auto" == t[e] && T.style.zIndex && (t[e] = T.style.zIndex);
                    }), t;
                };
                e = {
                    parent: r([ "border", "border-radius", "box-sizing", "height", "width", "margin", "padding", "z-index", "border-top-width", "border-right-width", "border-left-width", "border-bottom-width", "border-top-style", "border-right-style", "border-left-style", "border-bottom-style", "padding-top", "padding-left", "padding-bottom", "padding-right", "margin-top", "margin-left", "margin-bottom", "margin-right" ]),
                    child: r([ "font", "font-size", "font-family", "text-align", "line-height", "letter-spacing", "text-shadow" ]),
                    src: r([ "position", "margin-top", "line-height", "font-size", "font-family", "z-index" ])
                };
                var o = e.parent["z-index"];
                if (e.parent["z-index"] = o && "auto" != o ? parseInt(o) - 1 : 0, e.parent.marginTop = i(e.parent.marginTop), 
                e.src.marginTop = i(e.src.marginTop), e.parent.margin = i(e.parent.margin), e.parent.padding = i(e.parent.padding), 
                (e.parent["border-top-width"] || e.parent["border-left-width"]) && (e.parent["border-style"] = "solid", 
                e.parent["border-color"] = "transparent"), "absolute" == e.src.position || "relative" == e.src.position ? e.parent = d["default"].extend(e.parent, r([ "top", "left" ])) : e.src.position = "relative", 
                U = U || n("background"), e.parent.background = U, f.isFF()) {
                    var a = parseInt(n("border-right-width")) - parseInt(n("border-left-width")), l = T.offsetWidth - T.clientWidth - a;
                    e.child["padding-right"] = l - 1 + "px";
                }
                return "start" == n("text-align") && (e.child["text-align"] = "ltr" == n("direction") ? "left" : "right"), 
                e;
            }
            function a(e) {
                L = e, u();
            }
            function s(e) {
                var t = {
                    background: "transparent !important",
                    "z-index": e["z-index"] || 1,
                    position: e.position,
                    "line-height": e["line-height"],
                    "font-size": e["font-size"],
                    "-webkit-transition": "none",
                    transition: "none"
                };
                parseInt(e["margin-top"]) > 0 && p.css(T.parentNode, {
                    width: "auto",
                    overflow: "hidden"
                });
                var n = S.devicePixelRatio > 1;
                if (n) {
                    var r = e["font-family"];
                    0 == r.indexOf("Consolas") && (r = r.replace("Consolas,", "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif"), 
                    F.child["font-family"] = r, t["font-family"] = r);
                }
                p.css(T, t);
            }
            function u() {
                var e = o();
                R || (s(e.src), B = T.previousElementSibling && "left" == p.css(T.previousElementSibling, "float"), 
                f.interval(u, 500), I || (I = !0, p.listen(T, V)), R = !0), F.parent.marginTop = i(F.parent.marginTop), 
                e = d["default"].merge(e, F), e.child.height = T.scrollHeight;
                var t = d["default"].merge(H, {
                    "data-id": P,
                    "data-gramm_id": P,
                    "data-gramm": "gramm",
                    "data-gramm_editor": !0,
                    dir: T.getAttribute("dir")
                });
                O || (O = N.createElement("ghost"), p.insertBefore(O, T));
                var n = c["default"].render(c["default"].createElement(h, {
                    style: e,
                    attrs: t,
                    val: L
                }), O);
                D = n.getDOMNode(), A = D.firstElementChild, D.contentEditable = !0, G.clone = D, 
                G.cloneVal = A, g(), v(), b(), 0 == T.offsetHeight ? k() : E(), G.emit("render");
            }
            function g() {
                if (B) {
                    if (T.getBoundingClientRect().left == D.getBoundingClientRect().left && T.getBoundingClientRect().top == D.getBoundingClientRect().top) return B = !1;
                    var e = T.getBoundingClientRect(), t = T.parentNode.getBoundingClientRect(), n = e.left - t.left, r = e.top - t.top, i = "translate(" + n + "px, " + r + "px)";
                    F.parent["-webkit-transform"] = i, F.parent.transform = i;
                }
            }
            function v() {
                function e(e, r, i) {
                    var o = i ? [ T, D ] : [ t, n ];
                    F.parent[r] = parseInt(parseInt(D.style[r]) + o[0][e] - o[1][e]) + "px";
                }
                var t = m.getAbsRect(T), n = m.getAbsRect(D);
                if (n.left != t.left && e("left", "marginLeft", !1), n.top != t.top && e("top", "marginTop", !1), 
                D.clientWidth == T.clientWidth || f.isFF() ? n.width != t.width && (H.width = t.width) : n.width != t.width ? D.style.width = t.width : e("clientWidth", "width", !0), 
                f.isFF()) {
                    var r = p.css(T.parentNode, [ "margin-left", "margin-top", "position" ]);
                    (r.marginLeft || r.marginTop) && "static" == r.position && (T.parentNode.style.position = "relative", 
                    T.parentNode.style.overflow = "");
                }
                n.height != t.height && (F.parent.height = t.height);
            }
            function b() {
                var e = function(e) {
                    return N.contains && N.contains(e) || p.elementInDocument(e, N);
                };
                O && e(O) && e(T) && O.nextElementSibling != T && p.insertBefore(O, T);
            }
            function y(e) {
                return D.querySelector(".gr_" + e);
            }
            function j() {
                var e = M.current();
                q = [];
                for (var t = D.scrollTop, n = function(e) {
                    return {
                        x1: e.left,
                        x2: e.right,
                        y1: e.top + t,
                        y2: e.bottom + t
                    };
                }, r = 0; r < e.length; r++) {
                    var i = e[r], o = y(i.id);
                    if (o) {
                        w(o);
                        var a = m.getPos(o, D), l = {
                            x1: a.x,
                            x2: a.x + o.offsetWidth,
                            y1: a.y,
                            y2: a.y + o.offsetHeight + 5
                        }, s = {
                            match: i,
                            el: o,
                            box: l
                        };
                        q.push(s);
                        var c = o.textContent.trim().split(" ").length > 1;
                        if (c) {
                            var u = o.getClientRects();
                            u.length < 2 || (s.rects = d["default"].map(u, n));
                        }
                    }
                }
            }
            function w(e) {
                e.setAttribute("style", e.parentNode.getAttribute("style")), p.css(e, {
                    display: "",
                    padding: "",
                    margin: "",
                    width: ""
                });
            }
            function _(e, t, n, r) {
                for (var i = D.scrollTop, o = 0; o < q.length; o++) {
                    var a = q[o], l = a.box;
                    if (e >= l.x1 && e <= l.x2 && t >= l.y1 - i && t <= l.y2 - i) return a;
                    if (a.rects) for (var s = 0; s < a.rects.length; s++) {
                        var c = a.rects[s], u = e + n, d = t + r;
                        if (u >= c.x1 && u <= c.x2 && d >= c.y1 - i && d <= c.y2 - i) return a;
                    }
                }
            }
            function x() {
                clearTimeout(z), f.cancelInterval(u);
            }
            function k() {
                O.style.display = "none", T.style.backgroundColor = U, f.cancelInterval(u), setTimeout(function() {
                    return G.emit("render");
                }, 300), R = !1, O.parentNode && O.parentNode.removeChild(O);
            }
            function E() {
                R || (O.style.display = "", O.parentNode || p.insertBefore(O, T), u(), r());
            }
            function C() {
                x(), p.unlisten(T, V), k();
            }
            var T = e.el, N = T.ownerDocument, S = N.defaultView, M = e.editor || {
                current: function() {
                    return [];
                }
            }, P = e.id, O = void 0, D = void 0, A = void 0, R = !1, I = void 0, L = "", B = !1, F = {
                parent: {},
                child: {}
            }, H = {}, U = void 0, z = void 0, q = [], G = l["default"]({
                render: u,
                getStyle: o,
                setText: a,
                generateAlertPositions: j,
                remove: C,
                hide: k,
                show: E
            }), V = {
                mousemove: n,
                mouseenter: t,
                keyup: r,
                scroll: r
            };
            return G;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        }, a = e("emitter"), l = r(a), s = e("react"), c = r(s), u = e("lodash"), d = r(u), f = e("./util"), m = e("./position"), p = e("./dom");
        n["default"] = i;
        var g = {
            style: {
                child: {
                    display: "inline-block",
                    "line-height": "initial",
                    color: "transparent",
                    overflow: "hidden",
                    "text-align": "left",
                    "float": "initial",
                    clear: "none",
                    "box-sizing": "border-box",
                    "vertical-align": "baseline",
                    "white-space": "pre-wrap",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    border: 0
                },
                parent: {
                    position: "absolute",
                    color: "transparent",
                    "border-color": "transparent !important",
                    overflow: "hidden",
                    "white-space": "pre-wrap"
                },
                src: {}
            },
            attrs: {},
            val: ""
        }, h = c["default"].createClass({
            displayName: "GhostComponent",
            getDefaultProps: function() {
                return g;
            },
            render: function() {
                var e = d["default"].merge(g.style, this.props.style), t = this.props.attrs, n = p.camelizeAttrs(e.parent), r = p.camelizeAttrs(e.child), i = this.props.val;
                return c["default"].createElement("div", o({
                    style: n
                }, t, {
                    gramm: !0
                }), c["default"].createElement("span", {
                    style: r,
                    dangerouslySetInnerHTML: {
                        __html: i
                    }
                }), c["default"].createElement("br", null));
            }
        });
        t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./position": "/project/src/js/lib/position.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        lodash: "lodash",
        react: "react"
    } ],
    "/project/src/js/lib/grammar-card.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        }
        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
        }
        function l(e) {
            var t = /class=["']([^'"]+)['"]/g;
            return w["default"].sanitize(e).replace(t, function(e, t) {
                return 'class="' + A(t.trim()) + '"';
            });
        }
        function s(e) {
            return e ? [ "Unknown", "Misspelled" ].indexOf(e.category) > -1 : void 0;
        }
        function c(e, t) {
            if (e) {
                if (!e.length) return e;
                if (1 == e.length || !t) return e[0];
                var n = t.pageX || t.clientX, r = t.pageY || t.clientY, i = void 0;
                return e.forEach(function(e) {
                    var t = e.top, o = e.left, a = e.width, l = e.height;
                    r >= t && t + l >= r && n >= o && o + a >= n && (i = e);
                }), i || e[0];
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var u = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), d = function(e, t, n) {
            for (var r = !0; r; ) {
                var i = e, o = t, a = n;
                l = c = s = void 0, r = !1, null === i && (i = Function.prototype);
                var l = Object.getOwnPropertyDescriptor(i, o);
                if (void 0 !== l) {
                    if ("value" in l) return l.value;
                    var s = l.get;
                    return void 0 === s ? void 0 : s.call(a);
                }
                var c = Object.getPrototypeOf(i);
                if (null === c) return void 0;
                e = c, t = o, n = a, r = !0;
            }
        }, f = e("./dom"), m = r(f), p = e("./position"), g = r(p), h = e("emitter"), v = r(h), b = e("react"), y = r(b), j = e("dompurify"), w = r(j), _ = e("./window-events"), x = r(_), k = e("./hint"), E = r(k), C = e("./tooltip"), T = r(C), N = e("./tracking/index"), S = e("./timers"), M = r(S), P = e("lodash"), O = r(P), D = "gr-grammar-card", A = function(e) {
            return e.split(" ").map(function(e) {
                return D + "_" + e;
            }).join(" ");
        }, R = {}, I = function(e) {
            function t() {
                var e = this, n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], r = n.doc, i = void 0 === r ? document : r, a = n.domCls, l = void 0 === a ? "" : a;
                o(this, t), O["default"].extend(R, {
                    id: Symbol("GrammarCard"),
                    notfound: T["default"]({
                        cls: "gr-notfound-tooltip",
                        enabled: !1,
                        doc: i
                    }),
                    doc: i,
                    domCls: l,
                    cls: "gr_",
                    pCls: "gr-progress",
                    hCls: "gr-background-color"
                });
                var s = d(Object.getPrototypeOf(t.prototype), "constructor", this).call(this);
                O["default"].extend(this, s, {
                    show: function(t, n) {
                        return e.emit("show", t.id), e.updatePos(t, n), R.container.component.setState({
                            visible: !0
                        }), M["default"].start(R.id), N.call("statsc.ui.increment", "stability:card.open"), 
                        N.call("felog.event", "card_open"), e;
                    },
                    hide: function() {
                        if (R.hint.visible) {
                            R.container.el.style.display = "none", R.container.component.setState({
                                animate: !1,
                                visible: !1,
                                match: {}
                            });
                            var t = R.notfound && R.notfound.isEnabled();
                            R.notfound.disable(), R.notfound.hide(), e.emit("hide", e.match), e.hideOnAnimEnd(!0), 
                            e.removeLoading(R.hint.currentEl);
                            var n = {
                                active_time: M["default"].stop(R.id)
                            };
                            if (e.match) {
                                var r = e.match.syn;
                                N.call("statsc.ui.timing", "stability:" + (r ? "syn" : "card") + ".close", n.active_time), 
                                N.call("felog.event", (r ? "syn" : "card") + "_close", n);
                            }
                            return t && (N.call("statsc.ui.timing", "stability:syn.close", n.active_time), N.call("felog.event", "syn_close", n)), 
                            e.match = null, R.container.el.style.display = "", e;
                        }
                    },
                    hideOnAnimEnd: function(t) {
                        return m["default"].listen(R.el, m["default"].whichAnimationEndEvent(), e.hide, t);
                    },
                    animHide: function() {
                        return R.container.component.setState({
                            animate: !0
                        }), e.hideOnAnimEnd(), e;
                    },
                    openEditor: function() {
                        e.removeLoading(R.hint.currentEl), e.emit("toeditor", e.match.editorId), e.hide();
                    },
                    addToDict: function() {
                        return e.emit("addtodict", {
                            match: e.match,
                            hide: e.hide,
                            animHide: e.animHide
                        });
                    },
                    inTarget: function(t) {
                        var n = t.target, r = R.hint.currentEl, i = (m["default"].parentHasClass(n, R.cls) || m["default"].hasClass(n, R.cls)) && !m["default"].hasClass(r, "g-selection-anim");
                        return i && "click" != t.type ? r && r != n ? (R.hint.fastHide(), void e.removeLoading(r)) : (e.addLoading(n), 
                        !0) : void (!R.hint.visible && r && e.removeLoading(r));
                    },
                    addLoading: function(e) {
                        return !m["default"].hasClass(e, R.pCls) && m["default"].addClass(e, R.pCls);
                    },
                    removeLoading: function(e) {
                        m["default"].hasClass(e, R.pCls) && m["default"].removeClass(e, R.pCls), m["default"].hasClass(e, "g-selection-anim") && e.parentNode && e.parentNode.removeChild(e);
                    },
                    showSynonyms: function(t) {
                        return 0 == t.animEl.getClientRects().length ? e : (R.hint.currentEl = t.animEl, 
                        0 == t.synonyms.meanings.length ? (R.notfound.enable(), R.notfound.show({
                            posEl: t.animEl,
                            text: "No synonyms found",
                            outerIframe: R.iframe
                        })) : (e.setData(t), e.updatePos(t.animEl), R.container.component.setState({
                            visible: !0
                        })), R.hint.setVisible(!0), N.call("felog.event", "syn_open"), M["default"].start(R.id), 
                        N.call("statsc.ui.increment", "stability:syn.open"), e);
                    },
                    setOuterIframe: function(e) {
                        var t = e.contentDocument;
                        !e || t && e == R.iframe || (R.iframe = e, R.hint.setDocs(R.doc, t));
                    }
                }), R.windowEvents = {
                    keydown: this.hide,
                    scroll: this.hide,
                    resize: this.hide
                }, this.init();
            }
            return a(t, e), u(t, [ {
                key: "setData",
                value: function(e) {
                    return e ? (R.container.component.setState({
                        match: e
                    }), this.match = e, this) : this;
                }
            }, {
                key: "updatePos",
                value: function(e, t) {
                    var n = g["default"].getAbsRect(e, R.iframe, !0), r = g["default"].posToRect(R.el, c(n, t));
                    R.container.component.setState({
                        pos: r
                    });
                }
            }, {
                key: "init",
                value: function() {
                    R.container = this.render(R), R.el = R.container.component.getDOMNode(), R.hint = new E["default"]({
                        doc: R.doc,
                        hint: R.el,
                        hideDelay: 500,
                        inTarget: this.inTarget,
                        cls: R.cls,
                        delay: 400,
                        onshow: this.show,
                        onhide: this.hide
                    }).bind(), x["default"].on(R.windowEvents, !0);
                }
            }, {
                key: "render",
                value: function() {
                    return m["default"].renderReactWithParent(y["default"].createElement(L, {
                        className: R.domCls,
                        hide: this.hide,
                        animHide: this.animHide,
                        openEditor: this.openEditor,
                        addToDict: this.addToDict
                    }), R.doc.documentElement, R.id, "grammarly-card");
                }
            }, {
                key: "destroy",
                value: function() {
                    R.hint.unbind(), x["default"].off(R.windowEvents, !0), R.container.remove();
                }
            } ]), t;
        }(v["default"]), L = y["default"].createClass({
            displayName: "GrammarCard",
            getInitialState: function() {
                return {
                    pos: {
                        rect: {
                            top: 0,
                            left: 0,
                            width: 0
                        },
                        sourceRect: {
                            width: 0
                        },
                        delta: {
                            right: 0
                        },
                        className: "",
                        visible: !1
                    },
                    match: {},
                    visible: !1
                };
            },
            renderHeader: function() {
                var e = this.state.match, t = "title";
                if (e.syn && e.synonyms.meanings.length) return y["default"].createElement("div", {
                    className: A(t)
                }, "Synonyms suggested by Grammarly");
                if (e.title) {
                    if (e.spell && "Unknown" != e.category || (t += " title-link"), !e.spell || e.showTitle || e.didYouMean) return y["default"].createElement("div", {
                        className: A(t),
                        dangerouslySetInnerHTML: {
                            __html: w["default"].sanitize(e.title)
                        },
                        "data-action": "editor"
                    });
                    if (!e.rFirst.trim()) return y["default"].createElement("div", {
                        className: A(t)
                    }, y["default"].createElement("div", {
                        className: A("replacement-block")
                    }, y["default"].createElement("span", {
                        className: A("replacement"),
                        "data-action": "replace",
                        "data-replace": e.rFirst,
                        dangerouslySetInnerHTML: {
                            __html: l(e.header)
                        }
                    })));
                    var n = e.origReplacements || [];
                    return y["default"].createElement("div", {
                        className: A(t)
                    }, n.map(function(t, n) {
                        return y["default"].createElement("div", {
                            className: A("replacement-block"),
                            key: n
                        }, y["default"].createElement("span", {
                            className: A("replacement"),
                            "data-replace": t
                        }, y["default"].createElement("span", {
                            className: A("del")
                        }, e.oldVal), y["default"].createElement("span", {
                            className: A("arr")
                        }, " → "), y["default"].createElement("span", {
                            className: A("ins")
                        }, t)));
                    }, this));
                }
            },
            getTriangleMargin: function() {
                var e = this.state.pos.sourceRect.width / 2, t = this.state.pos.delta.right;
                return t > 0 ? e : -t + e;
            },
            renderConfused: function() {
                var e = this.state.match;
                return y["default"].createElement("div", {
                    className: A("replacement-block sub-title")
                }, y["default"].createElement("span", {
                    className: A("replacement")
                }, "Did you mean ", y["default"].createElement("span", {
                    className: A("ins"),
                    "data-replace": e.rFirst
                }, e.rFirst), "?"));
            },
            renderSynonyms: function() {
                var e, t = this, n = this.state.match, r = n.synonyms.meanings;
                if (0 == r.length) return y["default"].createElement("div", {
                    className: A("content")
                }, y["default"].createElement("div", {
                    className: A("nothing")
                }, "No synonyms found"));
                var o = m["default"].cs((e = {}, i(e, A("item-single"), 1 == r.length), i(e, A("item"), !0), 
                e));
                return y["default"].createElement("div", {
                    className: A("content")
                }, r.map(function(e, n) {
                    return y["default"].createElement("div", {
                        className: o,
                        key: n
                    }, y["default"].createElement("div", {
                        className: A("meaning")
                    }, e.meaning), y["default"].createElement("div", {
                        className: A("replacements")
                    }, e.synonyms.map(function(e, t) {
                        return y["default"].createElement("span", {
                            className: A("ins"),
                            key: t,
                            "data-replace": e.base
                        }, e.base);
                    }, t)));
                }, this));
            },
            renderAddToDict: function() {
                return s(this.state.match) ? y["default"].createElement("div", {
                    className: A("link add-to-dict"),
                    "data-action": "add"
                }, "Add to dictionary") : void 0;
            },
            componentWillMount: function() {
                var e = this;
                this.cardEvents = function(t) {
                    var n = t.target, r = n.dataset, i = r.action, o = r.replace, a = e.state.match, l = e.props;
                    if (t.stopPropagation(), t.preventDefault(), i || o || (i = n.parentNode.dataset.action, 
                    o = n.parentNode.dataset.replace), o && (i = "replace"), i) switch (i) {
                      case "replace":
                        a.replace(o), l.hide(), N.call("felog.info", (a.syn ? "synonyms" : "replacement") + "_click");
                        break;

                      case "ignore":
                        a.ignore(), l.animHide();
                        break;

                      case "close":
                        l.animHide();
                        break;

                      case "editor":
                        l.openEditor();
                        break;

                      case "add":
                        l.addToDict();
                    }
                };
            },
            componentDidMount: function() {
                var e = y["default"].findDOMNode(this);
                m["default"].listen(e, "click", this.cardEvents);
            },
            componentWillUnmount: function() {
                var e = y["default"].findDOMNode(this);
                m["default"].unlisten(e, "click", this.cardEvents);
            },
            render: function() {
                var e, t = {}, n = this.state.pos, r = this.state.match, o = m["default"].cs((e = {}, 
                i(e, D, !0), i(e, A("syn"), r.syn), i(e, A("flip"), n.rect.flip), i(e, A("animate"), this.state.animate), 
                i(e, this.state.className, this.state.className), i(e, A("wide-footer"), s(this.state.match)), 
                e)), a = {
                    marginLeft: this.getTriangleMargin()
                };
                return t.top = n.rect.top, t.left = n.rect.left, 0 == n.rect.top && 0 == n.rect.left && this.state.visible && N.call("statsc.ui.increment", "stability:card.top_left_0"), 
                n.rect.top > 0 && n.rect.top < 10 && n.rect.left > 0 && n.rect.left < 10 && this.state.visible && N.call("statsc.ui.increment", "stability:card.top_left_10"), 
                t.visibility = this.state.visible ? "" : "hidden", y["default"].createElement("div", {
                    style: t,
                    className: o
                }, y["default"].createElement("span", {
                    style: a,
                    className: A("triangle")
                }), this.renderHeader(), r.syn && this.renderSynonyms(), r.didYouMean && this.renderConfused(), y["default"].createElement("div", {
                    className: A("footer")
                }, y["default"].createElement("div", {
                    className: A("link"),
                    "data-action": "editor"
                }, "Correct with Grammarly"), this.renderAddToDict(), r.syn ? y["default"].createElement("div", {
                    className: A("btn-close"),
                    "data-action": "close"
                }, "Close") : y["default"].createElement("div", {
                    className: A("btn-close ignore"),
                    "data-action": "ignore"
                }, "Ignore")));
            }
        });
        I.baseCls = D, I.component = L, n["default"] = I, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./hint": "/project/src/js/lib/hint.js",
        "./position": "/project/src/js/lib/position.js",
        "./timers": "/project/src/js/lib/timers.js",
        "./tooltip": "/project/src/js/lib/tooltip.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./window-events": "/project/src/js/lib/window-events.js",
        dompurify: "dompurify",
        emitter: "emitter",
        lodash: "lodash",
        react: "react"
    } ],
    "/project/src/js/lib/hint.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./util"), a = e("./dom"), l = e("lodash"), s = r(l), c = {
            hideDelay: 10,
            onshow: o._f,
            onhide: o._f,
            onmousemove: o._f,
            onInnerMouseMove: o._f,
            inTarget: function(e) {
                var t = e.target, n = a.parentHasClass(t, this.cls) || a.hasClass(t, this.cls);
                if (n) return this.currentEl && this.currentEl != t ? void this.fastHide() : !0;
            }
        }, u = function d(e) {
            var t = this;
            i(this, d), s["default"].extend(this, c, e, {
                bind: function(e) {
                    var n = arguments.length <= 1 || void 0 === arguments[1] ? t.doc : arguments[1];
                    return t.doc2 && t.doc2 != n && t.bind(e, t.doc2), a.listen(n.body, "resize", t.fastHide, e), 
                    a.listen(n, {
                        gramMouse: t.mousemove,
                        mousemove: t.mousemove,
                        scroll: t.fastHide
                    }, o._f, e), a.listen(n, "click", t.click, e, !0), a.listen(t.hint, "mousemove", t.innerMouseMove, e), 
                    t;
                },
                setDocs: function(e, n) {
                    t.unbind(), s["default"].extend(t, {
                        doc: e,
                        doc2: n
                    }), t.bind();
                },
                unbind: function(e) {
                    return t.bind(!0, e);
                },
                fastHide: function() {
                    t.onhide(), t.cancelTimeout("show").cancelTimeout("hide"), t.visible = !1, t.currentEl = null;
                },
                innerMouseMove: function(e) {
                    t.onInnerMouseMove(e), e.preventDefault(), e.stopPropagation(), t.cancelTimeout("hide");
                },
                click: function(e) {
                    return !t.elInHint(e.target) && !t.inTarget(e) && t.fastHide();
                },
                elInHint: function(e) {
                    return e && (a.inEl(e, t.hint) || e == t.hint);
                },
                mousemove: function(e) {
                    var n = e.target;
                    if ("IFRAME" != n.tagName) {
                        if (e.detail && e.detail.el && (n = e.detail.el, e = {
                            target: n,
                            clientX: e.detail.e.clientX,
                            clientY: e.detail.e.clientY
                        }), o.isSafari() && "mousemove" == e.type) {
                            if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return t.mouseMoveCoordinates = e.x + "-" + e.y;
                            if (t.mouseMoveCoordinates == e.x + "-" + e.y) return;
                        }
                        if (t.elInHint(n)) return t.onmousemove(e, !0), void t.cancelTimeout("show").cancelTimeout("hide");
                        if (!t.inTarget(e)) return t.onmousemove(e, !1), void (t.visible ? t.hide() : t.cancelTimeout("show"));
                        t.onmousemove(e, !0), t.visible || (t.show(e, n).cancelTimeout("hide"), t.currentEl = n);
                    }
                },
                show: function(e, n) {
                    return t.showTimeout ? t : (t.cancelTimeout("hide"), t.showTimeout = setTimeout(function() {
                        this.cancelTimeout("show"), (this.elInHint(n) || this.inTarget(e)) && (this.visible = !0, 
                        this.onshow(n, {
                            pageX: e.pageX,
                            pageY: e.pageY,
                            clientX: e.clientX,
                            clientY: e.clientY
                        }));
                    }.bind(t), t.delay), t);
                },
                hide: function() {
                    return t.hideTimeout ? t : (t.hideTimeout = setTimeout(function() {
                        this.onhide(), this.visible = !1, this.currentEl = null;
                    }.bind(t), t.hideDelay), t);
                },
                cancelTimeout: function(e) {
                    var n = e + "Timeout";
                    return t[n] ? (clearTimeout(t[n]), t[n] = null, t) : t;
                },
                setVisible: function(e) {
                    t.visible = e, t.cancelTimeout("hide");
                }
            });
        };
        n["default"] = u, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./util": "/project/src/js/lib/util.js",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/iframe-wrapper.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            function t() {
                return i.isGmail(e);
            }
            function n(e, t, n, r) {
                e.addEventListener("load", function() {
                    var t = e.contentDocument;
                    t.body.setAttribute("style", "margin: 0");
                    var i = t.createElement("iframe");
                    i.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: none"), 
                    i.setAttribute("src", n), t.body.insertBefore(i, t.body.firstChild), r(i);
                }, !1), e.setAttribute("src", t);
            }
            return {
                useGmailProxy: t,
                wrapIframe: n,
                gmailProxyUrl: "/_/scs/mail-static/_/js/k=gmail.main.en"
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./util");
        n["default"] = r, t.exports = n["default"];
    }, {
        "./util": "/project/src/js/lib/util.js"
    } ],
    "/project/src/js/lib/iframe.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i() {
            function e(e) {
                function n() {
                    (i || (i = h.querySelector(k), E.el = i, i)) && (i.src || (w.useGmailProxy() ? !function() {
                        var e = c;
                        c = m._f, w.wrapIframe(i, w.gmailProxyUrl, s.URLS.editor, function(t) {
                            i = t, e();
                        });
                    }() : (i.setAttribute("src", s.URLS.editor), v && t())), l.addClass(i, "gr-freemium-ifr"), 
                    y = a["default"]({
                        el: i.parentNode
                    }), y.el.style.zIndex = 100001, o = !0, E.activated = o, l.listen(h.defaultView, "message", r), 
                    c());
                }
                var c = arguments.length <= 1 || void 0 === arguments[1] ? m._f : arguments[1];
                h = e.doc, w = g["default"](h);
                var u = e.editorId, p = e.matches, v = e.isUpdateUrl;
                f["default"].isAnonymous(function(e) {
                    return e ? c(!0) : (d = {
                        editorId: u,
                        matches: p
                    }, o ? c() : void n());
                });
            }
            function t() {
                i && i.setAttribute("src", s.URLS.editor + "?" + new Date().getTime()), p = !1;
            }
            function n(e) {
                return p ? (d && (_["default"].extend(e, d), d = null), e.grammarly = !0, void i.contentWindow.postMessage(e, "*")) : c.push(e);
            }
            function r(e) {
                var t = e.data, n = e.origin;
                if (-1 != n.indexOf("grammarly.com")) {
                    var r = t.action, i = t.url;
                    if (p = !0, "initialized" == r && c) {
                        var o = v["default"].stop("open_editor");
                        o && b.call("statsc.ui.timing", "performance:popup.first.load_time", o), y.remove(), 
                        c.forEach(E.send);
                    }
                    "removeSpinner" == r && y.remove();
                    var a = v["default"].stop("open_editor");
                    a && b.call("statsc.ui.timing", "performance:popup.load_time", a), "accepted" == r && (c = []), 
                    "open-url" == r && u["default"].emitBackground("open-url", i), E.emit("message", t);
                }
            }
            var i = void 0, o = void 0, c = [], d = void 0, p = !1, h = void 0, y = void 0, w = void 0, E = j["default"]({
                activate: e,
                refresh: t,
                send: n,
                selector: k,
                baseCls: x
            });
            return E;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./spinner"), a = r(o), l = e("./dom"), s = e("./config"), c = e("./message"), u = r(c), d = e("./auth"), f = r(d), m = e("./util"), p = e("./iframe-wrapper"), g = r(p), h = e("./timers"), v = r(h), b = e("./tracking/index"), y = e("emitter"), j = r(y), w = e("lodash"), _ = r(w), x = "gr_-ifr", k = "." + x;
        i.baseCls = x, i.selector = k, n["default"] = i, t.exports = n["default"];
    }, {
        "./auth": "/project/src/js/lib/auth.js",
        "./config": "/project/src/js/lib/config.js",
        "./dom": "/project/src/js/lib/dom.js",
        "./iframe-wrapper": "/project/src/js/lib/iframe-wrapper.js",
        "./message": "/project/src/js/lib/message.js",
        "./spinner": "/project/src/js/lib/spinner.js",
        "./timers": "/project/src/js/lib/timers.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/message.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o(e, t) {
                function n() {
                    l(e, n);
                    for (var r = arguments.length, i = Array(r), o = 0; r > o; o++) i[o] = arguments[o];
                    t.apply(this, i);
                }
                a(e, n);
            }
            function a(e, t, n, r) {
                if ("__bgerror" == e) return y.on("__bgerror", t);
                var i = j.__listeners = j.__listeners || {}, o = i[e] = i[e] || [];
                if (!o.length) try {
                    j.message.listen(e, function(e, t) {
                        var n = !0, r = !1, i = void 0;
                        try {
                            for (var a, l = o[Symbol.iterator](); !(n = (a = l.next()).done); n = !0) {
                                var s = a.value;
                                s(e, t);
                            }
                        } catch (c) {
                            r = !0, i = c;
                        } finally {
                            try {
                                !n && l["return"] && l["return"]();
                            } finally {
                                if (r) throw i;
                            }
                        }
                    }, n, r);
                } catch (a) {
                    d(a);
                }
                o.push(t);
            }
            function l(e, t) {
                if ("__bgerror" == e) return y.un("__bgerror", t);
                var n = j.__listeners;
                if (n) {
                    var r = n[e];
                    if (r) {
                        var i = r.indexOf(t);
                        -1 != i && r.splice(i, 1), 0 == r.length && delete n[e];
                    }
                }
            }
            function s(e, t, n, r) {
                void 0 === t && (t = {});
                try {
                    j.message.broadcast(e, t, n, r);
                } catch (i) {
                    d(i);
                }
            }
            function c(e, t, n, r) {
                try {
                    j.message.toFocussed(e, t, n, r);
                } catch (i) {
                    d(i);
                }
            }
            function u(e, t, n, r) {
                try {
                    j.message.broadcastBackground(e, t, n, r);
                } catch (i) {
                    d(i);
                }
            }
            function d(e) {
                y.emit("__bgerror", e);
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var f = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, m = i(f), p = e("lodash"), g = i(p), h = e("./util"), v = e("emitter"), b = i(v), y = b["default"]({}), j = m["default"];
            j || !function() {
                var e = {}, t = {}, n = {
                    listen: function(n, r, i, o) {
                        void 0 === n && (n = "*"), o = o ? h._F : h.isBg;
                        var a = o() ? t : e;
                        a[n] = a[n] || [], a[n].push(r);
                    },
                    broadcast: function(t, n, r, i) {
                        void 0 === t && (t = "*"), g["default"].each(e[t], function(e) {
                            return e(n, r);
                        });
                    },
                    toFocussed: function(t, n, r, i) {
                        void 0 === t && (t = "*"), g["default"].each(e[t], function(e) {
                            return e(n, r);
                        });
                    },
                    broadcastBackground: function(e, n, r, i) {
                        void 0 === e && (e = "*"), g["default"].each(t[e], function(e) {
                            return e(n, r);
                        });
                    }
                };
                j = {
                    message: n
                };
            }(), n["default"] = {
                on: a,
                one: o,
                off: l,
                emitError: d,
                emitTabs: s,
                emitFocusedTab: c,
                emitBackground: u
            }, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/onboarding.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            function t() {
                a["default"].get("seenMatchTooltip", function(e) {
                    if (!i) {
                        var t = r.getFiltered().filter(function(e) {
                            return e.inDom;
                        });
                        0 != t.length && (t.sort(function(e, t) {
                            return e.s - t.s || t.e - e.e;
                        }), i = !0, n(t[0]));
                    }
                });
            }
            function n(e) {
                function n() {
                    o.hide(), c.unlisten(r.el, "scroll", n), c.unlisten(window, "click", n), a["default"].set("seenMatchTooltip", !0), 
                    i = !1, r.un("finish", t);
                }
                var l = e.getEl();
                r.one("context", n), c.listen(r.el, "scroll", n), c.listen(window, "click", n), 
                c.listen(window, "resize", n), o.show({
                    posEl: l,
                    cls: "gr__tooltip-match",
                    dir: "top:center",
                    text: "Hover over underlined text to see correction options"
                }), u.call("felog.info", "demo_tooltip_show");
            }
            var r = e.editor, i = !1, o = s["default"]();
            r.on("finish", t);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./prefs"), a = r(o), l = e("./tooltip"), s = r(l), c = e("./dom"), u = e("./tracking/index");
        n["default"] = i, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./prefs": "/project/src/js/lib/prefs.js",
        "./tooltip": "/project/src/js/lib/tooltip.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js"
    } ],
    "/project/src/js/lib/page-fields.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n;
            }
            return Array.from(e);
        }
        function o() {
            function e() {
                X = !0, Y = new MutationObserver(n), Y.observe(z.body, {
                    childList: !0,
                    subtree: !0
                }), u.interval(o, 1e3);
            }
            function t(e) {
                function n(e) {
                    return -1 != i.indexOf(e) ? r.push(e) : void 0;
                }
                var r = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1], i = c["default"].flatten(c["default"].transform(U, function(e, t) {
                    return e.push(t);
                }, []));
                if (n(e) || !e.children) return r;
                for (var o = 0; o < e.children.length; o++) t(e.children[o], r);
                return r;
            }
            function n(e) {
                var n = [];
                e.map(function(e) {
                    for (var r = e.removedNodes, i = r.length, o = 0; i > o; o++) n = n.concat(t(r[o]));
                }), n.forEach(function(e) {
                    return K.emit("remove", e);
                });
            }
            function r() {
                X && (u.cancelInterval(o), Y.disconnect(), X = !1);
            }
            function o() {
                var e = A();
                g(e) || K.emit("add", e);
            }
            function a() {
                c["default"].each(U, function(e) {
                    return e.forEach(E);
                }), U = f(), K.emit("add", A()), e();
            }
            function s(e) {
                [ "textareas", "contenteditables", "iframes" ].forEach(function(t) {
                    var n = U[t].indexOf(e);
                    -1 != n && U[t].splice(n, 1);
                });
            }
            function f() {
                return {
                    textareas: [],
                    contenteditables: [],
                    iframes: [],
                    htmlghosts: []
                };
            }
            function p(e) {
                z = e, q = {
                    ownerDocument: z
                }, V = z.location.hostname, W = new RegExp("://" + V), G = z.defaultView;
                var t = u.getDomain(q);
                L && L[t] && (F = c["default"].isNumber(L[t].minFieldHeight) ? L[t].minFieldHeight : F, 
                H = c["default"].isNumber(L[t].minFieldWidth) ? L[t].minFieldHeight : H);
            }
            function g(e) {
                return 0 == e.textareas.length && 0 == e.contenteditables.length && 0 == e.iframes.length && 0 == e.htmlghosts.length;
            }
            function y(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? L : arguments[1], n = u.getDomain(q), r = t[n];
                return r ? r.enabled === !1 ? !1 : r.enabled === !0 ? !0 : !r.fields.some(function(t) {
                    var n = t.name, r = t.id, i = t.className;
                    return n && n == e.name || r && r == e.id || i && d.hasClass(e, i);
                }) : !0;
            }
            function j() {
                return !z.location || 0 == z.location.href.indexOf("about:") || 0 == z.location.href.indexOf("chrome:") || !z.body || 0 == z.body.childNodes.length;
            }
            function w() {
                return "interactive" != z.readyState && "complete" != z.readyState;
            }
            function _() {
                var e = z.documentElement.getBoundingClientRect();
                return e.height < B && G.innerHeight < B || e.width < B;
            }
            function x(e) {
                return e.clientHeight < F || e.clientWidth < H;
            }
            function k(e) {
                for (var t = 0; t < h.length; t++) if (e.hasAttribute(h[t])) return !0;
                return "rtl" == e.getAttribute("dir");
            }
            function E(e) {
                [].concat(i(h), [ "spellcheck" ]).forEach(function(t) {
                    return e.removeAttribute(t);
                });
            }
            function C(e) {
                return !k(e) && !x(e) && (d.isVisible(e) && y(e) || d.hasClass(e, "grammDemo"));
            }
            function T(e, t) {
                for (var n = z.querySelectorAll(e), r = n.length, i = 0; r > i; i++) {
                    var o = n[i];
                    C(o) && t.push(o);
                }
            }
            function N(e) {
                return T("textarea", e);
            }
            function S(e) {
                return T('[contenteditable]:not([contenteditable="false"]):not([data-reactid])', e);
            }
            function M(e) {
                return u.isChrome() ? T("[contenteditable][data-reactid]", e) : [];
            }
            function P(e) {
                if (b.href = e.src, (0 != e.src.indexOf("http") || W.test(e.src)) && "about:blank" != e.src && (!e.src || -1 != e.src.indexOf("javascript:") || b.protocol == document.location.protocol && b.hostname == document.location.hostname && b.port == document.location.port) && !d.hasClass(e, m["default"].baseCls)) {
                    var t = null;
                    try {
                        t = e.contentDocument;
                    } catch (n) {
                        return;
                    }
                    if ((!t || t.body) && t && !k(e) && !k(t.body) && y(e)) {
                        var r = t.querySelector("html") || {
                            hasAttribute: u._f
                        };
                        if (("on" == t.designMode || t.body.hasAttribute("contenteditable") || "false" == t.body.getAttribute("contenteditable") || r.hasAttribute("contenteditable") || "false" == r.getAttribute("contenteditable")) && !x(e)) return u.isFF() && "on" == t.designMode && (t.designMode = "off", 
                        t.body.setAttribute("contenteditable", !0)), !0;
                    }
                }
            }
            function O(e) {
                for (var t = z.querySelectorAll("iframe"), n = t.length, r = 0; n > r; r++) {
                    var i = t[r];
                    P(i) && e.push(i);
                }
            }
            function D(e) {
                U = c["default"].mapValues(U, function(t, n) {
                    return [].concat(t, e[n]);
                });
            }
            function A() {
                var e = R(), t = {
                    textareas: c["default"].difference(e.textareas, U.textareas),
                    contenteditables: c["default"].difference(e.contenteditables, U.contenteditables),
                    iframes: c["default"].difference(e.iframes, U.iframes),
                    htmlghosts: c["default"].difference(e.htmlghosts, U.htmlghosts)
                };
                return D(t), t;
            }
            function R() {
                var e = f();
                return j() || w() || _() ? e : (N(e.textareas), S(e.contenteditables), O(e.iframes), 
                M(e.htmlghosts), e);
            }
            var I = arguments.length <= 0 || void 0 === arguments[0] ? document : arguments[0], L = arguments.length <= 1 || void 0 === arguments[1] ? v : arguments[1], B = 150, F = 35, H = 300, U = f(), z = void 0, q = void 0, G = void 0, V = void 0, W = void 0, X = void 0, Y = void 0;
            p(I);
            var K = l["default"]({
                get: A,
                reset: a,
                remove: s,
                stop: r
            }), $ = K.on;
            return K.on = function(t, n) {
                return X || e(), $(t, n);
            }, K;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("emitter"), l = r(a), s = e("lodash"), c = r(s), u = e("./util"), d = e("./dom"), f = e("./iframe"), m = r(f), p = e("./config"), g = r(p), h = g["default"].restrictedAttrs, v = g["default"].PAGE_CONFIG, b = document.createElement("a");
        n["default"] = o, t.exports = n["default"];
    }, {
        "./config": "/project/src/js/lib/config.js",
        "./dom": "/project/src/js/lib/dom.js",
        "./iframe": "/project/src/js/lib/iframe.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/position.js": [ function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            var i = {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            };
            if (!e) return i;
            var o = e.ownerDocument, a = o.documentElement, l = e.getClientRects(), s = a.scrollTop || o.body.scrollTop, c = a.scrollLeft || o.body.scrollLeft, u = t && t.contentDocument, d = [];
            if (0 == l.length) return i;
            for (var f = 0; f < l.length; f++) {
                var m = l[f];
                d.push({
                    top: m.top + s,
                    left: m.left + c,
                    height: m.height,
                    width: m.width
                });
            }
            return u && u.documentElement && u.documentElement == a && !function() {
                var e = r(t);
                d.map(function(t) {
                    return t.top += e.top - s, t.left += e.left - c, t;
                });
            }(), n && d || d[0];
        }
        function i(e, t, n) {
            var r = e.ownerDocument, i = l(r), o = e.clientWidth, a = e.clientHeight, s = {}, c = {
                top: t.top - r.body.scrollTop - a,
                left: t.left - o,
                bottom: r.body.scrollTop + i.height - t.top - t.height - a,
                right: r.body.scrollLeft + i.width - t.left - o
            };
            return c.bottom < 0 && c.bottom < c.top || n ? (s.top = t.top - a + 3, s.flip = !0) : (s.top = t.top + t.height - 3, 
            s.flip = !1), c.right < 0 ? s.left = i.width - o : s.left = t.left, t.forceCoords && (s.left = t.pageX, 
            s.top = s.flip ? t.pageY - a : t.pageY + 5), {
                rect: s,
                delta: c,
                sourceRect: t
            };
        }
        function o(e, t, n) {
            function r(e, t) {
                s[e] += o[t] / 2 - l[t] / 2, i[e] > s[e] && (s[e] = i[e]), i[e] + i[t] < s[e] + l[t] && (s[e] = i[e] + i[t] - l[t]);
            }
            var i = a(), o = t.getBoundingClientRect(), l = e.getBoundingClientRect(), s = {
                flipY: !1,
                flipX: !1
            }, c = {
                top: o.top - i.top,
                left: o.left - i.left,
                bottom: -o.bottom + i.bottom,
                right: -o.right + i.right
            };
            return n = n || "top:center", n = n.split(":"), s.top = o.top, "center" == n[0] ? r("top", "height") : "top" == n[0] ? c.top > l.height ? s.top -= l.height : (s.top += o.height, 
            s.flipY = !0) : "bottom" == n[0] && (c.bottom > l.height ? s.top += o.height : (s.top -= l.height, 
            s.flipY = !0)), s.left = o.left, "center" == n[1] ? r("left", "width") : "left" == n[1] ? (s.left += o.width - l.width, 
            c.left + o.width < l.width && (s.left = i.left)) : "right" == n[1] && c.right + o.width < l.width && (s.left += o.width + c.right - l.width), 
            s;
        }
        function a() {
            var e = document.createElement("div");
            e.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;", document.documentElement.insertBefore(e, document.documentElement.firstChild);
            var t = e.getBoundingClientRect();
            return document.documentElement.removeChild(e), t;
        }
        function l(e) {
            var t = e.documentElement.clientTop || e.body.clientTop || 0, n = e.documentElement.clientLeft || e.body.clientLeft || 0, r = e.documentElement.scrollLeft || e.body.scrollLeft, i = e.documentElement.scrollTop || e.body.scrollTop, o = e.defaultView.innerHeight, a = e.defaultView.innerWidth;
            return {
                width: a,
                height: o,
                scrollTop: i - t,
                scrollLeft: r - n,
                top: t,
                left: n
            };
        }
        function s(e, t) {
            if (!e || e == t) return {
                x: 0,
                y: 0
            };
            var n = {
                x: e.offsetLeft,
                y: e.offsetTop
            }, r = s(e.offsetParent, t);
            for (var i in r) n[i] += r[i];
            return n;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n["default"] = {
            posToRect: i,
            getAbsRect: r,
            getPos: s,
            posToEl: o
        }, t.exports = n["default"];
    }, {} ],
    "/project/src/js/lib/prefs.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }
            function a(e, t, n) {
                function r(e) {
                    return e[n] || {
                        enabled: !0
                    };
                }
                var i = "boolean" == typeof t, o = {};
                try {
                    if (!e) throw "bad db";
                    o = JSON.parse(e);
                } catch (a) {
                    v.set("enabled_db", "{}");
                }
                if ("" === t && n) return r(o).enabled;
                if (i) {
                    var l = r(o);
                    l.enabled = t, o.lastChange = {
                        value: t,
                        domain: n
                    }, o[n] = l, v.set("enabled_db", JSON.stringify(o)), d["default"].emitTabs("enabled", o.lastChange);
                }
                return t;
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var l = this, s = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, c = i(s), u = e("./message"), d = i(u), f = e("./util"), m = e("emitter"), p = i(m), g = c["default"];
            g || (g = {
                prefs: {
                    get: function(e, t) {
                        return setTimeout(function() {
                            return t(localStorage[e]);
                        }, 0);
                    },
                    set: function(e, t) {
                        return localStorage[e] = t;
                    }
                }
            }), d["default"].on("prefs_changed", function(e) {
                return v.emit(e.key, e.value);
            }), d["default"].on("enabled", function(e) {
                return v.emit("enabled", e);
            });
            var h = function(e) {
                return new Promise(function(t, n) {
                    try {
                        g.prefs.get(e, t, n);
                    } catch (r) {
                        n(r);
                    }
                });
            }, v = p["default"]({
                get: function(e, t) {
                    return regeneratorRuntime.async(function(n) {
                        for (var r = this; ;) switch (n.prev = n.next) {
                          case 0:
                            if (!Array.isArray(e)) {
                                n.next = 12;
                                break;
                            }
                            return e.includes("enabled") && e.includes("domain") && !function() {
                                var e = t;
                                t = function(t) {
                                    v.enabled("", t.domain, function(n) {
                                        t.enabled = n, e(t);
                                    });
                                };
                            }(), n.prev = 2, n.next = 5, regeneratorRuntime.awrap(function() {
                                var n, i;
                                return regeneratorRuntime.async(function(r) {
                                    for (;;) switch (r.prev = r.next) {
                                      case 0:
                                        return r.next = 2, regeneratorRuntime.awrap(Promise.all(e.map(h)));

                                      case 2:
                                        n = r.sent, i = e.reduce(function(e, t, r) {
                                            return Object.assign(e, o({}, t, n[r]));
                                        }, {}), t(i);

                                      case 5:
                                      case "end":
                                        return r.stop();
                                    }
                                }, null, r);
                            }());

                          case 5:
                            n.next = 11;
                            break;

                          case 7:
                            n.prev = 7, n.t0 = n["catch"](2), console.error("prefs get error:", n.t0), d["default"].emitError(n.t0);

                          case 11:
                            return n.abrupt("return");

                          case 12:
                            h(e).then(t, d["default"].emitError);

                          case 13:
                          case "end":
                            return n.stop();
                        }
                    }, null, l, [ [ 2, 7 ] ]);
                },
                set: function(e, t) {
                    var n;
                    return regeneratorRuntime.async(function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.prev = 0, r.next = 3, regeneratorRuntime.awrap(h(e));

                          case 3:
                            n = r.sent, n != t && d["default"].emitTabs("prefs_changed", {
                                key: e,
                                value: t
                            }), g.prefs.set(e, t), r.next = 11;
                            break;

                          case 8:
                            r.prev = 8, r.t0 = r["catch"](0), d["default"].emitError(r.t0);

                          case 11:
                          case "end":
                            return r.stop();
                        }
                    }, null, l, [ [ 0, 8 ] ]);
                },
                enabled: function(e, t) {
                    void 0 === e && (e = "");
                    var n = arguments.length <= 2 || void 0 === arguments[2] ? f._f : arguments[2];
                    f.isFunction(e) && (n = e, e = "");
                    var r = function(t) {
                        return v.get("enabled_db", function(r) {
                            return n(a(r, e, t));
                        });
                    };
                    t ? r(t) : f.getDomain(r);
                },
                incFixed: function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                    v.get("fixed_errors", function(t) {
                        t = parseInt(t), isNaN(t) && (t = 0), t += e, v.set("fixed_errors", t);
                    });
                }
            });
            n["default"] = v, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./message": "/project/src/js/lib/message.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter"
    } ],
    "/project/src/js/lib/referral-notification.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./tracking/index"), o = e("./dom"), a = e("react"), l = r(a), s = e("./message"), c = r(s), u = "gr-referral-notification", d = function(e) {
            return u + "_" + e;
        }, f = l["default"].createClass({
            displayName: "ReferralNotification",
            showDialog: function() {
                c["default"].emitFocusedTab("referral-open-page", {
                    placement: "referral_popup",
                    type: "dialog"
                }), this.props.hide();
            },
            hide: function() {
                i.call("mixpanel.track", "WE:Referral_Notification_Closed", {
                    placement: "referral_popup"
                }), this.props.onclose("dialog"), this.props.hide();
            },
            componentDidMount: function() {
                var e = this;
                this.timeoutID = setTimeout(function() {
                    e.props.hide();
                }, 8e3);
            },
            handleMouseOver: function() {
                this.timeoutID && clearTimeout(this.timeoutID);
            },
            render: function() {
                return l["default"].createElement("div", {
                    className: u,
                    onMouseOver: this.handleMouseOver
                }, l["default"].createElement("div", {
                    className: d("btn-close"),
                    onClick: this.hide
                }), l["default"].createElement("div", {
                    className: d("logo")
                }), l["default"].createElement("div", {
                    className: d("title")
                }, "Free Premium Upgrade"), l["default"].createElement("div", {
                    className: d("steps")
                }, "It’s simple:", l["default"].createElement("br", null), l["default"].createElement("span", {
                    className: d("num")
                }, "1. "), "Get a friend to try Grammarly", l["default"].createElement("br", null), l["default"].createElement("span", {
                    className: d("num")
                }, "2. "), "You both get one FREE week of Premium"), l["default"].createElement("div", {
                    className: d("btn"),
                    onClick: this.showDialog
                }, "Go Premium!"));
            }
        });
        n["default"] = function(e, t, n) {
            function r() {
                l["default"].unmountComponentAtNode(a), e.documentElement.removeChild(a);
            }
            var a = e.createElement("div");
            o.addClass(a, d("container")), e.documentElement.insertBefore(a, e.body);
            var s = l["default"].render(l["default"].createElement(f, {
                hide: r,
                onclose: t
            }), a);
            return i.call("mixpanel.track", "WE:Referral_Notification_Shown", {
                firstTime: n,
                placement: "referral_gmail",
                product: "extension"
            }), s;
        }, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./message": "/project/src/js/lib/message.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        react: "react"
    } ],
    "/project/src/js/lib/referral.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            return a(e, "locked", "dialog");
        }
        function o(e) {
            return a(e, "locked", "gButton");
        }
        function a(e, t, n) {
            if ("undefined" == typeof e) return _.call("felog.error", "user_is_undefined"), 
            !1;
            var r = new RegExp("^referral$"), i = e.mimic && -1 != e.mimic.indexOf("002_referral_" + t), o = e.mimic && -1 != e.mimic.indexOf("003_referral_" + t), a = s(e), l = e.groups && e.groups.some(function(e) {
                return r.test(e);
            });
            return p(e, n) && (i || o || a || l);
        }
        function l(e, t) {
            function n(e, t) {
                clearTimeout(e), clearInterval(t);
            }
            function r(t) {
                var n = m(e, "ctaClicked", t) || 0;
                d(e, {
                    closedTs: new Date().getTime(),
                    ctaClicked: ++n
                }, t);
            }
            function i(e) {
                var t = v.getParentBySel(e, "div[role=dialog]");
                if (t) return t.querySelector('div[jsaction*="send"]');
            }
            function o(e) {
                var t = v.getParentByTag(e, "TABLE");
                if (t && (t = v.getParentByTag(t, "TABLE"))) {
                    var n = t.querySelector("div[role=button][command=Files]");
                    if (n) {
                        var r = v.getParentByTag(n, "TABLE");
                        if (r) return r.querySelector("div[role=button]");
                    }
                }
            }
            if (t) {
                var a = document.location.hostname, l = {
                    "inbox.google.com": i,
                    "mail.google.com": o
                }, s = void 0;
                if (l[a] && (s = l[a](t))) {
                    var c = void 0, u = void 0;
                    s.addEventListener("click", function() {
                        u = setTimeout(function() {
                            n(u, c);
                        }, 12e3), c = setInterval(function() {
                            if (!v.getParentByTag(s, "BODY")) {
                                n(u, c);
                                var t = m(e, "seenBefore", "dialog");
                                p(e, "dialog") && w["default"](document, r, !t), t || d(e, {
                                    seenBefore: !0
                                }, "dialog");
                            }
                        }, 1e3);
                    });
                }
            }
        }
        function s(e) {
            return e.mimic && -1 != e.mimic.indexOf("test_group");
        }
        function c(e) {
            return e.mimic && e.mimic.indexOf("003_referral_locked") > -1;
        }
        function u(e) {
            return e.mimic && e.mimic.indexOf("002_referral_locked") > -1;
        }
        function d(e, t, n) {
            if (e.settings = e.settings || {}, c(e) || s(e)) {
                var r = e.settings["003_referral_" + n];
                r = "object" == typeof r ? r : {}, e.settings["003_referral_" + n] = h({}, r, t);
            } else if (u(e)) {
                var i = e.settings["002_referral"] || {};
                if (!!i.ctaClicked < 3) {
                    var o = e.settings["002_referral_" + n] || {};
                    o = "object" == typeof o ? o : {}, e.settings["002_referral_" + n] = h({}, o, t);
                }
            }
            k["default"].setSettings(e.settings);
        }
        function f(e) {
            return function(t) {
                var n = m(e, "ctaClicked", t) || 0;
                d(e, {
                    closedTs: new Date().getTime(),
                    ctaClicked: ++n
                }, t);
            };
        }
        function m(e, t, n) {
            void 0 === e && (e = {});
            var r = e.settings || {};
            if (c(e) || s(e)) return r["003_referral_" + n] && r["003_referral_" + n][t];
            if (u(e)) {
                var i = !1;
                return "object" == typeof r["002_referral_" + n] ? i = r["002_referral_" + n][t] : "object" == typeof r["002_referral"] && (i = r["002_referral"][t]), 
                i;
            }
            return r["002_referral"] ? void 0 : !1;
        }
        function p(e, t) {
            var n = m(e, "ctaClicked", t) || 0, r = m(e, "closedTs", t) || 0, i = new Date().getTime(), o = new Date(e.registrationDate).getTime(), a = i >= o + 6048e5, l = i >= r + 2592e5;
            return n >= 3 || !l || !a ? !1 : !0;
        }
        function g(e, t) {
            var n = t.user;
            n && (i(n) || o(n)) && y["default"].on("referral-open-page", function(e) {
                var t = e.placement;
                _.call("mixpanel.track", "WE:Referral_Button_Clicked", {
                    placement: t
                }), y["default"].emitBackground("open-url", "https://grammarly.com/referral");
            });
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var h = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        }, v = e("./dom"), b = e("./message"), y = r(b), j = e("./referral-notification"), w = r(j), _ = e("./tracking/index"), x = e("./auth"), k = r(x);
        n["default"] = {
            isGmail: i,
            isGbutton: o,
            initGmail: l,
            close: f,
            init: g
        }, t.exports = n["default"];
    }, {
        "./auth": "/project/src/js/lib/auth.js",
        "./dom": "/project/src/js/lib/dom.js",
        "./message": "/project/src/js/lib/message.js",
        "./referral-notification": "/project/src/js/lib/referral-notification.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js"
    } ],
    "/project/src/js/lib/request.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o(e, t) {
                return t && t.data && (t.query || "post" != t.method) && (e += "?" + s(t.data), 
                delete t.data), u["default"].development && !f["default"] && (e = "/api?url=" + e), 
                f["default"] ? new Promise(function(n, r) {
                    t.type = t.method ? t.method.toUpperCase() : "GET", t.url = e, t.success = function(e) {
                        if (!t.isText && "string" == typeof e) try {
                            e = JSON.parse(e);
                        } catch (r) {
                            console.error(r);
                        }
                        n(e);
                    }, t.error = function(e) {
                        r("Request fail at " + t.type + ":" + t.url + ". Reason: " + e), console.error(e);
                    }, f["default"].request.ajax(t);
                }) : window.fetch(e, t).then(t.isText ? l : a);
            }
            function a(e) {
                return e.json();
            }
            function l(e) {
                return e.text();
            }
            function s(e) {
                var t = [], n = "&";
                for (var r in e) "" !== e[r] && t.push(r + "=" + e[r]);
                return t.join(n);
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var c = e("./config"), u = i(c), d = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, f = i(d);
            n["default"] = {
                fetch: o
            }, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./config": "/project/src/js/lib/config.js"
    } ],
    "/project/src/js/lib/selection-animator.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? document : arguments[1], n = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2];
            p = n;
            var r = c["default"].getAbsRect(e);
            b = t, m = {
                top: r.top + r.height + 1,
                left: r.left,
                width: 0,
                height: 2
            }, h = Math.ceil(r.width / 8), g = r.width - h, setTimeout(function() {
                m.width = g, o();
            }, 10), setTimeout(function() {
                l();
            }, 500), o();
        }
        function o() {
            v = u.renderReactWithParent(f["default"].createElement(j, {
                style: m,
                className: p
            }), b.documentElement, y);
        }
        function a() {
            v && (v.remove(), v = null);
        }
        function l() {
            m.webkitTransitionDuration = "0.2s", m.MozTransitionDuration = "0.2s", m.transitionDuration = "0.2s", 
            m.width = g + h, v && o();
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("./position"), c = r(s), u = e("./dom"), d = e("react"), f = r(d), m = void 0, p = void 0, g = 0, h = 0, v = void 0, b = void 0, y = Symbol("SelectionAnimator"), j = f["default"].createClass({
            displayName: "AnimationLine",
            render: function() {
                return f["default"].createElement("div", {
                    style: this.props.style,
                    className: "g-selection-anim " + this.props.className
                });
            }
        }), w = {
            animate: i,
            remove: a,
            complete: l
        };
        n["default"] = w, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./position": "/project/src/js/lib/position.js",
        react: "react"
    } ],
    "/project/src/js/lib/selection.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("emitter"), o = r(i), a = e("./config"), l = e("./dom"), s = function(e) {
            function t(e) {
                return e.getRangeAt(0).getBoundingClientRect();
            }
            function n(e, t, n) {
                for (var r = e.split(/[.;!?]/g), i = 0, o = 0, a = 0; a < r.length; a++) {
                    if (o = i + r[a].length, t >= i && o >= n) {
                        var l = {
                            t: r[a],
                            s: t - i,
                            e: n - i
                        };
                        return l;
                    }
                    i = o + 1;
                }
            }
            function r(t) {
                var n = t.anchorNode;
                if (!n) return !1;
                var r = a.restrictedAttrs.map(function(e) {
                    return "[" + e + "]";
                }).join(","), i = t.toString().trim(), o = "TEXTAREA" != n.tagName && "INPUT" != n.tagName, s = !(e.activeElement && "INPUT" == e.activeElement.tagName || e.activeElement && "TEXTAREA" == e.activeElement.tagName), c = "true" != n.contentEditable && "plaintext-only" != n.contentEditable, u = !l.getParentBySel(n, r) && !l.matchesSelector(n, r), d = !l.getParentBySel(n, "[contenteditable=true],[contenteditable=plaintext-only]");
                return !!(i && o && s && c && u && d);
            }
            function i(i) {
                var o = i.detail;
                if (2 != o) return void (c && (s.emit("unselect"), c = !1));
                c = !0;
                var a = e.getSelection(), l = r(a);
                if (l) {
                    var u = a.anchorNode.textContent, d = a.toString();
                    if (!d.match(/[0-9_±!@#$%^&*:"|<>?~().,:}{’=']/)) {
                        var f = {
                            t: d,
                            s: 0,
                            e: d.length
                        }, m = a.getRangeAt(0);
                        if (m.ownerDocument = e, a.anchorNode == a.focusNode) {
                            var p = a.anchorOffset, g = p + d.length;
                            f = n(u, p, g);
                        }
                        var h = {
                            data: {
                                v: encodeURI(f.t),
                                s: f.s,
                                e: f.e,
                                w: d
                            },
                            pos: t(a),
                            el: m
                        };
                        s.emit("select", h);
                    }
                }
            }
            l.listen(e, "click", i);
            var s = o["default"]({
                release: function() {
                    l.unlisten(e, "click", i);
                },
                isValidSelection: r
            }), c = !1;
            return s;
        };
        n["default"] = s, t.exports = n["default"];
    }, {
        "./config": "/project/src/js/lib/config.js",
        "./dom": "/project/src/js/lib/dom.js",
        emitter: "emitter"
    } ],
    "/project/src/js/lib/signin-component.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("../../styl/signin.styl"), o = r(i), a = e("react"), l = r(a), s = l["default"].createClass({
            displayName: "SigninComponent",
            render: function() {
                return l["default"].createElement("div", {
                    className: o["default"].signin
                }, l["default"].createElement("div", {
                    className: o["default"].content
                }, l["default"].createElement("h3", {
                    className: o["default"].head
                }, "Sign up for Grammarly"), l["default"].createElement("div", {
                    className: o["default"].descr
                }, "You need a Grammarly account so we can store your personal dictionary and optimize our algorithms for your writing style. It’s easy, and free!"), l["default"].createElement("a", {
                    className: o["default"].auth_button,
                    href: "https://www.grammarly.com/signup",
                    target: "__blank",
                    role: "button"
                }, "Create an account")), l["default"].createElement("div", {
                    className: o["default"].footer
                }, l["default"].createElement("a", {
                    href: "https://www.grammarly.com"
                }), l["default"].createElement("div", {
                    className: o["default"].login_text
                }, "Already have an account? ", l["default"].createElement("a", {
                    href: "https://www.grammarly.com/signin",
                    className: o["default"].signin_link,
                    target: "__blank"
                }, "Log in"))));
            }
        });
        n["default"] = s, t.exports = n["default"];
    }, {
        "../../styl/signin.styl": "/project/src/styl/signin.styl",
        react: "react"
    } ],
    "/project/src/js/lib/signin.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            function t() {
                return o.renderReactWithParent(s["default"].createElement(m, null), c, d);
            }
            function n(e) {
                i(), e.stopPropagation(e);
            }
            function r(e) {
                27 == e.keyCode && i();
            }
            function i() {
                f.style.opacity = 0, o.removeClass(f, "gr-_show"), o.unlisten(l.body, "keydown", r), 
                o.unlisten(f, "click", n), p.emit("hide");
            }
            var l = e.doc, c = l.documentElement, d = a.guid(), f = l.querySelector(".gr-_signin");
            f || (f = t().component.getDOMNode()), f.style.opacity = 0, o.addClass(f, "gr-_show"), 
            o.listen(l.body, "keydown", r), o.listen(f, "click", n), setTimeout(function() {
                return f.style.opacity = 1;
            }, 50);
            var p = u["default"]({});
            return p;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./dom"), a = e("./util"), l = e("react"), s = r(l), c = e("emitter"), u = r(c), d = e("./signin-component"), f = r(d);
        n["default"] = i;
        var m = s["default"].createClass({
            displayName: "SigninDialog",
            render: function() {
                var e = {
                    width: 476,
                    height: 323,
                    border: 0,
                    background: "white"
                };
                return s["default"].createElement("div", {
                    className: "gr-_signin",
                    style: {
                        opacity: 0
                    }
                }, s["default"].createElement("div", {
                    className: "gr-_dialog-content",
                    style: e
                }, s["default"].createElement(f["default"], null)));
            }
        });
        t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./signin-component": "/project/src/js/lib/signin-component.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        react: "react"
    } ],
    "/project/src/js/lib/sites.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n;
            }
            return Array.from(e);
        }
        function o() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? document : arguments[0], t = a.getDomain({
                ownerDocument: e
            }), n = d[t];
            return {
                addDomainClass: function() {
                    e.documentElement.classList.add("gr__" + t.replace(/\./g, "_"));
                },
                customizeElements: function() {
                    n && s["default"](n).each(function(t, n) {
                        return [].concat(i(e.querySelectorAll(n))).forEach(function(e) {
                            s["default"].extend(e.style, t);
                        });
                    });
                },
                getFixesForCurrentDomain: function() {
                    return f[t];
                }
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("./util"), l = e("lodash"), s = r(l), c = e("./client-script"), u = r(c), d = {
            "translate.google.com": {
                "#gt-clear": {
                    zIndex: 2
                }
            },
            "linkedin.com": {
                ".mentions-highlighter": {
                    zIndex: 0
                }
            },
            "us.nakedwines.com": {
                ".postbutton": {
                    display: "inline-block"
                }
            }
        }, f = {
            "twitter.com": {
                btnMargin: function(e, t) {
                    t.clientHeight > 40 || (e["margin-left"] = e["margin-left"] - 30);
                }
            }
        };
        !function() {
            function e() {
                if (window.randomize) {
                    var e = window.randomize;
                    window.randomize = function(t) {
                        try {
                            if (t.data) {
                                var n = JSON.parse(t.data);
                                n[0] && n[0].parentWindowLocation && e(t);
                            }
                        } catch (t) {}
                    };
                }
            }
            (a.getDomain().indexOf("chase.com") > -1 || a.getDomain().indexOf("chaseonline.com") > -1) && u["default"].addScript(document, [ e ]);
        }(), n["default"] = o, t.exports = n["default"];
    }, {
        "./client-script": "/project/src/js/lib/client-script.js",
        "./util": "/project/src/js/lib/util.js",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/socket.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o(e) {
                if ("disconnected" != e) {
                    var t = {};
                    "string" == typeof e ? t.msg = e : e.error && (t.readyState = e.error.currentTarget && e.error.currentTarget.readyState, 
                    t.returnValue = e.error.returnValue), g.call("felog.error", "socket_fail", t), console.error(e), 
                    window.emit || u["default"](window), window.emit("bgerror", "when send message to the socket");
                }
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var a = e("./util"), l = e("./message"), s = i(l), c = e("emitter"), u = i(c), d = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, f = i(d), m = e("websocket"), p = i(m), g = e("./tracking/index"), h = e("./timers"), v = i(h), b = e("lodash"), y = i(b), j = {}, w = function(e) {
                return f["default"] || window.socketServer || x(), a.isBg() ? x() : _(e);
            }, _ = function(e) {
                function t(t, i) {
                    var a = {
                        socketId: c,
                        method: t,
                        arg: i,
                        url: e.url,
                        useStandBy: e.useStandBy
                    };
                    d || r(), s["default"].emitBackground("socket-client", a, null, o), "close" == t && n();
                }
                function n() {
                    l.un("disconnect", n), delete j[c], d = !1, s["default"].off("socket-server", i, o), 
                    g.call("felog.info", "socket_close", {
                        active_time: v["default"].stop(c),
                        current_sockets: Object.keys(j).length
                    });
                }
                function r() {
                    d = !0, s["default"].on("socket-server", i, o);
                }
                function i(e, t) {
                    e.socketId == c && (e.msg && e.msg.action && "error" == e.msg.action.toLowerCase() && (g.call("statsc.ui.increment", "stability:capi_error"), 
                    g.call("felog.event", "stability.capi_error", e)), t("ok"), l.emit(e.event, e.msg));
                }
                for (var l = u["default"]({}), c = (e || {}).socketId || a.guid(), d = !1, f = [ "connect", "send", "close", "reconnect", "release", "wsPlay", "wsPause" ], m = 0; m < f.length; m++) {
                    var p = f[m];
                    l[p] = t.bind(null, p);
                }
                return l.one("connect", function() {
                    j[c] = j[c] || c, v["default"].start(c), g.call("felog.event", "socket_open", {
                        current_sockets: Object.keys(j).length
                    });
                }), l.one("disconnect", n), l.on("error", o), l.socketId = c, l.toString = function() {
                    return "[object SocketClient]";
                }, l;
            }, x = function() {
                function e(e, n) {
                    if (e) {
                        var r = e.socketId, i = j[r], o = e.method, a = "close" == o;
                        (i || !a) && (i || (i = k(e, t), j[r] = i), o && (i[o](e.arg), a && t(r)));
                    }
                }
                function t(e) {
                    j[e] && j[e].close(), delete j[e];
                }
                var n = {};
                return window.socketServer = n, s["default"].on("iframe-mode", function(e) {
                    console.log("IFRAME MODE", e.id, j), j[e.id].iframeMode(e.iframeMode);
                }, o, !0), s["default"].on("socket-client", e, o, !0), n.sockets = j, n.toString = function() {
                    return "[object SocketServer]";
                }, n;
            }, k = function(e, t) {
                function n(e, n) {
                    var f = setTimeout(function() {
                        console.log("CLOSE SOCKET"), u++, u > 7 && !d && (g.call("felog.warn", "too_frequent_socket_release", {
                            release_count: u
                        }), d = !0);
                        var e = r ? "socket_timeout_close_iframe:stability" : "socket_timeout_close:stability";
                        g.call("statsc.ui.increment", e), i.close(), i.release(), t();
                    }, 5e3), m = c ? "socket-server-iframe" : "socket-server";
                    console.log("from ws", e, l, n, m), s["default"].emitTabs(m, {
                        socketId: l,
                        event: e,
                        msg: n,
                        id: a.guid()
                    }, function(e) {
                        return e && clearTimeout(f);
                    }, o);
                }
                function r(e) {
                    c = e, console.log("USE EXT SOCKET", e);
                }
                var i = p["default"](e), l = e.socketId, c = void 0, u = 0, d = !1;
                return y["default"].extend(i, {
                    emit: n,
                    iframeMode: r,
                    toString: function() {
                        return "[object BackgroundSocket]";
                    }
                }), i;
            };
            n["default"] = w, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "./message": "/project/src/js/lib/message.js",
        "./timers": "/project/src/js/lib/timers.js",
        "./tracking/index": "/project/src/js/lib/tracking/index.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        lodash: "lodash",
        websocket: "websocket"
    } ],
    "/project/src/js/lib/spinner.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e) {
            var t = e.el, n = a.guid(), r = o.renderReactWithParent(s["default"].createElement(c, null), t, n, "spinner");
            return {
                remove: r.remove,
                el: r.component.getDOMNode()
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./dom"), a = e("./util"), l = e("react"), s = r(l);
        n["default"] = i;
        var c = s["default"].createClass({
            displayName: "SpinnerComponent",
            render: function() {
                return s["default"].createElement("div", {
                    className: "gr_-spinner"
                }, s["default"].createElement("div", {
                    className: "gr_-bounce1"
                }), s["default"].createElement("div", {
                    className: "gr_-bounce2"
                }), s["default"].createElement("div", {
                    className: "gr_-bounce3"
                }));
            }
        });
        t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./util": "/project/src/js/lib/util.js",
        react: "react"
    } ],
    "/project/src/js/lib/textarea-btn.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        }
        function o(t) {
            function n() {
                M = H.createElement("div"), P = a().getDOMNode(), A = g["default"]({
                    el: P,
                    container: M,
                    editorEl: R.el,
                    srcEl: R.srcEl,
                    posSourceEl: t.posSourceEl,
                    isTextarea: R.isTextarea
                }), A.on("update", i), A.insert(), f.listen(P, "click", r);
                var n = e("./btn-hover-menu");
                B = n({
                    el: P,
                    editor: R,
                    referral: I,
                    closeReferral: L,
                    posSourceEl: t.posSourceEl
                }), F = v["default"]({
                    el: P,
                    doc: H,
                    outerIframe: t.editor.outerIframe,
                    win: window
                });
            }
            function r(e) {
                R.isOffline() && F.fastShow();
            }
            function i(e) {
                e.addClass && -1 == D.indexOf(e.addClass) && (D.push(e.addClass), delete e.addClass), 
                e.removeClass && (D = c["default"].without(D, e.removeClass), delete e.addClass), 
                O = c["default"].merge(O, e), o();
            }
            function o() {
                M || n(), q = R.getFiltered().filter(function(e) {
                    return e.inDom;
                }).length, a();
            }
            function a() {
                return d["default"].render(d["default"].createElement(_, {
                    offline: z,
                    checking: U,
                    count: q,
                    style: O,
                    classes: D
                }), M);
            }
            function s(e) {
                return 0 == e.className.indexOf("gr-") || f.resolveEl(e, j) || f.resolveEl(e, "gr__tooltip");
            }
            function u(e) {
                return f.isFocused(R.el) || e == R.el || f.isParent(e, R.el) || e == P || f.isParent(e, P);
            }
            function m(e) {
                if (u(e.target)) V.show(); else {
                    if (s(e.target)) return;
                    V.hide();
                }
                "blur" == e.type && V.hide();
            }
            function p() {
                0 == P.style.opacity && (P.style.opacity = 1), B.bind(), A.show();
            }
            function h() {
                return B.isOpened() ? void (P.style.opacity = 0) : (A.hide(), void B.unbind());
            }
            function b() {
                z || (clearTimeout(G), w());
            }
            function w() {
                clearTimeout(G), R.getText().trim() && !U && (U = !0, N());
            }
            function x() {
                clearTimeout(G), G = setTimeout(k, 200);
            }
            function k() {
                U = !1, N();
            }
            function E() {
                z = !0, N(), F.enable();
            }
            function C() {
                z = !1, N(), F.disable();
            }
            function T() {
                A.remove(), B.remove(), f.unlisten(P, "click", r), F.remove(), M.parentNode && M.parentNode.removeChild(M);
            }
            function N() {
                var e = R.errorData();
                y["default"].get("premium", function(t) {
                    e.premium = t, B.update(e), o();
                });
            }
            function S() {
                A.camouflage();
            }
            var M = void 0, P = void 0, O = {
                visibility: "hidden"
            }, D = [], A = void 0, R = t.editor, I = t.isGbuttonReferral, L = t.closeGbuttonReferral, B = void 0, F = void 0, H = R.el.ownerDocument, U = void 0, z = void 0, q = 0, G = void 0;
            o();
            var V = l["default"]({
                show: p,
                hide: h,
                toggle: m,
                checking: b,
                offline: E,
                online: C,
                remove: T,
                update: N,
                camouflage: S,
                cancelChecking: x,
                isGrElement: s,
                isShow: u
            });
            return V;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("emitter"), l = r(a), s = e("lodash"), c = r(s), u = e("react"), d = r(u), f = e("./dom"), m = e("./util"), p = e("./btn-pos"), g = r(p), h = e("./error-tooltip"), v = r(h), b = e("./prefs"), y = r(b), j = "gr-textarea-btn", w = function(e) {
            return j + "_" + e;
        };
        o.baseCls = j, o.cls = w, n["default"] = o;
        var _ = d["default"].createClass({
            displayName: "ButtonComponent",
            render: function() {
                var e, t = this.props.count, n = t > 0 && !this.props.checking, r = c["default"]([ j ]).concat(this.props.classes.map(w)).push(f.cs((e = {}, 
                i(e, w("errors"), n), i(e, w("offline"), this.props.offline), i(e, w("checking"), this.props.checking && !this.props.offline), 
                e))).join(" "), o = f.camelizeAttrs(this.props.style), a = n && t ? t : " ", l = "Found " + t + " " + m.declension(t, [ "error", "errors", "errors" ]) + " in text";
                return t || (l = "Protected by Grammarly"), d["default"].createElement("div", {
                    style: o,
                    className: r
                }, d["default"].createElement("div", {
                    title: l,
                    className: w("status")
                }, a));
            }
        });
        t.exports = n["default"];
    }, {
        "./btn-hover-menu": "/project/src/js/lib/btn-hover-menu.js",
        "./btn-pos": "/project/src/js/lib/btn-pos.js",
        "./dom": "/project/src/js/lib/dom.js",
        "./error-tooltip": "/project/src/js/lib/error-tooltip.js",
        "./prefs": "/project/src/js/lib/prefs.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        lodash: "lodash",
        react: "react"
    } ],
    "/project/src/js/lib/textarea.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = e("./dom"), o = e("./util"), a = e("./ghost"), l = r(a), s = e("textdiff"), c = e("emitter"), u = r(c), d = e("wrap"), f = r(d), m = function(e) {
            function t() {
                return "TEXTAREA" == T.tagName ? T.value : T.parentNode ? f["default"].getText(T) : "";
            }
            function n(e) {
                T.value = e;
            }
            function r() {
                R && (P = t());
            }
            function a() {
                A = T.scrollTop;
            }
            function c(e) {
                return U && i.matchesSelector(e.target, H) ? p() : void 0;
            }
            function d() {
                var e = N.createEvent("TextEvent");
                e.initTextEvent ? F.latestCursor.s == F.latestCursor.e && (e.initTextEvent("textInput", !0, !0, null, String.fromCharCode(8203), 1, "en-US"), 
                setTimeout(function() {
                    F.saveCursor(), F.skipInputEvents(), T.dispatchEvent(e), setTimeout(function() {
                        n(t().replace(String.fromCharCode(8203), "")), F.restoreCursor(), F.skipInputEvents(!1);
                    }, 50);
                }, 50)) : (i.runKeyEvent({
                    el: T,
                    type: "keydown"
                }), i.runKeyEvent({
                    el: T,
                    type: "keyup"
                })), T.scrollTop = A, P = t();
            }
            function m() {
                if ((0 == P.length && t().length > 0 || I) && (P = t(), I = !1), R) {
                    P = P.replace(new RegExp(String.fromCharCode(8203), "g"), "");
                    var e = s.diffPos(P, t()), n = 1 != P.indexOf("@") && -1 == t().indexOf("@");
                    e.delta >= 2 && 0 == e.s && (O || D) && !n && p();
                }
            }
            function p() {
                R && (k(), F.clearData());
            }
            function g(e) {
                F && F.closed || (h(e), r());
            }
            function h(e) {
                O = !1, setTimeout(function() {
                    R || _(), F.showBtn();
                }, 30), R && B.show();
            }
            function v(e) {
                F.camouflage();
            }
            function b(e) {
                D = 13 == e.keyCode;
            }
            function y(e) {
                F.closed || (j(e), setTimeout(r, 1e3));
            }
            function j(e) {
                O = !0, i.isFocused(T) ? B && B.render() : F && F.hideBtn(e);
            }
            function w() {
                return B.render(), {
                    clone: B.clone,
                    cloneVal: B.cloneVal
                };
            }
            function _() {
                function e() {
                    R = !0, i.listen(T, "keyup", v), i.listen(T, "keydown", b), i.listen(S, "click", c, null, !0), 
                    F = L(q), F.dom.insertGhost = w, B = l["default"]({
                        id: M,
                        el: T,
                        editor: F
                    }), B.on("render", m), q.gh = B, P = t(), i.listen(T, "input", r), F.textarea = q, 
                    F.isHtmlGhost || (F.on("beforeReplace", a), F.on("afterReplace", function() {
                        setTimeout(d, 50);
                    })), F.on("rendered", x), F.on("exit", C), F.run(), i.listen(N, "mousemove", F.toggleBtn);
                }
                _ = o._f, e();
            }
            function x() {
                B.generateAlertPositions();
            }
            function k() {
                R && B.hide();
            }
            function E() {
                R = !0, B.show();
            }
            function C() {
                F && (F.un("exit", C), F.remove(), i.unlisten(T.ownerDocument, "mousemove", F.toggleBtn)), 
                q.emit("exit"), T.removeAttribute("data-gramm"), T.removeAttribute("data-txt_gramm_id"), 
                i.unlisten(T, z), i.unlisten(T, "keyup", v), i.unlisten(T, "keydown", b), i.unlisten(S, "click", c, !0), 
                B && B.remove();
            }
            var T = e.el, N = T.ownerDocument, S = N.defaultView, M = e.id, P = t(), O = !1, D = !1, A = void 0, R = !1, I = void 0, L = e.createEditor, B = void 0, F = void 0;
            T.setAttribute("data-gramm", ""), T.setAttribute("data-txt_gramm_id", M);
            var H = "div[role=navigation] li[role=listitem] *", U = "facebook.com" == N.domain, z = {
                focus: g,
                blur: y
            };
            i.listen(T, z), i.isFocused(T) && h();
            var q = u["default"]({
                el: T,
                id: M,
                hideClone: k,
                showClone: E,
                insertGhost: w,
                remove: C,
                activate: _
            });
            return q;
        };
        n["default"] = m, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./ghost": "/project/src/js/lib/ghost.js",
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        textdiff: "textdiff",
        wrap: "wrap"
    } ],
    "/project/src/js/lib/timers.js": [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = {};
        n["default"] = {
            start: function(e) {
                r[e] = Date.now();
            },
            stop: function(e) {
                var t = this.passed(e);
                return delete r[e], t;
            },
            passed: function(e) {
                return e && r[e] ? Date.now() - r[e] : 0;
            }
        }, t.exports = n["default"];
    }, {} ],
    "/project/src/js/lib/tooltip.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i() {
            function e() {
                m.fastHide();
            }
            function t(e) {
                var t = e.target;
                return a.inEl(t, c.posEl);
            }
            function n() {
                c.posEl && (d.parentNode && d.parentNode.removeChild(d), a.unlisten(c.doc, "scroll", e), 
                a.unlisten(c.moveListenerDoc, "scroll", e));
            }
            function r() {
                p && (p = !1, d.style.opacity = 0, d.style.top = "-9999px", m && m.setVisible(!1), 
                a.removeClass(d, c.cls), console.log("hide tooltip"));
            }
            function i() {
                c.cls += " gr-no-transition", l(), setTimeout(function() {
                    c.cls = c.cls.replace(" gr-no-transition", ""), a.removeClass(d, "gr-no-transition");
                }, 100);
            }
            function l() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? c : arguments[0], t = e.posEl, n = void 0 === t ? c.posEl : t, r = e.html, i = void 0 === r ? c.html : r, l = e.text, s = void 0 === l ? c.text : l, h = e.cls, v = void 0 === h ? c.cls : h, b = e.doc, y = void 0 === b ? c.doc : b, j = e.outerIframe, w = void 0 === j ? c.outerIframe : j;
                if (u["default"].extend(c, {
                    posEl: n,
                    html: i,
                    text: s,
                    cls: v,
                    doc: y,
                    outerIframe: w
                }), g) {
                    p = !0, m && m.setVisible(!0), s && d.setAttribute("data-content", s), i && (f.innerHTML = i), 
                    d.className = "gr__tooltip", v && a.addClass(d, v), a.removeClass(d, "gr__flipped");
                    var _ = o.getAbsRect(n, w), x = o.posToRect(d, _), k = x.rect, E = k.top, C = k.left;
                    a.css(d, {
                        top: E,
                        left: C
                    }), x && x.rect && !x.rect.flip && a.addClass(d, "gr__flipped");
                    var T = d.clientWidth, N = d.querySelector(".gr__triangle"), S = _.width / 2;
                    S > T && (S = 0), x.delta.right <= 0 && (S -= x.delta.right), S -= parseInt(getComputedStyle(d, null).getPropertyValue("margin-left")), 
                    N.style.marginLeft = parseInt(S) + "px", d.style.opacity = 1;
                }
            }
            var c = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], d = document.querySelector(".gr__tooltip"), f = void 0, m = void 0, p = void 0, g = void 0 != c.enabled ? c.enabled : !0;
            if (d || (d = a.createEl('<span class="gr__tooltip"><span class="gr__tooltip-content"></span><i class="gr__tooltip-logo"></i><span class="gr__triangle"></span></span>'), 
            document.documentElement.appendChild(d)), f = d.querySelector(".gr__tooltip-content"), 
            c.posEl) {
                var h = c.outerIframe && c.outerIframe.contentDocument || c.doc;
                m = new s["default"]({
                    doc: h,
                    doc2: c.doc,
                    hint: d,
                    hideDelay: 500,
                    delay: 0,
                    onshow: l,
                    onhide: r,
                    inTarget: t
                }), a.listen(c.doc, "scroll", e), a.listen(h, "scroll", e), m.bind();
            }
            var v = {
                show: l,
                fastShow: i,
                hide: r,
                remove: n,
                el: d,
                enable: function() {
                    g = !0;
                },
                disable: function() {
                    g = !1;
                },
                isEnabled: function() {
                    return g;
                }
            };
            return v;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./position"), a = e("./dom"), l = e("./hint"), s = r(l), c = e("lodash"), u = r(c);
        n["default"] = i, t.exports = n["default"];
    }, {
        "./dom": "/project/src/js/lib/dom.js",
        "./hint": "/project/src/js/lib/hint.js",
        "./position": "/project/src/js/lib/position.js",
        lodash: "lodash"
    } ],
    "/project/src/js/lib/tracker.editor.js": [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./tracking/index");
        n["default"] = function(e) {
            var t = e.type, n = e.key, i = e.value, o = e.data;
            (n || o) && (n ? r.call("statsc.ui." + t, n, i) : r.call("statsc.ui." + t, o));
        }, t.exports = n["default"];
    }, {
        "./tracking/index": "/project/src/js/lib/tracking/index.js"
    } ],
    "/project/src/js/lib/tracking/cargo.js": [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            var n = void 0, r = [], i = function(e) {
                r.push(e), n && clearTimeout(n), n = setTimeout(o, t);
            }, o = function() {
                n = null, e(r), r = [];
            };
            return {
                push: i
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n["default"] = r, t.exports = n["default"];
    }, {} ],
    "/project/src/js/lib/tracking/felogPixel.js": [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../config");
        n["default"] = function(e, t) {
            var n = {};
            try {
                JSON.stringify(t), n = t;
            } catch (i) {
                console.error(i);
            }
            var o = document.createElement("img"), a = {
                logger: "javascript",
                platform: "javascript",
                tags: {
                    application: "browserplugin",
                    commit: r.getVersion(),
                    version: r.getVersion()
                },
                message: e,
                extra: n
            }, l = "https://" + r.URLS.raven + "/api/" + r.FELOG.project + "/store/\n?sentry_version=4\n&sentry_client=raven-js/1.1.16\n&sentry_key=" + r.FELOG.key + "\n&sentry_data=" + encodeURIComponent(JSON.stringify(a));
            return o.src = l, o;
        }, t.exports = n["default"];
    }, {
        "../config": "/project/src/js/lib/config.js"
    } ],
    "/project/src/js/lib/tracking/index.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o() {
                function t(e) {
                    var t = e.token, n = e.mpCookie;
                    t && n && (window.mixpanel.persistence.load(), a("mixpanel.setToken", t), a("mixpanel.setProps", {
                        gProduct: "Extension-" + E.getBrowser(),
                        fullProductVersion: C.getVersion()
                    }, "Ext"));
                }
                f["default"](), p["default"](), e("tracker"), window.tracker.init({
                    mixpanel: {
                        key: C.MIXPANEL.key,
                        qaKey: C.MIXPANEL.qaKey,
                        dapi: !0
                    },
                    gnar: {
                        url: C.GNAR.url,
                        qaUrl: C.GNAR.qaUrl,
                        app: E.getBrowser() + "Ext",
                        appVersion: C.getVersion()
                    },
                    felog: {
                        application: "browserplugin",
                        key: C.FELOG.key,
                        url: C.URLS.raven,
                        project: C.FELOG.project,
                        commit: C.getVersion(),
                        version: C.getVersion(),
                        readyOnSetUser: !0
                    },
                    statsc: {
                        url: C.STATSC.URL
                    }
                }), window.tracker.statsc.createRoot({
                    prefix: C.STATSC.PREFIX,
                    postfix: E.getBrowser() + ".extension.world",
                    id: "ui"
                }), _["default"].on("tracking-call", function(e) {
                    var t = e.msg, n = e.data;
                    return a.apply(void 0, [ t ].concat(n));
                }), _["default"].on("tracking-fire", function(e) {
                    var t = e.msg, n = e.data;
                    return s(t, n);
                }), N["default"].get([ "token", "mpCookie" ], t), b["default"].get(".grammarly.com", C.MIXPANEL.cookie, function(e) {
                    e && N["default"].get([ "token" ], function(n) {
                        t(n, e);
                    });
                }), _["default"].on("tracker-init", function(e) {
                    function n(e, t) {
                        t && (delete localStorage[e], h["default"](e, null), h["default"](e, t, s), localStorage[e] = t);
                    }
                    var r = e.mpCookie, i = e.token, o = e.gnar, a = e.dapi;
                    N["default"].set("mpCookie", r);
                    var l = document.location ? document.location.hostname : "", s = {
                        path: "/",
                        domain: l.indexOf(".grammarly.com") > -1 ? ".grammarly.com" : l,
                        expires: new Date(new Date().setYear(new Date().getFullYear() + 1))
                    };
                    h["default"](C.MIXPANEL.cookie, null), h["default"](C.MIXPANEL.cookie, r, s), n("gnar_containerId", o), 
                    n("__fngrprnt__", a), N["default"].get("token", function(e) {
                        i == e && window.tracker && window.tracker.mixpanel.ready || t({
                            token: i,
                            mpCookie: r
                        });
                    });
                }), s("activity-ping");
            }
            function a(e) {
                function t(e, t) {
                    for (var n = e.split("."), r = window.tracker, i = n[n.length - 1], o = 0; o < n.length - 1; ) if (r = r[n[o]], 
                    o++, !r) return console.error("No method " + e + " in tracker object");
                    r[i].apply(r, t), console.info(e, t);
                }
                for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1; n > i; i++) r[i - 1] = arguments[i];
                E.isBgOrPopup() ? setTimeout(function() {
                    return t(e, r);
                }, 20) : (e.indexOf("felog") > -1 && l(r), M("tracking-call", {
                    msg: e,
                    data: r
                }));
            }
            function l() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                return e.request = {
                    url: document.location.hostname,
                    headers: {
                        "User-Agent": navigator.userAgent
                    }
                }, e;
            }
            function s(e, t) {
                if (E.isBgOrPopup()) {
                    if (!k["default"][e]) return console.error("No handler specified for message: " + e);
                    c(k["default"][e], t);
                } else M("tracking-fire", {
                    msg: e,
                    data: t
                });
            }
            function c(e) {
                for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; t > r; r++) n[r - 1] = arguments[r];
                setTimeout(function() {
                    return e.apply(void 0, n);
                }, 20);
            }
            function u() {
                var e = 0, t = 10, n = setInterval(function() {
                    e++, e > t && clearInterval(n);
                    var r = {
                        mpCookie: h["default"](C.MIXPANEL.cookie),
                        token: h["default"]("grauth"),
                        gnar: h["default"]("gnar_containerId"),
                        dapi: h["default"]("__fngrprnt__")
                    };
                    r.mpCookie && r.token && (clearInterval(n), _["default"].emitBackground("tracker-init", r));
                }, 500);
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var d = e("vendor/mixpanel"), f = i(d), m = e("vendor/mixpanel-2.2"), p = i(m), g = e("cookie"), h = i(g), v = e("../bg/cookie"), b = i(v), y = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, j = i(y), w = e("../message"), _ = i(w), x = e("./on"), k = i(x), E = e("../util"), C = e("../config"), T = e("../prefs"), N = i(T), S = j["default"];
            S || (S = {
                tabs: {
                    allTabs: E._f
                }
            });
            var M = _["default"].emitBackground;
            n["default"] = {
                initBgOrPopup: o,
                initContentScript: u,
                fire: s,
                call: a
            }, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        "../bg/cookie": "/project/src/js/lib/bg/cookie.js",
        "../config": "/project/src/js/lib/config.js",
        "../message": "/project/src/js/lib/message.js",
        "../prefs": "/project/src/js/lib/prefs.js",
        "../util": "/project/src/js/lib/util.js",
        "./on": "/project/src/js/lib/tracking/on.js",
        cookie: "cookie",
        tracker: "tracker",
        "vendor/mixpanel": "vendor/mixpanel",
        "vendor/mixpanel-2.2": "vendor/mixpanel-2.2"
    } ],
    "/project/src/js/lib/tracking/on.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o, a = function() {
            function e(e, t) {
                var n = [], r = !0, i = !1, o = void 0;
                try {
                    for (var a, l = e[Symbol.iterator](); !(r = (a = l.next()).done) && (n.push(a.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (s) {
                    i = !0, o = s;
                } finally {
                    try {
                        !r && l["return"] && l["return"]();
                    } finally {
                        if (i) throw o;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), l = e("../prefs"), s = r(l), c = e("../util"), u = e("../request"), d = e("../config");
        n["default"] = (o = {}, i(o, "bg-page-load", function() {}), i(o, "login-timeout", function() {
            window.tracker.felog.event("stability.out_of_time_login"), window.tracker.statsc.ui.increment("stability:out_of_time_login");
        }), i(o, "activity-ping", function() {
            var e = function(e) {
                return parseFloat(Math.round(100 * e * 100) / 100).toFixed(2);
            };
            setInterval(function() {
                return c.isChrome() ? void (window.chrome.system && window.chrome.system.cpu && window.chrome.system.cpu.getInfo(function(t) {
                    var n = t.processors.map(function(e) {
                        return (e.usage.total - e.usage.idle) / e.usage.total;
                    }).reduce(function(e, t, n, r) {
                        return e + t / r.length;
                    }, 0), r = window.performance.memory, i = r.usedJSHeapSize, o = r.totalJSHeapSize;
                    n = e(n), window.tracker.statsc.ui.increment("activity:activity_ping"), window.tracker.statsc.ui.gauge({
                        "performance:memory_used": i,
                        "performance:memory_used_of_total": e((o - i) / o),
                        "performance:cpu_load": n
                    });
                })) : window.tracker.statsc.ui.increment("activity:activity_ping");
            }, d.FELOG.pingTimeout);
        }), i(o, "daily-ping", function() {
            function e(e) {
                var n = e.token, r = e.pingDate;
                r = r || "";
                var i = r.split("|"), o = a(i, 2), l = o[0], f = o[1];
                if (!(l && l > Date.now() && f == n) && n) {
                    window.tracker.mixpanel.dapiEvent("Daily_Ping", {
                        gProduct: "Extension-" + c.getBrowser()
                    }), window.tracker.gnar.trackTrackTrack(), window.tracker.mixpanel.track("Ext:Daily_Ping"), 
                    window.tracker.felog.event("daily_ping");
                    var m = t();
                    s["default"].set("pingDate", [ m, n ].join("|")), u.fetch(d.URLS.authPing, {
                        data: {
                            type: "extension-" + c.getBrowser(),
                            nocookie: !0
                        },
                        method: "post",
                        query: !0
                    });
                }
            }
            function t() {
                var e = new Date();
                return e.getHours() > 2 && e.setDate(e.getDate() + 1), e.setHours(3), e.setMinutes(Math.floor(60 * Math.random())), 
                e.getTime();
            }
            d.debug || s["default"].get([ "token", "pingDate" ], e);
        }), o), t.exports = n["default"];
    }, {
        "../config": "/project/src/js/lib/config.js",
        "../prefs": "/project/src/js/lib/prefs.js",
        "../request": "/project/src/js/lib/request.js",
        "../util": "/project/src/js/lib/util.js"
    } ],
    "/project/src/js/lib/tracking/statscPixel.js": [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../util"), i = e("../config");
        n["default"] = function(e, t) {
            var n = t[0] && t[0].split(":");
            if (n[0] && n[1]) {
                var o = "grammarly.ui." + n[0] + "." + r.getBrowser() + ".extension.world." + n[1], a = {
                    c: {}
                };
                a.c[o] = [ "1" ];
                var l = document.createElement("img");
                return l.src = i.STATSC.URL + "?json=" + JSON.stringify(a), l;
            }
        }, t.exports = n["default"];
    }, {
        "../config": "/project/src/js/lib/config.js",
        "../util": "/project/src/js/lib/util.js"
    } ],
    "/project/src/js/lib/util.js": [ function(e, t, n) {
        (function(r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            function o() {
                return -1 != window.navigator.userAgent.indexOf("Firefox");
            }
            function a() {
                return !!window.chrome;
            }
            function l() {
                return !!window.safari;
            }
            function s() {
                return window.IS_BG;
            }
            function c() {
                return window.IS_POPUP;
            }
            function u() {
                return s() || c();
            }
            function d() {
                return a() ? "chrome" : o() ? "firefox" : l() ? "safari" : "other";
            }
            function f() {
                return new Promise(function(e) {
                    var t = setTimeout(function() {
                        return D["default"].tabs.getCurrentTabUrl(e);
                    }, 2e3);
                    D["default"].tabs.getCurrentTabUrl(function(n) {
                        clearTimeout(t), e(n);
                    });
                });
            }
            function m() {
                return window.chrome && window.chrome.runtime && window.chrome.runtime.lastError;
            }
            function p(e) {
                return !!(e && e.constructor && e.call && e.apply);
            }
            function g(e, t) {
                return p(e) && (t = e, e = ""), t ? void (D["default"] && D["default"].tabs ? f().then(function(e) {
                    return t(v(e));
                }) : t(h(e))) : h(e);
            }
            function h(e) {
                var t = e && e.ownerDocument || document, n = t.location || t.defaultView.location;
                return n ? b(n.hostname) : "";
            }
            function v(e) {
                var t = document.createElement("a");
                return t.href = e, b(t.hostname);
            }
            function b(e) {
                return e.replace("www.", "");
            }
            function y(e) {
                var t = e && e.ownerDocument || document, n = t.location || t.defaultView.location;
                return n ? n.pathname + n.search : "";
            }
            function j(e, t) {
                function n() {
                    function n() {
                        i(), e();
                    }
                    function i() {
                        var i = setTimeout(n, t);
                        r[e] = i;
                    }
                    i();
                }
                var r = j.items = j.items || {}, i = r[e];
                if (i || t) return i && !t ? (clearTimeout(i), void delete r[e]) : void n();
            }
            function w(e) {
                j(e);
            }
            function _() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
            }
            function x() {
                return _() + _() + "-" + _() + "-" + _() + "-" + _() + "-" + _() + _() + _();
            }
            function k() {}
            function E() {
                return !0;
            }
            function C() {
                a() && window.chrome.runtime.reload();
            }
            function T(e) {
                if (e.location) {
                    var t = "mail.google.com" == e.location.host, n = e.querySelector("iframe#js_frame") && e.querySelector("iframe#sound_frame");
                    return t || n;
                }
            }
            function N(e) {
                return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            function S(e, t) {
                var n = 2;
                return e % 10 == 1 && e % 100 != 11 && (n = 0), e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) && (n = 1), 
                t[n];
            }
            function M(e) {
                return R["default"].transform(e, function(e, t) {
                    return e[t] = k;
                });
            }
            function P(e, t, n) {
                var r = {};
                return function() {
                    var i = "_memoize_" + (t ? t.apply(this, arguments) : arguments[0]);
                    return hasOwnProperty.call(r, i) ? r[i] : (n && setTimeout(function() {
                        delete r[i];
                    }, n), r[i] = e.apply(this, arguments));
                };
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var O = "undefined" != typeof window ? window.forge : "undefined" != typeof r ? r.forge : null, D = i(O), A = e("lodash"), R = i(A);
            n["default"] = {
                getDomain: g,
                getBrowser: d,
                isFunction: p,
                getUrl: y,
                domainFromUrl: v,
                chromeBgError: m,
                interval: j,
                declension: S,
                cancelInterval: w,
                bgPageReload: C,
                isFF: o,
                isChrome: a,
                isSafari: l,
                isGmail: T,
                isBg: s,
                isBgOrPopup: u,
                isPopup: c,
                guid: x,
                formatNumber: N,
                stub: M,
                memoize: P,
                _f: k,
                _F: E
            }, t.exports = n["default"];
        }).call(this, "undefined" != typeof window ? window : {});
    }, {
        lodash: "lodash"
    } ],
    "/project/src/js/lib/window-events.js": [ function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        function i(e, t, n, r) {
            var i = r ? t + "_forced" : t, o = {
                listeners: []
            }, a = function(e) {
                var t = o.listeners.indexOf(n);
                t > -1 && o.listeners.splice(t, 1);
            };
            if (("on" == e || "once" == e) && (o = f[i] || (f[i] = {
                domEventListener: function(t) {
                    d.emit(i, t), "once" == e && a(n);
                },
                listeners: []
            }), o.domEventListener.__wrapFunc = o.domEventListener.__wrapFunc || function(e) {
                o.domEventListener(c["default"].extend({
                    originalEvent: e,
                    preventDefault: u._f,
                    stopPropagation: u._f
                }, e.detail));
            }, 0 == o.listeners.length && (window.addEventListener(t, o.domEventListener, r), 
            window.addEventListener(t + "-gr", o.domEventListener.__wrapFunc, r)), o.listeners.push(n)), 
            "un" == e) {
                var l = f[i];
                if (!l) return;
                a(n), 0 == l.listeners.length && (window.removeEventListener(t, l.domEventListener, r), 
                window.removeEventListener(t + "-gr", l.domEventListener.__wrapFunc, r));
            }
            d[e](i, n);
        }
        function o(e) {
            return function(t, n, r) {
                if ("object" == typeof t) {
                    var o = !0, a = !1, l = void 0;
                    try {
                        for (var s, u = c["default"].keys(t)[Symbol.iterator](); !(o = (s = u.next()).done); o = !0) {
                            var d = s.value;
                            i(e, d, t[d], n);
                        }
                    } catch (f) {
                        a = !0, l = f;
                    } finally {
                        try {
                            !o && u["return"] && u["return"]();
                        } finally {
                            if (a) throw l;
                        }
                    }
                } else i(e, t, n, r);
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("emitter"), l = r(a), s = e("lodash"), c = r(s), u = e("./util"), d = l["default"]({}), f = {};
        n["default"] = {
            on: o("on"),
            off: o("un"),
            once: o("one")
        }, t.exports = n["default"];
    }, {
        "./util": "/project/src/js/lib/util.js",
        emitter: "emitter",
        lodash: "lodash"
    } ],
    "/project/src/styl/signin.styl": [ function(e, t, n) {
        t.exports = {
            signin: "_000-signin",
            content: "_000-content",
            head: "_000-head",
            descr: "_000-descr",
            auth_button: "_000-auth_button",
            footer: "_000-footer",
            login_text: "_000-login_text",
            signin_link: "_000-signin_link"
        };
    }, {} ]
}, {}, [ "/project/src/js/index.js" ]);