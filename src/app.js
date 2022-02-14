const path = require('path')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const hbs = require('hbs')

const {
    runInNewContext
} = require('vm')



const app = express()

// Define paht for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partrialsPath = path.join(__dirname, '../templates/partials')

// setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partrialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Haris Caus'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Haris Caus'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Message',
        title: 'Title Help',
        name: 'Haris Caus'
    })
})
app.get('/weather', (req, res) => {
    //check if the address query parametar is provided
    // if not send error JSON
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address.'
        })
    }
    const address = req.query.address
    geocode(address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({
                error
            })

            res.send({
                forecast: forecastData,
                location,
                address
            })

        })

    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide your search term'
        })
    }

    //console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Title 404 page',
        name: 'Haris Caus',
        errorMessage: 'Help article not found.'
    })
})


// 404 PAGE (MUST BE LAST)
app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Title 404 page',
        name: 'Haris Caus',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is UP on port 3000')
})