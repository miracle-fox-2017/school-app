'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teachers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  });
  
  // Class Method
  Teacher.associate = function (models) {
      // ...associate the models
      // Teacher.hasMany(models.Subjects)
      Teacher.belongsTo(models.Subjects)
  };
  
  Teacher.prototype.getFullName = function () {
    return this.first_name + ' ' + this.last_name
    // console.log('halooooo');
  }
  
  return Teacher;
};