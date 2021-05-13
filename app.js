const express = require("express")
const expHbs = require('express-handlebars')
const app = express()
const path = require("path")
const routes = require('./routes/user')
const customerRoutes = require('./routes/customer')

app.engine('hbs', expHbs({ 
    extname: 'hbs',
    defaultLayout:false

}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: false}))
app.use(express.static("style"))
app.use(express.static("script"))
app.use(express.static("public"))
app.use('', routes)
app.use('', customerRoutes)



app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started")
})