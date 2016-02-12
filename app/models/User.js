var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema for our user model
var User = new Schema({
        username     : String,
        password     : String,
        firstName    : String,
        lastName     : String,
        dateCreated  : { type: Date, default: Date.now },
        admin : { type: Boolean, default: false }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', User);
