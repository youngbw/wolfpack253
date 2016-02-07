var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Define the schema for our user model
var userSchema = mongoose.Schema({
        username     : String,
        password     : String,
        firstName    : String,
        lastName     : String,
        dateCreated  : { type: Date, default: Date.now },
        admin : { type: Boolean, default: false }
});

// methods ======================
userSchema.methods.setValues = function(username, password) {
    this.local.username = username;
    this.local.password = this.generateHash(password);
};

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
