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
    }
  });

  Teacher.associate = function(models) {
      Teacher.belongsTo(models.Subject,{foreignKey:"SubjectId"})
  }
  return Teacher;

};
