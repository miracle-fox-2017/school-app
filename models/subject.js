'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })

  Subject.associte = model=>{
    Subject.hasMany(model.Teacher, {foreignKey : 'SubjectId'})
    Subject.hasMany(model.School)
    Subject.belongsToMany(model.Student, {through : 'School'})
  }
  return Subject;
};