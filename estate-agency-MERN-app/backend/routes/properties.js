const router = require('express').Router()
const PropertyModel = require('../models/properties.model')

router.route('/').get((req, res) => {
    PropertyModel.find().then(foundProperties => {
        res.json(foundProperties)
    }).catch(err => {
        res.json(err)
    })
})

router.route('/add').post((req, res) => {
    const propertyAddress = req.body.property_address
    const propertyType = req.body.property_type
    const numBedrooms = req.body.num_bedrooms
    const dealType = req.body.deal_type
    const rentalPrice = req.body.rental_price
    const rentalType = req.body.rental_type
    const buyPrice = req.body.buy_price
    const details = req.body.details

    const newproperty = new PropertyModel({
        property_address: propertyAddress,
        property_type: propertyType,
        num_bedrooms: numBedrooms,
        deal_type: dealType,
        rental_price: rentalPrice,
        rental_type: rentalType,
        buy_price: buyPrice,
        details: details
    })

    newproperty.save().then(property => {
        res.json(property.property_address + " created and saved")
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router