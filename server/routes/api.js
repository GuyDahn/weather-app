const express = require('express')
const router = express.Router()
const moment = require('moment')
const request = require('request')
const APIkey = "3120b6a71612b95b3e5f802e203dbbb6"
const City = require('../models/City')

router.get('/city/:input', function (req, res) {
    console.log(req.params.input)
    let input = req.params.input
    request(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=${APIkey}`, 
    function (error, response, body) {
        res.send(JSON.parse(body))
    })
})


router.get('/cities', function (req, res) {
    City.find({})
    .exec(data => res.send(data))
})

router.post('/city', async function(req, res) {
    let city = new City({
        name: req.body.name,
        temperature: req.body.main.temp,
        condition: req.body.weather[0].main,
        conditionPic: req.body.weather[0].icon
    })
    city.save()
    .then( res.send(`${city.name} added to database`) )
})

router.delete('/city/:cityName', function(req, res) {
        City.findOneAndDelete({
            name: req.params.cityName
           })
        .then(res.send(`${req.params.cityName} removed from database`))
        res.send("can't find the city")
    
    
})
module.exports = router
