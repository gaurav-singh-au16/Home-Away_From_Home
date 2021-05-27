const express = require("express")
const router = express.Router()
const HostModel = require('../models/host')
const ListingsModel = require('../models/listing')
const bcrypt = require("bcrypt")
const session = require('express-session')

router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.use(session({
    secret: "home",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 9000000
    }
}))
router.hostSignupData = {}
router.get("/becomeHost", (req, res) => {
    console.log("host Welcome Started")
    res.render("hostWelcome")
})
router.get("/hostLogin", (req, res) => {
    console.log("Host Signup Login Started")
    res.render("hostLoginSignup")
})

router.get("/logout", (req, res) => {
    console.log("Host Logout Started")
    req.session.destroy()
    res.render("/")
})
let allHostListing = []
router.get("/hostDashboard", async(req, res) => {
    console.log("host DashBoard Started")
    if (req.session.isLoggedIn) {
        let _id = req.session.user._id
        let listings = await ListingsModel.find({host: _id}).lean()
        console.log(listings)
        
        // async function myFunction(item) {
        //     let host = item
        //     let listingData = await ListingsModel.findOne({host})
        //     allHostListing.push(listingData)
        //     console.log(allHostListing)
            
        // }
        res.render("hostDashboard", {name: req.session.user.name , listings: listings})

    }
    else {
        res.redirect("/hostLoginSignup")
    }
})

router.get('/hostLoginSignup', (req, res) => {
    res.render('hostLoginSignup')
})


router.post('/hostsignUp', async (req, res) => {
    const { name, email, mobile, password } = req.body
    console.log(req.body)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash((req.body).password, salt)
    const  signUpData = {
        name,
        email,
        mobile,
        password: hashedPassword
    }
    hostSignupData = signUpData
    try {

        const newUserDoc = new HostModel(signUpData)

        const savedUserDoc = await newUserDoc.save()

        req.session.isLoggedIn = true
        req.session.user = savedUserDoc
        res.redirect("/hostDashboard")

    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }

})


router.post('/hostlogin', async (req, res) => {
    const { email, password } = req.body

    var foundUser = await HostModel.findOne({ email })
    if (foundUser == null){
        res.send("Invalid Crediantials")
    }
    const isMatching = await bcrypt.compare(password, foundUser.password)

    
    if (foundUser != null && isMatching == true) {

        req.session.isLoggedIn = true
        req.session.user = foundUser

        // hostSignupData = users
        res.redirect("/hostDashboard")

    }
    else {
        res.send("Invalid Crediantials")
    }



})

module.exports = router


// {"_id":{"$oid":"60ab75103993da1f60db483f"},
// "name":"Gaurav",
// "email":"gaurav@gmail.com",
// "mobile":"9555095817",
// "password":"$2b$10$k9c/dd08fZNsBIhyYbp6qeWxkZeo1XCfxDZIBEw4Hfj4dakRdWPk2",
// "createdAt":{"$date":{"$numberLong":"1621849360035"}},
// "__v":{"$numberInt":"0"},
// "amenities":["WIFI, AC, Kitchen","WIFI, AC, Kitchen"],
// "housename":["Raghuvanshi","Mannat"],
// "imageOut":["https://res.cloudinary.com/dys0ega37/image/upload/v1621853676/ltaaqdp4rz9whhhidm7i.jpg","https://res.cloudinary.com/dys0ega37/image/upload/v1621854027/bsr0l5wryxcvfbbkqxtu.jpg"],"imageRoom":["https://res.cloudinary.com/dys0ega37/image/upload/v1621853672/l9ztfxxscg2yand0fkd1.jpg","https://res.cloudinary.com/dys0ega37/image/upload/v1621853989/wjhrnjkz0yev9jdc8ybt.jpg"],"imageWashroom":["https://res.cloudinary.com/dys0ega37/image/upload/v1621853674/gr9vhjisgw2xxhrehnn8.jpg","https://res.cloudinary.com/dys0ega37/image/upload/v1621853991/xa8bej40ocmnfcmq2ihx.jpg"],"location":["Shimla","Haridwar"],"price":[{"$numberInt":"3500"},{"$numberInt":"4000"}]}