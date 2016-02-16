var express = require('express');
var router = express.Router();

module.exports = function(app) {

    router.get('/:component/:name', function(req, res) {
        var component = req.params.component;
        var name = req.params.name;
        res.render(component + '/' + name);
    });

    router.get('./directives/:name', function(req, res) {
        var name = req.params.name;
        res.render('publid/views/directives/' + name);
    });

    router.get('/login', function(req, res) {
        res.render('./login');
    });

    router.get('/register', function(req, res) {
        res.render('./register');
    });

    router.get('/guilds', function(req, res) {
        res.render('./index');
    });

    router.get('/', function(req, res) {
        res.render('index');
    });

    router.get('*', function(req, res) {
        res.render('index');
    });

    app.use(router);
};
