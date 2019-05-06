// ==UserScript==
// @name         YK Help
// @namespace    http://exiclick.com/
// @icon         http://exiclick.com/favicon.ico
// @version      0.1
// @description  Helps a bit.
// @author       Ishmaeel
// @match        https://internetsube.yapikredi.com.tr/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var $ = window.jQuery;
    if (!$) { return; }

    $("body").on("click", checkAgain);

    function checkAgain() {

        if (!$("#ykbHeaderTitle:contains('Güncel Dönem İşlemleri')").length) {
            return;
        }

        var total = 0;
        var exclusions = ["Önceki Dönem TL Hesap Özeti Borcu", "ÖDEME-İNTERNET BANKACILIĞI"];

        $(".dataTable tbody tr td:nth-of-type(2)").each(function () {
            var desc = $(this).text().trim();
            if (exclusions.indexOf(desc) >= 0) {
                return;
            }

            var amount = $(this).next().text().replace(",", ".");
            amount = parseFloat(amount);
            total += amount;
        });

        $("#groupdisplayCreditCard").html("<h3>Hesaplanan Dönem İçi Harcama: " + total.toFixed(2) + "</h3>");
    }

    function log(message) {
        console.log("[YKHELP] " + message);
    }
})();