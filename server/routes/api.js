const express = require('express')
const router = express.Router()
const requestPromise = require('request-promise')
const APIkey = "3120b6a71612b95b3e5f802e203dbbb6"
const City = require('../models/City')
const PIC_API_KEY = '14187106-8fdfd5c0151fefc9af925f5f1'

router.get('/city/:input', async function (req, res) {
    let input = req.params.input
    let data = await requestPromise(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=${APIkey}`)
    let data2 = await requestPromise(`https://pixabay.com/api/?key=${PIC_API_KEY}&q=${input}&image_type=photo`)
    let cityData = JSON.parse(data)
    let cityPic = JSON.parse(data2)
    if (cityData,cityPic) {
        let city = {
            name: cityData.name,
            temperature: cityData.main.temp,
            condition: cityData.weather[0].main,
            conditionPic: cityData.weather[0].icon,
            background: cityPic.hits[0].largeImageURL
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
