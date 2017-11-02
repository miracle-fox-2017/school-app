const express = require('express')
const router  = express.Router()
const model   = require('../models')

router.get('/', function(req,res){
  model.Teacher.findAll().then(data_teachers=>{
    res.render('teachers',{data_teachers:data_teachers})
  }).catch(err=>{
    console.log(err);
  })
})

module.exports=router
