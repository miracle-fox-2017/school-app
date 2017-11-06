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
        },
        isUnique: function (value, callback) {
          var self = this
          Student.find({
            where: {
              email: value
            }
          }).then(function (student) {
            console.log(self)
            if (student && self.id != student.id) {
              return callback("Email is already in use")
            }
            return callback()
          })
            .catch(function (err) {
              return callback(err)
            })
        }
      }
    }
  }
  )

  Student.associate = (model) => {
    Student.belongsToMany(model.Subject, { through: 'StudentSubject', foreignKey: 'idStudent' })
    Student.hasMany(model.StudentSubject, { foreignKey: 'idStudent' })
  }
  Student.prototype.getFullName = function () {
    return this.first_name + ' ' + this.last_name
  }
  return Student;
};