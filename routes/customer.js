const express = require("express")
const router = express.Router()

router.get("/login", (req, res) => {
    console.log("HomePage Started")
    res.render("customerLogin")
})

module.exports=router