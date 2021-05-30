const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const ListingsModel = require('../models/listing')
const CustomerModel = require('../models/customer')


router.get("/search", async(req,res) => {
    console.log("search by location")
    if (req.session.isLoggedIn){
        let location = req.query
        let locationListing = await ListingsModel.find(location).lean()
    
        res.render("search", {Listing:locationListing})
    }
    else{
        res.redirect("/login")
    }

})

module.exports=router