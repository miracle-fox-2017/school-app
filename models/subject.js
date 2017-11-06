'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })

  Subject.associate = model=> {
    Subject.hasMany(model.Teacher)
    Subject.hasMany(model.School)
    Subject.belongsToMany(model.Student, {through : 'School'})
  }
  return Subject;
};