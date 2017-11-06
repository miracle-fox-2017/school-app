'use strict';
module.exports = (sequelize, DataTypes) => {
  var Students_Subject = sequelize.define('Students_Subject', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });
  Students_Subject.associate = models => {
    Students_Subject.belongsTo(models.Student, {foreignKey : 'StudentId'})
    Students_Subject.belongsTo(models.Subject, {foreignKey : 'SubjectId'})
  }
  Students_Subject.prototype.getId = function () {
    return this.id
  }
  return Students_Subject;
};