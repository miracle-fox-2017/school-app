const express = require('express')
const Model = require('../models')

const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  Model.Student.findAll({order: [['id', 'ASC']]})
  .then(dataStudents => {
    res.render('students/index', {dataStudents: dataStudents})
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/add', function (req, res) {
  res.render('students/add', {error: false})
})

router.post('/add', function (req, res) {
  Model.Student.create(req.body)
  .then(() => {
    res.redirect('/students')
  })
  .catch(error => {
    // console.log(error);
    // res.send(error.errors[0].message)
    res.render('students/add', {error: error.message})
  })
})

router.get('/edit/:id', function (req, res) {
  Model.Student.findById(req.params.id)
  .then(dataStudent => {
    res.render('students/edit', {dataStudent: dataStudent})
  })
  .catch(error => {
    res.send(error)
  })
})

router.post('/edit/:id', function (req, res) {
  Model.Student.update(req.body, {where: req.params})
  .then(() => {
    res.redirect('/students')
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/delete/:id', function (req, res) {
  Model.Student.destroy({where: req.params})
  .then(dataStudent => {
    res.redirect('/students')
  })
  .catch(error => {
    res.send(error)
  })
})

module.exports = router
