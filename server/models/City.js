const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: { type: String, required: true },
    temperature: Number,
    condition: String,
    conditionPic: String,
    background: String
})

const City = mongoose.model("City", citySchema)
module.exports = City
