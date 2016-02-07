var morgan = require('morgan');
var path = require('path');
var express = require('express');
app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.locals.pretty = true; // pretty html

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.render('index.jade');
});

var port = process.env.PORT || 8080;

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
