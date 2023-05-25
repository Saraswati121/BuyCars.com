const mongoose = require ("mongoose")

const carSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    bulletPoints: { type: [String], required: true },
    price: { type: Number, required: true },
    colors: { type: String, required: true },
    mileage: { type: Number, required: true },
})

const carModel = mongoose.model('cars',carSchema)
module.exports = carModel;