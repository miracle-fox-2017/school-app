const express = require('express');
const router = express.Router();
const model = require('../models')
const konversi = require('../helper/scores.js')
router.get('/subjects',(req,res)=>{
  model.Subjects.findAll({include:[{model: model.Teachers}]}).then((subjectsRows)=>{
    console.log(subjectsRows[1].dataValues)
    let status = 'tampil'
    res.render('subject',{subjectsRows, status})
  }).catch((err)=>{
    console.log(err)
  })
})
//enroll student
router.get('/subjects/:id/enrolledstudents', (req,res)=>{
  model.SubStudents.findAll( { where:{ subjectId:req.params.id }, include:[{model: model.Subjects, as:'subject'},{model: model.Students, as:'student'}]}).then((substudentsRows)=>{
    let status = 'enroll'
    console.log(substudentsRows.id);
    substudentsRows.forEach((substudent)=>{
      substudent.scoreL = konversi(substudent.score)
    })
    //res.send(substudentsRows)
    res.render('subject', { substudentsRows, status })
    //res.render('subject', {substudentsRows, status})
  })
})
//form add student score
router.get('/subjects/:id/addscore', (req,res) => {
  model.SubStudents.findAll( { attributes:['id'], where:{ studentId:req.params.id }, include:[{model: model.Subjects, as:'subject'},{model: model.Students, as:'student'}]})
  .then((substudentsRows) => {
    let status = 'addscore'

    //res.send(substudentsRows);
    //res.send(substudentsRows);
    res.render('subject', {substudentsRows, status})
  })
})
//add student score
router.post('/subjects/:id/addscore', (req,res) => {
  let obj = { score:req.body.score }
  let option = {where: { id: req.params.id }}
  model.SubStudents.update( obj, option).then((success) => {
    res.redirect('/subjects')
  })
})

module.exports = router
