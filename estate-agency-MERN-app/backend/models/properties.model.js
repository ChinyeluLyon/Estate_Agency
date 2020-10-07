const mongoose = require('mongoose')

const PropertiesSchema = new mongoose.Schema({
    property_address: { type: String, required: true, unique: true },
    property_type: { type: String, required: true },
    num_bedrooms: { type: Number, required: true },
    //deal type is if its a rental or a buy
    deal_type: { type: String, required: true },
    rental_price: { type: Number, required: false },
    rental_type: { type: String, required: false },
    buy_price: { type: Number, required: false },
    details: { type: String, required: false }
})

const Property = mongoose.model('Property', PropertiesSchema)
module.exports = Property