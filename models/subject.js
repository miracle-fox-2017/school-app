'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = function(models) {
  //   // associations can be defined here
  // Subject.hasMany(models.Teacher,{foreignKey: 'subjectId', sourceKey: 'id'})
  // Subject.hasMany(models.SubjectWithStudent)
  // Subject.belongsToMany(models.Student, { through: models.SubjectWithStudent })
  //
  }
  return Subject;
};
