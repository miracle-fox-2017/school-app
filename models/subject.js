'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = (models) => {
    Subject.hasMany('Teacher');
    Subject.belongsToMany(models.Student, { through: 'Student_Subject' })
    Subject.hasMany(models.Student_Subject)
  }
  return Subject;
};