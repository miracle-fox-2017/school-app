const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/',function(req, res){
  db.Teacher.findAll().then(function(rows){
    res.render('teacher', {rowsTeacher : rows})
  }).catch(function(err){
    console.log(err);
  })
})

router.get('/add',function(req, res){
    res.render('addTeacher')
})

router.post('/add',function(req, res){
  db.Teacher.create(req.body).then(function(){
    res.redirect('/teachers')
  })
})

router.get('/edit/:id',function(req, res){
  db.Teacher.findById(req.params.id).then(function(rows){
    res.render('editTeacher', {rowsEdit : rows})
  })
})

router.post('/edit/:id', function(req, res) {
   let data = {
     id    : req.params.id,
     first_name : req.body.first_name,
     last_name : req.body.last_name,
     email  : req.body.email
   };

   db.Teacher.update(data, {where: { id: req.params.id }
   }).then(function() {
     res.redirect('/teachers')
   })
})

router.get('/delete/:id', function(req, res){
  db.Teacher.destroy({where: {id:req.params.id}
  }).then(function() {
    res.redirect('/teachers')
  })
})

module.exports = router
