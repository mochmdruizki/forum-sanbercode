const Answer = require('../models').Answer;
const User = require('../models').User;
const VoteAnswer = require('../models').VoteAnswer;

module.exports = {

  vote(req, res) {
    return Answer
      .findByPk(req.body.answerId)
      .then((answer) => {
        // check if user voted their own answer
        if (req.currentUser.id == answer.userId) {
          res.status(400).json({message: 'User can\'t vote their own answer'});
        } else {
          VoteAnswer
            .findOne({
              where: {
                userId: req.currentUser.id,
                answerId: req.body.answerId,
                type: req.body.type
              }
            })
            .then((voteAnswer) => {
              // check if user already vote this answer
              if (voteAnswer) {
                res.status(400).json({message: 'User can only voted an answer once'});
              } else {
                // check if downvoter's reputation is >= 5
                User
                .findByPk(req.currentUser.id)
                .then((user) => {
                  if (req.body.type == "down" && user.reputation < 5) {
                    res.status(400).json({message: 'User\'s reputation must be 5 and above to downvote an answer'})
                  } else {
                    VoteAnswer
                      .create({
                        userId: req.currentUser.id,
                        answerId: req.body.answerId,
                        type: req.body.type
                      })
                      .then( () => {
                        res.status(201).json({message: 'Vote successfully created'});
                        // calculate voter reputation
                        User
                          .findByPk(req.currentUser.id)
                          .then((user) => {
                            if (req.body.type == 'up') {
                              user.update({reputation: user.reputation + 1})
                            } else {
                              user.update({reputation: user.reputation - 2})
                            }
                            
                          })
                          .catch((error) => res.status(400).send(error))
                        
                        // calculate author reputation
                        User
                          .findByPk(answer.userId)
                          .then((user) => {
                            if (req.body.type == 'up') {
                              user.update({reputation: user.reputation + 2})
                            } else {
                              user.update({reputation: user.reputation - 1})
                            }
                            
                          })
                          .catch((error) => res.status(400).send(error))
                      })
                      .catch((error) => res.status(400).send(error))
                  }
                })
                .catch((error) => res.status(400).send(error))
              }
            })
            .catch((error) => res.status(400).send(error))
        }
      })
      .catch((error) => res.status(400).send(error))
    
  },

};