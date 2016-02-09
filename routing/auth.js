var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../app/models/user');

// Define routes used for authentication
module.exports = function(app, passport) {

    router.route('/login')
        .get(function(req, res) {
            res.render('login');
        })
        .post(passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: 'login'
        }));
    router.post('logout', function(req, res) {
        // TODO
    });
    router.route('/register')
        .get(function(req, res) {
            res.render('register');
        })
        .post(function(req, res, next) {
            var newUser = new User({ username: req.body.username });
            User.register(newUser, req.body.password, function(err, user) {
                if (err) {
                    return res.render('register', { user : user });
                }
                    res.redirect('/login');
            });
        });

    app.use(router);
};
