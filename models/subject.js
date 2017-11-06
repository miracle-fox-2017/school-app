'use strict';
module.exports = (sequelize, DataTypes) => {
  var subject = sequelize.define('subject', {
    subject_name: { type : DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: "subject name harus diisi" 
        }
      }
    }
  });
  
  subject.associate = function (models) {
    subject.hasMany(models.teacher)
    subject.hasMany(models.studentswithsubject)
  }

  // subject.associate = function (models) {
  //   subject.hasMany(models.studentswithsubject)
  // }

  return subject;
};