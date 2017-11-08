'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
     'Teachers',
      'SubjectId',
      Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
     'Teachers',
      'SubjectId')
  }
};
