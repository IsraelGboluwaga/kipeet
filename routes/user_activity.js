const express = require('express');
const router = express.Router();

const UserController = require('../controller/userController');
const helper = require('../config/helper');

//User's home
router.get('/:username', UserController.getUserHome);
router.get('/backyard/get/:user_id', helper.getUser);
module.exports = router;