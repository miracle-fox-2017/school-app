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
            validate: { isEmail: { msg: 'Invalid email.' } },
        }
    })
        Student.prototype.getFullname = function() {
        return this.first_name + ' ' + this.last_name;
      }
      return Student;
    }
