const express = require("express")
const router = express.Router()
const { HostModel } = require('../models/host')

router.get("/hostDashBoard", (req, res) => {
    console.log("HomePage Started")
    res.render("hostDashboard")
})
router.get("/viewBookings", (req, res) => {
    console.log("HomePage Started")
    res.render("viewBookings")
})
router.get("/addNew", (req, res) => {
    console.log("HomePage Started")
    res.render("addNew")
})
router.get("/updateExisting", (req, res) => {
    console.log("HomePage Started")
    res.render("updateExisting")
})
router.get("/totalBusiness", (req, res) => {
    console.log("HomePage Started")
    res.render("totalBusiness")
})
router.get("/contactUs", (req, res) => {
    console.log("HomePage Started")
    res.render("contactUs")
})


// write Your Code From here



module.exports=router