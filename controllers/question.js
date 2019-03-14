const Question = require('../models').Question;
const User = require('../models').User;

module.exports = {

  list(req, res) {
    return Question
      .findAll({
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((questions) => res.status(200).send(questions))
      .catch((err) => res.status(400).send(err));
  },
  getById(req, res) {
    // 
  },
  add(req, res) {
    // 
  },
  update(req, res) {
    // 
  },

};