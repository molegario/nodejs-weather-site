const path = require('path')
const express = require('express')
const hbs = require('hbs')

//init express
const app = express()

const port = process.env.PORT || 3000

//utils
const {
    getForecast
} = require('./utils/forecast')

const {
    geoCode
} = require('./utils/geocode')

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//public root
app.get('', (req, res) => {
    res.render(
        'index',     
        {
            title: 'Weather',
            name: "M.Olegario"
        }
    )
})

//about
app.get('/about', (req, res) => {
    // console.log(req)
    res.render(
        'about',
        {
            title: 'About Me',
            name: "M.Olegario"
        }
    )
})

//weather API
app.get('/weather', (req, res) => {
    const locationQuery = req.query.location
    geoCode(locationQuery, (
        error_geocode,
        {
            mapCoords,
            placeName    
        } = {}
    ) => {
        if(error_geocode) {
            return res.send({
                error: error_geocode
            })
        }
        getForecast(mapCoords, (
            error_forecast, {
                weather_descriptions,
                temperature,
                resp_units,
                feelslike        
            } = {}
        ) => {
            if(error_forecast) {
                return res.send({
                    error: error_forecast
                })
            }
            res.send({
                placeName,
                mapCoords,
                forecast: `${weather_descriptions}. It is currently ${temperature}\u00B0${resp_units} out. It feels like ${feelslike}\u00B0${resp_units} out.`
            })
        })
    })
})

//help
app.get('/help', (req, res) => {
    res.render(
        'help',
        {
            title: 'Help',
            name: "M.Olegario",
            message: "This is the help page"
        }
    )
})

//404 handler
app.get('/help/*', (req, res) => {
    res.render(
        '404',
        {
            title: '404 - Help page not found',
            name: 'M.Olegario',
            message: `This HELP article has not been found.`
        }
    )
})

//404 handler
app.get('*', (req, res) => {
    res.render(
        '404',
        {
            title: '404 - Page not found',
            name: 'M.Olegario',
            message: `This page has not been found.`
        }
    )
})

//set/start listening requests port
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})
