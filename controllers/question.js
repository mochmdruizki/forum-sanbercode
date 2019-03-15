const Question = require('../models').Question;
const User = require('../models').User;

module.exports = {

  list(req, res) {
    return Question
      .findAll({})
      .then((questions) => res.status(200).send(questions))
      .catch((error) => res.status(400).send(error));
  },
  getById(req, res) {
    return Question
      .findByPk(req.params.id, {})
      .then((question) => {
        if (!question) {
          return res.status(404).send({message: 'Question not found'})
        }
        return res.status(200).send(question)
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Question
      .create({
        title: req.body.title,
        question: req.body.question,
        userId: 9
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
        return question
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

};