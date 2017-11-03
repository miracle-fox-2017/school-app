const Model   = require('./models')

let Student = Model.Student;
let student = new Student();


student.email = 'matt.syahab@gmail.com';
student.save();