'use strict';
const models = require('../models')
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type : DataTypes.STRING,
        unique : {
            args : true,
            msg : 'Nama email sudah ada yang menggunakan'
        },
        validate : {
            isEmail: {
              args : true,
              msg : 'email format error'
            }
        },
      }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Student.associate = function(models){
    Student.hasMany(models.StudentSubject)
    Student.belongsToMany(models.Subject, {through: models.StudentSubject})
  }

  Student.prototype.getFullname = function(){
   return this.first_name + " " + this.last_name 
  }

  return Student;
};