const Question = require('../models').Question;
const Answer = require('../models').Answer;

module.exports = {

  getById(req, res) {
    return Answer
      .findByPk(req.params.id, {})
      .then((answer) => {
        if (!answer) {
          return res.status(404).send({message: 'Answer not found'})
        }
        return res.status(200).send(answer)
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Question
      .findByPk(req.params.id, {})
      .then((question) => {
        if (!question) {
          res.status(404).json({message: 'Question not found'})
        } else {
          if (req.body.answer == null || req.body.answer == "") {
            res.status(400).json({message: 'Answer cannot blank'})
          } else {
            Answer
              .create({
                answer: req.body.answer,
                questionId: req.params.id,
                userId: req.currentUser.id
              })
              .then((answer) => res.status(201).json(answer))
              .catch((error) => res.status(400).json(error))
          }
        }
      })
      .catch((error) => res.status(400).json(error))
  },
  update(req, res) {
    return Answer
      .findByPk(req.params.id)
      .then((answer) => {
        if (!answer) {
          res.status(404).json({message: 'Answer not found'})
        } else {
          if (req.body.isApproved) { // check for isApproved==true update only
            Question
              .findByPk(answer.questionId)
              .then((question) => {
                if (question.status == true) {
                  res.status(400).json({message: `Question with id ${answer.questionId} already have approved answer`});
                } else {
                  answer
                    .update({isApproved: req.body.isApproved})
                    .then(() => {
                      question
                        .update({status: true})
                        .then(() => res.status(200).json(answer))
                        .catch((error) => res.status(400).json(error));
                    })
                    .catch((error) => res.status(400).json(error));
                }
              })
              .catch((error) => res.status(400).json(error));
          } else {
            answer
              .update({
                answer: req.body.answer || answer.answer
              })
              .then(() => res.status(200).json(answer))
              .catch((error) => res.status(400).json(error));
          }
        }
      })
      .catch((error) => res.status(400).json(error));
  },
  delete(req, res) {
    return Answer
      .findByPk(req.params.id)
      .then((answer) => {
        if (!answer) {
          res.status(404).json({message: 'Answer not found'})
        } else {
          if (answer.userId != req.currentUser.id) {
            res.status(400).json({message: 'User has no access to delete this answer'})
          } else {
            answer
              .destroy()
              .then(() => res.status(204).json())
              .catch((error) => res.status(400).json(error));
          }
        }
        
      })
      .catch((error) => res.status(400).json(error));
  }

};