'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'subject name is required'
        }
      }
    }
  });

  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student, {through: 'StudentSubject'})
    Subject.hasMany(models.StudentSubject)
  }

  return Subject;
};
