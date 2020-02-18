// include mongoose
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose'); // used to extend this model's functionality for passport

//create a schema for user
var userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: 'Username is required'
    },
    // firstName:{
    //     type: String,
    //     required: 'First Name is required'
    // },
    // lastName:{
    //     type: String,
    //     required: 'Last Name is required'
    // },
    // password:{
    //     type: String,
    //     required: 'Password is required'
    // }
});

// extend this model so it's no longer a regular model but used by passport for user management
userSchema.plugin(plm);

// make this model public with the name "User"
module.exports = mongoose.model('User', userSchema);