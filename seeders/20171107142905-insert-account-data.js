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

     return queryInterface.bulkInsert('Accounts', [
      {
        username: 'pandaman',
        password: '1234',
        StudentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'taigaman',
        password: '6789',
        StudentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
