'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
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
  });

  //CLASS METHOD
  Student.associate = function(models) {
        Student.belongsToMany(models.Subject,{through:"SubjectStudent"})
        Student.hasMany(models.SubjectStudent)
  }

  //INSTANCE METHOD
  Student.prototype.getFullname = function() {
    return `${this.first_name} ${this.last_name}`;
  }

  return Student;
};
