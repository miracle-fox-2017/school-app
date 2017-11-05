'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'first name is required'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'last name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is incorrect'
        }
      },
      unique: {
        args: true,
        msg: 'Validation error: email already exists'
      }
    }
  });

  Student.prototype.getFullName = function () {
    return `${this.first_name} ${this.last_name}`
  };

  return Student;
};
