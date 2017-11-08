'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'The email address you entered is already in use!!'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect!!'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Student.prototype.getFullname = function () {
    return `${this.first_name} ${this.last_name}`
  }

  Student.associate = models => {
    Student.hasMany(models.StudentSubject);
    Student.belongsToMany(models.Subject, { through: models.StudentSubject });
  }
  return Student;
};
