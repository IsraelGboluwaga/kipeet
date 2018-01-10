var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SimpleApp' });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addTask', function (req, res, next) {
    var task = req.body.message;
    res.redirect('/', {task: task});
});

router.get('/tasks', function (req, res, next) {
    res.render('index');
});

module.exports = router;
