var fs = require('fs');
var http = require('http');
var csv = require('csv');
var request = require('request');

var stationList = './data/stations.csv';

fs.readFile(stationList, 'utf-8', (err, raw) => {
    if (err) throw err;
    csv.parse(raw, {columns: true}, function(err, data) {
        for (var i = 0; i < data.length - 2; i++){ //cut off last two lines
            console.log('Downloading data for ' + data[i]['Station Name'] + '...')
            var filename = data[i]['Station Name'].replace(/\s/g,'').toLowerCase();
            request(data[i].URL).pipe(fs.createWriteStream('./data/txt/' + filename + '.txt'));
        }
    })
})
