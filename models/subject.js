'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = (models) => {
    Subject.hasMany(models.Teacher);
  }
  return Subject;
};