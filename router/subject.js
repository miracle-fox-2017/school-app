const express = require('express');
const model = require('../models')
const router = express.Router();


router.get('/subjects',(req,res)=>{
  model.Subjects.findAll({include:[{model: model.Teachers}]}).then((dataSubject)=>{    let status = ''
    res.render('subject',{dataSubject, status})
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/subjects/:id/enrolledstudents', (req,res)=>{
  model.SubStudents.findAll( { where:{ subjectId:req.params.id }, include:[{model: model.Subjects, as:'subject'},{model: model.Students, as:'student'}]}).then((dataSubStudents)=>{
    let status = 'enroll'
    res.render('subject', { dataSubStudents, status })
  })
})

module.exports = router
