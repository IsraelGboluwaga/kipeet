const Task = require('../models/task');
const Constants = require('../config/constants').constants;
const helper = require('../config/helper');

const getAllTasks = (req, res) => {
    return Task.find({user_id: req.session.userId}).sort([['created_at', 'desc']]).exec(
        (err, tasks) => {
            if (err)
                res.send(err);

            return tasks;
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
            return res.json(task);
        }
    });
};

const deleteTask = (req, res, next) => {
    const task_id = req.params.task_id;
    return Task.remove({_id: task_id}, (err, deleted) => {
        if (err) {
            next(err);
        }

        if (deleted)
            res.redirect(`/user/${req.params.username}`);
    });
};


const updateTask = (req, res, next) => {
    let update = {
      title: req.body.title,
      body: req.body.body
    };

    return Task.findByIdAndUpdate(req.params.task_id, update, {new: true}, (err, updated) => {

        if (err) {
            next(err);
        }

        if (updated) {
            return res.redirect(`/`);
        }
    })
};


const getEditTask = (req, res, next) => {
    //Get task
    return Task.findOne({_id: req.params.task_id, user_id: req.session.userId}, (err, task) => {
        if (err)
            return next(err);

        if (task)
            return task;
    })
        .then((resp) => {
            //Get user
            helper.getUser(req, res, next, resp.user_id)
                .then((data) => {
                    let frontend_data = {
                        title: Constants.APP_NAME,
                        username: data[0].username,
                        task: resp
                    };
                    return res.render('edittask', frontend_data);
                })
        })
        .catch((err) => {
            next(err);
        })

};


module.exports = {
    getAllTasks,
    addTask,
    deleteTask,
    updateTask,
    getEditTask,
};