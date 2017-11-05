'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique:true,
      validate: {
        isEmail: {
          msg : "email format is incorrect"
        }


      }
   }
  //  return Student;
  },  {
  getterMethods: {
    fullName() {
      return this.first_name + ' ' + this.last_name
    }
  },

  setterMethods: {
    fullName(value) {
      const names = value.split(' ');

      this.setDataValue('first_name', names.slice(0, -1).join(' '));
      this.setDataValue('last_name', names.slice(-1).join(' '));
    },
  }
});
Student.associate = function(models) {
//   // associations can be defined here
  // Student.hasMany(models.SubjectWithStudent)
  // Student.belongsToMany(models.Subject, { through: models.SubjectWithStudent })
//   // Student.hasMany(models.SubujectWithStudent)
}
  return Student;
};
