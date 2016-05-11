var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');
var Admin = mongoose.model('AdminRequests');

module.exports = function(app) {


    router.route('/api/users')
        .post(function(req, res) {
            if (req.body.username && req.body.password) {
                var params = {username: req.body.username, password: req.body.password, admin: req.body.admin};

                var oldUser = User.findOne({'username': req.body.username}, 'username', function(err, user) {
                    if (err) {
                        return res.status(500).json({details: 'There was an erroring checking your username.'});
                    } else if (user) {
                        return res.status(400).json({details: 'That username is already in use.'});
                    } else {
                        var myUser = new User(params);
                        myUser.save(function(err, createdUser) {

                            if (err) {
                                return res.status(500).json({status: 'error', statusCode: 500, details: 'There was an error saving your new account.'});
                            }
                            return res.status(200).json({success: true, status: 'success', details: createdUser});
                        });
                    }
                });

            } else {
                return res.status(400).json({details: 'You need to provide both a unique username and a password.'})
            }
    });

    router.route('/api/users/:name')
        .get(function(req, res) {
            User.findOne({ 'username': req.params.name }, function (err, user) {
              if (err) {
                  return res.status(500).json({status: 'error', details: 'Could not locate a user with that username.'});
              }
              return res.status(200).json({success: true, details: user, status: 'success'});
          });
        });

    router.route('/api/users/:user_id')
        .put(function(req, res) {
            User.findByIdAndUpdate(req.params.user_id, {$set: req.body}, function(err, updatedUser){
                if (err) {
                    return res.status(500).json({status: 'error', success: false, details: 'An error occurred when updating the user.'});
                }

                return res.status(200).json({success: true, status: 'success', details: updatedUser});
            });
        })
        .delete(function(req, res) {
            User.remove({_id: req.params.user_id}, function(err) {
                if (err) {
                    return res.status(500).json({details: 'Unable to delete the user at this time.'})
                }
                res.status(200).json({status: 'success', success: true});
            });
        });


    router.route('/api/admin').get(function(req, res) {
        Admin.find(function(err, requests) {
            if (err) {
                return res.status(500).json({details: 'There was an error retrieving the admin requests.'})
            }

            return res.status(200).json({success: true, details: requests});
        });
    })
    .post(function(req, res) {
        var admin = new Admin();
        if (req.body.username) {
            admin.username = req.body.username;
            admin.save(function(err, theAdmin) {
                if (err) {
                    return res.status(500).json({details: 'An error occurred when creating your admin request. You can still login with the account.'});
                }

                return res.status(200).json({success: true, details: theAdmin});
            });
        } else {
            return res.status(400).json({details: 'A username is required.'});
        }
    });

    router.route('/api/users/:current_admin_id/admin/:request_admin_id')
        .put(function(req, res) {
            // Check that the current user is an Admin
            User.findOne({_id: req.params.current_admin_id}, function(err, user) {
                if (!err && user.admin) {
                    User.findOneAndUpdate({_id: request_admin_id}, function(err, requestUser) {
                        if (!err) {
                            AdminRequest.findOneAndUpdate({username: requestUser.username}, {$set: {approved: req.body.decision, approvedBy: user.username}}, {new: true}, function(err, adminrequest) {
                                if (!err) {
                                    return res.status(200).json({details: adminrequest});
                                }
                            });
                        }
                    });
                }
            });
            return res.status(500).json({details: 'There was an error updating the user'});
        });

    app.use(router);

};
