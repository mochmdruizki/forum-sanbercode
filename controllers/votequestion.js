const Question = require('../models').Question;
const User = require('../models').User;
const VoteQuestion = require('../models').VoteQuestion;

module.exports = {

  vote(req, res) {
    return Question
      .findByPk(req.body.questionId)
      .then((question) => {
        // check if user voted their own question
        if (req.currentUser.id == question.userId) {
          res.status(400).json({message: 'User can\'t vote their own question'});
        } else {
          VoteQuestion
            .findOne({
              where: {
                userId: req.currentUser.id,
                questionId: req.body.questionId,
                type: req.body.type
              }
            })
            .then((voteQuestion) => {
              // check if user already vote this question
              if (voteQuestion) {
                res.status(400).json({message: 'User can only voted a question once'});
              } else {
                // check if downvoter's reputation is >= 5
                User
                .findByPk(req.currentUser.id)
                .then((user) => {
                  if (req.body.type == "down" && user.reputation < 5) {
                    res.status(400).json({message: 'User\'s reputation must be 5 and above to downvote a question'})
                  } else {
                    VoteQuestion
                      .create({
                        userId: req.currentUser.id,
                        questionId: req.body.questionId,
                        type: req.body.type
                      })
                      .then( () => {
                        res.status(201).json({message: 'Vote successfully created'});
                        
                        // calculate voter reputation
                        if (req.body.type == 'up') {
                          user.update({reputation: user.reputation + 1})
                        } else {
                          user.update({reputation: user.reputation - 2})
                        }
                        
                        // calculate author reputation
                        User
                          .findByPk(question.userId)
                          .then((user) => {
                            if (req.body.type == 'up') {
                              user.update({reputation: user.reputation + 2})
                            } else {
                              user.update({reputation: user.reputation - 1})
                            }
                            
                          })
                          .catch((error) => res.status(400).json(error))
                      })
                      .catch((error) => res.status(400).json(error))
                  }
                })
                .catch((error) => res.status(400).json(error))
              }
            })
            .catch((error) => res.status(400).json(error))
        }
      })
      .catch((error) => res.status(400).json(error))
    
  },

};