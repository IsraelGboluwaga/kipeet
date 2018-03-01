const express = require('express');
const router = express.Router();

const User = require('../models/user');
const constants = require('../config/constants');
const check = require('../config/utils');
const appName = constants.APP_NAME;

let pass = {
    title: appName,
    header: appName,
    welcome_message: constants.WELCOME_MESSAGE
};

/* GET home page for unregistered users */
router.get('/', function (req, res, next) {
    res.render('index', pass);
});

//User's sign up
router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let phone = req.body.phone;


    if (!username && !password && !email && !phone) {
        console.log('1');
        pass.error_message = constants.EMPTY_PARAMS;
        res.redirect('/')
    }

    if (!check.email(email)) {
        console.log('2');
        pass.error_message = constants.INVALID_EMAIL;
        res.redirect('/')
    }

    if (!check.username(username)) {
        console.log('3');
        pass.error_message = constants.INVALID_USERNAME;
        res.redirect('/')
    }

    if (!check.phone(phone)) {
        console.log('4');
        pass.error_message = constants.INVALID_PHONE;
        res.redirect('/')
    }

    let params = {
        username: username,
        password: password,
        email: email,
        phone: phone
    };

    let newUser = new User(params);

    newUser.save((err, user, next) => {
        if (err) {
            console.log(err);
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
