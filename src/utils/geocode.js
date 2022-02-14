const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFyaXNjYXVzZXZpYyIsImEiOiJja3pmaGZqNmUwcW80MnZwY2gzZW0wNzZtIn0.7wrWrICRjSyKtfkCQllFWw&limit=1'

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to loc serverice!')
        } else if (body.features.length === 0) {
            callback('Unable to find a location. Try another seacrh')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

// module.exports = {
//     geocode: geocode
// }
module.exports = geocode