const yargs = require('yargs');
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBmED3bBLrIOIN2086bbwDlfgeGyq63rKU`


axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address')
  }
  var lat = response.data.results[0].geometry.location.lat
  var lng = response.data.results[0].geometry.location.lng
  var weatherUrl = `https://api.darksky.net/forecast/44eb885d56f146728c98a3f80a5bd719/${lat},${lng}`
  console.log(response.data.results[0].formatted_address)
  console.log(response.data)
  return axios.get(weatherUrl)
}).then((response) => {
  var temp = response.data.currently.temperature
  var icon = response.data.currently.icon
  var sum = response.data.currently.summary
  console.log(`It is currently ${sum}. Its ${icon} The Temperature is ${Number(((temp - 32) / 1.8).toFixed(2))} degress Celsius`)
}).catch((e) => {
  if (e.code === "ENOTFOUND") {
    console.log('Unable to connect to API Servers')
  } else {
    console.log(e.message)
  }
})
