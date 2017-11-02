const express = require('express')
const router  = express.Router()
const model   = require('../models')

router.get('/', function(req,res){
  model.Subjects.findAll().then(data_Subject=>{
    res.render('subjects',{data_Subject:data_Subject})
  }).catch(err=>{
    console.log(err);
  })
})



module.exports=router
