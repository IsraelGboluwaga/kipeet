const express = require('express');
const router = express.Router();

const Constants = require('../config/constants');
const Auth = require('../controller/authController');
const UserController = require('../controller/userController');
const Authenticate = require('../controller/authController');



/* GET home page for unregistered users */
router.get('/', UserController.getSignIn, (req, res) => {
    res.render('index', Constants.templateText);
});

router.get('/signup', (req, res) => {
    return res.redirect('/');
});

//User's sign up
router.post('/', Auth.register);

// GET logout
router.get('/logout', Authenticate.logout);

module.exports = router;
