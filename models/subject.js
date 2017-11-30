'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = function (model) {
    Subject.hasMany(model.Teacher);
    Subject.hasMany(model.student_subject);
    Subject.belongsToMany(model.Student, { through: 'student_subject' });
  };

  return Subject;
};
