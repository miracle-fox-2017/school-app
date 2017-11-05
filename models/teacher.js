'use strict';
module.exports = (sequelize, DataTypes) => {
  var teacher = sequelize.define('teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // teacher.belongsTo(models.Subject)
      }
    }
  });

  teacher.associate = function(models) {
    teacher.belongsTo(models.Subject)
  }

  teacher.prototype.getFullName = function (fullname) {
      return this.first_name+' '+this.last_name;
    }
  return teacher;
};
