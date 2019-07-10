// ==UserScript==
// @name         Mantis Helpers
// @namespace    exiclick.com
// @version      0.1
// @description  Helps with taking stuff out of Mantis
// @author       Ishmaeel
// @match        https://www.mantisbt.org/bugs/view.php?*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// ==/UserScript==

/* globals $: false */
/* globals ClipboardJS: false */

(function() {
    'use strict';

    var mantisBody = $("body#view-issue-page");

    if (!mantisBody.length){
        return;
    }

    $(".bug-id.category").append('<a class="ext_copy_btn btn btn-primary btn-white btn-round btn-xs" style="margin-left:5px;" data-copy-action="id">Copy</a>');
    $(".bug-id.category").append('<a class="ext_copy_btn btn btn-primary btn-white btn-round btn-xs" style="margin-left:5px;" data-copy-action="id_pad">Copy0</a>');
    $(".bug-id.category").append('<a class="ext_copy_btn btn btn-primary btn-white btn-round btn-xs" style="margin-left:5px;" data-copy-action="id_hash">Copy#</a>');
    $(".bug-summary.category").append('<a class="ext_copy_btn btn btn-primary btn-white btn-round btn-sm" style="margin-left:5px;" data-copy-action="summary">Copy</a>');
    $(".bug-summary.category").append('<a class="ext_copy_btn btn btn-primary btn-white btn-round btn-sm" style="margin-left:2px;" data-copy-action="summary_link">Link</a>');

    new ClipboardJS('.btn', {
        text: function(trigger) {
            var action = $(trigger).data("copyAction");

            switch(action){
                case "id":
                    return parseInt($(".bug-id").not(".category").first().html());

                case "id_pad":
                    return $(".bug-id").not(".category").first().html();

                case "id_hash":
                    return "#" + Number.parseInt($(".bug-id").not(".category").first().html());

                case "summary":
                    return $(".bug-summary").not(".category").first().html();

                case"summary_link":
                    return $(".bug-summary").not(".category").first().html() + " - " + window.location;
            }
        }
    });

    console.log("Ready.");
})();