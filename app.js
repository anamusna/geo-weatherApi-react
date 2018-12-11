const request = require('request')
const yargs = require('yargs')

const weather = require('./weather/weather')
const geocode = require('./geocode/geocode')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      description: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .argv

geocode.geocodeAddress(argv.address, (errorMessage, geocodingResults) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(geocodingResults.address),
      weather.getWeather(geocodingResults.latitude, geocodingResults.longitude, (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage)
        } else {
          console.log(geocodingResults)
          console.log(`Today is ${weatherResults.summary}. Temperature is ${Number(((weatherResults.temperature - 32) / 1.8).toFixed(2))} degress Celsius`)
        }
      })
  }
})

