'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(`Subjects`, [{
      subject_name: "Kimia",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      subject_name: "Ekonomi",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(`Subjects`, [{
      subject_name: "Kimia"
    },{
      subject_name: "Ekonomi"
    }])
  }
};
