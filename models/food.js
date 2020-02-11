// include mongoose
var mongoose = require('mongoose')

//create a schema for food
var foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Name is required'
    },
    country:{
        type: String,
        required: 'Country is required'
    }
})

// make this model public with the name "food"
module.exports = mongoose.model('Food', foodSchema)