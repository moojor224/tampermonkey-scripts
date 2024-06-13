// ==UserScript==
// @name         createOptions tester
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=githubusercontent.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==


(async function () {
    let { createElement, CUSTOM_ELEMENTS, jst_CSSRule, jst_CSSStyleSheet } = await import("https://cdn.jsdelivr.net/gh/moojor224/random-files@latest/js/synced/jstools.js").then(e => e);
    CUSTOM_ELEMENTS.slider();
    window.onload = function () {
        while (document.body.children.length > 0) {
            document.body.children[0].remove();
        }
        document.body.add(
            createElement("span", { classList: "tm-options-option_a-true", innerHTML: "option a span" }),
            createElement("span", { classList: "tm-options-option_b-true", innerHTML: "option b span" })
        );
        createOptions(["option_a", "option_b"]);
    };
    window.createOptions = function (options, callback = () => { }, elem) {
        let styles = new jst_CSSStyleSheet();
        window.setInterval(() => {
            options.forEach(e => {
                (document.getElementById(e) || { checked: false }).checked = GM_getValue(e, (document.getElementById(e) || { checked: false }).checked);
                updateClassList(e);
            });
        }, 1000);
        function updateClassList(e) {
            Array.from(document.querySelectorAll(`.tm-options-${e}-${!GM_getValue(e)}`)).forEach(a => {
                let aa = !!GM_getValue(e);
                let c = `tm-options-${e}-${!aa}`;
                Array.from(document.querySelectorAll(`.${c}`)).forEach(r => {
                    r.classList.remove(c);
                    r.classList.add(`tm-options-${e}-${aa}`);
                });
            });
        }

        function addOptions(options) {
            let span = createElement("div", {
                style: { border: "1px black solid" }
            }).add(
                createElement("div", {
                    style: { border: "1px white solid", padding: "5px" }
                }).add(
                    createElement("h4", { innerHTML: GM_info.script.name })
                ).add(createElement("br")).add(createElement("table", { style: { width: "100%" } }))
            );

            options.forEach(e => {
                styles.addRule(`.tm-options-${e}-true`, { display: "unset" });
                styles.addRule(`.tm-options-${e}-false`, { display: "none" });
                span.querySelector("table").add(
                    createElement("tr").add(
                        createElement("td", {
                            innerHTML: e.replaceAll(/[A-Z]/g, (r) => (" " + r.toLowerCase())).trim()
                        })
                    ).add(
                        createElement("td", {
                            style: {
                                float: "right",
                                height: e ? "" : "25px",
                                display: e ? "" : "block"
                            }
                        }).add(
                            createElement("label", {
                                classList: "switch",
                                style: {
                                    float: "right",
                                    display: e ? "" : "none",
                                    height: e ? "" : "20px"
                                }
                            }).add(
                                createElement("input-slider", {
                                    id: e,
                                    checked: GM_getValue(e, false),
                                    onclick: function () {
                                        GM_setValue(e, this.checked);
                                        callback(e, this.checked);
                                        updateClassList(e);
                                    }
                                })
                            )
                        )
                    )
                )
            });
            GM_addStyle(styles.compile(true));
            document.getElementById("TM_optionsPane").append(span);
        }
        let parentEl = document.getElementById("side-bar") || createElement("span", { id: "asdasdasd" });
        if ((arr => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].querySelector("h6").innerHTML.includes("Tampermonkey Options")) {
                    addOptions(options);
                    return true;
                }
            }
            return false;
        })(Array.from(parentEl.children))) {
            return;
        } else {
            let styleSheet = new jst_CSSStyleSheet([
                new jst_CSSRule(".switch", {
                    position: "relative",
                    display: "inline-block",
                    width: "30px",
                    height: "17px"
                })
            ]);
            document.head.append(createElement("style", { innerHTML: styleSheet.compile(true) }));
            let pane = createElement("div").add(
                createElement("a", { href: "javascript:void(0)" }).add(
                    createElement("span").add(
                        createElement("h6", {
                            innerHTML: "Tampermonkey Options"
                        })
                    )
                )
            ).add(
                createElement("div", {
                    id: "TM_optionsPane",
                    style: {
                        display: "none",
                    }
                })
            );
            parentEl.prepend(pane);

            parentEl.style.overflow = "scroll";
            if (parentEl.id !== "side-bar") {
                (elem || document.body).append(parentEl);
                parentEl.style.overflow = "";
                parentEl.querySelector("a").onclick = (() => {
                    document.getElementById("TM_optionsPane").style.display = (document.getElementById("TM_optionsPane").style.display === "none" ? "block" : "none");
                })
            }
            addOptions(options);
        }

    }
    //createOptions function

})();