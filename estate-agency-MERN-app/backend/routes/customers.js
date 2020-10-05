const router = require('express').Router()
const CustomerModel = require('../models/customers.model')

router.route('/').get((req, res) => {
    CustomerModel.find().then(customers => {
        res.json(customers)
    })
})

router.route('/add/').post((req, res) => {
    const customerName = req.body.customer_name
    const newCustomer = new CustomerModel({
        customer_name: customerName
    })

    newCustomer.save().then(() => {
        res.json(newCustomer.customer_name + ' Added')
    }).catch((err) => {
        res.json('Add Customer Error: ' + err)
    })
})

router.route('/:id').get((req, res) => {
    CustomerModel.findById(req.params.id).then((foundCustomer) => {
        res.json(foundCustomer)
    })
})

router.route('/:id').delete((req, res) => {
    // res.json(req.params.id)
    CustomerModel.findByIdAndDelete(req.params.id).then((foundCustomer) => {
        res.json(foundCustomer.customer_name + ' deleted ')
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router