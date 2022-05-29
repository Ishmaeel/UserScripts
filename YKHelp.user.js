// ==UserScript==
// @name         YK Help
// @namespace    http://exiclick.com/
// @icon         http://exiclick.com/favicon.ico
// @version      0.6
// @description  Helps a bit.
// @author       Ishmaeel
// @match        https://internetsube.yapikredi.com.tr/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var $ = window.jQuery;
    if (!$) { return; }

    console.log("YK Help 2 online.");

    $("body").on("click", checkAgain);

    $("body").on("click", ".dataTable tbody tr", copyTransaction);

    function copyTransaction() {
        var desc = $(this).find("td").eq(1).text();

        desc = desc.replace(/\s+/g, " "); // Trim double spaces
        desc = desc.replace(" taksidi", "").replace("TL'lik işlemin ", "").replace("İSTANBUL TR", "").replace("ISTANBUL TR", "").replace("(BEKLEYEN PROVİZYON)", "");

        var amount = $(this).find("td").eq(2).text().replace(".", "").replace(",", ".");

        if (!amount.startsWith("+")) {
            amount = "-" + amount;
        }

        amount = parseFloat(amount)

        if (isNaN(amount)) {
            return;
        }

        amount = amount.toString().replace(".", ",");

        var output = amount + '\t' + desc;

        navigator.clipboard.writeText(output);

        $(this).css("background-color", "beige");

        log(output);
    }

    function checkAgain() {

        if (!$("#ykbHeaderTitle:contains('Güncel Dönem İşlemleri')").length) {
            return;
        }

        var total = 0;
        var exclusions = ["Önceki Dönem TL Hesap Özeti Borcu", "ÖDEME-İNTERNET BANKACILIĞI", "BEKLEYEN PROVİZYON", "OTOMATIK TAHSILAT HESAPTAN ODEME"];

        $(".dataTable tbody tr td:nth-of-type(2)").each(function () {
            var desc = $(this).text().trim();

            for (var i = 0; i < exclusions.length; i++) {
                if (desc.indexOf(exclusions[i]) >= 0) {
                    return;
                }
            }

            var amount = $(this).next().text().replace(".", "").replace(",", ".");

            if (amount.startsWith("+")) {
                amount = "-" + amount.substring(1);
            }

            amount = parseFloat(amount);
            total += amount;
        });

        $("#groupdisplayCreditCard").html("<h3>Hesaplanan Dönem İçi Harcama: " + total.toFixed(2) + "</h3>");
    }

    function log(message) {
        console.log("[YKHELP] " + message);
    }
})();