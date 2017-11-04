'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
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
      validate: {
        isEmail: true,
        isUnique: function(value, callback) {
          if (this.dataValues.id === '') {
            Teacher.findAll({ where: {email: value} }).then(emailFound => {
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
    },
    SubjectId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
      
        // associations can be defined here
      }
    }
  });

  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject);
  };

  return Teacher;
};