const express = require("express")
const router = express.Router()
const expressUpload = require('express-fileupload')
const ListingsModel = require('../models/listing')


router.use(expressUpload())
// Add New updateExisting

router.get("/updateExisting", async(req, res) => {
    console.log("Update Existing page Started")
    if (req.session.isLoggedIn) {
        let _id = req.session.user._id
        let listings = await ListingsModel.find({host: _id}).lean()

        res.render("updateExisting", {name: req.session.user.name , listings: listings})

    }
    else {
        res.redirect("/hostLoginSignup")
    }
})
let _id = ""
router.get("/updateListing", async(req, res) => {
    _id = req.query
    res.render("updateListing")
})
router.get("/deleteListing", async(req, res) => {
    _id = req.query
    res.render("deleteListing")
})
router.post("/deleteListing", async(req, res) => {
    const deleteListing = await ListingsModel.deleteOne(_id)

    res.redirect("/hostDashboard")
})

// post route for update Existing
router.post('/updateListing', async (req, res) => {
    console.log("Update Listing")
    try {

        try {

            const ListingData = await ListingsModel.findById(_id)

            if (req.body.name != ""){
                updatedHousename = req.body.name
            }
            else{
                updatedHousename = ListingData.housename
            }
            if (req.body.location != ""){
                updatedLocation = req.body.location
            }
            else{
                updatedLocation = ListingData.location
            }
            if (req.body.price != ""){
                updatedPrice = req.body.price
            }
            else{
                updatedPrice = ListingData.price
            }
            if (req.body.amenities != ""){
                updatedAmenities = req.body.amenities
            }
            else{
                updatedAmenities = ListingData.amenities
            }
            const hostListingData = await ListingsModel.findByIdAndUpdate(_id,
                {
                    housename: updatedHousename,
                    location: updatedLocation,
                    price: updatedPrice,
                    amenities: updatedAmenities
                })
            console.log(hostListingData)
            res.redirect('/hostDashboard')
        } catch (error) {
            console.log(error)
            res.send("Error")
        }


    } catch (err) {

        console.log(err)
        res.send("Error")
    }
    res.render('updateExisting')
})

module.exports = router