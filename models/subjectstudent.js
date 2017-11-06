'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    Score: DataTypes.INTEGER
  });
  SubjectStudent.associate = function(models) {
        SubjectStudent.belongsTo(models.Subject)
        SubjectStudent.belongsTo(models.Student)
    }
  return SubjectStudent;
};
