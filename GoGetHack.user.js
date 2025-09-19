// ==UserScript==
// @name         Clear Login Textbox
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Clears the value of the textbox with id and name 'login'
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function() {
        var box = document.querySelector('input#login[name="login"]');
        if (box) {
            box.value = '';
            // Move focus to the input with name 'RememberMe'
            var rememberMe = document.querySelector('input[name="RememberMe"]');
            if (rememberMe) {
                rememberMe.focus();
            }
        }
    }, 10);
})();