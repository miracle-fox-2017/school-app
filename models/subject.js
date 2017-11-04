'use strict';
const 
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Subjet.hasMany(Teacher)
      }
    }
  });
  return Subject;
};