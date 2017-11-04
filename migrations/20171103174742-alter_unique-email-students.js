'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Students', ['email'], {
      type : 'unique',
      name : 'unique_students_email'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Students', "unique_students_email")
  }
};
