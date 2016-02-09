var express = require('express');
var router = express.Router();

// Define routes used for authentication
module.exports = function(app) {

    router.post('login', function(req, res) {
        // TODO
    });
    router.post('logout', function(req, res) {
        // TODO
    });
    router.post('signup', function(req, res) {
        // TODO
    });

    app.use('/auth', router);
};
