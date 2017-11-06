'use strict';

module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  })
      Subject.associate = function(models) {
        // associations can be defined here
        Subject.hasMany(models.Teachers, {foreignKey: 'subjectId'});
        Subject.belongsToMany(models.Students, { through: models.SubStudents, foreignKey: 'subjectId', as: 'student' });
      }

  return Subject;
};