const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function (req, res) {
  Model.Teacher.findAll()
  	.then(teachers => {
  		let newTeacher = teachers.map(teacher => {
  			return new Promise((resolve, reject) => {
  				teacher.getSubject().then((subjectWith) => {
            if (teacher.SubjectId == null) {
              teacher.subject_data = 'Unassigned';
            } else {
              teacher.subject_data = subjectWith;
            }
            
            resolve(teacher);
  				})
  				.catch(err => res.send(err));
  			});
  		})

  // Model.Teacher.findAll({include: [Model.Subject]})
  //   .then((allTeach) => {
  //     console.log(allTeach[0].Subject);
  //   });

	Promise.all(newTeacher)
  		.then((newSubject) => {
  			res.render('teacher', {teachers: teachers, teachersSubjects: newSubject});
  		})
	})
})


router.get('/add', function (req, res) {
  Model.Subject.findAll()
    .then(allSubjects => {
      res.render('add-teacher', { subjects: allSubjects, message: req.query.err});
    })
    .catch(err => res.send(err));
})

router.post('/add', (req, res) => {
  Model.Teacher.create({
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      SubjectId: req.body.SubjectId
    })
    .then(success => {
      res.redirect('/teachers');
    })
    .catch(err => {
      console.log(err);
      var msg = encodeURIComponent(err.message);
      res.redirect('/teachers/add/?err=' + msg);
    });
})

router.get('/edit/:id', (req, res) => {
  Model.Subject.findAll()
    .then(allSubjects => {
      Model.Teacher.findById(req.params.id)
      .then((teacherEditFound) => {
        res.render('add-teacher', {subjects: allSubjects, teacherFound: teacherEditFound, message: req.query.err});
      })
      .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
})

router.post('/edit/', (req, res) => {
  Model.Teacher.update(req.body,{
    where: {
      id: req.body.id
    }
  }).then(success =>{
    res.redirect('/teachers');
  }).catch(err => {
    var msg = encodeURIComponent(err.message);
    res.redirect(`/teachers/edit/${req.body.id}/?err=`+msg);
  });
})

router.get('/delete/:id', (req, res) => {
  Model.Teacher.destroy({
    where: {
      id: req.params.id
    }
  }).then(success =>{
    res.redirect('/teachers');
  }).catch(err => res.send(err));
})

module.exports = router;