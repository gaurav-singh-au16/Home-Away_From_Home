const mongoose = require('mongoose')

const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    discription:{
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const QueryModel = mongoose.model('contactcredential', QuerySchema)



module.exports = {
    QueryModel
}