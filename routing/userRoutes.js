var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');

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
                    res.json({success: true, status: 'success', details: createdUser});
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

    router.route('/api/users/:user_id')
        .put(function(req, res) {
            User.findByIdAndUpdate(req.params.user_id, {$set: req.body}, function(err, updatedUser){
                if (err) {
                    return res.json({status: 'error', success: false, details: err});
                }

                return res.json({success: true, status: 'success', details: updatedUser});
            });
        })
        .delete(function(req, res) {
            User.remove({_id: req.params.user_id}, function(err) {
                if (err) {
                    return new Error('Could not find ID to delete or something went wrong');
                }
                res.json({status: 'success', success: true});
            });
        });


    app.use(router);

};
