const request = require('request');

module.exports = (lat, long, callback) => {

    const coords = lat + ',' + long;
    const weatherUrl = 'https://api.darksky.net/forecast/9dc5ed8e8e49f68aa132d3ba360bb77b/' + encodeURIComponent(coords);

    request({
        url: weatherUrl,
        json: true,
    }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to the weather service!');
        } else if (body.error !== undefined) {
            callback('Unable to find location');
        } else {

            const currently = body.currently;
            const daily = body.daily.data[0];
            const summary = daily.summary;
            const low = daily.temperatureMin;
            const high = daily.temperatureMax;

            const data = summary +
                ' It is currently ' + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain. The high for the day is ' + high + ' and the low is ' + low;

            callback(undefined, data);

        }

    });

};
