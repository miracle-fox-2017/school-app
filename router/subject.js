const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/subject',function(req,res) {
  db.Subject.findAll({order:[['id','ASC']],include:[db.teacher]}).then(rows => {
      // console.log(rows[0].teachers);
      res.render('subject',{rows:rows})
      // res.send(rows)
  })
})

router.get('/subjects/:id/enrolledstudents',function(req,res) {
  db.StudentSubject.findOne({attributes:['id','SubjectId','StudentId','Score'],where:{SubjectId:req.params.id},include:[db.Subject,db.Student]}).then(rows =>{
    // db.Student.findAll().then(stud =>{
      res.render('enrollstudent',{rows:rows})
      // res.send(rows);
    // })
  })
})

router.get('/subjects/:id/addscore', (req,res) => {
  db.StudentSubject.findAll( { attributes:['id'], where:{ studentId:req.params.id }, include:[db.Subjects,db.Students]})
  .then((rows) => {
    res.render('givescore')
  })
})

router.post('/subjects/:id/addscore', (req,res) => {
  let obj = { score:req.body.score }
  let option = {where: { id: req.params.id }}
  db.StudentSubject.update( obj, option).then((success) => {
    res.redirect('/subjects')
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
      db.teacher.findAll().then(teach => {
        res.render('editsubject',{rows,rows,teach:teach})
        // res.send(teach)
      })
    })
  })

router.post('/subject/edit/:id',function(req,res) {
  db.Subject.update({subject_name:req.body.subject_name,select:req.body.getFullName},{where:{id:req.params.id}})
    .then(rows =>{
      res.redirect('/subject')
    })
})
module.exports = router;
