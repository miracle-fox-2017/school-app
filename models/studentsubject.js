'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    idSubject: DataTypes.INTEGER,
    idStudent: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
  StudentSubject.associate = (model) => {
    StudentSubject.belongsTo(model.Subject, { foreignKey: 'idSubject', targetKey: 'id' })
    StudentSubject.belongsTo(model.Student, { foreignKey: 'idStudent', targetKey: 'id' })
  }
  return StudentSubject;
};