'use strict';
const scoreletter = require('../helper/scoreletter')
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  })

  StudentSubject.associate = models => {
    StudentSubject.belongsTo(models.Subject)
    StudentSubject.belongsTo(models.Student)
  }

  StudentSubject.prototype.getscoreletter = function () {
    return scoreletter(this.score)
  }

  return StudentSubject;
};
