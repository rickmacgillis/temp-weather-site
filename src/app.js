const express = require('express');
const path = require('path');
const hbs = require('hbs');

const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT;

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views/layouts');
const partialsPath = path.join(__dirname, '../views/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.set('x-powered-by', false);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rick',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rick',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        message: 'For ye are helped!',
        name: 'Rick',
    });
});

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (address === undefined || address.length === 0) {

        res.send({
            error: 'No address provided',
        });

    } else {
        weather(address, res);
    }

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        error: 'Help article not found!',
        name: 'Rick',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        error: 'My 404 Page',
        name: 'Rick',
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});
