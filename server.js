var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var express = require('express');
var router = express.Router();
app = express();

var vars = require('./config/vars.js');

// view engine setup
app.set('views', path.join(__dirname, '/public/components'));
app.set('view engine', 'jade');
app.locals.pretty = true; // pretty html

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(flash());

// Setup database
require('./config/db.js')(mongoose);
require('./models/User');
require('./models/DailyMessage');
require('./models/EventModels');
require('./models/ServerInfo');

require('./config/passport');

// Setup routes
// require('./routing/auth.js')(app);
require('./routing/userRoutes.js')(app);
require('./routing/homepageRoutes.js')(app);
require('./routing/eventpageRoutes.js')(app);
require('./routing/routes.js')(app);


var port = process.env.PORT || 1337;

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
