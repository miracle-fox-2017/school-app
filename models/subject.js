'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Subject.associate = models => {
    Subject.hasMany(models.Teacher);
    Subject.hasMany(models.StudentSubject);
    Subject.belongsToMany(models.Student, { through: models.StudentSubject });
  }
  return Subject;
};
