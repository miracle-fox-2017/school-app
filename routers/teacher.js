const express = require('express');
const Models = require('../models')

const route = express.Router();


route.get('/',(req,res)=>{
  Models.Teacher.findAll({order: ['first_name']}).then( teachers => {
    let newteacher = teachers.map( teacher => {
      return new Promise ( (resolve,reject) => {
        teacher.getSubject().then( subject => {
          // console.log(subject);
          teacher.subject = subject;
          resolve(teacher)
        })
      })
    })
    // data.
    // console.log(teachers[0].classMethods);
    // res.send(teacher)
    Promise.all(newteacher).then( newsubject => {
      // console.log(newsubject);
      // res.send(newsubject[0].subject_name)
      res.render('teacher',{teacher : newsubject})
    })
  })
})

route.get('/edit/:id',(req,res) => {
  Models.Teacher.findById(req.params.id).then( teacher => {
    Models.Subject.findAll().then( subject => {
      // res.send(subject)
      res.render('editTeacher',{teacher :teacher, subject : subject})
    })
    // res.render('editTeacher',{teacher})
  })

  // res.render('editTeacher',{})
})

route.post('/edit/:id',(req,res) => {
  Models.Teacher.update({first_name:req.body.first_name, last_name: req.body.last_name, email: req.body.email, subjectId : req.body.subject },
    {where: { id: req.params.id }})
    .then(() => {res.redirect('/teacher')})
  // res.send(req.body.first_name)
})


route.get('/add',(req,res)=>{
  let err  ='';
  res.render('addTeacher',{err : err})
})

route.post('/add',(req,res)=>{
  Models.Teacher.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email })
  .then(task=>{
      res.redirect('/teacher')
  })
  .catch(err =>{
      err = err.errors[0].type +' : ' + err.errors[0].message
      res.render('studentAdd',{err})
  })
})

route.get('/delete/:id',(req,res)=>{
  Models.Teacher.destroy({where :{id : req.params.id}}).then(()=>{
    res.redirect('/teacher')
  })
})



module.exports = route;
