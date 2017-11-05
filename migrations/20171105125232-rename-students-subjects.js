'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('Students-Subjects', 'Students_Subjects');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('Students_Subjects', 'Students-Subjects');
  }
};
