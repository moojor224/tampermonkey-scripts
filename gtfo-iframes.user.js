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

/*eslint-env jquery*/
var total = 0;
window.setInterval(()=>{
    var group = document.querySelectorAll("iframe");
    total += group.length;
    if(group.length > 0){
        console.groupCollapsed(`deleted ${group.length} iframe${group.length===1?"":"s"} (${total} total)`);
        [...group].forEach(e=>{
            console.log(e);
            e.remove();
        });
        console.groupEnd();
    }
}, 1000);