const express = require('express');
const router = express.Router();

const Constants = require('../config/constants');
const Auth = require('../controller/authController');


/* GET home page for unregistered users */
router.get('/', (req, res) => {
    res.render('index', Constants.templateText);
});

router.get('/signup', (req, res) => {
    return res.redirect('/');
});

//User's sign up
router.post('/', Auth.register);

module.exports = router;
