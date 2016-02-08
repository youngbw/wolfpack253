var express = require('express');
var router = express.Router();

module.exports = function(app) {

    // Define 'GET' routes
    router.get('/', function(req, res) {
        res.render('index');
    });

    router.get('/login', function(req, res) {
        res.render('login');
    });

    router.get('/partials/:name', function(req, res) {
        var name = req.params.name;
        res.render('./partials/' + name);
    });

    router.get('*', function(req, res) {
        res.render('index');
    });

    // Define 'POST' routes
    router.post('/authenticate', function(req, res) {
        // TODO handle authentication
        res.render('index.jade');
    });

    app.use(router);
};
