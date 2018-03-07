const express = require('express');
const router = express.Router();
const Constants = require('../config/constants');
const templateText = Constants.loginTemplate;
const Auth = require('../controller/authController');




//Get user's login here
router.get('/', (req, res) => {
    return res.render('login', templateText);
});

//Post user's login data for auth here then redirect to home page
router.post('/', Auth.login);


module.exports = router;