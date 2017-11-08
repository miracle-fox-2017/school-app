'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student_Subject = sequelize.define('Student_Subject', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    StudentId : DataTypes.INTEGER,
    SubjectId : DataTypes.INTEGER,
    score     : DataTypes.INTEGER
  });
  Student_Subject.associate = function (models){
    Student_Subject.belongsTo(models.Student)
    Student_Subject.belongsTo(models.Subject)
  }
  return Student_Subject;
};
