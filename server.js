var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var express = require('express');
app = express();

var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.locals.pretty = true; // pretty html

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// Setup routes
require('./routing/auth.js')(app);
require('./routing/routes.js')(app);

// Setup database
require('./config/db.js')(mongoose);

var port = process.env.PORT || 8080;

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
