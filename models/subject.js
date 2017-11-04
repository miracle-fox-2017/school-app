'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Subject;
};
