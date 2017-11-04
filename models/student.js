'use strict';
module.exports = (sequelize, DataTypes) => {
  var student = sequelize.define('student', {
    first_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: "first name harus diisi" 
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: "Maaf Email Tidak Boleh Kosong"
        },
        isEmail: {
          msg : "Maaf Format Email Anda Salah"
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

  student.prototype.getFullname = function() {
    return `${this.first_name} ${this.last_name}`;
  }

  return student;
};