'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    SubjectId : DataTypes.INTEGER
  })

  Teacher.associate = function(model){
    Teacher.belongsTo(model.Subject)
  } 
  return Teacher;
};