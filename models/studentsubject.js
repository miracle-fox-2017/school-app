'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {})
  const Student = sequelize.define('Student', {})

  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    Score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  StudentSubject.associate = function (models) {
    // Subject.belongsToMany(Student, { through: StudentSubject });
    // Student.belongsToMany(Subject, {through: StudentSubject});

    StudentSubject.belongsTo(models.Subject);
    StudentSubject.belongsTo(models.Student);
  }

  return StudentSubject;
};