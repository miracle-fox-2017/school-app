'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  });
  StudentSubject.associate = function(models){
    StudentSubject.belongsTo(models.Subject);
    StudentSubject.belongsTo(models.Student);
  }
  return StudentSubject;
};