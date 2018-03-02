const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const hbs = require('hbs');

const appRoutes = require('./routes/index');
const activity = require('./routes/activity');
const login = require('./routes/login');
const logout = require('./routes/logout');

require('dotenv').config();
const app = express();

//Set db connection
mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;
const db_connection = mongoose.connection;
db_connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//Parsing the body on each request and giving access to data sent
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//For routing. I think it's good practice to have the app routing somewhere else
app.use('/', appRoutes);
app.use('/login', login);
app.use('/user', activity);
app.use('/logout', logout);

//use sessions for tracking logins
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
