const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/student',function(req,res) {
  db.Student.findAll().then(rows =>{
    res.render('student',{rows:rows,err:null})
  })
  .catch(err =>{
    res.render('student',{err:err})
  })
})

router.post('/student',function(req,res) {
  console.log("alang");
  db.Student.create({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email})
    .then(rows =>{
      res.redirect('/student')
    })
    .catch(rows=>{
      db.Student.findAll().then(rows =>{
        res.render('student',{rows:rows,err:true})
      })
    })
})

router.get('/student/delete/:id',function(req,res) {
  db.Student.destroy({where:{id:req.params.id}}).then(rows =>{
    res.redirect('/student')
  })
})

router.get('/student/edit/:id',function(req,res) {
  db.Student.findOne({where:{id:req.params.id}}).then(rows =>{
    res.render('editstudent',{rows:rows})
    // res.send(rows)
  })
})

router.post('/student/edit/:id',function(req,res) {
  db.Student.update({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email},{where:{id:req.params.id}})
  .then(rows =>{
    res.redirect('/student')
  })
})

module.exports = router;
