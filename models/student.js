'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
        // isUnique: function(value, callback){
        //   console.log(this.dataValues.id, '----------------------');
        //   if(this.dataValues.id == '' || this.dataValues.id == null){
        //
        //     Student.findAll({where:{email:value}}).then(rows =>{
        //       if(rows.length > 0){
        //         return callback('Email Double')
        //       }else{
        //         callback()
        //       }
        //     })
        //   }
        // }
      }
    }
  });

  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, { through: models.StudentSubject })
    Student.hasMany(models.StudentSubject)
  }

  // Student.emailError = function(){
  //   let error = {msg:'Email Not Valid'}
  //   return error
  // }
  Student.prototype.getFullName = function(){
    return this.first_name + ' ' + this.last_name
  }


  return Student;
};
