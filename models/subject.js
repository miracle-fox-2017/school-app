'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher);  
    Subject.belongsToMany(models.Student, {through : 'StudentSubject'});
  };
  Subject.prototype.getFullName = function(){
      return this.first_name + ' ' + this.last_name;
  }  
  return Subject;
};