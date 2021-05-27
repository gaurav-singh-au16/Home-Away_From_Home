const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    id :{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact:{
        type:Number,
        required: true
    },
    paymentMethod :{
        type : String,
        required : true
    },
    amountPaid:{
        type:Number,
        required: true
    },
    numberOfGuests :{
        type: Number,
        require : true
    },
    checkInDate : { 
        type : Date,
        require : true
    },
    checkOutDate : { 
        type : Date,
        require : true
    },
    bookingDate : { 
        type : Date,
        default : Date.now
    }
})
const CustomerModel = mongoose.model('customercredentialForBooking', CustomerSchema)

module.exports = CustomerModel