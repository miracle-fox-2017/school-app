'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student_Subject = sequelize.define('Students-Subjects', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  });
  Student_Subject.associate = models => {
    Student_Subject.belongsTo(models.Student, {foreignKey : 'StudentId'})
    Student_Subject.belongsTo(models.Subject, {foreignKey : 'SubjectId'})
  }
  return Student_Subject;
};