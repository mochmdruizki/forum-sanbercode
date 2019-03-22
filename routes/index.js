var express = require('express');
var router = express.Router();

// Middlewares
const isLogin = require('../middlewares/auth');

const controller = require('../controllers');
const authController = controller.auth;
const userController = controller.user;
const questionController = controller.question;
const answerController = controller.answer;
const votequestionController = controller.votequestion;
const voteanswerController = controller.voteanswer;

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', questionController.list);

// Auth Router
router.post('/api/register', authController.register);
router.post('/api/login', authController.login);

// User Router
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

// Question Router
router.get('/api/question', questionController.list);
router.get('/api/question/:id', questionController.getById);
router.post('/api/question', isLogin, questionController.add);
router.put('/api/question/:id', isLogin, questionController.update);
router.delete('/api/question/:id', isLogin, questionController.delete);

// Answer Router
router.get('/api/answer', answerController.list);
router.get('/api/answer/:id', answerController.getById);
router.post('/api/answer', isLogin, answerController.add);
router.put('/api/answer/:id', isLogin, answerController.update);
router.delete('/api/answer/:id', isLogin, answerController.delete);

// VoteQuestion Router
router.post('/api/votequestion', isLogin, votequestionController.vote);

// VoteAnswer Router
router.post('/api/voteanswer', isLogin, voteanswerController.vote);

module.exports = router;