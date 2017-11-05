'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectWithStudent = sequelize.define('SubjectWithStudent', {
    subjectId: DataTypes.INTEGER,
    studentId:{
    type:DataTypes.INTEGER,
    references: null
    },
    score : DataTypes.INTEGER
  });
  SubjectWithStudent.associate = function(models) {
  //   // associations can be defined here
  //
  //   SubjectWithStudent.hasMany(models.Subject,{foreignKey: 'subjectId', targetKey: 'id'})
  //   SubjectWithStudent.hasMany(models.Student,{foreignKey: 'studentId', targetKey: 'id'})
    // SubjectWithStudent.belongsTo(models.Subject)
    SubjectWithStudent.belongsTo(models.Student,{foreignKey: 'subjectId', targetKey: 'id'})
  }
  return SubjectWithStudent;
};
