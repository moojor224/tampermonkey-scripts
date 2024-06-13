// ==UserScript==
// @name         gtfo, iFrames
// @version      1
// @description  removes all iframes from the page
// @author       moojor224

// @match        https?://www.w3schools.com/*/*
// @match        https?://www.amazon.com/*
// @match        https?://www.geeksforgeeks.org/*
// @match        https?://www.bloomberg.com/*
// @match        https?://quickfever.com/*
// @match        https?://www.crx4chrome.com/*
// @match        https?://www.tutorialsteacher.com/*
// @match        https?://jsben.ch/*
// @match        https?://www.learnrazorpages.com/*
// @match        https?://www.daterangepicker.com/*

// @exclude      https?://www.w3schools.com/*/tryit.*

// @noframes
// ==/UserScript==

(function () {
    let total = 0;
    window.setInterval(() => {
        let frames = document.querySelectorAll("iframe");
        if (frames.length > 0) {
            total += frames.length;
            console.groupCollapsed(`deleted ${frames.length} iframe${frames.length === 1 ? "" : "s"} (${total} total)`);
            Array.from(frames).forEach(e => {
                console.log(e);
                e.remove();
            });
            console.groupEnd();
        }
    }, 1000);
})();