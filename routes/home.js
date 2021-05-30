const express = require("express")
const router = express.Router()


router.get("/", (req, res) => {
    console.log("HomePage Started")
    res.render("homePage")
})

router.get("/about", (req, res) => {
    console.log("HomePage Started")
    res.render("about")
})


module.exports = router