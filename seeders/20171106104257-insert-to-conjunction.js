'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.addColumn('StudentSubjects', 'score', {type:Sequelize.INTEGER})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('StudentSubjects', 'score')
  }
};
