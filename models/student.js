'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {msg: 'No number in your name right?'},
        notEmpty: {msg: 'How should i call you?'}
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {msg: 'No number in your name right?'},
        notEmpty: {msg: 'How should i call you?'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {msg: 'Email format should be like this: [user]@[domainname].[domain]'}
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  
  Student.prototype.gabungNama = function(){
    return `${this.first_name} ${this.last_name}`
  }
  
  Student.associate = function(models){
    Student.belongsToMany(models.Subject, {through: 'SubjectStudent'})
    Student.hasMany(models.SubjectStudent)
  }
  
  return Student;
};