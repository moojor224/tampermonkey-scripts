// ==UserScript==
// @name         thingiverse quick-download button
// @namespace    http://tampermonkey.net/
// @version      1
// @description  adds a quick-download button to thingiverse model pages to skip the 5 second timer
// @author       moojor224
// @match        https://www.thingiverse.com/thing:*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thingiverse.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function thingiverse() {
        let button = document.createElement("button");
        let url = window.location.href;

        if (url.split("/").length > 4) { // check if url is not on main details page
            url = url.substring(0, url.lastIndexOf("/"));
        }
        button.onclick=function() {
            window.location.href = url + '/zip'
        };
        button.innerHTML = 'DOWNLOAD';
        button.style = "position: sticky; left: 100%; bottom: 20px; transform: translateX(-20px);";
        document.body.append(button);
    }
    if(window.location.href.includes("thingiverse")){
        thingiverse();
    }
    
    let total = 0; // gtfo iframes script manually implemented here because thingiverse is slow without removing them
    window.setInterval(()=>{
        let group = document.querySelectorAll("iframe");
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
})();