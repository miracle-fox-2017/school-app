'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique : true,
      validate: {
        isEmail: true,
        isUnique: function(value, callback) {
          if (this.dataValues.id === '') {
            Student.findAll({ where: {email: value} }).then(emailFound => {
              if (emailFound.length >= 1) {
                return callback('Email not unique! Change!');
              } else {
                callback();
              }
            })
          } else {
            callback();
          }
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
    }
  });

  Student.associate = function (models) {
    Student.hasMany(models.Subject);
  }


  Student.prototype.full_name = function(){
    return this.first_name +' '+this.last_name;
  };

  return Student;
};

