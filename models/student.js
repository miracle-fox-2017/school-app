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
          msg: 'Email format is incorrect'
        }
        // isUnique: function (value, callback) {
        //   var self = this
        //   Student.find({
        //     where: {
        //       email: value
        //     }
        //   }).then(function (student) {
        //     if (student && self.id !== student.id) {
        //       return callback("Email is already in use")
        //     }
        //     return callback()
        //   })
        //     .catch(function (err) {
        //       return callback(err)
        //     })
        // }
      }
    }
  },
    // {
    //     indexes: [
    //       {
    //         unique: true,
    //         fields: ['email']
    //       }

    //     ]
    //   },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  Student.prototype.getFullName = function () {
    return this.first_name + ' ' + this.last_name
  }
  return Student;
};