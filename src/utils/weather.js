const geocode = require('./geocode');
const forecast = require('./forecast');

module.exports = (address, res) => {

    geocode(address, (error, { lat, long, location } = {}) => {

        if (error) {
            res.send({ error });
        } else {
    
            forecast(lat, long, (error, forecastData) => {
    
                if (error) {
                    res.send({ error });
                } else {
    
                    res.send({
                        forecast: forecastData,
                        location: location,
                        address,
                    });
                    
                }
                
            });
    
        }
    
    });

};
