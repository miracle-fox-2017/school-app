const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/subjects',(req,res)=>{
  model.Subjects.findAll({include:[{model: model.Teachers}]}).then((subjectsRows)=>{    let status = ''
    res.render('subject',{subjectsRows, status})
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/subjects/:id/enrolledstudents', (req,res)=>{
  model.SubStudents.findAll( { where:{ subjectId:req.params.id }, include:[{model: model.Subjects, as:'subject'},{model: model.Students, as:'student'}]}).then((substudentsRows)=>{
    let status = 'enroll'
    res.render('subject', { substudentsRows, status })
  })
})
module.exports = router
