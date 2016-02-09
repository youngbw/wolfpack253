var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../app/models/user');

// Define routes used for authentication
module.exports = function(app, passport) {

    router.route('/login')
        .get(function(req, res) {
            res.render('login', { message: req.flash('error') });
        })
        .post(passport.authenticate('local', { successRedirect: '/',
                                               failureRedirect: '/login',
                                               failureFlash: 'Invalid username or password.' }));
    router.post('logout', function(req, res) {
        // TODO
    });
    router.route('/register')
        .get(function(req, res) {
            res.render('register', { message: req.flash('error') });
        })
        .post(function(req, res, next) {
            console.log('User registering...');
            User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
                if (err) {
                    console.log('Error while user register! - ' + err);
                    return res.render('register', { user : user, message: err.message });
                }
                console.log('User ' + req.body.username + ' registered!');

                res.redirect('/');
            });
        });

    app.use(router);
};
