'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    id : {
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  StudentSubject.associate = function(models) {
    StudentSubject.belongsTo(models.Subject)
    StudentSubject.belongsTo(models.Student)
  }
  return StudentSubject;
};
