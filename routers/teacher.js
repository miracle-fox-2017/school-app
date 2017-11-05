const express = require('express')
const Model = require('../models')

const router = express.Router()

// define the teachers page route
router.get('/', function (req, res) {
  Model.Teacher.findAll({order: [['first_name', 'ASC']]})
  .then(teachers => {
    let newTeachers = teachers.map(teacher => {
      return new Promise((resolve, reject) => {
        teacher.getSubject()
        .then(teacherSubject => {
          teacher.teacherSubject = teacherSubject
          resolve(teacher)
        })
      })
    })

    Promise.all(newTeachers)
    .then(dataTeachers => {
      // console.log(dataTeachers[0]);
      // res.send(dataTeachers[0].teacherSubject.subject_name)
      res.render('teachers/index', {dataTeachers: dataTeachers})
    })
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/add', function (req, res) {
  res.render('teachers/add', {error: false})
})

router.post('/add', function (req, res) {
  Model.Teacher.create(req.body)
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(error => {
    res.render('teachers/add', {error: error.message})
  })
})

router.get('/edit/:id', function (req, res) {
  Model.Teacher.findById(req.params.id)
  .then(dataTeacher => {
    Model.Subject.findAll()
    .then(dataSubjects => {
      res.render('teachers/edit', {dataTeacher: dataTeacher, dataSubjects: dataSubjects})
    })
  })
  .catch(error => {
    res.send(error)
  })
})

router.post('/edit/:id', function (req, res) {
  Model.Teacher.update(req.body, {where: req.params})
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/delete/:id', function (req, res) {
  Model.Teacher.destroy({where: req.params})
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(error => {
    res.send(error)
  })
})

module.exports = router
