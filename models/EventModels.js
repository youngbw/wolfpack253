var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    note: {type: String},
    name: {type: String, required: true, unique: true},
    date: {type: Date, required: true}

});


mongoose.model('Event', EventSchema);
