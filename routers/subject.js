const express = require('express');
const router = express.Router();

const Model = require('../models/');

router.get('/', (req, res) => {
  Model.Subject.findAll({
      order: [
        ['id', 'ASC']
      ],
      include: [Model.Teacher]
    })
    .then(dataTeacher => {
      let dataT = {
        title: 'Subject',
        rows: dataTeacher
      }

      // res.send(dataTeacher)
      res.render('subjects', dataT)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/:id/enrolledstudents', (req, res) => {
  Model.Subject.findById(req.params.id, {
      include: [Model.Student, Model.StudentSubject]
    })
    .then(newData => {
      // res.send(newData)
      res.render('subject-enrolled', {
        rows: newData,
        title : 'Enroll Student'
      })
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/:id/givescore', (req, res) => {
  Model.StudentSubject.findById(req.params.id, {
      include: [Model.Student, Model.Subject]
    }).then(newData => {
      // res.send(newData)
      res.render('subject-score', {
        rows: newData,
        title: 'Score'
      })
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/:id/givescore', (req, res) => {
  let newObj = {
    score: req.body.score,
    updatedAt: new Date()
  }

  Model.StudentSubject.update(newObj, {
      where: {
        StudentId: req.body.StudentId,
        SubjectId: req.body.SubjectId
      }
    }).then(() => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.send(err)
    })
})



module.exports = router;
