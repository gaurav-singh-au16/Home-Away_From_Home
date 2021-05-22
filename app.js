const express = require("express")
const expHbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const path = require("path")
const routes = require('./routes/user')
const customerRoutes = require('./routes/customer')
const hostRoutes = require('./routes/host')
const hostDashboardRoutes = require('./routes/hostdashboard')

// const DATABASE = "mongodb+srv://bnb:1234@app-info.vd8mi.mongodb.net/home?retryWrites=true&w=majority"
const DATABASE = "mongodb+srv://gaurav:yelmpcamp123@cluster0.1qwd3.mongodb.net/home?retryWrites=true&w=majority"

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log('DataBase Connected')
})

app.engine('hbs', expHbs({
    extname: 'hbs',
    defaultLayout: false

}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: false }))
app.use(express.static("style"))
app.use(express.static("script"))
app.use(express.static("public"))
app.use('', routes)
app.use('', customerRoutes)
app.use('', hostRoutes)
app.use('', hostDashboardRoutes)



app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started")
})