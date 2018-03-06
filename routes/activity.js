const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const User = require('../models/user');
const Authenticate = require('../controller/auth');

//User's home
router.get('/:username', (req, res, next) => {

    User.findOne(
        {
            _id: req.session.userId,
            username: req.params.username
        },
        (err, user) => {
            if (err) {
                return res.redirect('/login');
            }

            if (!user) {
                next();
            } else {
                res.render('user', {
                    name: req.params.username,
                    taskNumber: req.body.tasks ? req.body.tasks.length : 0
                })
            }
        });
});

//GET page to task
router.get('/:username/addTask', (req, res, next) => {
    res.render('addTask');
});

/*POST tasks to user
*Task not yet uniquely connected to user */
router.post('/:username/addTask', function (req, res, next) {
    let task = new Task({
        task: req.body.task,
    });

    //An async function to save
    task.save((err, doc) => {
        if (err)
            throw err;

        //If success
        if (doc)
            res.redirect('/:username');
    });
});


// GET logout
router.get('/:username/logout', Authenticate.logout);


module.exports = router;