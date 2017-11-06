'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubStudent = sequelize.define('SubStudent', {
    subjectId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  });
  SubStudent.associate = function(models) {
    // associations can be defined here
    SubStudent.belongsTo(models.Subject,  {
            foreignKey: "subjectId"
        });
    SubStudent.belongsTo(models.Student,  {
            foreignKey: "studentId"
        });
  }
  return SubStudent;
};
