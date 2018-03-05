const express = require('express');
const router = express.Router();
const Constants = require('../config/constants');
const templateText = Constants.loginTemplate;
const Authenticate = require('../controller/auth');




//Get user's login here
router.get('/', (req, res, next) => {
    return res.render('login', templateText);
});

//Post user's login data for auth here then redirect to home page
router.post('/', Authenticate.login);


module.exports = router;