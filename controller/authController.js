const Utils = require('../config/Utils');
const User = require('../models/user');
const ConstantClass = require("../config/constants");
const Constants = ConstantClass.constants;
const ResponseMessages = ConstantClass.responseMessages;
let Figures = ConstantClass.figures;
let templateText = require('../config/constants').templateText;
let loginTemplate = require('../config/constants').loginTemplate;


const register = (req, res) => {
    const username = req.body.username,
        password = req.body.password,
        passwordConf = req.body.passwordConf,
        email = req.body.email,
        phone = req.body.phone;

    let err;

    if (password.length < Figures.MIN_PASSWORD_LENGTH || passwordConf.length < Figures.MIN_PASSWORD_LENGTH) {
        err = new Error(Constants.MIN_PASSWORD_LENGTH);
        err.status = 400;
        templateText.error_message = err.message;
        return res.redirect('/')
    }

    if (!username && !password && !email && !phone) {
        err = new Error(Constants.EMPTY_PARAMS);
        err.status = 400;
        templateText.error_message = err.message;
        return res.redirect('/')
    }

    if (password !== passwordConf) {
        err = new Error(Constants.PASSWORDS_DONT_MATCH);
        err.status = 400;
        templateText.error_message = err.message;
        return res.redirect('/')
    }
    if (!username || !Utils.check.username(username)) {
        err = new Error(Constants.INVALID_USERNAME);
        err.status = 400;
        templateText.error_message = err.message;
        return res.redirect('/')
    }
    if (!password) {
        err = new Error(Constants.PASSWORD_CANNOT_BE_EMPTY);
        err.status = 400;
        templateText.error_message = err.message;
        return res.redirect('/');
    }
    if (!username || !Utils.check.email(email)) {
        err = new Error(Constants.INVALID_EMAIL);
        err.status = 400;
        templateText.error_message = err.message;
        return res.redirect('/')
    }
    if (!phone || !Utils.check.phone(phone)) {
        err = new Error(Constants.INVALID_PHONE);
        err.status = 400;
        templateText.error_message = err.message;
        return res.redirect('/')
    }
    const params = {
        username,
        password,
        email,
        phone
    };

    Utils.userExists(params).then((err, resp) => {
        if (err) {
            templateText.error_message = JSON.stringify(err);
            return res.redirect('/')
        }

        if (resp) {
            err = new Error(Constants.ALREADY_REGISTERED_USER);
            err.status = 400;
            templateText.error_message = err.message;
            return res.redirect('/')
        }
        const newUser = new User(params);

        newUser.save((err, user) => {
            if (err) {
                templateText.error_message = Constants.ALREADY_REGISTERED_USER;
                return res.redirect('/');
            }

            if (user) {
                req.session.userId = user._id;
            }
            return res.redirect(`/users/${user.username}`);
        });

    }).catch(() => {
        res.status(400);
        templateText.error_message = Constants.ERROR_OCCURRED;
        return res.redirect('/');
    });
};

const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let err;

    if (!email && !password) {
        err = new Error(Constants.EMPTY_PARAMS);
        err.status = 400;
        loginTemplate.error_message = err.message;
        return res.redirect('/login')
    }

    if (!Utils.check.email(email)) {
        err = new Error(Constants.INVALID_EMAIL);
        err.status = 400;
        loginTemplate.error_message = err.message;
        return res.redirect('/login');
    }

    User.authenticate(email, password, (err, user) => {
        if (err) {
            loginTemplate.error_message = err.message;
            return res.redirect('/login');
        }

        if (user) {
            req.session.userId = user._id;
            return res.redirect(`/user/${user.username}`);
        }
    })
};

const logout = (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err)
                return err;
            return res.redirect('/login');

        });
    } else {
        return res.redirect('/login')
    }
};

const validateLoggedInUser = (req, res, next) => {
    return User.findOne(
        {
            _id: req.session.userId,
            username: req.params.username
        },
        (err, user) => {
            if (err) {
                next(err);
            }

            if (!user) {
                return res.redirect('/login');
            } else {
                return user;
            }
        });
};

const preventReloginOrSignup = (req, res, next) => {
    if (req.session.userId) {
        return User.findById(req.session.userId, (err, user) => {
            if (err) {
                next(err);
            }

            if (user) {
                return user;
            } else {
                return next();
            }
        });
    }

    return new Promise((resolve, reject) => {
        next();
    })
};

module.exports = {
    register,
    login,
    logout,
    validateLoggedInUser,
    preventReloginOrSignup
};