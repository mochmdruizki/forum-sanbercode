const Question = require('../models').Question;
const User = require('../models').User;
const VoteQuestion = require('../models/').VoteQuestion;

module.exports = {

  list(req, res) {
    return Question
      .findAll({
        order: [
          ['id', 'DESC']
        ],
        include: [{
          model: User,
          as: 'author'
        },
        {
          model: VoteQuestion,
          as: 'voteQuestions'
        }
      ]
      })
      .then((questions) => res.status(200).send(questions))
      .catch((error) => res.status(400).send(error));
  },
  getById(req, res) {
    return Question
      .findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'author'
        },
        {
          model: VoteQuestion,
          as: 'voteQuestions'
        }
      ]
      })
      .then((question) => {
        if (!question) {
          return res.status(404).send({message: 'Question not found'})
        }
        return res.status(200).send(question)
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    if ((req.body.title == null || req.body.question == null) || (req.body.title == "" || req.body.question == "")) {
      return res.status(400).json({message: 'Title and question cannot blank'});
    }
    return Question
      .create({
        title: req.body.title,
        question: req.body.question,
        status: 'new',
        userId: req.currentUser.id
      })
      .then((question) => res.status(201).send(question))
      .catch((error) => res.status(400).send(error))
  },
  update(req, res) {
    // 
  },
  delete(req, res) {
    return Question
      .findByPk(req.params.id)
      .then((question) => {
        if (!question) {
          return res.status(404).send({message: 'Question not found'})
        }
        // if (question.userId != req.currentUser.id) {
        //   return res.status(400).json({message: 'User has no access to delete this question'})
        // }
        return question
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

};