'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    Subject_Id: {
      type: DataTypes.INTEGER
      }
  });
  Teacher.associate = function(models){
    Teacher.belongsTo(models.Subject, {foreignKey: 'Subject_Id'})
  }
  
  Teacher.prototype.gabungNama = function(){
    return `${this.first_name} ${this.last_name}`
  }
  
  return Teacher;
};