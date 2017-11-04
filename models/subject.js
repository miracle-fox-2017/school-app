'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = function (models) {
    Subject.hasMany(models.Teacher)
    Subject.hasMany(models.Student_Subject,{as: 'SubjectId'})
    Subject.belongsToMany(models.Student, {through: 'Student_Subjects'})
  }
  return Subject;
};
