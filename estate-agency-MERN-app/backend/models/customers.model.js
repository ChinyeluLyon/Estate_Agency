const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const customerSchema = new Schema({
    customer_name: { type: String, required: true, unique: true }
    //, customer_email: { type: String, required: true, unique: true },
    // customer_image_url: { type: String, required: false, unique: true },
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer