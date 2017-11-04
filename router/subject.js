const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/subject',function(req,res) {
  db.Subject.findAll({order:[['id','ASC']]}).then(rows => {
    res.render('subject',{rows:rows})
  })
})

router.post('/subject',function(req,res) {
  db.Subject.create({subject_name:req.body.subject_name}).then(rows =>{
    res.redirect('subject')
  })
})

router.get('/subject/delete/:id',function(req,res) {
  db.Subject.destroy({where:{id:req.params.id}}).then(rows =>{
    res.redirect('/subject')
  })
})

router.get('/subject/edit/:id',function(req,res) {
  db.Subject.findOne({where:{id:req.params.id}}).then(rows =>{
    res.render('editsubject',{rows,rows})
  })
})

router.post('/subject/edit/:id',function(req,res) {
  db.Subject.update({subject_name:req.body.subject_name},{where:{id:req.params.id}})
    .then(rows =>{
      res.redirect('/subject')
    })
})
module.exports = router;
