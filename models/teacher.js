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
          msg: "The email you entered is invalid"
        },
        isUnique: function(value, callback) {
          Teacher.find({where:{email: value}}).then((teacher) => {
            if(teacher && this.id != teacher.id) {
              callback('email sudah ada')
            }
            else {
              callback()
            }
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {

  })

  Teacher.associate = function(models) {

    Teacher.belongsTo(models.Subject)

  }
  return Teacher;
};
