const auth = require('./auth');
const user = require('./user'); /* for dev only, remove on production */
const question = require('./question');
const answer = require('./answer');
const voteQuestion = require('./votequestion');
const voteAnswer = require('./voteanswer');

module.exports = {
  auth,
  user,
  question,
  answer,
  voteQuestion,
  voteAnswer
};