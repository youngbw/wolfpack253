var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');
// var EventDate = mongoose.model('EventDate');

module.exports = function(app) {


    router.route('/api/users')
        .post(function(req, res) {
            if (req.body.username && req.body.password && req.body.admin) {
                var params = {username: req.body.username, password: req.body.password, admin: req.body.admin};

                var myUser = new User(params);
                myUser.save(function(err, createdUser) {

                    if (err) {
                        return res.json({status: 'error', statusCode: 500});
                    }
                    res.json({status: 'success', details: createdUser});
                    return;
                });

            } else {
                return new Error('Missing Parameter');
            }
    });

    router.route('/api/users/:name')
        .get(function(req, res) {
            User.findOne({ 'username': req.params.name }, function (err, user) {
              if (err) return res.json({status: 'error', message: 'could not find username'});

              return res.json({success: true, details: user, status: 'success'});
          });
        });



    app.use(router);

};
