const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    console.log("HomePage Started")
    res.render("homePage")
})

module.exports=router