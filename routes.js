var express = require('express');
var router = express.Router();

module.exports = function(app) {

    router.get('/', function(req, res) {
        res.render('index.jade');
    });

    router.get('/login', function(req, res) {
        res.render('login.jade');
    });

    router.post('/authenticate', function(req, res) {
        // TODO handle authentication
        res.render('index.jade');
    });

    app.use(router);


    app.get('*', function(req, res) {

    	res.sendfile('./public/views/index.jade');

    });
};
