const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const Constants = require('../config/constants');
const  Auth = require('../controller/authController');
const UserController = require('../controller/userController');
const TaskController = require('../controller/taskController');



//User's home
router.get('/:username', UserController.getUserHome, (req, res) => {
    TaskController.getAllTasks(req, res, (taskObj) => {
        let dashboard = {
            title: Constants.constants.APP_NAME,
            tasks: taskObj.tasks,
            task_length: taskObj.task_length
        };

        res.render('user', dashboard);
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
router.get('/:username/logout', Auth.logout);


module.exports = router;