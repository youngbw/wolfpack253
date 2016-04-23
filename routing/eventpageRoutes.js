var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Event = mongoose.model('Event');
var EventDate = mongoose.model('EventDate');

module.exports = function(app) {


    router.route('/api/events')
    .get(function(req, res) {
        console.log(req);
        EventDate.find()
        .where('date').gt(req.query.queryStartDate).lt(req.query.queryEndDate)
        .exec(function(err, eventList) {
            if (err) {
                res.json({status: 'error', info: err});
                return;
            }
            res.json({status: 'success', eventData: eventList});
        });

    });

    app.use(router);

};
