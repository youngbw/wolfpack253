var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    note: {type: String},
    name: {type: String, required: true}

});

var EventDateSchema = new mongoose.Schema({
    date: {type: Date},
    details: [EventSchema]
});


mongoose.model('Event', EventSchema);
mongoose.model('EventDate', EventDateSchema);
