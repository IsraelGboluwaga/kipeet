const Task = require('../models/task');

const getAllTasks = (req, res) => {
    return Task.find({user_id: req.session.userId}).sort([['created_at', 'desc']]).exec(
        (err, tasks) => {
            if (err)
                res.send(err);


            return tasks;
            // return res.json(tasks);
        }
    );
};

const addTask = (req, res, next) => {
    const user_id = req.session.userId,
        task_title = req.body.title,
        task_body = req.body.body;

    return Task.create({user_id, title: task_title, body: task_body}, (err, task) => {
        if (err)
            next(err);

        if (task) {
            return res.redirect(`/user/${req.params.username}`);
        }
    });
};

const deleteTask = (req, res, next) => {
    const task_id = req.params.task_id;
    return Task.remove({_id: task_id}, (err, deleted) => {
        if (err) {
            console.log('Here at rm err');
            next(err);
        }

        if (deleted)
            res.redirect(`/user/${req.params.username}`);

    });
    // return getAllTasks(req, res);
    // return res.redirect('/')
    // return res.redirect(`/user/${req.params.username}`);
};


const updateTask = (req, res, next) => {
    const task_id = req.params._id;
    return Task.findOneAndUpdate({_id: task_id}, (err, updated) => {
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