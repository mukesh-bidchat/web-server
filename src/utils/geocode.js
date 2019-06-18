const request = require('request')

const geocode = (place, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(place) +`.json?access_token=pk.eyJ1IjoibXNtdWtlc2g0IiwiYSI6ImNqd3ZyenN4czBjOWo0M250c2JmazdtMTYifQ.KGwYkG1sLuiiBY3RKAvLaQ&limit=1`

    request({url, json: true}, (err, { body }) => {
        if (err) {
            callback("Unable to connect to mapbox APIs")
        } else if (body.features.length === 0) {
            callback(`No geo-cordinates found for place '${place}'`)
        } else {
            const val = body.features[0]
            callback(undefined, {
                lat: val.center[1],
                long: val.center[0],
                location: val.place_name
            })
        }
    })
}

module.exports = geocode