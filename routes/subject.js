const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/',function(req, res){
  db.Subject.findAll({include:
  [db.Teacher]}).then(function(rows){
    // res.send(rows)
    res.render('subject', {rowsSubject : rows})
  }).catch(function(err){
    console.log(err);
  })
})

router.get('/add',function(req, res){
    res.render('addSubject')
})

router.post('/add',function(req, res){
  db.Subject.create(req.body).then(function(){
    res.redirect('/subjects')
  })
})

router.get('/:id/enrolledstudents', function(req, res){
  db.Subject.findById(req.params.id).then(function(rowsSubject){
    rowsSubject.getStudents().then(function(rowsStudent){
      res.render('enrolledstudent', {rowsSubject: rowsSubject, rowsStudent: rowsStudent})
    })
  }).catch(function(err){
    console.log(err);
  })
})

router.get('/:id/givescore', function(req, res){
  db.StudentSubject.findById(req.params.id).then(function(rows){
    res.render('givescore', {rowsConjunction : rows})
  })
})

router.post('/:id/givescore', function(req, res){
  console.log(req.params.id);
  db.StudentSubject.findById(req.params.id).then(function(rowsConjunction){
    rowsConjunction.update({score: req.body.score})
    .then(function(){
      res.redirect(`/subjects/${rowsConjunction.SubjectId}/enrolledstudents`)
    })
  })
})

module.exports = router
