'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function(value, next){
            Student.findAll({
              where : {email:value}
            })
            .then(foundEmail =>{
              if(foundEmail.length > 0){
                return next('Email address already in use!');
              }
            })
            next()
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
  return Student;
};