'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate: {
        isEmail: {
          msg : "email format is incorrect"
        },
        isUnique :{
          function(value, next) {
             if (value) {
                 Student.find({
                     where : {
                         email : value
                     }
                 })
                 .success(function(user) {
                     if (user) {
                         next('Already taken')
                     }
                     else {
                         next()
                     }
                 })
                 .error(function(err) {
                     next(err.message);
                 });
            }
            else {
                 next("String is empty");
            }
          }
       }

      },
   }
  //  return Student;
  },  {
  getterMethods: {
    fullName() {
      return this.first_name + ' ' + this.last_name
    }
  },

  setterMethods: {
    fullName(value) {
      const names = value.split(' ');

      this.setDataValue('first_name', names.slice(0, -1).join(' '));
      this.setDataValue('last_name', names.slice(-1).join(' '));
    },
  }
},
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Student;
};
