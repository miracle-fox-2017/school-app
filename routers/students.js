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
  model.Student.findAll().then(data_Students=>{
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
    email      : req.body.email
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




module.exports=router
