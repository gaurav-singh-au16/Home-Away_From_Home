const express = require("express")
const router = express.Router()
const { UserModel } = require('../models/User')
const bcrypt = require("bcrypt")
const generateMail = require('./mailgenration.js')
const session = require('express-session')

router.use(session({
    secret: "home",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 9000000
    }
}))

// customer Login & Signup Page

router.get("/login", (req, res) => {
    console.log("HomePage Started")
    res.render("customerLogin")
})

// customer Logout

router.get("/logout", (req, res) => {
    console.log("HomePage Started")
    req.session.destroy()
    res.render("homePage")
})

// customer Signup Post route

let globalData = {}
router.post('/signUp', async (req, res) => {
    const { name, email, mobile, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash((req.body).password, salt)
    signUpData = {
        name,
        email,
        mobile,
        password: hashedPassword
    }
    globalData = signUpData
    try {

        const newUserDoc = new UserModel(signUpData)

        const savedUserDoc = await newUserDoc.save()

        generateMail.generateMail(email, name, `Welcome to the family ${name}. Create your own home Away from your home. Let Us help you to give the best expireicne you deserve. 
        Regards:
        Team HAFH
        `)
        req.session.isLoggedIn = true
        res.redirect("/explore")

    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }

})

// customer Login Post route

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    var foundUser = await UserModel.findOne({ email })
    if (foundUser == null) {
        let err = {
            error: "Email Not Exist"
        }
        res.render("customerLogin", err)
    }
    const isMatching = await bcrypt.compare(password, foundUser.password)


    if (foundUser != null && isMatching == true) {

        req.session.isLoggedIn = true
        req.session.user = foundUser

        res.redirect("/")

    }
    else {
        let err = {
            error: "Incorrect Password!!!"
        }
        res.render("customerLogin", err)
    }



})

module.exports = router