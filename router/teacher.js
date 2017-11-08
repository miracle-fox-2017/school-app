const express = require('express');
const router = express.Router();

const db = require('../models')

router.get('/', function (req, res){
  db.Teacher.findAll({
    include: [db.Subject],
    order: [
      ['first_name','ASC']
    ]
  }).then(function (teachData){
    res.render('teacher',{teachData:teachData})
    // res.send(teachData[0].Subject.subject_name)
  }).catch(function(err){
      console.log(err);
  })
})

router.get('/add', function(req, res){
  res.render('teacherAdd')
})

router.post('/add', function(req, res){
  db.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }).then(function(berhasil){
    res.redirect('/teachers')
  }).catch(function(err){
    console.log(err);
  })
})

router.get('/edit/:id', function(req, res){
  db.Teacher.findById(req.params.id).then(function(teachData){
    db.Subject.findAll()
    .then(function(subjData){
      res.render('teacherEdit', {teachData:teachData, subjData:subjData})
    })
  }).catch(function(err){
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res){
  db.Teacher.findById(req.params.id).then(function(teachData){
    teachData.update(req.body).then(function(berhasil){
      res.redirect('/teachers')
    }).catch(function(err){
      console.log(err);
    })
  }).catch(function(err){
    console.log(err);
  })
})

router.get('/delete/:id', function(req, res){
  db.Teacher.destroy({
    where : {id: req.params.id}
  }).then(function(deleted){
    res.redirect('/teachers')
  }).catch(function(err){
    console.log(err);
  })
})

module.exports = router