const express = require("express")
const router = express.Router()

router.get("/becomeHost", (req, res) => {
    console.log("HomePage Started")
    res.render("hostWelcome")
})
router.get("/hostLogin", (req, res) => {
    console.log("HomePage Started")
    res.render("hostLoginSignup")
})

module.exports=router