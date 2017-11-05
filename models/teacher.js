'use strict';
module.exports = (sequelize, DataTypes) => {
  var teacher = sequelize.define('teacher', {
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
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Maaf Email Tidak Boleh Kosong"
        },
        isEmail: {
          msg: "Maaf Format Email Anda Salah"
        }
      }
    },
    subjectId: DataTypes.INTEGER
  });

  teacher.associate = function (models) {
    teacher.belongsTo(models.subject);
  }

  teacher.prototype.getFullname = function () {
    return `${this.first_name} ${this.last_name}`;
  }

  return teacher;
};