const express = require('express');
const router = express.Router();

const db = require('../models');
//

router.get('/',function(req, res){
  db.Student.findAll({include:
  [db.Subject]}).then(function(rows){
    res.render('student', {rowsStudent : rows})
  }).catch(function(err){
    console.log(err);
  })
})

router.get('/add',function(req, res){
    res.render('addStudent')
})

router.post('/add',function(req, res){
  db.Student.create(req.body).then(function(){
    res.redirect('/students')
  })
})

router.get('/edit/:id',function(req, res){
  db.Student.findById(req.params.id).then(function(rows){
    res.render('editStudent', {rowsEdit : rows})
  })
})

router.post('/edit/:id', function(req, res) {

   db.Student.update(req.body, {where: { id: req.params.id }
   }).then(function() {
     res.redirect('/students')
   })
})

router.get('/delete/:id', function(req, res){
  db.Student.destroy({where: {id:req.params.id}
  }).then(function() {
    res.redirect('/students')
  })
})

router.get('/:id/addsubject',function(req, res){
  db.Student.findById(req.params.id).then(function(rowsStudent){
    db.Subject.findAll().then(function(rows){
      res.render('addSubjectToStudent', {rowsStudent: rowsStudent, rowsSubject : rows})
    }).catch(function(err){
      console.log(err);
    })
  })
})

router.post('/:id/addsubject', function(req, res){
  db.StudentSubject.create(req.body).then(function(){
    // console.log(rowsStudentSubject);
    res.redirect('/students')
  })
})

module.exports = router
