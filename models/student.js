'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:{
                msg:"Masukan format email yang benar!"
            },
            isUnique:function(value,callback){
                if(this.dataValues.id ===  null){ // Buat data baru
                    Student.findOne({
                        where:{
                            email:this.dataValues.email
                        }
                    }).then((row)=>{
                        if(row !== null){
                            return callback("Email telah digunakan!");
                        }
                        return callback();
                    }).catch((err)=>{
                        return callback(err);
                    });
                }else{ // Update data lama
                    Student.find({
                        where:{
                            email:this.dataValues.email
                        }
                    }).then((row)=>{
                        if(row !== null && this.dataValues.id != row.dataValues.id){
                            return callback("Email telah digunakan!");
                        }else if(row !== null && this.dataValues.id == row.dataValues.id){
                            return callback();
                        }
                        return callback();
                    }).catch((err)=>{
                        return callback(err);
                    });
                }
            }
        }
    }
  });
  Student.prototype.getFullName=function(){
      return this.first_name+" "+this.last_name;
  }
  Student.associate=function(models){
      Student.hasMany(models.Student_Subject);
      Student.belongsToMany(models.Subject,{through:models.Student_Subject});
  }
  return Student;
};
