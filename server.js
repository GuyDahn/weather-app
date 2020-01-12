// Server setup
const express = require('express')
const path = require('path')
const app = express()
const api = require('./server/routes/api')
const bodyParser = require('body-parser')

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/WeatherDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
})
mongoose.connect('mongodb://localhost/WeatherDB', )

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)

const PORT = 8080
app.listen(process.env.PORT || PORT, () => console.log('now running on port: ' + PORT))
