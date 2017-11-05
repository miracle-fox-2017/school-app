'use strict';
module.exports = (sequelize, DataTypes) => {
  var Students_Subject = sequelize.define('Students_Subject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  });
  Students_Subject.associate = models => {
    Students_Subject.belongsTo(models.Student, {foreignKey : 'StudentId'})
    Students_Subject.belongsTo(models.Subject, {foreignKey : 'SubjectId'})
  }
  return Students_Subject;
};