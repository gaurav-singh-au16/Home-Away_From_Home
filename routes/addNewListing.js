const express = require("express")
const router = express.Router()
const expressUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const {Base64} = require('js-base64');
const HostModel = require('../models/host')
const ListingsModel = require('../models/listing')


router.use(expressUpload())
// Add New Page

router.get("/addNew", (req, res) => {
    console.log("Add New Listing Page")
    res.render("addNew")
})

// post route for addNew
router.post('/addnew', async (req, res) => {
    console.log("Adding New Listing")
    try {

        const bas64FormattedString1 = Base64.encode(req.files.imageRoom.data)
        const uploadResult1 = await cloudinary.uploader.upload(`data:${req.files.imageRoom.mimetype};base64,${bas64FormattedString1}`)

        const bas64FormattedString2 = Base64.encode(req.files.imageWashroom.data)
        const uploadResult2 = await cloudinary.uploader.upload(`data:${req.files.imageWashroom.mimetype};base64,${bas64FormattedString2}`)

        const bas64FormattedString3 = Base64.encode(req.files.imageOut.data)
        const uploadResult3 = await cloudinary.uploader.upload(`data:${req.files.imageOut.mimetype};base64,${bas64FormattedString3}`)


        try {


            let data = await ListingsModel.create([{
                host: req.session.user._id,
                housename: req.body.name,
                location: req.body.location,
                price: req.body.price,
                amenities: req.body.amenities,
                imageRoom: uploadResult1.secure_url,
                imageWashroom: uploadResult2.secure_url,
                imageOut: uploadResult3.secure_url
            }])

            let _id = req.session.user._id
            const hostLoginData = await HostModel.findByIdAndUpdate(_id, {
                $push: {
                    listings: data
                }
            })
            res.redirect('/hostDashboard')
        } catch (error) {
            console.log(error)
            res.send("Error")
        }


    } catch (err) {

        console.log(err)
        res.send("Error")
    }
    res.render('hostDashboard')
})

module.exports = router