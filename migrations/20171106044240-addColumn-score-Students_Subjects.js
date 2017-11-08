'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Students_Subjects', 'score', {type : Sequelize.INTEGER})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Students_Subjects', 'score')
  }
};
