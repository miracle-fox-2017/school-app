'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    SubjectId : DataTypes.INTEGER,
    StudentId : DataTypes.INTEGER,
    score     : DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  StudentSubject.associate = function (models) {
    StudentSubject.belongsTo(models.Student)
    StudentSubject.belongsTo(models.Subject)
  }
  return StudentSubject;
};
