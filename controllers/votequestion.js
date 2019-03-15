const Question = require('../models').Question;
const User = require('../models').User;
const VoteQuestion = require('../models').VoteQuestion;

module.exports = {

  vote(req, res) {
    return VoteQuestion
      .findOne({
        where: {
          userId: req.body.userId,
          questionId: req.body.questionId,
          type: req.body.type
        }
      })
      .then((votequestion) => {
        if (votequestion) {
          res.status(400).json({error: 'This user already voted up question'});
        } else {
          VoteQuestion
            .create({
              userId: req.body.userId,
              questionId: req.body.questionId,
              type: req.body.type
            })
            .then( 
              (votequestion) => {
                // get voter, add 1 reputation
                User
                  .findByPk(req.body.userId)
                  .then((user) => user.update({reputation: user.reputation + 1}))
                  .catch((error) => res.status(400).send(error))
                // get author of question, add 2 reputation if upvote
                Question
                  .findByPk(votequestion.questionId, {
                    include: [{
                      model: User,
                      as: 'author'
                    }]
                  })
                  .then((question) => {
                    if (req.body.type == 'up') {
                      question.author.update({reputation: question.author.reputation + 2})
                    } else {
                      question.author.update({reputation: question.author.reputation - 1})
                    }
                  })
                  .catch((error) => res.status(400).send(error))
                res.status(201).send(votequestion)
              }
            )
            .catch((error) => res.status(400).send(error))
        }
      })
      .catch((error) => res.status(400).send(error))
    
  },

};