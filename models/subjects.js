'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  // Subjects.associate = function(models) {
  //   Subjects.belongsTo(models.Teacher, {foreignkey : 'Subject_Id'});
  // }

  return Subjects;
};
