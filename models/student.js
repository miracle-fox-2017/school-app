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
          let checkId = Student.find({where : {id : this._modelOptions.whereCollection.id}}).then(result=>{
            console.log(result);
          })

          if(value && !checkId){
            Student.find({where : {email : value}}).then(result=>{
              if(result){
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

  Student.associate = model => {
    Student.hasMany(model.School)
    Student.belongsToMany(model.Subject, {through : 'School'})
  }

  Student.prototype.getFullName = function() {
      return [this.first_name, this.last_name].join(' ');
  }
  return Student;
};