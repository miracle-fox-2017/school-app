'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teachers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    subjectId: DataTypes.STRING,

  });
    //classMethods:
      Teacher.associate = function(models) {
        // associations can be defined here
        Teacher.belongsTo(models.Subjects,  {
                foreignKey: "subjectId", as: "Subject"
            });
      }
      
  return Teacher;
};
