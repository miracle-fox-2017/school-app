'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('StudentSubjects', [{
      StudentId : 1,
      SubjectId : 1,
      createdAt    : new Date(),
      updatedAt    : new Date(),
    }, {
      StudentId : 2,
      SubjectId : 1,
      createdAt    : new Date(),
      updatedAt    : new Date(),
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('StudentSubjects', [{
      StudentId : 1,
      SubjectId : 1,
    }, {
      StudentId : 2,
      SubjectId : 1,
    }])
  }
};
