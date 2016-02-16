
var mongoose = require('mongoose');

var DailyMessageSchema = new mongoose.Schema({
    author: {type: String, lowercase: true, unique: true, required: true},
    datePosted: {type: Date, default: Date.now},
    message: {type: String, required: true}
});

DailyMessageSchema.methods.updateMessage = function(message, cb) {

    this.message = message;
    this.date = Date.now;
    this.save(cb);

};


mongoose.model('DailyMessage', DailyMessageSchema);
