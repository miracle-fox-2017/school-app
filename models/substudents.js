'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubStudents = sequelize.define('SubStudents', {
    subjectId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SubStudents;
};
