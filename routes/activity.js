const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const User = require('../models/user');

let error;

//User's home
router.get('/:username', (req, res, next) => {
    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err)
                return next(err);

            if (!user) {
                error = new Error('Not Authorized');
                error.status = 403;
                return res.redirect('/login')
            } else {
                res.render('user', {
                    name: req.params.username,
                    taskNumber: req.body.tasks ? req.body.tasks.length : 0
                })
            }
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
            res.redirect('/:username');
    });
});

module.exports = router;