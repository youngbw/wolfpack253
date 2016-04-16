var express = require('express');
var mongoose = require('mongoose');
var daily = mongoose.model('DailyMessage');
var router = express.Router();

var message = mongoose.model('DailyMessage');

module.exports = function(app) {

    router.route('/motd').get(function(req, res) {

        message.find(function (err, motd) {

            if (err) return res.json({status: 'error', info: err});

            var current = motd[0];

            res.json(current);
        });

    }).put(function(req, res) {

        message.find(function(err, motd) {
            if (!motd || !req.body.message) return new Error('Could not find MOTD');
            if (err) return err;
            var current = motd[0];
            current.updateMessage(req.body.message, req.body.author, function(err, current) {
                if (err) return err;
                return res.json(current);
            });
        });
    }).post(function(req, res) {

        var message = new daily(req.body);
        message.message = req.body.message;
        message.author = req.body.author;

        message.save(function(err, daily) {
            if (err) return err;
            res.json(daily);
        });

    });


    app.use(router);

};
