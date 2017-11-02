const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) => {
  model.Student.findAll().then((student) => {
    res.render('student', {student: student})
  })
})

router.get('/add', (req, res) => {
  res.render('studentadd', {pesan: ''})
})

router.post('/add', (req, res) => {
  model.Student.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email}).then(() => {
    res.redirect('/students')
  }).catch((err) => {
    res.render('studentadd', {pesan: err.errors[0].message})
  })
})

router.get('/delete/:id', (req, res) => {
  model.Student.destroy({where: {id: req.params.id}}).then(() => {
    res.redirect('/students')
  })
})

router.get('/edit/:id', (req, res) => {
  model.Student.findOne({where: {id: req.params.id}}).then((student) => {
    res.render('studentedit', {student: student, pesan: ''})
  })
})

router.post('/edit/:id', (req, res) => {
  model.Student.update({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, id: req.params.id}, {where: {id: req.params.id}}).then(() => {
    res.redirect('/students')
  }).catch((err) => {
    model.Student.findOne({where: {id: req.params.id}}).then((student) => {
      res.render('studentedit', {student: student, pesan: err.errors[0].message})
    })
  })
})

module.exports = router
