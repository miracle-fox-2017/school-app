'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = function(models){
    Subject.hasMany(models.Teacher, {foreignKey: 'Subject_Id'})
    Subject.belongsToMany(models.Student, {through: 'SubjectStudent'})
    Subject.hasMany(models.SubjectStudent)
    //belongsToMany
  }
  return Subject;
};