const express = require('express')
const Model = require('../models')

const router = express.Router()

// define the subject page route
router.get('/', function (req, res) {
  Model.Subject.findAll({order: [['subject_name', 'ASC']]})
  .then(subjects => {
    let newSubjects = subjects.map(subject => {
      return new Promise((resolve, reject) => {
        subject.getTeachers()
        .then(subjectTeacher => {
          subject.subjectTeacher = subjectTeacher
          resolve(subject)
        })
      })
    })

    Promise.all(newSubjects)
    .then(dataSubjects => {
      // console.log(dataSubjects[0].subjectTeacher[0].first_name);
      // res.send(dataSubjects[1].subjectTeacher[0])
      res.render('subjects/index', {dataSubjects: dataSubjects})
    })
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/add', function (req, res) {
  res.render('subjects/add')
})

router.post('/add', function (req, res) {
  Model.Subject.create(req.body)
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/edit/:id', function (req, res) {
  Model.Subject.findById(req.params.id)
  .then(dataSubject => {
    res.render('subjects/edit', {dataSubject: dataSubject})
  })
  .catch(error => {
    res.send(error)
  })
})

router.post('/edit/:id', function (req, res) {
  Model.Subject.update(req.body, {where: req.params})
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/delete/:id', function (req, res) {
  Model.Subject.destroy({where: req.params})
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/:id/enrolledstudents', function (req, res) {
  Model.Subject.findAll({
    where: req.params,
    order: [['subject_name', 'ASC']]
  })
  .then(subjects => {
    let newSubject = subjects.map(subject => {
      return new Promise((resolve, reject) => {
        subject.getStudents({order: [['first_name', 'ASC']]})
        .then(subjectStudent => {
          subject.subjectStudent = subjectStudent
          resolve(subject)
        })
      })
    })

    Promise.all(newSubject)
    .then(dataSubject => {
      // console.log(dataSubject[0].subjectStudent);
      // res.send(dataSubject[0].subjectStudent[0])
      res.render('subjects/enrolledstudents', {dataSubject: dataSubject[0]})
    })
    .catch(error => {
      res.send(error)
    })
  })
})

router.get('/:id/givescore', function (req, res) {
  console.log(req.params);
  Model.StudentSubject.findOne({
    where: {
      StudentId: req.params.id
    }
  })
  .then(dataStudent => {
    // res.send(dataStudent)
    res.render('subjects/givescore', {dataStudent: dataStudent})
  })
})

module.exports = router
