const express = require('express')
const Model = require('../models')

const router = express.Router()

// define the teachers page route
router.get('/', function (req, res) {
  Model.Teacher.findAll({order: [['id', 'ASC']]})
  .then(dataTeachers => {
    // res.send(dataTeachers)
    res.render('teachers/index', {dataTeachers: dataTeachers})
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/add', function (req, res) {
  res.render('teachers/add')
})

router.post('/add', function (req, res) {
  Model.Teacher.create(req.body)
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/edit/:id', function (req, res) {
  Model.Teacher.findById(req.params.id)
  .then(dataTeacher => {
    res.render('teachers/edit', {dataTeacher: dataTeacher})
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
