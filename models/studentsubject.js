'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: {
    	type : DataTypes.INTEGER
    }
  });
  StudentSubject.associate = function(models){
    StudentSubject.belongsTo(models.Subject, { onDelete: 'cascade', hooks: true});
    StudentSubject.belongsTo(models.Student, { onDelete: 'cascade', hooks: true});
  }
  return StudentSubject;
};