'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', [
      {
        SubjectId : 3,
      },
      {
        SubjectId : 4,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers', [
      {
        SubjectId : 3,
      },
      {
        SubjectId : 4,
      },
    ], {});
  }
};
