const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/user');

/* GET home page for unregistered users */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Task Manager',
        header: 'My header',
        msg: 'Test message'
    });
});

//User's sign up
router.post('/', function (req, res, next) {
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

//User's login here
//
//
//

//User's home
router.get('/:user', function (req, res, next) {
    res.render('user', {
        name: req.params.user,
        tasks: req.body.tasks
    })
});

//GET page to task
router.get('/addTask', function (req, res, next) {
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
