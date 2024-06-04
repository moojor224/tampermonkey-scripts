// ==UserScript==
// @name         redact
// @version      1
// @description  highlighting text will redact it. clicking redacted text will show it
// @author       moojor224
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

// @ts-format-ignore-region
let createElement = (t,D)=>(p=e=>typeof e,c=(T,d=
{})=>(T=p(T)[1]=="t"?document.createElement(T):T,
Object.keys(d).map(e=>(p(d[e])[0]=="o"?c(T[e]||
(T[e]={}),d[e]):(T instanceof window.Element?(e[s=
"substring"](0,2)=="on"&&p(d[e])[0]=="f"?T.addEventListener
(e[s](2),d[e]):T[e]=d[e]):(T[e]=d[e])))),T),c(t,D))
// @ts-format-ignore-endregion
(function () {

    GM_addStyle(/*CSS*/`
        .redacted{
            color: black !important;
            background-color: black !important;
        }
        .redacted::selection {
            background-color: black !important;
        }
    `);

    function getSelectedText() {
        return document.getSelection();
    }

    document.body.onmouseup = function () {
        let selection = getSelectedText();
        let selection_text = selection.toString();
        if (selection_text.length < 1) {
            return;
        }
        let span = createElement('span', {
            classList: "redacted",
            textContent: selection_text,
            style: {
                color: "black",
                background: "black"
            },
            onclick: () => {
                var p = span.parentNode;
                span.replaceWith(span.textContent);
                p.normalize();
            },
        });
        let range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
    }
})();