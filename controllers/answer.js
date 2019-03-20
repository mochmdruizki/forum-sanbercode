const Question = require('../models').Question;
const Answer = require('../models').Answer;
const User = require('../models').User;

module.exports = {

  list(req, res) {
    return Answer
      .findAll({
        order: [
          ['id', 'DESC']
        ],
        include: [{
          model: User,
          as: 'author'
        },
        {
          model: Question,
          as: 'question'
        }]
      })
      .then((answers) => res.status(200).send(answers))
      .catch((error) => res.status(400).send(error));
  },
  getById(req, res) {
    return Answer
      .findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'author'
        }]
      })
      .then((answer) => {
        if (!answer) {
          return res.status(404).send({message: 'Answer not found'})
        }
        return res.status(200).send(answer)
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    if ((req.body.answer == null || req.body.questionId == null) || (req.body.answer == "" || req.body.questionId == "")) {
      return res.status(400).json({message: 'Title and question cannot blank'});
    }
    return Answer
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        userId: req.currentUser.id
      })
      .then((answer) => res.status(201).send(answer))
      .catch((error) => res.status(400).send(error))
  },
  update(req, res) {
    // 
  },
  delete(req, res) {
    return Answer
      .findByPk(req.params.id)
      .then((answer) => {
        if (!answer) {
          return res.status(404).send({message: 'Answer not found'})
        }
        if (answer.userId != req.currentUser.id) {
          return res.status(400).json({message: 'User has no access to delete this answer'})
        }
        return answer
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

};