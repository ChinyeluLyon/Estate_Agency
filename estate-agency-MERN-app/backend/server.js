const express = require('express')
const mongoose = require('mongoose')
const customerRoute = require('./routes/customers')
const propertiesRoute = require('./routes/properties')
const filepload = require('express-fileupload')
const fs = require('fs')

const cors = require('cors')
//cors is needed for axios to connect between back and frontends

const app = express()
app.use(express.json())
app.use(filepload())
app.use(cors())
//cors is needed for axios to connect between back and frontends

app.use('/customers', customerRoute)
app.use('/properties', propertiesRoute)

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


app.route('/').post((req, res) => {
    res.json(req.files)
    console.log(req.files)
    var file = req.files.file

    file.mv('./uploads/' + file.name, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("File Uploaded")
        }
    })

})
