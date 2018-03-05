const express = require('express');
const router = express.Router();

const Constants = require('../config/constants');
const Authenticate = require('../controller/auth');


/* GET home page for unregistered users */
router.get('/', (req, res) => {
    res.render('index', Constants.templateText);
});

router.get('/signup', (req, res) => {
    return res.redirect('/');
});

//User's sign up
router.post('/', Authenticate.register);

module.exports = router;
