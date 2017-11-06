'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      auntoIncrement: true
    },
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score:DataTypes.INTEGER,
  });

  StudentSubject.associate = function (models) {
    StudentSubject.belongsTo(models.Subject)
    StudentSubject.belongsTo(models.Student)
  };


  return StudentSubject;
};
