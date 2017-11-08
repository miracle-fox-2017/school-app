'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectWithStudent = sequelize.define('SubjectWithStudent', {
    subjectId:{
      type:DataTypes.INTEGER,
      // references: 'Subject',
      // referencesKey: 'id',
      // allowNull: false
    },
    studentId:{
      type:DataTypes.INTEGER,
      // references: 'Student',
      // referencesKey: 'id',
      // allowNull: false
    },
    score : DataTypes.INTEGER
  });
  SubjectWithStudent.associate = function(models) {
    // User.belongsToMany(Role, { as: 'Roles', through: { model: UserRole, unique: false }, foreignKey: 'user_id' });
    // Role.belongsToMany(User, { as: 'Users', through: { model: UserRole, unique: false }, foreignKey: 'role_id' });
  //   // associations can be defined here
  //
  //   SubjectWithStudent.hasMany(models.Subject,{foreignKey: 'subjectId', targetKey: 'id'})
  //   SubjectWithStudent.hasMany(models.Student,{foreignKey: 'studentId', targetKey: 'id'})
    SubjectWithStudent.belongsTo(models.Subject,{foreignKey: 'subjectId', targetKey: 'id'})
    SubjectWithStudent.belongsTo(models.Student,{foreignKey: 'studentId', targetKey: 'id'})
  }
  return SubjectWithStudent;
};
