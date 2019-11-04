const express = require('express')
const router = express.Router()
const moment = require('moment')
const request = require('request')
const APIkey = "3120b6a71612b95b3e5f802e203dbbb6"
const City = require('../models/City')

router.get('/cities/:input', function (req, res) {
    console.log(req.params.input)
    let input = req.params.input
    request(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIkey}`, 
    function (error, response, body) {
        res.send(JSON.parse(body))
    })
})

// router.get('/cities', function (req, res) {
//     City.find({}, function (err, city) {
//         res.send(city)
//     })
// })

// router.post('/city', function (req, res) {
//     City.find({}, function (err, city) {
//         res.send(city)
//     })
// })

// router.delete('/city', function (req, res) {
//     let cityName = req.body.name
//     City.find({}, function (err, city) {
//         res.send(city)
//     })
// })

module.exports = router
