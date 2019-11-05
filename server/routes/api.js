const express = require('express')
const router = express.Router()
const moment = require('moment')
const requestPromise = require('request-promise')
const APIkey = "3120b6a71612b95b3e5f802e203dbbb6"
const City = require('../models/City')

router.get('/city/:input', async function (req, res) {
    let input = req.params.input
    let data = await requestPromise(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=${APIkey}`)
    let cityData = JSON.parse(data)
    if (cityData) {
        let city = {
            name: cityData.name,
            temperature: cityData.main.temp,
            condition: cityData.weather[0].main,
            conditionPic: cityData.weather[0].icon
        }
        res.send(city)
    } else {
        console.log('city fetch error')
    }
})

router.get('/cities', function (req, res) {
    City.find({})
        .then(data => res.send(data))
})

router.post('/city', async (req, res) => {
	let city = req.body
	city = new City({ ...city })
	city = await city.save()
	res.end()
})

router.delete('/city', function (req, res) {
    console.log('Removed city: ' + req.body.city)
    City.findOneAndDelete({
        name: req.body.city
    })
        .then(res.end())
})
module.exports = router
