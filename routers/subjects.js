const express = require('express')
const router  = express.Router()
const model   = require('../models')

//CREATE
router.get('/add',function(req,res){
  res.render('subjects-add')
})
router.post('/add',function(req,res){
  model.Subject.create({
    subject_name : req.body.subject_name
  }).then(function(){
    res.redirect('../../subjects')
  }).catch(function(err){
    console.log(err);
  })
})

//READ
router.get('/', function(req,res){
  model.Subject.findAll().then(data_Subjects=>{
    //test manipulasi data
    let subjectsWithTeachers = data_Subjects.map( subjects => {
      return new Promise(function(resolve,reject){
        subjects.getTeachers().then(withTeacher => {
          subjects.teacher = withTeacher
          resolve(subjects)
        })
      })
    })
    Promise.all(subjectsWithTeachers).then(subjectsAndTeachers => {
      // console.log(subjectsAndTeachers);
      res.render('subjects', {data_Subjects:subjectsAndTeachers})
    })
  }).catch(err=>{
    console.log(err);
  })
})

//UPDATE
router.get('/edit/:id',function(req,res){
  model.Subject.findById(req.params.id).then(function(data_Subjects){
    res.render('subjects-edit',{data_Subjects:data_Subjects})
  }).catch(function(err){
    console.log(err);
  })
})
router.post('/edit/:id',function(req,res){
  model.Subject.update({
    subject_name : req.body.subject_name
  },{
    where : {
      id  : req.params.id
    }
  }).then(function(){
    res.redirect('../../subjects')
  }).catch(function(err){
    console.log(err);
  })
})

//DELETE
router.get('/delete/:id',function(req,res){
  model.Subject.destroy({
    where : {
      id  : req.params.id
    }
  }).then(function(){
    res.redirect('../../subjects')
  }).catch(function(err){
    console.log(err);
  })
})

//------------------------
//  GET ENROLLED STUDENT
//------------------------

router.get('/:id/enrolledstudents', function(req,res){
  model.StudentSubject.findAll({
    include : [model.Student],
    attributes: ['id','SubjectId','StudentId','score'],
    where : {
      SubjectId : req.params.id
    }
  }).then(data_StudentSubject=>{
    model.Subject.findById(req.params.id).then(data_Subjects => {
      res.render('subjects-enrolledstudents',{data_StudentSubject:data_StudentSubject,data_Subjects:data_Subjects.subject_name})
    })
  }).catch(err => {
    console.log(err);
  })
})

//----------------------
//    GET GIVE SCORE
//----------------------
router.get('/:id/givescore', function(req,res){
  // res.send(req.params.id)
  model.Subject.findById(req.params.id).then(data_StudentSubject=>{
    console.log(data_StudentSubject)
    // Promise.all([
    //   model.Subject.findById(data_StudentSubject.SubjectId),
    //   model.Student.findById(data_StudentSubject.StudentId)
    // ]).then(allData=>{
    //   // console.log('>>>>',data_StudentSubject);
    //   res.send(data_StudentSubject)
    //   res.render('give-score',{data_StudentSubject:data_StudentSubject,data_Subjects:allData[0],data_Students:allData[1]})
    // })
  }).catch(err=>{
    console.log(err);
  })
})


module.exports=router
