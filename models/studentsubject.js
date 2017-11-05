'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    Score : DataTypes.INTEGER
  })
    StudentSubject.associate = function(models){
      StudentSubject.belongsTo(models.Student)
      StudentSubject.belongsTo(models.Subject)
    }
    return StudentSubject;
};


/*
//create table konjungsi
konjungsi isinya = SubjectId, StudentId.
sequelize model:create --name StudentSubject....
//model konjungsi di tambahkan associate
konjungsi belongsTo students
konjungsi belongsTo subjects
//run db:migrate

//model students di tambahi
Student.belongsToMany(Subject, {through: models.namatabel});
student.hasMany(namatabel); kalo ke konjungsi ga pake through
//model subject di tambahi
Subject.belongsToMany(Student, {through: 'konjungsi'});
Subject hasMany(models.namatabel)




*/
//
