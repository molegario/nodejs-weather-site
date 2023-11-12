const request = require('postman-request')
const _ = require('lodash')

const getForecast = (mapcoords, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=82958d6595bde842a37ad6165e3d8405&query=${mapcoords}&units=f`    
    request({
        url,
        json: true
    }, (error, { body }={}) => {
        if(error) {
            callback(`***Unable to connect to the Weather service***`)
        } else if(body.error) {
            callback(`***${body.error.info}***`)
        } else {
            let resp_units = "C"
            if(body.request.unit === "f") {
                resp_units = "F" //imperial - fahrenheit
            } else if(body.request.unit === "s") {
                resp_units = "K" //scientific - kelvin
            } else {
                //do nothing - metric - Celsius is default
            }
            callback(undefined, {
                resp_units,
                weather_descriptions: body.current.weather_descriptions,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = {
    getForecast
}