var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var vars = require('../config/vars');

var AdminRequestSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    approved: {type: Boolean, default: false},
    approvedBy: {type: String, default: ''},
    decisionMade: {type: Boolean, default: false},
    dateRequested: {type: Date, default: new Date()}
});


mongoose.model('AdminRequests', AdminRequestSchema);
