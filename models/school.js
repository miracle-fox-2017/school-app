'use strict';
module.exports = (sequelize, DataTypes) => {
  var School = sequelize.define('School', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    Score: DataTypes.INTEGER
  })

  School.associate = model=> {
    School.belongsTo(model.Subject)
    School.belongsTo(model.Student)
  }
  
  return School;
};