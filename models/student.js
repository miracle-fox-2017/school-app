'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  });

  //classMethods
  Student.associate = (models) => {

    // many to many
    Student.belongsToMany(models.Subject, {through: 'StudentSubject'});
    Student.hasMany(models.StudentSubject);
  }

  //instance method
  Student.prototype.getFullName = function () {
    return `${this.first_name} ${this.last_name}`
  };




  return Student;
};
