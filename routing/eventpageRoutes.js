var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Event = mongoose.model('Event');
// var EventDate = mongoose.model('EventDate');

module.exports = function(app) {


    router.route('/api/events')
    .get(function(req, res) {
        Event.find()
        .where('date').gt(req.query.queryStartDate).lt(req.query.queryEndDate)
        .sort({'date': 1})
        .exec(function(err, eventList) {
            if (err) {
                return res.status(500).json({status: 'error', info: err, details: 'An error occurred when retrieving events.'});
            }

            res.status(200).json({status: 'success', eventData: eventList});
        });

    })
    .post(function(req, res) {
        if (req.body.date && req.body.name) {

            var params = {name: req.body.name, date: req.body.date};
            if (req.body.note) {
                params.note = req.body.note;
            }
            var myEvent = new Event(params);
            myEvent.save(function(err, createdEvent) {

                if (err) {
                    return res.status(500).json({status: 'error', statusCode: 500, details: 'An error occurred when saving the event.'});
                }
                res.status(200).json({status: 'success', details: createdEvent});
                return;
            });

        } else {
            return res.status(400).json({status: 'error', details: 'Could not create event; missing parameter.'});
        }
    });

    router.route('/api/events/:event_id')
    .put(function(req, res) {
        Event.findByIdAndUpdate(req.params.event_id, {$set: req.body}, function(err, updatedEvent) {
            if (err) {
                return res.status(500).json({status: 'error', info: err, details: 'Could not update the existing event.'});
            }

            return res.status(200).json({ status: 'success', details: updatedEvent});

         });
    })
    .delete(function(req, res) {
        Event.remove({_id: req.params.event_id}, function(err) {
            if (err) {
                return res.status(500).json({info: err, details: 'Could not delete the existing event.'});
            }
            res.status(200).json({status: 'success'});
        });
    });

    app.use(router);

};
