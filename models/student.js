'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type :DataTypes.STRING,
      unique: true,
      validate: {
                  isEmail: {
                    args: true,
                    msg: 'email format is incorrect'
                  }
                },
    }

  },{
    indexes: [{
      unique: true,
      fields: ['email']
    }]
  });
  Student.prototype.getFullname = function () {
    return this.first_name + ' ' + this.last_name
  }
  return Student;
};
