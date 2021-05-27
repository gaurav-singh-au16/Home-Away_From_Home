const mongoose = require('mongoose')

const HostSchema = new mongoose.Schema({
    
    name:{
        type: String,
        require: true
    },
    email:{
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    listings : [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'}
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const HostModel = mongoose.model('Host', HostSchema)

module.exports = HostModel