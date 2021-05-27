const express = require("express")
const expressUpload = require('express-fileupload')
const router = express.Router()
const mongoose = require("mongoose")
const hostRoute = require("./host")
const multer  = require('multer')
const cloudinary = require('cloudinary').v2
const base64 = require('base64-arraybuffer')
const {Base64} = require('js-base64');
const upload = multer({ dest: 'uploads/' })
const { v4: uuidv4 } = require('uuid')
const HostModel = require('../models/host')
const ListingsModel = require('../models/listing')

const CustomerModel = require('../models/customer')


let totalIncomeHost = []


router.use(expressUpload())


router.get("/viewBookings", (req, res) => {
    console.log("HomePage Started")
    // total booking - (details of customer, name,phone, email, booking_date, cash/online)
    res.render("viewBookings")
})


// adding something new for customer booking

router.get("/bookNow", async(req, res) => {
    console.log("Book now Started")
    if (req.session.isLoggedIn){
        let bookNowListing = await ListingsModel.findById(req.query).lean()
        let bookNowListingArray = []
        bookNowListingArray.push(bookNowListing)
        console.log(req.session.user.name)
        res.render("bookNow", {name: req.session.user.name, bookNowListingArray})
    }
    else{
        res.render("customerLogin")
    }
})

router.get("/addNew", (req, res) => {
    console.log("HomePage Started")
    // post route name : hostImage
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

// post route for addNew.hbs
router.post('/addnew', async (req, res) => {
    
    try{
        
        const bas64FormattedString1 = Base64.encode(req.files.imageRoom.data)
        const uploadResult1  = await cloudinary.uploader.upload(`data:${req.files.imageRoom.mimetype};base64,${bas64FormattedString1}`)
        
        const bas64FormattedString2 = Base64.encode(req.files.imageWashroom.data)
        const uploadResult2  = await cloudinary.uploader.upload(`data:${req.files.imageWashroom.mimetype};base64,${bas64FormattedString2}`)
        
        const bas64FormattedString3 = Base64.encode(req.files.imageOut.data)
        const uploadResult3  = await cloudinary.uploader.upload(`data:${req.files.imageOut.mimetype};base64,${bas64FormattedString3}`)

        let dataForMongoDb = {
            // id : uuidv4(),
            housename : req.body.name,
            location : req.body.location,
            price : req.body.price,
            amenities: req.body.amenities,
            imageRoom : uploadResult1.secure_url,
            imageWashroom : uploadResult2.secure_url,
            imageOut : uploadResult3.secure_url
        }
        
        
        
        
        
        try{
    
            
            let data = await ListingsModel.create([{
                host :  req.session.user._id,
                housename : req.body.name,
                location : req.body.location,
                price : req.body.price,
                amenities: req.body.amenities,
                imageRoom : uploadResult1.secure_url,
                imageWashroom : uploadResult2.secure_url,
                imageOut : uploadResult3.secure_url
            }])
            
            let _id = req.session.user._id
            const hostLoginData = await HostModel.findByIdAndUpdate(_id, {$push: {
                listings : data
            }})
            
            
            console.log(data)
            res.redirect('/hostDashboard')

            // res.json({dataSaved : true, total : totalIncomeHost})
        } catch (error) {
            console.log(error)
            res.send("Error")
        }
        

    } catch(err){

        console.log(err)
        res.send("Error")
    }

    // data h render karwao
    res.render('hostDashboard')
})




// post route for bookNow.hbs ##imp sending data to hostdashboard and total business

router.post('/customerBooking', async (req, res) => {

    // need to get price of room from get request here:
    
    let dataForBooking = {

        id : uuidv4(),
        name : req.body.name,
        email : req.body.email,
        contact : req.body.contact,
        paymentMethod : req.body.paymentMethod,
        amountPaid : req.body.amountPaid,
        numberOfGuests : req.body.numberOfGuests,
        checkInDate : req.body.checkInDate,
        checkOutDate : req.body.checkOutDate

    }

    try{

        const newCustomerDoc = new CustomerModel(dataForBooking)

        const savedHostDoc = await newCustomerDoc.save()

        let dataForArray = {
            'id' : dataForBooking.id,
            'total': req.body.amountPaid
        }
        
        totalIncomeHost.push(dataForArray)
    
        console.log('Data Savedto DB')
        console.log(totalIncomeHost)

        res.json({dataSaved : true, total : totalIncomeHost})

    } catch (error) {
        console.log(error)
        res.send("Error")
    }
})



module.exports=router