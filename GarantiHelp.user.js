// ==UserScript==
// @name         GarantiHelp
// @namespace    http://exiclick.com/
// @version      0.2
// @description  Eases the pain.
// @author       Ishmaeel
// @match        https://sube.garantibbva.com.tr/isube/login/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var $ = window.jQuery;

    $('#logoContainerA')
        .after('<textarea id="myOutput" style="position:absolute;top:10px;" />')
        .after('<input type="button" id="myStuff" value="TSV!">');

    $('#myStuff').click(doMyStuff);

    function doMyStuff() {
        console.log('Doing your stuff...');

        var table = $("#transactionTableDonemiciIslemlerTl");

        if (table) {
            makeCsv(table);
        }
    }

    function makeCsv(table) {
        console.log('Making csv.');
        var csv = [];

        var rows = $(table).find("tbody tr");

        for (var r = 0; r < rows.length; r++) {
            var cols = $(rows[r]).find("td");
            var row = [];

            for (var j = 0; j < cols.length; j++) {
                $(cols[j]).find('a').remove();
                var word = cols[j].innerText.replace(/\r?\n|\r/g, " ").trim();
                row.push(word);
            }

            var legend = $(rows[r]).find(".legend").attr('class').replace('legend ', '');
            row.push(legend);

            row = row.join("\t");

            csv.push(row);
        }

        csv = csv.join("\r\n");

        $("#myOutput").val(csv).select();
    }

})();
