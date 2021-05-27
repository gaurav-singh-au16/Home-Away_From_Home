const express = require("express")
const router = express.Router()
const { UserModel } = require('../models/User')
const  HostModel  = require('../models/host')
const  ListingsModel  = require('../models/listing')
const bcrypt = require("bcrypt")
const session = require('express-session')

router.use(session({
    secret: "home",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 9000000
    }
}))

router.get("/login", (req, res) => {
    console.log("HomePage Started")
    res.render("customerLogin")
})
router.get("/logout", (req, res) => {
    console.log("HomePage Started")
    req.session.destroy()
    res.render("homePage")
})

router.get("/explore", async(req, res) => {
    console.log("HomePage Started")
    if (req.session.isLoggedIn) {
        await ListingsModel.find({}, function(err, result) {
            if (err) {
              res.send(err);
            } else {
            
            console.log(result)
            res.render("explore", {result})
            }
          }).lean()
       
    }
    else {
        res.render("customerLogin")
    }
})

let globalData = {}
router.post('/signUp', async (req, res) => {
    const { name, email, mobile, password } = req.body
    console.log(req.body)
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

        req.session.isLoggedIn = true
        res.redirect("/explore")

    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }

})


router.post('/login', async (req, res) => {
    const { email, password } = req.body

    var foundUser = await UserModel.findOne({ email })
    if (foundUser == null){
        res.send("Invalid Crediantials")
    }
    const isMatching = await bcrypt.compare(password, foundUser.password)

    
    if (foundUser != null && isMatching == true) {

        req.session.isLoggedIn = true
        req.session.user = foundUser

        
        res.redirect("/explore")

    }
    else {
        res.send("Invalid Crediantials")
    }



})

module.exports = router