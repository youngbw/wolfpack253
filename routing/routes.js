var express = require('express');
var router = express.Router();

module.exports = function(app) {

    // Define 'GET' routes
    router.get('/', function(req, res) {
        res.render('index');
    });

    router.get('/partials/:name', function(req, res) {
        var name = req.params.name;
        res.render('./partials/' + name);
    });

    router.get('*', function(req, res) {
        res.render('index');
    });

    app.use(router);
};
