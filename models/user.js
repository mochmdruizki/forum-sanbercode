'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    reputation: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, {
      foreignKey: 'userId',
      as: 'questions'
    });
    User.hasMany(models.Answer, {
      foreignKey: 'userId',
      as: 'answers'
    });
    User.hasMany(models.VoteQuestion, {
      foreignKey: 'userId',
      as: 'vote_questions'
    });
    User.hasMany(models.VoteAnswer, {
      foreignKey: 'userId',
      as: 'vote_answers'
    });
  };
  return User;
};