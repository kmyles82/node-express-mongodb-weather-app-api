const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

//create dynamic templates
app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather',
        name: 'Kerry Myles'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kerry Myles'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help Page',
        name: 'Kerry Myles'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({error})
            } else {
                res.send({ forecastData, location, address: req.query.address })
            }
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })    
    } 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Kerry Myles',
        title: '404 ERROR'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'PAGE NOT FOUND',
        name: 'Kerry Myles',
        title: '404 ERROR'
    })
})

app.listen(port, (error, res) => {
    console.log(`Server running on port ${port}`)
})