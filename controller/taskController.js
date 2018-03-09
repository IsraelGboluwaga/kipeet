const Task = require('../models/task');

const getAllTasks = (req, res, cb) => {
    Task.find({user_id: req.session.userId}, (err, tasks) => {
        if (err)
            res.send(err);

        let response = {
            task_length: tasks.length,
            tasks: tasks
        };

        cb(response);
    });
};

const addTask = (req, res, next) => {
    // const user_id = req.session.userId,
    const user_id = req.body.user_id,
        task_title = req.body.title,
        task_body = req.body.body;

    return Task.create({user_id, title: task_title, body: task_body}, (err, task) => {
        if (err)
            next(err);

        if (task) {
            // return getAllTasks(task);
            return res.json(task);
        }
    });
};

const deleteTask = (req, res, next) => {
    return Task.remove({_id: task_id}, (err, deleted) => {
        if (err)
            next(err);

        if (deleted) {
            // return getAllTasks(res)
        }
    });
};


const updateTask = (req, res, next) => {
    return Task.update({_id: req.params.task_id}, (err, updated) => {
        if (err)
            next(err);

        if (updated) {
            // return getAllTasks(res);
        }
    })
};

module.exports = {
    getAllTasks,
    addTask,
    deleteTask,
    updateTask
};