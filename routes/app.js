const express = require('express');
const router = express.Router();
const Task = require('../models/task');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task Manager', msg: 'Add \'em here' });
});

//GET page to task
router.get('/addTask', function (req, res, next) {
    res.render('addTask');
});

//POST tasks to user
//Task not yet uniquely connected to user
router.post('/addTask', function (req, res, next) {
    let task = new Task({
        task: req.body.task,
    });

    task.save((err) => {
        if (err)
            throw err;

        res.redirect('/addTask');
    });
});

module.exports = router;
