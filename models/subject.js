'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  });
  
  // Class Method
  Subject.associate = function (models) {
      // ...associate the models
      // Subject.belongsTo(models.Teachers)
      Subject.hasMany(models.Teachers)
  };
  return Subject;
};