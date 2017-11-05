const express = require('express');
const db = require(`../models`);
const router = express.Router();


router.get('/', (req,res) => {
  db.Teacher.findAll({
    include: [db.Subject]
  }).then((results) => {
    res.render('teachers', {results});
  }).catch((err) => {
    res.send(err);
  })
})

router.get('/add', (req, res) => {
  res.render('addTeacher');
})

router.post('/add', (req, res) => {
  db.Teacher.create(req.body).then(success => {
    res.redirect('/teachers');
  }).then(err => {
    console.log(err);
  })
})

router.get('/edit/:id', (req, res) => {
  db.Teacher.findById(req.params.id)
  .then(teacherData => {
    db.Subject.findAll()
    .then(subjectsData => {
      res.render('editTeacher', {teacherData, subjectsData})
    })
  }).catch(err => {
    console.log(err);
  })
})

router.post('/edit/:id', (req, res) => {
  db.Teacher.findById(req.params.id)
  .then(teacher => {
    teacher.update(req.body)
    .then(result => {
      res.redirect('/teachers')
    })
  }).catch(err => {
    console.log(err);
  })
})


module.exports = router;