'use strict';
module.exports = (sequelize, DataTypes) => {
  const VoteQuestion = sequelize.define('VoteQuestion', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  VoteQuestion.associate = function(models) {
    VoteQuestion.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    VoteQuestion.belongsTo(models.Question, {
      foreignKey: 'questionId'
    });
  };
  return VoteQuestion;
};