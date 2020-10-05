const express = require('express')
const mongoose = require('mongoose')
const customerRoute = require('./routes/customers')
const cors = require('cors')

const app = express()
app.use(express.json())
//cors is needed for axios to connect between back and frontends
app.use(cors())

require('dotenv').config()
const uri = process.env.ATLAS_URI
const port = process.env.PORT || 5000

try {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    const mongoDBConn = mongoose.connection
    mongoDBConn.once('open', () => {
        console.log('MongoDB connection successful')
    })
} catch (error) {
    console.log('MongoDB connection FAILED!')
}
app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})

app.use('/customers', customerRoute)
