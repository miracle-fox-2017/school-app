'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert('Students', [{
    //   first_name : 'Azhary',
    //   last_name : 'Amriy',
    //   email : 'azhary@mail.com',
    //   createdAt : new Date(),
    //   updatedAt : new Date()
    // },{
    //   first_name : 'Christian',
    //   last_name : 'Tobing',
    //   email : 'chris@mail.com',
    //   createdAt : new Date(),
    //   updatedAt : new Date()
    // },{
    //   first_name : 'Agus',
    //   last_name : 'Tinus',
    //   email : 'tinus@mail.com',
    //   createdAt : new Date(),
    //   updatedAt : new Date()
    // },{
    //   first_name : 'Syaiful',
    //   last_name : 'Anwar',
    //   email : 'ipunk@mail.com',
    //   createdAt : new Date(),
    //   updatedAt : new Date()
    // },{
    //   first_name : 'Amelia',
    //   last_name : 'Rahman',
    //   email : 'amelius@mail.com',
    //   createdAt : new Date(),
    //   updatedAt : new Date()
    // }], {});
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
