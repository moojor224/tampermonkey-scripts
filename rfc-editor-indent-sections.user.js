// ==UserScript==
// @name         rfc-editor indent/highlight sections
// @version      1
// @description  indents and highlights sections on the rfc website. done quick and dirty, so highlights may sometimes cover text
// @author       moojor224
// @match        https?://www.rfc-editor.org/rfc/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rfc-editor.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var style = document.createElement("style");
    style.innerHTML = `section {
/*margin-left: 50px;*/
border-left: 50px solid lightgrey;
}
body {
max-width: 1000px;
margin: 42px auto auto 0px;
}
section:hover{
border-left: 50px solid darkgrey;
}
section>*:not(div){
padding-left: 10px;
}`;
    document.head.append(style);
})();