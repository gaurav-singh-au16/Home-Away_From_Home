const express = require("express")
const router = express.Router()
const ListingsModel = require('../models/listing')

// Host DashBoard Page

router.get("/hostDashboard", async(req, res) => {
    console.log("host DashBoard Started")
    if (req.session.isLoggedIn) {
        let _id = req.session.user._id
        let listings = await ListingsModel.find({host: _id}).lean()

        res.render("hostDashboard", {name: req.session.user.name , listings: listings})

    }
    else {
        res.redirect("/hostLoginSignup")
    }
})

module.exports = router