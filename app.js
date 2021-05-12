const express = require("express")
const expHbs = require('express-handlebars')
const app = express()

const routes = require('./routes/user')

app.engine('hbs', expHbs({ 
    extname: 'hbs',
    defaultLayout:false
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: false}))
app.use(express.static("style"))
app.use(express.static("script"))
app.use('/user', routes)



app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started")
})