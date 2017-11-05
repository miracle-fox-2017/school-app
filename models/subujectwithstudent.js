'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubujectWithStudent = sequelize.define('SubujectWithStudent', {
    subjectId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  });
  SubujectWithStudent.associate = function(models) {
    // associations can be defined here

    SubujectWithStudent.belongsTo(models.Subject)
    SubujectWithStudent.belongsTo(models.Student)

  }

  return SubujectWithStudent;
};
