const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const check = require('../config/utils');
const user = require('../models/user');

let templateText = {
    header: constants.APP_NAME,
    user_welcome: constants.USER_WELCOME
};


//Get user's login here
router.get('/', (req, res, next) => {
    return res.render('login', templateText);
});

//Post user's login data for auth here then redirect to home page
router.post('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!check.email(email)) {
        templateText.error_message = constants.INVALID_EMAIL;
        return res.redirect('login');
    }

    if (!email && !password) {
        templateText.error_message = constants.EMPTY_PARAMS;
        return res.redirect('login')
    }

    user.statics.authenticate(email, password, (err) => {
        if (err) {
            console.log(err);
            return err;
        }

        req.session.userId = user._id;
        return res.redirect('/:username');
    })
});


module.exports = router;