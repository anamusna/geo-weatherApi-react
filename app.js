const request = require('request')
// const yargs = require('yargs')

// const geocode = require('./geocode/geocode')

// const argv = yargs
// .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       description: 'Address to fetch weather for',
//       string: true
//     }
//   })
//   .help()
//   .argv

//   geocode.geocodeAddress(argv.address, (error, results) => {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log(JSON.stringify(results, undefined, 2))
//     }
//   })

//734bca71df3ce034dc365f8ba7485956

//https://api.darksky.net/forecast/734bca71df3ce034dc365f8ba7485956/37.8267,-122.4233

request({
  url: `https://api.darksky.net/forecast/734bca71df3ce034dc365f8ba7485956/37.8267,-122.4233`,
  json: true }, (error, response, body) => {
    if (error) {
      console.log('There is a problem with the weather API')
    } else if (body.code === 400) {
      console.log(body.error)
    } else {
      console.log(body.currently.temperature)
      console.log(body.currently.summary)
    }
})