var express = require('express');
var router = express.Router();

// Middlewares
const isLogin = require('../middlewares/auth');

const controller = require('../controllers');
const auth = controller.auth;
const user = controller.user;
const question = controller.question;
const answerController = controller.answer;
const voteQuestion = controller.voteQuestion;
const voteAnswer = controller.voteQuestion;

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', question.list);

// Auth Router
router.post('/api/register', auth.register);
router.post('/api/login', auth.login);

// User Router
router.get('/api/users', user.list);
router.get('/api/user/:id', user.getById);
router.put('/api/user/:id', user.update);
router.delete('/api/user/:id', user.delete);

// Question Router
router.get('/api/questions', question.list);
router.get('/api/questions/:id', question.getById);
router.post('/api/questions', isLogin, question.add);
router.put('/api/questions/:id', isLogin, question.update);
router.delete('/api/questions/:id', isLogin, question.delete);
router.post('/api/questions/:id/answer', question.answer);

// Answer Router
router.get('/api/answer', answerController.list);
router.get('/api/answer/:id', answerController.getById);
router.put('/api/answer/:id', isLogin, answerController.update);
router.delete('/api/answer/:id', isLogin, answerController.delete);

// VoteQuestion Router
router.post('/api/votequestion', isLogin, voteQuestion.vote);

// VoteAnswer Router
router.post('/api/voteanswer', isLogin, voteAnswer.vote);

module.exports = router;