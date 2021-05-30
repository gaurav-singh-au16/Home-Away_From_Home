const express = require("express")
const router = express.Router()
const {QueryModel} = require('../models/query')
const mail = require('./mailgenration.js')

router.get("/contactUs", (req, res) => {
    console.log("ContactUs Started")
    res.render("contactUs")
})

router.post('/queryUp', async(req, res) => {

    const { name, email, discription } = req.body
    const queryUpData = {
        name,
        email,
        discription
    }
    try {

        const newUserDoc = new QueryModel(queryUpData)

        const savedUserDoc = await newUserDoc.save()

        // sending welcome mail
        mail.generateMail(email, name, `Thank you for writing to us.
            Your input is valuable for us.
            We will get back to you as soon as we can.
            Regards:
            Team HAFH
        `)



        res.redirect("/hostdashboard")

    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }
})

module.exports = router