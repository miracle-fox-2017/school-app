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
  },{
    classMethods:{
        associate: function(models){
            // associations can be defined here
        }
    },
    instanceMethods:{
        getFullName:function(first,last){
            return first+" "+last;
        }
    }
  });
  return Student;
};
