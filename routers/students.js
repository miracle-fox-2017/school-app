const express = require('express')
const router  = express.Router()
const model   = require('../models')


//CREATE
router.get('/add', function(req,res){
  res.render('students-add',{error:''})
})

router.post('/add', function(req,res){
  model.Student.create({
    first_name : req.body.first_name,
    last_name  : req.body.last_name,
    email      : req.body.email
  }).then(function(){
    res.redirect('../../students')
  }).catch(err=>{
    console.log(err)
    res.render('students-add',{error:err.message})
  })
})

//READ
router.get('/', function(req,res){
  model.Student.findAll({
    order: [['first_name', 'ASC']]
  }).then(data_Students=>{
    res.render('students', {data_Students:data_Students})
  }).catch(err =>{
    console.log(err);
  })
})

//UPDATE
router.get('/edit/:id', function(req,res){
  model.Student.findById(req.params.id).then(data_Students=>{
    res.render('students-edit',{data_Students:data_Students})
  }).catch(err=>{
    console.log(err);
  })
})
router.post('/edit/:id', function(req,res){
  model.Student.update({
    first_name : req.body.first_name,
    last_name  : req.body.last_name,
    email      : req.body.email,
    id         : req.params.id
  },{
    where :{
      id  : req.params.id
    }
  }).then(function(){
    res.redirect('../../students')
  }).catch(err=>{
    console.log(err);
  })
})

//DELETE
router.get('/delete/:id', function(req,res){
  model.Student.destroy({
    where : {
      id  : req.params.id
    }
  }).then(function(){
    res.redirect('../../students')
  }).catch(err=>{
    console.log(err);
  })
})

//----------------------
// CREATE ADD SUBJECT
//----------------------

router.get('/:id/addsubject', function(req,res){
  model.Student.findById(req.params.id).then( data_Students => {
    model.Subject.findAll().then( data_Subject => {
      // res.send(data_Students)
      res.render('students-addsubject', {data_Students:data_Students,data_Subject:data_Subject})
    })
  }).catch(err => {
    console.log(err);
  })
})

router.post('/:id/addsubject', function(req,res){
  model.StudentSubject.create({
    StudentId : req.params.id,
    SubjectId : req.body.SubjectId
  }).then(function(){
    res.redirect('../../students')
  }).catch(function(err){
    console.log(err);
  })
})




module.exports=router
