var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var vars = require('../config/vars');

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    password: String,
    // salt: String,
    email: {type: String, lowercase: true, default: ''},
    accounts: {
        steam: {
            username: {type: String, default: ''},
            password: {type: String, default: ''}
        }
    },
    admin: {type: Boolean, default: false},
    joinDate: {type: Date, default: new Date()}
});


// var AdminRequestSchema = new mongoose.Schema({
//     username: {type: String, required: true, unique: true},
//     approved: {type: Boolean, default: false},
//     approvedBy: {type: String, default: ''},
//     decisionMade: {type: Boolean, default: false},
//     dateRequested: {type: Date, default: new Date()}
// });
//
//
// mongoose.model('AdminRequest', AdminRequestSchema);
mongoose.model('User', UserSchema);
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

// mongoose.model('AdminRequest', AdminRequestSchema);
mongoose.model('User', UserSchema);
