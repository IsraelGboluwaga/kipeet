const express = require('express');
const router = express.Router();

const UserController = require('../controller/userController');
const helper = require('../config/helper');

//User's home
router.get('/:username', UserController.getUserHome);

module.exports = router;