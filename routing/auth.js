var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var express = require('express');
var router = express.Router();

var vars = require('../config/vars');
var auth = jwt({secret: vars.secret, userProperty: 'payload'});

module.exports = function(app) {

    router.post('/register', function(req, res, next){
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message: 'Please fill out all fields'});
        }

        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }

            if (user) {
                return res.status(400).json({message: 'Username already taken.'});
            }
        })(req, res, next);

        var user = new User();

        user.username = req.body.username;
        user.setPassword(req.body.password)

        user.save(function (err){
            if(err){ return next(err); }

            return res.json({token: user.generateJWT()})
        });
    });
    router.post('/login', function(req, res, next) {
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message: 'Please fill out all fields'});
        }

        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }

            if (user) {
                return res.json({token: user.generateJWT()});
            } else {
                return res.status(401).json(info);
            }
        })(req, res, next);
    });

    app.use('/auth', router);
};
