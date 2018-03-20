const auth = require('../config/auth');
const taskController = require('./taskController');
const Constants = require('../config/constants').constants;
const helper = require('../config/helper');

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
    auth.validateLoggedInUser(req, res, next)
        .then((user) => {
            if (user) {
                taskController.getAllTasks(req, res)
                    .then((resp) => {
                        return res.render('user', {
                            title: Constants.APP_NAME,
                            username: user.username,
                            task_length: resp.length,
                            tasks: resp

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


module.exports = {
    getSignIn,
    getUserHome
};