'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email format is incorrect"
        }
      }
    },
    idSubject: DataTypes.INTEGER
  });
  Teacher.associate = model => {
    Teacher.belongsTo(model.Subject, { foreignKey: 'idSubject' })
  }

  Teacher.prototype.getFullName = function () {
    return this.first_name + ' ' + this.last_name
  }
  return Teacher;
};