'use strict';
let fullName = require('../helper/fullName');
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: 'Email address already in use!',
      },
    },
  });
  Student.prototype.fullName = function () {
    return fullName(this.first_name, this.last_name);
  };

  Student.associate = function (model) {
    Student.hasMany(model.student_subject);
    Student.belongsToMany(model.Subject, { through: 'student_subject' });
  };

  return Student;
};
