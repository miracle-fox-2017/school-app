'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: {
      type :  DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Fill first_name"
        }
      }
    },
    last_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Fill last_name"
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
          Teacher.findAll({
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
    },
    SubjectId : DataTypes.INTEGER,
  });
  Teacher.associate = function (models) {
    Teacher.belongsTo(models.Subject)
  }; 

  Teacher.prototype.getFullName = function(){
      return this.first_name + ' ' + this.last_name;
  }  
  return Teacher;
};  