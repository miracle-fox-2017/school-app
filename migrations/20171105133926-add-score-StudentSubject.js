'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
     'StudentSubjects',
      'score',
      Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'StudentSubjects',
      'score')
  }
};
