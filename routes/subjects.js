const express = require('express');
const router = express.Router();
const Model = require('../models');
const scoreLetter = require('../helper/scoreLetter');

router.get('/', (req, res)=> {
  Model.Subject.findAll({ include: [Model.Teacher] }).then((results) => {
    res.render('subjects.ejs', { error: null, dataContacts: results, pageTitle: 'Subjects' });
  });
});

//add
router.get('/add', (req, res) => {
  res.render('addSubjectForAcademic.ejs', { pageTitle: 'Add Subjects' });
});

router.post('/add', (req, res) => {
  let subject_name = req.body.subject_name;
  Model.Subject.create({
    subject_name: subject_name
  })
  .then(function (dataContacts) {
    res.redirect('../subjects');
  }).catch((err) => {
    res.render('addSubjectForAcademic', { error: err, pageTitle: 'Add Subjects' });
  });
});

router.get('/:id/enrolledstudents', function (req, res) {
  Model.student_subject.findAll({
    attributes: [
      'id',
      'SubjectId',
      'StudentId',
      'score'
    ],
    where: { SubjectId: req.params.id },
    include: [Model.Student, Model.Subject
    ],
    order: [[Model.Student, 'first_name', 'ASC']]
  }).then(function (studentSubjectData) {
    res.render('enrolled',
    {
      data: studentSubjectData,
      scoreLetter: scoreLetter,
      pageTitle: 'EnrolledStudent'
    });
  });
});

router.get('/:id/givescore', function (req, res) {
  Model.student_subject.findAll({
    attributes: [
      'id',
      'SubjectId',
      'StudentId',
      'score'
    ],
    where:{
      id: req.params.id
    },
    include: [
      Model.Student,
      Model.Subject
    ]
  }).then(function (data) {
    res.render('score', { data: data, pageTitle: 'GiveScore' });
  });
});

router.post('/:id/givescore', function (req, res) {
  Model.student_subject.update({
    score: req.body.score
  }, {
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/subjects');
  });
});

module.exports = router;
