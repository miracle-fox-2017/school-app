'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });

  StudentSubject.associate = (models) => {

    // cojunction
    StudentSubject.belongsTo(models.Subject);
    StudentSubject.belongsTo(models.Student);
  }

  return StudentSubject;
};
