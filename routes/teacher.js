const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/',function(req, res){
  db.Teacher.findAll({
    include:[db.Subject],
    order: [['first_name', 'ASC']]
  }).then(function(rows){
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
    db.Subject.findAll().then(function(rowsSubject){
      res.render('editTeacher', {rowsEdit : rows, rowsSubject: rowsSubject})
    })
  })
})

router.post('/edit/:id', function(req, res) {
  db.Teacher.findById(req.params.id).then((rowsTeacher) => {
    rowsTeacher.update(req.body).then(() => {
      res.redirect('/teachers')
    }).catch((err) => {
      console.log(err);
      // db.Subject.findById(req.params.id).then((rowsEdit) => {
      //   res.render('editTeacher', {rowsEdit : rowsEdit})
      // })
    })
  })
})

router.get('/delete/:id', function(req, res){
  db.Teacher.destroy({where: {id:req.params.id}
  }).then(function() {
    res.redirect('/teachers')
  })
})

module.exports = router
