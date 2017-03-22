var fs = require('fs');

var name = process.argv[2];

var file = './data/txt/' + name + '.txt'
var index = 0;
var json = {
    name: name,
    yearlyMeans: [],
    data: []
};

var getArrMean = function (arr) {
    var sum = arr.reduce((a, b) => a + b, 0);
    return sum / (arr.length)
}

var makeAverages = function (json, callback) {
    var index = 0;
    var meanValues = [];
    var result = json;
    json.data.forEach(function (d) {
        if (index <= 11) {
            var monthlyMean = (d.tmax + d.tmin) / 2;
            meanValues.push(monthlyMean)
        } else {
            result.yearlyMeans.push({ date: d.date, value: getArrMean(meanValues) })
            meanValues = [];
            index = 0;
        }
        index++;
    })
    callback(result);

}

var lineReader = require('readline').createInterface({
    input: fs.createReadStream(file)
});

lineReader.on('line', (line) => {
    if (index > 6) { //skip introduction
        var year = line.substring(3, 7) * 1;
        var month = line.substring(9, 11) * 1 - 1; // January = 0
        var tmax = line.substring(14, 18) * 1;
        var tmin = line.substring(22, 26) * 1;
        var af = line.substring(32, 34) * 1;
        var rain = line.substring(37, 42) * 1;
        var sunHours = line.substring(45, 50);
        if (sunHours === '  ---') {
            sunHours = null;
        } else {
            sunHours *= 1;
        }
        var dateString;
        if (month < 10) {
            month = '0' + month;
        }
        dateString = year + '-' + month;

        var data = {
            'date': dateString,
            'tmax': tmax,
            'tmin': tmin,
            'af': af,
            'rain': rain,
            'sunHours': sunHours
        }

        json.data.push(data);
    }
    index++;
});

var index = 0;



lineReader.on('close', () => {
    makeAverages(json, function (result) {
        fs.writeFileSync('./data/json/' + name + '.json', JSON.stringify(result, null, ' '), 'utf-8')
        console.log(result.yearlyMeans);
        console.log('Done.')
    });
})