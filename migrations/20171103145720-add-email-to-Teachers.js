'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn( 'Teachers', 'email', Sequelize.STRING );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn( 'Teachers', 'email' );
  }
};
