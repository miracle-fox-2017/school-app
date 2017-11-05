const express = require('express')
const router  = express.Router()
const model   = require('../models')

//CREATE
router.get('/add',function(req,res){
  res.render('teachers-add',{error:''})
})
router.post('/add',function(req,res){
  model.Teacher.create({
    first_name : req.body.first_name,
    last_name  : req.body.last_name,
    email      : req.body.email
  }).then(function(){
    res.redirect('../../teachers')
  }).catch(function(err){
    console.log(err);
  })
})

//READ
router.get('/',function(req,res){
  //test manipulasi data
  model.Teacher.findAll().then(data_teachers => {
    let teacherWithSubject = data_teachers.map(teachers => {
      return new Promise(function(resolve,reject){
        teachers.getSubject().then(withSubject => {
          teachers.subject = withSubject
          resolve(teachers)
        })
      })
    })
    Promise.all(teacherWithSubject).then(teachersAndSubjects => {
      // console.log(teachersAndSubjects);
      res.render('teachers', {data_teachers:teachersAndSubjects})
    })
  }).catch(err => {
    console.log(err);
  })
})

//UPDATE
router.get('/edit/:id',function(req,res){
  model.Teacher.findById(req.params.id).then(function(data_teachers){
    model.Subject.findAll().then(function(data_Subjects){
      res.render('teachers-edit',{data_teachers:data_teachers,data_Subjects:data_Subjects})
    }).catch(function(err){
      console.log(err,'findAll Subject in Teacher');
    })
  }).catch(function(err){
    console.log(err);
  })
})
router.post('/edit/:id',function(req,res){
  model.Teacher.update({
    first_name : req.body.first_name,
    last_name  : req.body.last_name,
    email      : req.body.email,
    SubjectId  : req.body.SubjectId
  },{
    where : {
      id  : req.params.id
    }
  }).then(function(){
    res.redirect('../../teachers')
  }).catch(function(err){
    console.log(err);
  })
})

//DELETE
router.get('/delete/:id',function(req,res){
  model.Teacher.destroy({
    where : {
      id  : req.params.id
    }
  }).then(function(){
    res.redirect('../../teachers')
  }).catch(function(err){
    console.log(err);
  })
})

module.exports=router
