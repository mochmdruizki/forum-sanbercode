'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Answer.belongsTo(models.Question, {
      foreignKey: 'questionId'
    });
    Answer.hasMany(models.VoteAnswer, {
      foreignKey: 'answerId',
      as: 'vote_answers'
    });
  };
  return Answer;
};