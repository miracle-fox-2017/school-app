'use strict';
module.exports = (sequelize, DataTypes) => {
  var ConjStudentSubject = sequelize.define('ConjStudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjejectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ConjStudentSubject;
};