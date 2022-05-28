// ==UserScript==
// @name        Azure Devops Copy Branch Name
// @namespace   exiclick.com
// @match       https://*/*/pullrequest/*
// @grant       none
// @version     1.0
// @author      Ishmaeel
// @description Adds a button to copy source branch name in pull request page.
// ==/UserScript==

(function () {
    'use strict';

    var $ = window.jQuery;
    if (!$) { return; }

    function copyBranchName() {
        var output = $($(".vc-pullrequest-detail-branch-name")[0]).attr("aria-label").replace("Source branch: ", "")

        navigator.clipboard.writeText(output);

        $("#btn_copyBranchName").text("Copied.");
    }

    const appendButtonCallback = function (mutationList, observer) {
        if ($(".row-group.pull-request-branch-detail").length && $("#btn_copyBranchName").length == 0) {
            $(".row-group.pull-request-branch-detail").prepend("<button id='btn_copyBranchName' class='ms-Button ms-Button--default root-60'>Copy</button>")
        }
    };

    new MutationObserver(appendButtonCallback).observe(document.body, { childList: true, subtree: true });

    $("body").on("click", "#btn_copyBranchName", copyBranchName);

})();