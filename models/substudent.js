'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubStudents = sequelize.define('SubStudents', {
    subjectId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  });
  SubStudents.associate = function(models) {
    // associations can be defined here
    SubStudents.belongsTo(models.Subjects,  {
            foreignKey: "subjectId", as: "subject"
        });
    SubStudents.belongsTo(models.Students,  {
            foreignKey: "studentId", as: "student"
        });
  }
  return SubStudents;
};
