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
  console.log(req.params);
  Model.Subject.findOne({
    include: [{
        model: Model.StudentSubject,
        attributes: ['id', 'StudentId', 'SubjectId', 'score'],

    }],
    where: req.params
  })
  .then(subject => {
    let newSubject = subject.StudentSubjects.map(studentSubject => {
      return new Promise((resolve, reject) => {
        studentSubject.getStudent()
        .then(student => {
          studentSubject.fullName = student.getFullName()
          resolve(studentSubject)
        })
      })
    })

    Promise.all(newSubject)
    .then(studentSubject => {
      // res.send(studentSubject)
      res.render('subjects/enrolledstudents', {dataSubject: subject, dataStudentSubject: studentSubject})
    })
  })
})

router.get('/:id/givescore', function (req, res) {
  console.log(req.params);
  Model.StudentSubject.findOne({
    include: [Model.Subject, Model.Student],
    attributes: ['id', 'StudentId', 'SubjectId', 'score'],
    where: req.params
  })
  .then(subject => {
    // res.send(subject)
    res.render('subjects/givescore', {dataSubject: subject})
  })
  .catch(error => {
    res.send(error)
  })
})

router.post('/:id/givescore', function (req, res) {
  Model.StudentSubject.findOne({
    // include: [Model.Subject, Model.Student],
    attributes: ['id', 'StudentId', 'SubjectId', 'score'],
    where: req.params
  })
  .then(studentSubject => {
    Model.StudentSubject.update(req.body, {where: req.params})
    .then(() => {
      res.redirect('/subjects/'+studentSubject.SubjectId+'/enrolledstudents')
    })
    .catch(error => {
      res.send(error)
    })
  })
  .catch(error => {
    res.send(error)
  })
})

module.exports = router
