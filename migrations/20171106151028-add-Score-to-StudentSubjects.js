'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn( 'StudentSubjects', 'Score', Sequelize.INTEGER );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn( 'StudentSubjects', 'Score' );
  }
};
