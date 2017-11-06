'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    Score: {type: DataTypes.INTEGER}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  SubjectStudent.associate = function(models){
    SubjectStudent.belongsTo(models.Subject)
    SubjectStudent.belongsTo(models.Student)
  }
  return SubjectStudent;
};