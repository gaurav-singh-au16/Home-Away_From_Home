require('dotenv').config()
const express = require("express")
const expHbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const multer = require('multer')
const cloudinary = require('cloudinary').v2

// All External Routes

const {DATABASE, cloudName, apiKey, apiSecret} = process.env
const homeRoutes = require('./routes/home')
const customerLoginSignupRoutes = require('./routes/customerLoginSignup')
const hostLoginSignupRoutes = require('./routes/hostLoginSignup')
const hostDashboardRoutes = require('./routes/hostdashboard')
const searchRoutes = require('./routes/search')
const exploreRoutes = require('./routes/explore')
const bookNowRoutes = require('./routes/booknow')
const addNewListingRoutes = require('./routes/addNewListing')
const paymentRoutes = require('./routes/payement')
const contactUsRoutes = require('./routes/contactUs')
const updateExistingRoutes = require('./routes/updateExisting')

// mongoDb Database connect

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log('MONGO DB DataBase Connected')
})

// handlebars engine setup

app.engine('hbs', expHbs({
    extname: 'hbs',
    defaultLayout: false

}))
app.set('view engine', 'hbs')


// cloudniry db connect 

cloudinary.config({
    
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    
})

// External routes Use

app.use(express.urlencoded({ extended: false }))
app.use(express.static("style"))
app.use(express.static("script"))
app.use(express.static("public"))
app.use('', homeRoutes)
app.use('', customerLoginSignupRoutes)
app.use('', hostLoginSignupRoutes)
app.use('', hostDashboardRoutes)
app.use('', searchRoutes)
app.use('', exploreRoutes)
app.use('', bookNowRoutes)
app.use('', addNewListingRoutes)
app.use('', paymentRoutes)
app.use('', contactUsRoutes)
app.use('', updateExistingRoutes)

// Port Connect 

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started")
})