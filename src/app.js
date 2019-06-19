const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
// for heroku
const port = process.env.PORT || 3000

// express config paths
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
const publicDir = path.join(__dirname, '../public')

// serving static files
app.use(express.static(publicDir))

// set values for express
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Mike"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Mike"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Mike",
        helpText: 'This is a help page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Mike",
        errorMsg: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        debugger
        
        if(error){
            return res.send({
                error
            })
        }
        forcast(lat, long, (error, forcastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forcast: forcastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Mike",
        errorMsg: 'Page not found'
    })
})


// starting express server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})