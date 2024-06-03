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
/*globals createOptions createElement*/
(() => {
    window.createOptions = function (options, callback = () => { }, elem) {
        var styles = [];
        window.setInterval(() => {
            options.forEach(e => {
                (document.getElementById(e) || { checked: false }).checked = GM_getValue(e, (document.getElementById(e) || { checked: false }).checked);
                updateClassList(e);
            });
        }, 1000);
        function updateClassList(e) {
            Array.from(document.querySelectorAll(`.tm-options-${e}-${!GM_getValue(e)}`)).forEach(a => {
                var aa = !!GM_getValue(e);
                var c = `tm-options-${e}-${!aa}`;
                Array.from(document.querySelectorAll(`.${c}`)).forEach(r => {
                    r.classList.remove(c);
                    r.classList.add(`tm-options-${e}-${aa}`);
                });
            });
        }

        function addOptions(options) {
            var span = createElement("div", {
                style: {
                    border: "1px black solid",
                }
            }).add(
                createElement("div", {
                    style: {
                        border: "1px white solid",
                        padding: "5px",
                    }
                }).add(
                    createElement("h4", {
                        innerHTML: GM_info.script.name,
                    })
                ).add(
                    createElement("br")
                ).add(
                    createElement("table", { style: { width: "100%" } })
                )
            );

            options.forEach(e => {
                styles.push(`.tm-options-${e}-true{display: unset;}`);
                styles.push(`.tm-options-${e}-false{display: none;}`);
                span.querySelector("table").add(
                    createElement("tr").add(
                        createElement("td", {
                            innerHTML: e.replaceAll(/[A-Z]/g, (r) => (" " + r.toLowerCase())).trim(),
                        })
                    ).add(
                        createElement("td", {
                            style: {
                                float: "right",
                                height: e ? "" : "25px",
                                display: e ? "" : "block",
                            }
                        }).add(
                            createElement("label", {
                                classList: "switch",
                                style: {
                                    float: "right",
                                    display: e ? "" : "none",
                                    height: e ? "" : "20px",
                                }
                            }).add(
                                createElement("input", {
                                    classList: "slider",
                                    type: "checkbox",
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
            GM_addStyle(styles.join("\n"));
            document.getElementById("TM_optionsPane").append(span);
        }
        var sidebar = document.getElementById("side-bar") || createElement("span", { id: "asdasdasd" });
        if ((arr => {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].querySelector("h6").innerHTML.includes("Tampermonkey Options")) {
                    addOptions(options);
                    return true;
                }
            }
            return false;
        })(Array.from(sidebar.children))) {
            return;
        } else {
            document.head.append(createElement("style", {
                innerHTML: `.switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
}

input[type=checkbox].slider {
    --scale: 1;
    --duration: 0.15s;
    --outerline-on: #3c8dbc;
    --outer-shade-on: #3c8dbc;
    --innerline-on: #fff;
    --inner-shade-on: #fff;
    --outerline-off: #ccc;
    --outer-shade-off: #ccc;
    --innerline-off: #fff;
    --inner-shade-off: #fff;

    margin: 0px;
    position: relative;
    border-color: white;
    border-width: 0px !important;
    appearance: none;
    width: calc(24px * var(--scale));
    height: calc(14px * var(--scale));
}

input[type=checkbox].slider::before,
input[type=checkbox].slider::after {
    display: block;
    position: absolute;
    border: calc(1px * var(--scale)) solid var(--outerline);
    content: ' ';
    box-sizing: border-box;
}

input[type=checkbox].slider::before {
    height: calc(14px * var(--scale));
    width: calc(24px * var(--scale));
    border-radius: calc(7px * var(--scale));
    transition-property: background-color;
    transition-duration: var(--duration);
}

input[type=checkbox].slider::after {
    border-radius: calc(5px * var(--scale));
    width: calc(10px * var(--scale));
    height: calc(10px * var(--scale));
    top: calc(2px * var(--scale));
    left: calc(2px * var(--scale));
    border: calc(1px * var(--scale)) solid var(--innerline);
    background-color: var(--inner-shade-off);
    transition-property: left, background-color;
    transition-duration: var(--duration);
}

input[type=checkbox].slider::before {
    background-color: var(--outer-shade-off);
}

input[type=checkbox].slider:checked::before {
    background-color: var(--outer-shade-on);
}

input[type=checkbox].slider:checked::after {
    left: calc(12px * var(--scale));
    background-color: var(--inner-shade-on);
}` }));
            var pane = createElement("div", {
                classList: "a-row a-expander-container a-expander-section-container sidebar-expander a-section-expander-container"
            }).add(
                createElement("a", {
                    href: "javascript:void(0)",
                    "data-a-expander-toggle": `{"expand_prompt":"", "collapse_prompt":"}`,
                    dataset: {
                        action: "a-expander-toggle",
                    },
                    classList: "a-declarative a-link-section-expander"


                }).add(
                    createElement("i", {
                        classList: "a-icon a-icon-section-collapse"
                    })
                ).add(
                    createElement("span", {
                        classList: "a-expander-prompt",
                    }).add(
                        createElement("h6", {
                            innerHTML: "Tampermonkey Options"
                        })
                    )
                )
            ).add(
                createElement("div", {
                    "aria-expanded": true,
                    classList: "a-expander-content a-expander-section-content a-section-expander-inner a-expander-content-expanded",
                    id: "TM_optionsPane",
                    style: {
                        display: "none",
                        // "z-index":-1,
                        // position:"relative",
                    }
                })
            );
            sidebar.prepend(pane);

            sidebar.style.overflow = "scroll";
            if (sidebar.id !== "side-bar") {
                (elem || document.body).append(sidebar);
                sidebar.style.overflow = "";
                sidebar.querySelector("a").onclick = (() => {
                    document.getElementById("TM_optionsPane").style.display = (document.getElementById("TM_optionsPane").style.display === "none" ? "block" : "none");
                })
            }
            addOptions(options);
        }

    }
})();//createOptions function

(() => {
    window.createElement = function (tag = "span", data = {}) {
        tag = typeof (tag) === "string" ? document.createElement(tag) : tag;
        Object.keys(data).forEach(e => {
            if (typeof data[e] === "object") {
                createElement(tag[e] || (tag[e] = {}), data[e]);
            } else {
                tag[e] = data[e];
            }
        });
        return tag;
    }

    window.Element.prototype.add = function () {
        Array.from(arguments).forEach(elem => {
            this.append(elem);
        })
        return this;
    }

})();//jstools functions

window.onload = function () {
    // document.querySelector("pre").remove();
    while (document.body.children.length > 0) {
        document.body.children[0].remove();
    }
    document.body.add(
        createElement("span", { classList: "tm-options-option_a-true", innerHTML: "option a span" }),
        createElement("span", { classList: "tm-options-option_b-true", innerHTML: "option b span" })
    );
    createOptions(["option_a", "option_b"]);
}
