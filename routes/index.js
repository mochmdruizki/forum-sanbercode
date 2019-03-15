var express = require('express');
var router = express.Router();

const controller = require('../controllers');
const authController = controller.auth;
const userController = controller.user;
const questionController = controller.question;

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', questionController.list);

// Auth Router
router.post('/api/register', authController.register);

/* User Router */
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

// Question Router
router.get('/api/question', questionController.list);
router.get('/api/question/:id', questionController.getById);
router.post('/api/question', questionController.add);
router.put('/api/question/:id', questionController.update);
router.delete('/api/question/:id', questionController.delete);

module.exports = router;