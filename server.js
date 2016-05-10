// dependencies
var express = require('express'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	path = require('path'),
	expressSession = require('express-session'),
	//requiring mongoose below
	hash = require('bcrypt-nodejs'),
	favicon = require('serve-favicon'),
	// path = require('path'),
	passport = require('passport'),
	localStrategy = require('passport-local' ).Strategy

var User = require('./server/Models/User.js')
var mongooseConfig = require('./server/Config/mongoose.js');
require('./server/Config/passport.js');



var port = process.env.PORT || 8000;
var routes = require('./server/Config/routes.js')

//invoke express, require mongoose.js, require routes
var app = express();

// same as require('mongoose');


//defining middleware
app.use(express.static(path.join(__dirname, './client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());

// app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err)
})

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

var debug = require('debug')('passport-mongo');


app.listen(port);
