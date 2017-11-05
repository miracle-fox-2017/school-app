const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/subjects',(req,res)=>{
  model.Subjects.findAll({include:[{model: model.Teachers}]}).then((subjectsRows)=>{
    console.log(subjectsRows[1].dataValues.Teachers[1].dataValues.first_name)
    res.render('subject',{subjectsRows})
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/subjects/:id/enrolledstudents', (req,res)=>{
  model.SubStudents.findAll().then((substudentsRows)=>{
    console.log(substudentsRows)
    res.send(substudentsRows)
  })
})
module.exports = router
