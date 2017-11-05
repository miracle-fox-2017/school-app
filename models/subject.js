'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });

  Subject.associate = model => {
    Subject.hasMany(model.Teacher, { foreignKey: 'idSubject' })
  }
  return Subject;
};