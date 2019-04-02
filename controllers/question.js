const model = require('../models');
const Question = model.Question;
const Answer = model.Answer;

module.exports = {

  list(req, res) {
    return Question
      .findAll({
        // attributes: {
        //   include: [
        //     [model.sequelize.fn("COUNT", model.sequelize.col("votes.id")), "voteCount"]
        //   ]
        // }, /* it still return SequelizeDatabaseError */
        order: [['id', 'DESC']]
      })
      .then((questions) => res.status(200).json(questions))
      .catch((error) => res.status(400).json(error));
  },
  getById(req, res) {
    // return res.status(404).json({message: 'Question not found'});
    return Question
      .findByPk(req.params.id, {
        include: [{model: Answer, as: 'answers'}]
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
    if ((req.body.title == null || req.body.description == null) || (req.body.title == "" || req.body.description == "")) {
      return res.status(400).json({message: 'Title and description cannot blank'});
    }
    return Question
      .create({
        title: req.body.title,
        description: req.body.description,
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
  }

};