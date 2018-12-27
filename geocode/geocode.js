const request = require('request')

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address)
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBmED3bBLrIOIN2086bbwDlfgeGyq63rKU`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Sorry, unable to connect to Google')
    } else if (body.status === "ZERO_RESULTS") {
      callback('Sorry, that address is not valid')
    } else if (body.status === "OK") {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,

      })
    }
  })
}

module.exports.geocodeAddress = geocodeAddress