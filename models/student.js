'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'The email you entered is invalid'
        },
        isUnique: function(value, callback) {
          Student.find({
            where: {email: value}
          }).then((result) =>{
            if(result && this.id != result.id) {
              callback('email dah ada')
            }
            else {
              callback()
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
  })
  Student.prototype.getfullname = function() {
    return this.first_name + ' ' + this.last_name
  }

  Student.associate = (models) => {
    Student.belongsToMany(models.Subject, {through: 'StudentSubject'})
    Student.hasMany(models.StudentSubject)
  }


  return Student;
};
