'use strict';
module.exports = (sequelize, DataTypes) => {
  var create = sequelize.define('create', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return create;
};