'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
     queryInterface.addColumn( 'Students', 'last_name', Sequelize.STRING );
     queryInterface.addColumn( 'Students', 'email', Sequelize.STRING );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn( 'Students', 'last_name' );
    queryInterface.removeColumn( 'Students', 'email' );
  }
};
