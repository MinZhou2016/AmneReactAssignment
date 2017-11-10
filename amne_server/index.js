'use strict'

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const log = require('morgan')
const bodyParser = require('body-parser')

const app = express()

const API_KEY = 'AIzaSyApBkvG7GC1GFT2hoWdbPwh5vM4I3yHcdc'
const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
const query = `?type=real_estate_agency&radius=16093.4&key=${API_KEY}&location=`

app.use(cors())
app.use(bodyParser.json())
app.use(log('dev'))

app.get('/', (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    next()
})
app.get('/places', (req, res) => {
    if (!req.query.lat || !req.query.lng){
        res.statusCode = 403
        res.send({Error: 'Cannot fetch data without exact lat and lng'})
    }
    const location = `${req.query.lat},${req.query.lng}`
    axios.get(url + query + location)
    .then(r => {
        res.send(r.data)
    })
    .catch(err => {
        console.log(err)
        res.statusCode = 404
        res.send({error: err})
    })
})

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    const addr = server.address()
    console.log(`Server is listening to http://${addr.address}:${addr.port}`)
})


