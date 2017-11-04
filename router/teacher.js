const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/teachers',(req,res)=>{
  
  model.Teachers.findAll().then((teachersRows)=>{
    res.render('teacher',{teachersRows})
  }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router
