const request = require('request')

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/44eb885d56f146728c98a3f80a5bd719/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('There is a problem with the weather API')
        } else if (body.code === 400) {
            callback(body.error)
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                summary: body.currently.summary,
                latitude: body.latitude,
                longitude: body.longitude,
                icon: body.daily.icon
            })
        }
    })
}

module.exports.getWeather = getWeather

