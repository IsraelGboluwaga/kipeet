const router = require('express').Router();
const taskLogic = require('../controller/taskController');


router.get('/tasks', taskLogic.getAllTasks);

router.post('/tasks/add', taskLogic.addTask);

router.delete('/tasks/delete/:task_id', taskLogic.deleteTask);

router.put('/tasks/update/:task_id', taskLogic.updateTask);

router.get('/tasks/edit/:task_id', taskLogic.getEditTask);

module.exports = router;