var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
app = express();

var vars = require('./config/vars.js');

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.locals.pretty = true; // pretty html
app.use(cookieParser(vars.sessionSecret));
app.use(session({cookie: { maxAge: 60000 },
                resave: false,
                saveUninitialized: false,
                secret: vars.sessionSecret }));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// Passport config
var User = require('./app/models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup database
require('./config/db.js')(mongoose);

// Setup routes
require('./routing/auth.js')(app, passport);
require('./routing/routes.js')(app);

var port = process.env.PORT || 1337;

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
