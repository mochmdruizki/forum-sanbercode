'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    });
    Question.hasMany(models.Answer, {
      foreignKey: 'questionId',
      as: 'answers'
    });
    Question.hasMany(models.VoteQuestion, {
      foreignKey: 'questionId',
      as: 'voteQuestions'
    });
  };
  return Question;
};