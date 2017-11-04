const express = require('express')
const router  = express.Router()
const model   = require('../models')

//CREATE
router.get('/add',function(req,res){
  res.render('subjects-add')
})
router.post('/add',function(req,res){
  model.Subjects.create({
    subject_name : req.body.subject_name
  }).then(function(){
    res.redirect('../../subjects')
  }).catch(function(err){
    console.log(err);
  })
})

//READ
router.get('/', function(req,res){
  model.Subjects.findAll().then(data_Subjects=>{
    res.render('subjects',{data_Subjects:data_Subjects})
  }).catch(err=>{
    console.log(err);
  })
})

//UPDATE
router.get('/edit/:id',function(req,res){
  model.Subjects.findById(req.params.id).then(function(data_Subjects){
    res.render('subjects-edit',{data_Subjects:data_Subjects})
  }).catch(function(err){
    console.log(err);
  })
})
router.post('/edit/:id',function(req,res){
  model.Subjects.update({
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
  model.Subjects.destroy({
    where : {
      id  : req.params.id
    }
  }).then(function(){
    res.redirect('../../subjects')
  }).catch(function(err){
    console.log(err);
  })
})


module.exports=router
