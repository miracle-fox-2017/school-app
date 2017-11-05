const express = require('express')
const Model = require('../models')

const router = express.Router()

// define the home page route
/* -----------------------------------------------------------------------------
##Use include
router.get('/', function (req, res) {
  Model.Subject.findAll({
    // include: Model.Teacher
    include: [{
      model: Model.Teacher,
      attributes: ['first_name', 'last_name']
    }],
    order: [['subject_name', 'ASC']]
  })
  .then(dataSubjects => {
    res.render('subjects/index', {dataSubjects: dataSubjects})
  })
  .catch(error => {
    res.send(error)
  })
})
----------------------------------------------------------------------------- */

router.get('/', function (req, res) {
  Model.Subject.findAll({order: [['subject_name', 'ASC']]})
  .then(subjects => {
    let newSubjects = subjects.map(subject => {
      return new Promise((resolve, reject) => {
      // console.log(subject);
      // res.send(subject)
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

module.exports = router
