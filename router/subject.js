const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/subjects',(req,res)=>{
  model.Subjects.findAll().then((subjectsRows)=>{
    console.log(subjectsRows)
    res.render('subject',{subjectsRows})
  }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router
