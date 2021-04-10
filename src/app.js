const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'App',
    name: 'Ivan',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ivan Grcic',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'Help me please',
    author: 'Created by Ivan grcic',
    title: 'Help',
    name: 'Ivan Grcic Grca',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Enter adress',
    });
  }
  geocode.geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      geocode.forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help cant be found',
    name: 'Ivan Grcic',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'My 404 page!',
    name: 'Ivan Grcic',
  });
});
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
