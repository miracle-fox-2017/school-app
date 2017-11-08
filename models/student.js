'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail  : {
          msg : 'Email Format is incorrect'
        },
        isUnique : function(value, cb){
          console.log(this);
          if(value){
            Student.find({where : {email : value}}).then(result=>{
              if(result && !this._modelOptions.whereCollection){
                  cb('Email sudah ada')
              }else
                if(result && result.id != this.id){
                  cb('Email sudah ada')
                }else{
                  cb()
                }
            }).catch(err=>{
              cb(err)
            })
          }else{
            cb()
          }
        }
      }
    }
  })

  Student.associate = function(model){
    Student.hasMany(model.School)
    Student.belongsToMany(model.Subject, {through : 'School'})
  }

  Student.prototype.getFullName = function() {
      return [this.first_name, this.last_name].join(' ');
  }
  return Student;
};