'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('StudentSubjects', 'createdAt',
      {
        allowNull: false,
        type: Sequelize.DATE
      })
    .then(()=>{
      queryInterface.addColumn('StudentSubjects', 'updatedAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        })
        .then(()=>{
          
        })
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
