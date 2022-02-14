const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=2adb880f74920fc764b2a022596109fb&query=' + longitude + ',' + latitude

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to contact forecast service!')
        } else if (body.error) {
            callback('Unable to get forecast for given location')
        } else {
            const strares = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' +body.current.humidity + ' %.'
            callback(undefined, strares)
        }

    })

}


module.exports = forecast