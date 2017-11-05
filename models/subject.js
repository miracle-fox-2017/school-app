'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })

  Subject.associte = model=>{
    Subject.hasMany(model.Teacher, {foreignKey : 'SubjectId'})
  }
  return Subject;
};