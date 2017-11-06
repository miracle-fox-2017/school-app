'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: { type : DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: "subject name harus diisi"
        }
      }
    }
  });
Subject.associate = function(models) {
      Subject.hasMany(models.Teacher)
      Subject.belongsToMany(models.Student,{through:"SubjectStudent"})
      Subject.hasMany(models.SubjectStudent)
  }
  return Subject;
};
