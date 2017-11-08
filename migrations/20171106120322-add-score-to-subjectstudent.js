'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn( 'SubjectStudents', 'Score', Sequelize.INTEGER);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn( 'SubjectStudents', 'Score', Sequelize.INTEGER);
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
