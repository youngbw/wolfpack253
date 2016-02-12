var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
app = express();

var vars = require('./config/vars.js');

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.locals.pretty = true; // pretty html

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// Setup database
require('./config/db.js')(mongoose);

// Setup routes
require('./routing/routes.js')(app);

var port = process.env.PORT || 1337;

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
