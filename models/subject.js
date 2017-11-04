'use strict';
module.exports = (sequelize, DataTypes) => {
  var subject = sequelize.define('subject', {
    subject_name: { type : DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: "subject name harus diisi" 
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
  return subject;
};