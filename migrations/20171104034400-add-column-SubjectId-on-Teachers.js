'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Teachers', 'SubjectId', { type: Sequelize.INTEGER })
    .then(()=>{
      return queryInterface.addConstraint('Teachers', ['SubjectId'], { 
        type: 'FOREIGN KEY',
        references: { //Required field
          table: 'Subjects',
          field: 'id'
          }
        }
      )
      
    })
    
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
