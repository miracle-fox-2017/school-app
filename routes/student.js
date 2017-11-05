const express = require('express');
const router = express.Router();

const db = require('../models');
//

router.get('/',function(req, res){
  db.Student.findAll().then(function(rows){
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
   let data = {
     id    : req.params.id,
     first_name : req.body.first_name,
     last_name : req.body.last_name,
     email  : req.body.email
   };

   db.Student.update(data, {where: { id: req.params.id }
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

module.exports = router
