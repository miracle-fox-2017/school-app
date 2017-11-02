const express = require('express')
const Model = require('../models')

const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  Model.Subject.findAll({order: [['id', 'ASC']]})
  .then(dataSubjects => {
    res.render('subjects/index', {dataSubjects: dataSubjects})
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

module.exports = router
