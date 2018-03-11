const express = require('express');
const router = express.Router();

const UserController = require('../controller/userController');


//User's home
router.get('/:username', UserController.getUserHome);
router.get('/backyard/get/:user_id', UserController.getUser);
module.exports = router;