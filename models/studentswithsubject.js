'use strict';
module.exports = (sequelize, DataTypes) => {
  var studentswithsubject = sequelize.define('studentswithsubject', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  studentswithsubject.associate = function (models) {
    studentswithsubject.belongsTo(models.student)
    studentswithsubject.belongsTo(models.subject)
  }

  // studentswithsubject.associate = function (models) {
    
  // }

  return studentswithsubject;
};