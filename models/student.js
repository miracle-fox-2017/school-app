'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type: DataTypes.STRING,
        validate:{
              isEmail: true
            }
          }
  }, {
    classMethods: {
      associate: function(models) {

      }
    },
  });
  Student.associate=function(models) {
    Student.belongsToMany(models.Subject, {through : 'StudentSubject'})
    Student.hasMany(models.StudentSubject)
  }
    Student.prototype.getFullName = function (fullname) {
        return this.first_name+' '+this.last_name;
  }
  return Student;
};
