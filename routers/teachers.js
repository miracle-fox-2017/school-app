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
  model.Teacher.findAll().then(function(data_teachers){
    res.render('teachers',{data_teachers:data_teachers})
  }).catch(function(err){
    console.log(err);
  })
})

//UPDATE
router.get('/edit/:id',function(req,res){
  model.Teacher.findById(req.params.id).then(function(data_teachers){
    res.render('teachers-edit',{data_teachers:data_teachers})
  }).catch(function(err){
    console.log(err);
  })
})
router.post('/edit/:id',function(req,res){
  model.Teacher.update({
    first_name : req.body.first_name,
    last_name  : req.body.last_name,
    email      : req.body.email
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
