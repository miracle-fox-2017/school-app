const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res)=> {
  Model.Subject.findAll({ include: [Model.Teacher] }).then((results) => {
    res.render('subjects.ejs', { error: null, dataContacts: results });
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
    include: [Model.Student, Model.Subject,
    ]
  }).then(function (studentSubjectData) {
    res.render('enrolled',
    {
      data: studentSubjectData,
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
    res.render('score', { data: data });
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
