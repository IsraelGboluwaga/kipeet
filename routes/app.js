const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const User = require('../models/user');

const appName = 'kipeet';


/* GET home page for unregistered users */
router.get('/', function (req, res, next) {
    let welcome_message = ' makes sure you have your secrets kept. Todos, memories, plans,\n' +
        '                    structures... name it! IN cases\n' +
        '                    of a lost or damaged device, guess who you could count on?';

    let pass = {
        title: appName,
        header: appName,
        welcome_message: welcome_message
    };

    res.render('index', pass);
});

//User's sign up
router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let phone = req.body.phone;

    let user = new User({
        username: username,
        password: password,
        email: email,
        phone: phone
    });

    user.save((err, doc) => {
        if (err)
            throw err;

        if (doc)
        res.redirect('/:user');
    });
});

//Get user's login here
router.get('/login', (req, res, next) => {
    let user_welcome = 'Welcome back! I kept all your stuff safe for you. Just the way you left it.';
    let pass = {
        header: appName,
        user_welcome: user_welcome
    };

    res.render('login', pass);
});

//Post user's login data for auth here then redirect to home page


//User's home
router.get('/:user', (req, res, next) => {
    res.render('user', {
        name: req.params.user,
        tasks: req.body.tasks
    })
});

//GET page to task
router.get('/addTask', (req, res, next) => {
    res.render('addTask');
});

/*POST tasks to user
*Task not yet uniquely connected to user */
router.post('/addTask', function (req, res, next) {
    let task = new Task({
        task: req.body.task,
    });

    //An async function to save
    task.save((err, doc) => {
        if (err)
            throw err;

        //If success
        if (doc)
            res.redirect('/:user');
    });
});

module.exports = router;
