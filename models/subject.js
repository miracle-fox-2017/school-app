'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = function(models) {
  //   // associations can be defined here
  Subject.hasMany(models.Teacher,{foreignKey: 'subjectId', sourceKey: 'id'})
  Subject.hasMany(models.SubjectWithStudent,{foreignKey: 'subjectId', sourceKey: 'id'})
  Subject.belongsToMany(models.Student, { through: { model: models.SubjectWithStudent, unique: false }, foreignKey: 'subjectId', sourceKey: 'id' })
  // { model: models.SubjectWithStudent, unique: false }
  }
  return Subject;
};
