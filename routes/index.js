const express = require('express');
const router = express.Router();

const User = require('../models/user');
const constants = require('../config/constants');
const check = require('../config/utils');
const auth = require('../controller/auth');

const appName = constants.APP_NAME;

let templateText = {
    title: appName,
    header: appName,
    welcome_message: constants.WELCOME_MESSAGE
};

/* GET home page for unregistered users */
router.get('/', (req, res) => {
    res.render('index', templateText);
});

router.get('/signup', (req, res) => {
   return res.redirect('/');
});

//User's sign up
router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;


    if (!username && !password && !email && !phone) {
        templateText.error_message = constants.EMPTY_PARAMS;
        return res.redirect('/')
    }

    if (!check.email(email)) {
        templateText.error_message = constants.INVALID_EMAIL;
        return res.redirect('/')
    }

    if (!check.username(username)) {
        templateText.error_message = constants.INVALID_USERNAME;
        return res.redirect('/')
    }

    if (!check.phone(phone)) {
        templateText.error_message = constants.INVALID_PHONE;
        return res.redirect('/')
    }

    const params = {
        username: username,
        password: password,
        email: email,
        phone: phone
    };

    const newUser = new User(params);

    if (auth.userExists(newUser)) {
        if (auth.usernameExists(newUser)) {
            templateText.error_message = constants.USERNAME_ALREADY_EXISTS;
        }
        else if (auth.emailExists(newUser)) {
            templateText.error_message = constants.EMAIL_ALREADY_EXISTS;
        }
        else if (auth.phoneExists(newUser)) {
            templateText.error_message = constants.PHONE_ALREADY_EXISTS
        }
        else {
            templateText.error_message = constants.ALREADY_REGISTERED_USER;
        }

        return res.redirect('/')
    }

    newUser.save((err, user) => {
        if (err)
            return JSON.stringify(err);

        if (user) {
            req.session = {
                userId: user._id
            };
            console.log(req.session.userId);
        }

        return res.redirect(`/user/${user.username}`);
    });
});


module.exports = router;
