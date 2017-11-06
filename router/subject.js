const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/subjects',(req,res)=>{
  model.Subject.findAll({include:[{model: model.Teachers}]}).then((dataSubject)=>{
    console.log(dataSubject[1].dataValues.Teachers[1].dataValues.first_name)
    let status = ''
    res.render('subject',{dataSubject, status})
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/subjects/:id/enrolledstudents', (req,res)=>{
  model.SubStudent.findAll( { where:{ subjectId:req.params.id }, include:[{model: model.Subjects, as:'subject'},{model: model.Students, as:'student'}]}).then((dataSubStudent)=>{
    let status = 'enroll'
    res.render('subject', { dataSubStudent, status })
  })
})
module.exports = router
