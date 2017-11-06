const express = require('express');
const Model = require('../models');

const route = express.Router();


route.get('/',(req,res)=>{
  Model.Student.findAll({order: ['first_name']}).then(data=>{
    // res.send(data)
    res.render('student',{student : data})
  })
})

route.get('/add',(req,res)=>{
  let err  ='';
  let uniq ='';
  res.render('studentAdd',{err : err,uniq : uniq})
})


route.post('/add',(req,res)=>{
  Model.Student.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email })
  .then(task => {
    res.redirect('/student')
  })
  .catch(err=>{
    err = err.errors[0].type +' : ' + err.errors[0].message
    // res.send(err)
    // err =
    res.render('studentAdd',{err})
  })

})

route.get('/edit/:id',(req,res)=>{
  Model.Student.findById(req.params.id).then(data => {
  // res.send(data)
    res.render('studentEdit',{edit : data})
  })
})

route.post('/edit/:id',(req,res)=>{
  Model.Student.update({first_name:req.body.first_name, last_name: req.body.last_name, email: req.body.email },{where: { id: req.params.id }})
  .then(() => {res.redirect('/student')})
})

route.get('/delete/:id',(req,res)=>{
  Model.Student.destroy({where :{id : req.params.id}}).then(()=>{
    Model.SubjectWithStudent.destroy({where :{studentId : req.params.id}})
    res.redirect('/student')
  })
})

route.get('/:id/addsubject',(req,res)=>{
  Model.Student.findById(req.params.id).then(student=>{
    Model.Subject.findAll().then(subjects => {
      res.render('addSubjectStudent',{student : student, subjects : subjects})
    })
  })
})

route.post('/:id/addsubject',(req,res)=>{
  // res.send(req.params.id)
  Model.SubjectWithStudent.create({subjectId : req.body.subject,studentId : req.params.id})
  .then(subject=>{
    res.redirect('/student')
  })
})


// Task.destroy({ where: {subject: 'programming'},truncate: true /* this will ignore where and truncate the table instead */
//   });

module.exports = route;
