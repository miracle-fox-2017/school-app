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
    return queryInterface.bulkInsert('Students', [{
      first_name: 'Otong',
      last_name: 'Prime',
      email: 'otong.prime@mail.com'
    },
    {
      first_name: 'Robo',
      last_name: 'Cups',
      email: 'robo.cups@mail.com'
    },
    {
      first_name: 'Haji',
      last_name: 'Redha',
      email: 'haji.redha@mail.com'
    },
    {
      first_name: 'Noobs',
      last_name: 'Bingitz',
      email: 'noobs.bingitz@mail.com'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Students', null, {});
  }
};
