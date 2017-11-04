const Model = require('./models');

let Student = Model.Student;
let student = new Student();

student.email = 'akbar@mail.com';
student.save();