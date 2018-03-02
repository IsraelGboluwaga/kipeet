const express = require('express');
const router = express.Router();

const Task = require('../models/task');


//User's home
router.get('/:username', (req, res, next) => {
    res.render('user', {
        name: req.params.username,
        taskNumber: req.body.tasks ? req.body.tasks.length : 0
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