const express = require('express');
const router = express.Router();

const User = require('../models/user');
const constants = require('../config/constants');
const check = require('../config/utils');
const appName = constants.APP_NAME;

const templateText = {
    title: appName,
    header: appName,
    welcome_message: constants.WELCOME_MESSAGE
};

/* GET home page for unregistered users */
router.get('/', function (req, res, next) {
    res.render('index', templateText);
});

//User's sign up
router.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;


    if (!username && !password && !email && !phone) {
        templateText.error_message = constants.EMPTY_PARAMS;
        res.redirect('/')
    }

    if (!check.email(email)) {
        templateText.error_message = constants.INVALID_EMAIL;
        res.redirect('/')
    }

    if (!check.username(username)) {
        templateText.error_message = constants.INVALID_USERNAME;
        res.redirect('/')
    }

    if (!check.phone(phone)) {
        templateText.error_message = constants.INVALID_PHONE;
        res.redirect('/')
    }

    const params = {
        username: username,
        password: password,
        email: email,
        phone: phone
    };

    let newUser = new User(params);

    newUser.save((err, user, next) => {
        if (err) {
            JSON.stringify(err);
            return next(err);
        }

        if (user)
            req.session = {
                userId: user._id
            };

        res.redirect(`/user/${user.username}`);
    });
});

module.exports = router;
