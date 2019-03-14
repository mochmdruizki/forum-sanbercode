'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users', 'reputation',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users', 'reputation',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      }
    )
  }
};
