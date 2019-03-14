'use strict';
module.exports = (sequelize, DataTypes) => {
  const VoteAnswer = sequelize.define('VoteAnswer', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  VoteAnswer.associate = function(models) {
    VoteAnswer.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    VoteAnswer.belongsTo(models.Answer, {
      foreignKey: 'answerId'
    });
  };
  return VoteAnswer;
};