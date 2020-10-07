const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customer_name: { type: String, required: true, unique: true },
    customer_email: { type: String, required: true, unique: true },
    // customer_image_url: { type: String, required: false, unique: true },
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer