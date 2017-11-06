const express = require('express');
const router = express.Router();
const Model = require('../models');

//tampilin
router.get('/', (req, res)=> {
  Model.Student.findAll({
    order: [['first_name', 'ASC']]
  }).then((results) => {
    res.render('students.ejs', { error: null, dataContacts: results, pageTitle: 'Students' });
  });
});

//add
router.get('/add', (req, res) => {
  res.render('addStudent.ejs', { pageTitle: 'Add Student' });
});

router.post('/add', (req, res) => {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  Model.Student.create({
    first_name: first_name,
    last_name: last_name,
    email: email
  })
  .then(function (dataContacts) {
    res.redirect('../students');
  }).catch((err) => {
    // res.send(err.errors[0].message)
    res.render('addStudent', { error: err, pageTitle: 'Add Student' });
  });
});

// delete
router.get('/delete/:id', function(req, res) {
  Promise.all([
    Model.Student.destroy({
      where: {
        id: req.params.id
      }
    }),
    Model.student_subject.destroy({
      where: {
        StudentId: req.params.id
      }
    })
  ]).then(function () {
    res.redirect('../../students');
  }).catch(err => {
    console.log(err);
  });
});

// edit
router.get('/edit/:id', (req, res) => {
  Model.Student.findById(req.params.id).then(data => {
    res.render('editStudent', {
      title: 'Student Edit - School App',
      data: data,
      pageTitle: 'Edit Student'
    });
  });
});

// update post
router.post('/edit/:id', (req, res) => {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  Model.Student.update({
    first_name: first_name,
    last_name: last_name,
    email: email
  }, { where: { id: req.params.id } })
  .then(function (data) {
    res.redirect('../../students');
  });
});

//addsubject
router.get('/:id/addsubject', function (req, res) {
  Model.Student.findAll({ where: { id: req.params.id } }).then(function (data) {
    Model.Subject.findAll().then(function (subjectsData) {
      res.render('addSubject', { data: data, Subjects: subjectsData, pageTitle: 'Add Subjects' });
    });
  });
});

router.post('/:id/addsubject', function (req, res) {
  Model.student_subject.create({
    SubjectId: req.body.SubjectId,
    StudentId: req.params.id
  }).then(function () {
    res.redirect('/students');
  });
});

module.exports = router;
