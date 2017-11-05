'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn( 'Teachers', 'Subject_Id', { type : Sequelize.INTEGER } );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn( 'Teachers', 'Subject_Id');
  }
};
