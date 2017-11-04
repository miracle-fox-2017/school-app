'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type :DataTypes.STRING,
      validate: {
                  isEmail: {
                    args: true,
                    msg: 'Email format is incorrect'
                  },
                  isUnique: function(value, next) {
                    var idSendiri = this;
                    Student.find(
                        {
                          where: { email: value }
                        })
                        .then(function (student) {
                            // console.log(typeof idSendiri.id);
                            // console.log(typeof student.id);
                            // reject if a different user wants to use the same email
                            if (student && idSendiri.id != student.id) {
                                return next('Email already in use, try another!');
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                  }
                }
    }
  });
  Student.prototype.getFullname = function () {
    return this.first_name + ' ' + this.last_name
  }
  Student.associate = function (models){
    Student.belongsToMany(models.Subject, {through: 'Student_Subjects'})
    Student.hasMany(models.Student_Subject,{as: 'StudentId'})
  }
  return Student;
};
