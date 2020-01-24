const request = require('request')

const geocode = (address, cb) => {
    const token = 'pk.eyJ1Ijoia215bGVzODIiLCJhIjoiY2s1bGVkd2IwMGNvMzNmcGNtOHMyaHJrNiJ9.hTIRltlis_B88h5seZEU5Q'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            cb('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            cb('Unable to retrieve location data', undefined)
        } else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            const location = body.features[0].place_name
            cb(undefined, {
                lat,
                long,
                location
            })
        }
    })
}

module.exports = geocode;