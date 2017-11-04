'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          msg : 'Fill first_name'
        }
      }
    },

    last_name: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          msg : 'Fill last_name'
        }
      }
    },

    email: {
      type : DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique : function(value,next){
          if(this.dataValues.id != null){
             next();
          }
          Student.findAll({
              where : {email : value},
          })     
            .then(foundEmail =>{
              if(foundEmail.length > 0){
                return next('Email address already in use!')
              }else{
                next();
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

    Student.prototype.getFullName = function(){
      return this.first_name + ' ' + this.last_name;
    }
    return Student;
};