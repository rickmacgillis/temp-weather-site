const request = require('request');

module.exports = (address, callback) => {

    const coordsUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + process.env.MAPBOX_API_KEY + '&limit=1';

    request({
        url: coordsUrl,
        json: true,
    }, (error, { body }) => {
    
        if (error) {
            callback('Unable to connect to the geocoding service!');
        } else if (body.features.length === 0) {
            callback('Location not found');
        } else {
    
            const place = body.features[0];
            const coords = place.center;
            callback(undefined, {
                long: coords[0],
                lat: coords[1],
                location: place.place_name,
            });
    
        }
    
    });

};
