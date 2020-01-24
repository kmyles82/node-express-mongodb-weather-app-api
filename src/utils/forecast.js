const request = require('request')

const forecast = (lat, long, cb) => {
    const secret = 'd2b8c6310ee467751c6bff2c885100ab'
    const url = `https://api.darksky.net/forecast/${secret}/${lat},${long}`

    request({
        url,
        json: true
    }, (error, { body }) => {
        // console.dir(data, {depth: null})
        if (error) {
            cb('Unable to connect to weather service', undefined)
        } else if (body.error) {
            cb('Unable to find location. Try another search',undefined)
        } else {
            const data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`;

            cb(undefined,  data)
        }
    })
}

module.exports = forecast;