const express = require('express')
const router  = express.Router()
const model   = require('../models')

router.get('/',function(req,res){
  Promise.all([
    model.Student.findAll(),
    model.Teacher.findAll(),
    model.Subjects.findAll()
  ]).then( allData => {
    res.render('index',{data_Students:allData[0],data_teachers:allData[1],data_Subjects:allData[2]})
  }).catch( err => {
    console.log(err);
  })
})

module.exports = router
