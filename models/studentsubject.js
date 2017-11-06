'use strict';
const getLetterScore = require('../helper/getletterscore')

module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  StudentSubject.associate = models => {
    StudentSubject.belongsTo(models.Student);
    StudentSubject.belongsTo(models.Subject);
  }

  StudentSubject.prototype.getLetter = function(){
    return getLetterScore(this.score)
  }

  return StudentSubject;
};
