const express = require("express")
const router = express.Router()
const ListingsModel = require('../models/listing')


router.get("/bookNow", async (req, res) => {
    console.log("Book now Started")
    if (req.session.isLoggedIn) {
        let bookNowListing = await ListingsModel.findById(req.query).lean()
        let bookNowListingArray = []
        bookNowListingArray.push(bookNowListing)
        res.render("bookNow", { name: req.session.user.name, bookNowListingArray })
    }
    else {
        res.render("customerLogin")
    }
})

module.exports = router