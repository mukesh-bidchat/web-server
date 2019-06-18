const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/cf4b37ba50577624e0df087e54bf0170/${latitude},${longitude}?units=si`

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback("Weather update not available!")
        } else if(body.error){
            callback(body.error)
        } else {
            const curr = body.currently            
            callback(undefined,
                `It's currently ${curr.temperature} degrees out. There is ${Math.trunc(curr.precipProbability * 100)}% chance of rain.`)
        }
    });
}

module.exports = forcast