'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('Students', [
      {
        first_name : 'abdi',
        last_name : 'negara',
        createdAt : new Date(),
        updatedAt : new Date(),
        email : 'abdie@mail.com'
      },
      { first_name : 'Ismael',
        last_name : 'raja',
        createdAt : new Date(),
        updatedAt : new Date(),
        email : 'raja@ym.id'
      },
      { first_name : 'menggila',
        last_name : 'gilagila',
        createdAt : new Date(),
        updatedAt : new Date(),
        email : 'terkaing@kaing.com'
      },
      { first_name : 'Brooo',
        last_name : 'Bigboss',
        createdAt : new Date(),
        updatedAt : new Date(),
        email : 'sekolah@bigboss.go.id'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('Students', [
      {
        first_name : 'abdi',
        last_name : 'negara',
        email : 'abdie@mail.com'
      },
      { first_name : 'Ismael',
        last_name : 'raja',
        email : 'raja@ym.id'
      },
      { first_name : 'menggila',
        last_name : 'gilagila',
        email : 'terkaing@kaing.com'
      },
      { first_name : 'Brooo',
        last_name : 'Bigboss',
        email : 'sekolah@bigboss.go.id'
      },
    ], {});
  }
};
