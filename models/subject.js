'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        //Subject.hasMany(models.teacher);
      }
    }
  });

  Subject.associate = function(models) {
    Subject.hasMany(models.teacher);
    Subject.belongsToMany(models.Student,{through : 'StudentSubject'})
    Subject.hasMany(models.StudentSubject)
  }

  return Subject;
};
