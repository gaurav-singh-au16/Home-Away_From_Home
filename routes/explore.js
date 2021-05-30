const express = require("express")
const router = express.Router()
const ListingsModel = require('../models/listing')



router.get("/explore", async (req, res) => {
    console.log("Explore Page Started")
    if (req.session.isLoggedIn) {
        await ListingsModel.find({}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.render("explore", { result })
            }
        }).lean()

    }
    else {
        res.render("customerLogin")
    }
})



module.exports = router