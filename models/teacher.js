'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
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
    SubjectId: DataTypes.INTEGER
  });

  Teacher.associate = function(models) {
      Teacher.belongsTo(models.Subject,{foreignKey:"SubjectId"})
  }
  Teacher.prototype.getFullname = function() {
    return `${this.first_name} ${this.last_name}`;
  }
  return Teacher;

};
