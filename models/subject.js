'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Subject.hasMany(Teacher)
      }
    }
  });
  Subject.associate = (models) => {
    Subject.hasMany(models.Teacher);
  }
  return Subject;
};