const model = require('../models');
const Question = model.Question;
const Answer = model.Answer;
const User = model.User;
const VoteQuestion = model.VoteQuestion;

module.exports = {

  list(req, res) {
    return Question
      .findAll({
        // attributes: {
        //   include: [
        //     [model.sequelize.fn("COUNT", model.sequelize.col("voteQuestions.id")), "voteCount"]
        //   ]
        // }, /* it still return SequelizeDatabaseError */
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
      .then((questions) => res.status(200).json(questions))
      .catch((error) => res.status(400).json(error));
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
          res.status(404).json({message: 'Question not found'})
        } else {
          res.status(200).json(question)
        }
      })
      .catch((error) => res.status(400).json(error));
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
      .then((question) => res.status(201).json(question))
      .catch((error) => res.status(400).json(error))
  },
  update(req, res) {
    // 
  },
  delete(req, res) {
    return Question
      .findByPk(req.params.id)
      .then((question) => {
        if (!question) {
          res.status(404).json({message: 'Question not found'})
        } else {
          if (question.userId != req.currentUser.id) {
            res.status(401).json({message: 'Unauthorized'})
          } else {
            question
              .destroy()
              .then(() => res.status(204).json({message: 'Question successfully deleted'}))
              .catch((error) => res.status(400).json(error));
          }
        }
      })
      .catch((error) => res.status(400).send(error));
  },
  answer(req, res) {
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
  }

};