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
                res.json({status: 'error', info: err})
                return;
            }

            res.json(info);
            return;

        });
    }).put(function(req, res) {
        server.find(function(err, info) {
            if (!info || !req.body.name || !req.body.port || !req.body.password) {
                return new Error('Invalid Request, missing parameters');
            }
            if (err) {
                res.json({status: 'error', info: err});
                return;
            }

            var current = info[0];
            current.updateServerInfo(req.body.name, req.body.password, req.body.port, function(err, current) {
                if (err) {
                    res.json({status: 'error', info: err});
                    return;
                }
                return res.json(current);
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
                    res.json({status: 'error', info: err});
                    return;
                }
                res.json(next);
            });
        }
    });



    // *** MOTD routes

    router.route('/motd').get(function(req, res) {

        message.find(function (err, motd) {

            if (err) {
                res.json({status: 'error', info: err});
                return
            }

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

        if (req.body.message && req.body.author) {
            var message = new daily(req.body);
            message.message = req.body.message;
            message.author = req.body.author;

            message.save(function(err, daily) {
                if (err) return err;
                res.json(daily);
            });
        }

    });


    app.use(router);

};
