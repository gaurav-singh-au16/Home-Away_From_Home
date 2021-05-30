const express = require("express")
const router = express.Router()
const HostModel = require('../models/host')
const bcrypt = require("bcrypt")
const session = require('express-session')
const Mail = require('./mailgenration.js')

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

// Become Host Welcome Page

router.get("/becomeHost", (req, res) => {
    console.log("host Welcome Started")
    res.render("hostWelcome")
})

// Host Login & Signup Page

router.get("/hostLoginSignup", (req, res) => {
    console.log("Host Signup Login Started")
    res.render("hostLoginSignup")
})

// Host Logout

router.get("/logout", (req, res) => {
    console.log("Host Logout Started")
    req.session.destroy()
    res.render("/")
})

// host signup post Route

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

        // sending welcome mail
        Mail.generateMail(email, name, `Welcome to the family ${name}.Let Us help you to give the best expireicne you deserve. 
            Regards:
            Team HAFH
        `)

        req.session.isLoggedIn = true
        req.session.user = savedUserDoc

        res.redirect("/hostDashboard")

    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }

})

// host Login post Route

router.post('/hostlogin', async (req, res) => {
    const { email, password } = req.body

    var foundUser = await HostModel.findOne({ email })
    if (foundUser == null){
        let err = {
            error: "Email Not Exist"
        }
        res.render("hostLoginSignup", err)
    }
    const isMatching = await bcrypt.compare(password, foundUser.password)

    
    if (foundUser != null && isMatching == true) {

        req.session.isLoggedIn = true
        req.session.user = foundUser

        res.redirect("/hostDashboard")

    }
    else {
        let err = {
            error: "Incorrect Password!!!"
        }
        res.render("hostLoginSignup", err)
    }



})

module.exports = router
