'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Students', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type:DataTypes.STRING,
            validate:{
              isEmail:true,
              notEmpty:true,
            }
          }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  Student.prototype.getFullName = function () {
    return this.first_name+' '+this.last_name;
  }
  return Student;
};
