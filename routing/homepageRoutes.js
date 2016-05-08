var express = require('express');
var mongoose = require('mongoose');
var daily = mongoose.model('DailyMessage');
var server = mongoose.model('ServerInfo');
var router = express.Router();
var message = mongoose.model('DailyMessage');

module.exports = function(app) {

    // *** SERVER INFO ROUTES

    router.route('/serverinfo').get(function(req, res) {
        server.find(function(err, info) {
            if (err) {
                return res.status(500).json({status: 'error', details: err});
            }

            return res.status(200).json(info);

        });
    }).put(function(req, res) {
        if (!req.body.name || !req.body.port || !req.body.password) {
            return res.status(400).json({status: 'error', details: 'Could not update server info; missing parameter.'});
        }
        server.find(function(err, info) {
            if (!info) {
                return res.status(500).json({status: 'error', details: 'There was an error trying to locate the current server info.'})
            }
            if (err) {
                return res.status(500).json({status: 'error', details: 'There was an error updating the server info.'});
            }

            var current = info[0];
            current.updateServerInfo(req.body.name, req.body.password, req.body.port, function(err, current) {
                if (err) {
                    res.status(500).json({status: 'error', details: 'There was an error updating the server info.'});
                    return;
                }
                return res.status(200).json(current);
            });

        });
    }).post(function(req, res) {
        if (req.body.password && req.body.port && req.body.name) {
            var next = new server(req.body);
            next.name = req.body.name;
            next.port = req.body.port;
            next.password = req.body.password;

            next.save(function(err, next) {
                if (err) {
                    return res.status(500).json({status: 'error', details: 'There was an error saving the server info.'});
                }
                return res.status(200).json(next);
            });
        } else {
            return res.status(400).json({status: 'error', details: 'Count not create server info; missing parameter.'});
        }
    });



    // *** MOTD routes

    router.route('/motd').get(function(req, res) {

        message.find(function (err, motd) {

            if (err) {
                res.status(500).json({status: 'error', info: err, details: 'There was an error loading homepage content.'});
                return
            }

            var current = motd[0];

            res.status(200).json(current);
        });

    }).put(function(req, res) {

        message.find(function(err, motd) {

            if (!motd || !req.body.message) {
                return res.status(400).json({status: 'error', details:  'Could not retrieve message or an updated message was not provided.'});
            }
            if (err) {
                return res.status(400).json({status: 'error', details: 'An error occurred when trying to update the message.'});
            }

            var current = motd[0];
            current.updateMessage(req.body.message, req.body.author, function(err, theCurrent) {
                if (err) {
                    return res.status(400).json({status: 'error', details: 'An error occurred when trying to update the message.'});
                } else {
                    return res.status(200).json(theCurrent);
                }
            });
        });
    }).post(function(req, res) {
        if (req.body.message && req.body.author) {
            var message = new daily(req.body);
            message.message = req.body.message;
            message.author = req.body.author;

            message.save(function(err, daily) {
                if (err) {
                    return res.status(500).json({status: 'error', details: 'There was an error saving the new message.'});
                }
                return res.status(200).json(daily);
            });
        } else {
            return res.status(400).json({status: 'error', details: 'Failed to create message, missing either the message body or the author of the post.'});
        }

    });


    app.use(router);

};
