'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('Teachers', 'SubjectsId', Sequelize.INTEGER);
    queryInterface.addConstraint('Teachers', ['SubjectsId'], {
      type: 'FOREIGN KEY',
      name: 'SubjectsId',
      references: { //Required field
        table: 'Subjects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
     queryInterface.removeColumn( 'Teachers', 'SubjectId');
  }
};
