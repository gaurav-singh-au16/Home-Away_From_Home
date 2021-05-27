const mongoose = require('mongoose')

const ListingsSchema = new mongoose.Schema({
    
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    },
    housename: String,
    location: String,
    price : Number,
    amenities : [
        String
    ],
    imageRoom:[
        String
    ],
    imageWashroom:[
        
        String
    ],
    imageOut:[
        
        String
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// const listing = [{housename: "Raghu", amenities: []}, {}]
// /////
// const Listing = new mongoose.Schema({
//     housename: String, //Raghu
//     amenities: [String] // WIfasd
//     hostId: {

//     }
// })

// Listing.create({
//     hostId: 
// })

const ListingsModel = mongoose.model('listings', ListingsSchema)

module.exports = ListingsModel