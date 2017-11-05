'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is incorrect'
        },
        isUnique: function(value, cb) {
          Student.find({
            where: {email: value}
            }).then((result) =>{
              if(result && this.id != result.id) {
                cb('Email already in use!')
              }
              else {
                cb()
              }
          })
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

  Student.associate = function (models) {
    Student.belongsToMany(models.Subject,{
      through    : 'StudentSubject',
      foreignKey : 'StudentId'
    })
  }

  Student.prototype.getFullname = function() {
    return `${this.first_name} ${this.last_name}`
  };

  return Student;
};
