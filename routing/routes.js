var express = require('express');
var router = express.Router();

module.exports = function(app) {

    router.get('/:component/directives/:name', function(req, res) {
        var component = req.params.component;
        var name = req.params.name;
        res.render(component + '/directives/' + name);
    });

    router.get('/:component/:name', function(req, res) {
        var component = req.params.component;
        var name = req.params.name;
        res.render(component + '/' + name);
    });

    router.get('*', function(req, res) {
        res.render('index');
    });

    app.use(router);
};
