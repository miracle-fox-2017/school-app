'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubjects', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });
  
  // Class Method
  StudentSubject.associate = function (models) {
    // ...associate the models
    // Subject.belongsTo(models.Teachers)
    StudentSubject.belongsTo(models.Students)
    StudentSubject.belongsTo(models.Subjects)
  };
  return StudentSubject;
};