const express = require('express')
const router  = express.Router()
const model   = require('../models')

router.get('/',function(req,res){
  Promise.all([
    model.Student.findAll(),
    model.Teacher.findAll(),
    model.Subject.findAll()
  ]).then( allData => {
    res.status(200)
    res.render('index',{
      data_Students : allData[0],
      data_teachers : allData[1],
      data_Subjects : allData[2]
    })
  }).catch( err => {
    console.log(err)
    res.status(500).send('Internal Server error')
  })
})

module.exports = router
