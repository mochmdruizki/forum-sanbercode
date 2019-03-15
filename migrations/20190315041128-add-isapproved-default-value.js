'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Answers', 'isApproved',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Answers', 'isApproved',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: null,
        allowNull: true,
      }
    )
  }
};
