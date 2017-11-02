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

     return queryInterface.bulkInsert('Students', [
        {
          first_name: 'Akbar',
          last_name: 'Saharta',
          email: 'akbar@mail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'Jhon',
          last_name: 'Doe',
          email: 'jond@mail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'Sherlock',
          last_name: 'Holmes',
          email: 'sherlockh@mail.com',
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
    queryInterface.bulkDelete('Students', [
      { first_name :'Akbar'},
      { first_name :'Jhon'},
      { first_name :'Sherlock'}
    ])
  }
};
