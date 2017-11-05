'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
        first_name: {
                      type: DataTypes.STRING,
                      validate:{
                        notEmpty:{
                        msg:"first_name name required"
                      },
                  },
                },
        last_name: DataTypes.STRING,
          email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: {msg: 'Email is required.' },
            validate: {isUnique: function (value, next) {
                    var self = this;
                    Student.find({where: {email: value}})
                        .then(function (user) {
                            // reject if a different user wants to use the same email
                            if (user && self.id !== user.id) {
                                return next('Email already in use!');
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                }
            }
        }
    })
          Student.associate = function (models){
            Student.belongsToMany(models.Subject, {through : 'StudentSubject'})
            Student.hasMany(models.StudentSubject)
          }


        Student.prototype.getFullname = function() {
        return this.first_name + ' ' + this.last_name;
      }
      return Student;
    }
