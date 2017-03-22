const dir = './data/json';
const output = './data/allStations.json';
const metaFile = './data/stations.csv';
const fs = require('fs');
const csv = require('csv');

var stations = []

fs.readdir(dir, (err, files) => {
    files.forEach(file => {
        var raw = fs.readFileSync(dir + '/' + file, 'utf-8');
        var data = JSON.parse(raw);
        if (data.yearlyMeans) {
            stations.push(data);
        }
    });
})

var addMetaInfo = function () {
    fs.readFile(metaFile, 'utf-8', function (err, raw) {
        if (err) {
            throw err;
        }
        csv.parse(raw, { columns: true }, function (err, data) {
            for (var i = 0; i < stations.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if(stations[i].name.toLowerCase().replace(' ', '') === data[j]['Station Name'].toLowerCase().replace(' ', '')){
                        stations[i].lat = data[j].Lat;
                        stations[i].long = data[j].Long;
                        stations[i].url = data[j].URL;
                        stations[i].amsl = data[j]['Metres AMSL'];
                    }
                }
            }
           fs.writeFileSync(output, JSON.stringify(stations), 'utf-8')        
        })
    })
}

addMetaInfo();