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
                res.json({status: 'error', info: err});
                return;
            }

            res.json({status: 'success', eventData: eventList});
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
                    return res.json({status: 'error', statusCode: 500});
                }
                res.json({status: 'success', details: createdEvent});
                return;
            });

        } else {
            return new Error('Missing Parameter');
        }
    });

    router.route('/api/events/:event_id')
    .put(function(req, res) {
        Event.findByIdAndUpdate(req.params.event_id, {$set: req.body}, function(err, updatedEvent) {
            if (err) {
                res.json({status: 'error', info: err});
                return;
            }

            res.json({ status: 'success', details: updatedEvent});

         });
    })
    .delete(function(req, res) {
        Event.remove({_id: req.params.event_id}, function(err) {
            if (err) {
                return new Error('Could not find ID to delete or something went wrong');
            }
            res.json({status: 'success'});
        });
    });

    app.use(router);

};
