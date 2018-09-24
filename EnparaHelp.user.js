// ==UserScript==
// @name         EnparaHelp
// @namespace    http://exiclick.com/
// @version      0.1
// @description  Make it easier.
// @author       Ishmaeel
// @match        https://internetsubesi.qnbfinansbank.enpara.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var table = $("#ctl00_MainContent_CurrentTermDebtByDateGridView_myTable");

    if (table.length) {
        $('#wrapper')
            .after('<textarea id="myOutput" style="position:absolute;top:10px;left:400px" />')
            .after('<input type="button" style="position:absolute;top:18px;left:350px" id="myStuff" value="TSV!">');

        $('#myStuff').click(doMyStuff);
    }

    function doMyStuff() {
        console.log('Doing your stuff...');

        var table = $("#ctl00_MainContent_CurrentTermDebtByDateGridView_myTable");

        if (table.length) {
            makeCsv(table);
        } else {
            console.warn("table not found.");
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

                var col = $(cols[j]).find("span");

                var text = col.text();

                if (text.endsWith("TL ")) {
                    text = "-" + text;
                }

                text = text.replace(/ +(?= )/g, '');
                text = text.replace(/TL/g, "")
                text = text.replace(/\r?\n|\r/g, " ").trim();

                row.push(text);
            }

            var legend = 'gray'
            row.push(legend);

            row.splice(0, 1);
            row.splice(2, 1);
            row.splice(5, 2);

            row = row.join("\t");

            csv.push(row);
        }

        csv = csv.join("\r\n");

        $("#myOutput").val(csv).select();
    }

})();
