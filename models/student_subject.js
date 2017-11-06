'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student_Subject = sequelize.define('Student_Subject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });
  Student_Subject.associate=function(models){
      Student_Subject.belongsTo(models.Subject);
      Student_Subject.belongsTo(models.Student);
  }
  return Student_Subject;
};
