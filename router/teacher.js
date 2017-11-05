const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/teacher',function(req,res) {
  db.teacher.findAll({order:[['id','ASC']],include:[db.Subject]}).then(rows =>{
        res.render('teacher',{rows:rows})
        // res.send(rows);
  })
})

router.post('/teacher',function(req,res) {
  db.teacher.create({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email})
    .then(rows =>{
      res.redirect('teacher')
    })
})

router.get('/teacher/delete/:id',function(req,res) {
  db.teacher.destroy({where:{id:req.params.id}}).then(rows =>{
    res.redirect('/teacher')
  })
})

router.get('/teacher/edit/:id',function(req,res) {
  db.teacher.findOne({where:{id:req.params.id}}).then(rows => {
    db.Subject.findAll().then(subs => {
        res.render('edittheacher',{rows:rows,subs:subs})
    })
  })
})

router.post('/teacher/edit/:id',function(req,res) {
  db.teacher.update({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email,subject:req.body.Subject},{where:{id:req.params.id}})
  .then(rows =>{
    res.redirect('/teacher')
  })
})
module.exports = router;
