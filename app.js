const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const hbs = require('hbs');

const appRoutes = require('./routes/index');
const activity = require('./routes/activity');
const login = require('./routes/login');
const taskApi = require('./routes/taskApi');

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
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Enable CORS from client-side
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST,PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//use sessions for tracking logins
let session_data =
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {},
        maxAge: 3600000,
        store: new MongoStore({
            mongooseConnection: db_connection
        })
    };

app.use(session(session_data));

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    session_data.cookie.secure = true; // serve secure cookies
}

//For routing. I think it's good practice to have the app routing somewhere else
app.use('/health', (req, res) => {
    return res.json({
        status: 'Up',
        data: 'O sha pran pran'
    })
});
app.use('/', appRoutes);
app.use('/login', login);
app.use('/user', activity);
app.use('/api/', taskApi);
app.get('*', function (req, res) {
    res.status(404);
    res.render('404');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
