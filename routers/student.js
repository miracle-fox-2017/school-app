const express = require('express')
const router = express.Router()
const model = require('../models')
const full_name = require('../helper/full_name');

router.get('/', (req, res) => {
  model.Student.findAll().then((student) => {
    student.forEach((elemen) => {
      elemen.full_name = full_name(elemen)
    })
    res.render('student', {student: student, title: 'student'})
  })
})

router.get('/add', (req, res) => {
  res.render('studentadd', {pesan: '', title: 'student add'})
})

router.post('/add', (req, res) => {
  model.Student.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email}).then(() => {
    res.redirect('/students')
  }).catch((err) => {
    res.render('studentadd', {pesan: err.errors[0].message, title: 'student add'})
  })
})

router.get('/delete/:id', (req, res) => {
  model.Student.destroy({where: {id: req.params.id}}).then(() => {
    model.StudentSubject.destroy({where: {StudentId: req.params.id}}).then(() => {
      res.redirect('/students')
    })
  })
})


router.get('/edit/:id', (req, res) => {
  model.Student.findOne({where: {id: req.params.id}}).then((student) => {
    res.render('studentedit', {student: student, pesan: '', title: 'student edit'})
  })
})

router.post('/edit/:id', (req, res) => {
  model.Student.update({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, id: req.params.id}, {where: {id: req.params.id}}).then(() => {
    res.redirect('/students')
  }).catch((err) => {
    model.Student.findOne({where: {id: req.params.id}}).then((student) => {
      res.render('studentedit', {student: student, pesan: err.errors[0].message, title: 'student edit'})
    })
  })
})

router.get('/:id/addsubject', (req, res) => {
  model.Student.findOne({where: {id:req.params.id}}).then((student) => {
    model.Subject.findAll().then((subject) => {
      res.render('studentaddsubject', {student: student, subject: subject, title: 'add subject'})
    })
  })
})

router.post('/:id/addsubject', (req, res) => {
  model.StudentSubject.create({StudentId: req.params.id, SubjectId: req.body.id}).then(() => {
    res.redirect('/students')
  })
})

module.exports = router
