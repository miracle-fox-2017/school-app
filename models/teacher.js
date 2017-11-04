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
  
  return Teacher;
};