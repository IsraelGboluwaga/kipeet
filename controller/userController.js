const auth = require('../config/auth');
const taskController = require('./taskController');
const Constants = require('../config/constants').constants;
const User = require('../models/user');


const getSignIn = (req, res, next) => {
    auth.preventReloginOrSignup(req, res, next)
        .then((user) => {
            if (user) {
                return res.redirect(`/user/${user.username}`);
            }

            return next();
        })
        .catch((error) => {
            return error;
        })
};

const getUserHome = (req, res, next) => {
    console.log('getUserHome');
    auth.validateLoggedInUser(req, res, next)
        .then((user) => {
            if (user) {
                taskController.getAllTasks(req, res)
                    .then((resp) => {
                        getUser(req, res, next, resp[0].user_id)
                            .then((data) => {
                                return res.render('user', {
                                    title: Constants.APP_NAME,
                                    username: data[0].username,
                                    task_length: resp.length,
                                    tasks: resp
                                });
                            });

                    });
            } else {
                return res.redirect('/login');
            }
        })
        .catch((error) => {
            return next(error);
        });
};

const getUser = (req, res, next, user_id) => {
    return User.find({_id: user_id}, //req.params.user_id},
        (err, user) => {
            if (err) {
                return next(err);
            }

            if (user) {
                return user;
            }
        }
    );
};

module.exports = {
    getSignIn,
    getUserHome,
    getUser
};