const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function (req, res) {
  Model.Teacher.findAll()
  	.then(allTeachers => {
  		res.render('teacher', {teachers: allTeachers});
  	})
  	.catch(err => res.send(err));
})

router.get('/tes', function (req, res) {
  Model.Teacher.findAll()
  	.then(teachers => {
  		let newTeacher = teachers.map(teacher => {
  			return new Promise((resolve, reject) => {
  				teacher.getSubject().then((subjectWith) => {
  					if (subjectWith === null) {
  						teacher.subject_data.status = "Unassigned";
  						resolve(teacher);
  					} else {
  						teacher.subject_data.status = "Assigned";
  						teacher.subject_data = subjectWith;
  						resolve(teacher);
  					}
  				})
  				.catch(err => res.send(err));
  			});
  		})

  		Promise.all(newTeacher)
	  		.then((newSubject) => {
	  			res.render('teacher', {teachers: teachers, teachersSubjects: newSubject});
	  		})
	  	})
})

module.exports = router;