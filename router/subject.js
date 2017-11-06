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

router.get('/subjects/:id/enrolledstudents', (req,res)=>{
  model.SubStudents.findAll( { where:{ subjectId:req.params.id }, include:[{model: model.Subjects, as:'subject'},{model: model.Students, as:'student'}]}).then((dataSubStudents)=>{
    let status = 'enroll'
    res.render('subject', { dataSubStudents, status })
  })
})

router.get('/subjects/:id/addscore', (req,res) => {
  model.SubStudents.findAll( { attributes:['id'], where:{ studentId:req.params.id }, include:[{model: model.Subjects, as:'subject'},{model: model.Students, as:'student'}]})
  .then((dataSubStudents) => {
    let status = 'addscore'

    res.render('subject', {dataSubStudents, status})
  })
})

router.post('/subjects/:id/addscore', (req,res) => {
  let obj = { score:req.body.score }
  let option = {where: { id: req.params.id }}
  model.SubStudents.update( obj, option).then((success) => {
    res.redirect('/subjects')
  })
})

module.exports = router
