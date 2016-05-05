var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var vars = require('../config/vars');

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    password: String,
    // salt: String,
    admin: {type: Boolean, default: false}
});

// UserSchema.methods.setPassword = function(password) {
//     this.salt = crypto.randomBytes(32).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// };
//
// UserSchema.methods.validPassword = function(password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
//     return this.hash === hash;
// };
//
// UserSchema.methods.generateJWT = function() {
//     // set expiration to 30 days
//     var today = new Date();
//     var exp = new Date(today);
//     exp.setDate(today.getDate() + 30);
//
//     return jwt.sign({
//         _id: this._id,
//         username: this.username,
//         exp: parseInt(exp.getTime() / 1000),
//     }, vars.secret);
// };

mongoose.model('User', UserSchema);
