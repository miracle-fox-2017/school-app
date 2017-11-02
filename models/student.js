'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      msg: 'email error'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },

    }
  });
  Student.emailError = function(){
    let error = {msg:'Email Not Valid'}
    return error
  }
  Student.prototype.getFullName = function(){
    return this.first_name + '' + this.last_name
  }


  return Student;
};
