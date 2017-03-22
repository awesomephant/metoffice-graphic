'use strict'

var fs = require('fs');
var csv = require('csv');
var recordHigh = 0;
var recordLow = 999;
var output = '';

var months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
    'AVG',
]

fs.readFile('./data/cetml.csv', 'utf-8', (err, raw) => {
    if (err) throw err;
    csv.parse(raw, { columns: true }, function (err, data) {
        for (var a = 0; a < months.length; a++) {
            recordHigh = 0;
            recordLow = 999;
            var month = months[a];
            console.log('\nRecords for ' + month)
            output += '\nRecords for ' + month + '\n';
            for (var i = 0; i < data.length; i++) {
                let d = data[i];
                if (d[month] * 1 < recordLow) {
                    recordLow = d[month];
                    console.log(d.YEAR + ': ' + d[month])
                    output += d.YEAR + ': ' + d[month] + '\n';
                }
            }
        }
        fs.writeFileSync('./data/cetml-records-low.txt', output, 'utf-8')
    })
})
