const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiaXZhbmJnODIiLCJhIjoiY2ttcW4ydG53MnFjZTJwcW9ma3NndDU4aSJ9.-EuI_5fOMSAcpofQIXzN4w&limit=1';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location!', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=a7964a5671d70800910483628d89583b&query=' +
    latitude +
    ',' +
    longitude +
    '&units=f';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      let data = body.current;
      console.log(data);
      callback(
        undefined,
        'It is ' +
          data.temperature +
          ' deegres outside and its ' +
          data.weather_descriptions
      );
    }
  });
};

module.exports = { geocode, forecast };
