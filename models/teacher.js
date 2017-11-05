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
    }
    // Subject_Id  :  DataTypes.INTEGER
  });

  // Teacher.associate = function (models) {
  //    Teacher.belongsTo(models.Subjects, {foreignkey : 'Subject_Id'} );
  // }

  return Teacher;
};
