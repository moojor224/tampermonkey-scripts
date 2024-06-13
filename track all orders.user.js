// ==UserScript==
// @name         track all orders
// @version      1
// @description  opens all current undelivered packages' tracking window in iframes
// @author       moojor224
// @match        https://www.amazon.com/gp/css/order-history?ref_=nav_orders_first
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// ==/UserScript==

(async function () {
    let { createElement } = await import("https://cdn.jsdelivr.net/gh/moojor224/random-files@latest/js/synced/jstools.js").then(e => e);
    let run = (function () {
        let input = [];
        Array.from(document.querySelectorAll(".order-card.js-order-card")).filter(e => {
            return Array.from(e.querySelectorAll(".delivery-box__primary-text")).filter(e => e.textContent.includes("Delivered")).length == 0
        }).forEach(e => {
            Array.from(e.querySelectorAll(".a-box.delivery-box")).forEach(e => {
                if (!e.querySelector(".delivery-box__primary-text").textContent.includes("Delivered")) {
                    let btn = e.querySelector("a[href^='/gp/your-account/ship-track?itemId']");
                    input.push(btn.href);
                }
            });
        });
        let side1, side2;
        function rect(num) {
            side1 = Math.ceil(Math.sqrt(num)); //height
            side2 = side1; //width
            if (side1 * side2 > num) {
                for (var ia = side2; ia > 0; ia--) {
                    side1--;
                    if (side1 * side2 < num) {
                        side1++;
                        break;
                    }
                }
            }
            let arr = new Array(side1), i, l;
            for (i = 0, l = side1; i < l; i++) {
                arr[i] = new Array(side2);
            }
            return arr;
        }
        let arr = rect(input.length);
        for (let a = 0; a < arr.length; a++) {
            for (let b = 0; b < arr[a].length; b++) {
                try {
                    arr[a][b] = input.shift();
                } catch (err) {
                    break;
                }
            }
        }
        let allStyle = {
            padding: "0px",
            margin: "0px"
        }
        function createTable(tableData) {
            let table = createElement('table', {
                style: {
                    ...allStyle,
                    height: "100vh",
                    width: "100vw"
                }
            });
            let zoom = 0.8;
            let scale = 0.25;
            let tableBody = createElement('tbody', { style: { ...allStyle } }).add(...tableData.map(rowData => createElement('tr', {
                style: { ...allStyle, height: `${100 / side1}%` }
            }).add(...rowData.map(cellData => createElement('td', { style: { ...allStyle } }).add(createElement("iframe", {
                src: cellData || `data:text/html,<body style="background:black;"></body>`,
                style: {
                    width: 100 / scale + "%",
                    height: 100 / scale + "%",
                    "-ms-zoom": scale / zoom,
                    "-moz-transform": `scale(${scale / zoom})`,
                    "-moz-transform-origin": "0 0",
                    "-o-transform": `scale(${scale / zoom})`,
                    "-o-transform-origin": "0 0",
                    "-webkit-transform": `scale(${scale / zoom})`,
                    "-webkit-transform-origin": "0 0"
                }
            }))))));
            GM_addStyle(/*CSS*/`
                body,html{overflow:clip}`);
            table.add(tableBody);
            return table;
        }
        // return createTable(arr);
        document.body.innerHTML = "";
        document.body.appendChild(createTable(arr));
    });

    GM_registerMenuCommand("Track All Packages", function () {
        run()
    });
})();