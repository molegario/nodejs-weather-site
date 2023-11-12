const request = require('postman-request')
const _ = require('lodash')

const geoCode = (locationString, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationString)}.json?access_token=pk.eyJ1Ijoid2VhdGhlcnMzNDE3IiwiYSI6ImNsbmx4OHlubDFkYWQya2w4eWJ4N3lvZTIifQ.ixoJIl_yX-5ZTCydxQAiIw&limit=1` 
    request(
        {
            url,
            json: true
        },
        (error, { body }={}) => {
            if(error) {
                callback(`***Unable to connect to the Geocoding service.***`)                
            } else if (body.features.length === 0) {
                callback(`***No valid or matching location found.  Try another search.***`)
            } else {
                const {
                    center = [],
                    place_name:placeName = ''
                } = _.first(body.features)
                callback(undefined, {
                    mapCoords: [...center].reverse().join(),
                    placeName
                })
            }
        } 
    )
}

module.exports = {
    geoCode
}