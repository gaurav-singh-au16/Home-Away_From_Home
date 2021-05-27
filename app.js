const express = require("express")
const expHbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const expressUpload = require('express-fileupload')
const path = require("path")
const cloudinary = require('cloudinary').v2
const base64 = require('base64-arraybuffer')
const {Base64} = require('js-base64');
const routes = require('./routes/user')
const customerRoutes = require('./routes/customer')
const hostRoutes = require('./routes/host')
const hostDashboardRoutes = require('./routes/hostdashboard')

// const DATABASE = "mongodb+srv://bnb:1234@app-info.vd8mi.mongodb.net/home?retryWrites=true&w=majority"
const DATABASE = "mongodb+srv://owner:123@companydatabase.rcplm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log('MONGO DB DataBase Connected')
})

app.engine('hbs', expHbs({
    extname: 'hbs',
    defaultLayout: false

}))
app.set('view engine', 'hbs')



cloudinary.config({
    
    cloud_name: 'dys0ega37',
    api_key: '814739827721921',
    api_secret: 'VGT6iTmVATupsObAVRc6_7992Ao',
    
})


// const storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now());
//     },
//   });


// const upload = multer({ storage });

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