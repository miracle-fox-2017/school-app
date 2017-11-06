'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn( 'Teachers', 'SubjectId', { type : Sequelize.INTEGER } );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn( 'Teachers', 'SubjectId');
  }
};
