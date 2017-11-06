'use strict';

module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })
    //classMethods
      Subject.associate = function(models) {
        // associations can be defined here
        Subject.hasMany(models.Teacher, {foreignKey: 'subjectId'});
        Subject.belongsToMany(models.Student, { through: models.SubStudent, foreignKey: 'subjectId', as: 'student' });
      }

  return Subject;
};
