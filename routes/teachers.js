const express = require('express')
const router = express.Router()
const model = require('../models')



router.get('/', (req, res) =>{
  model.Teacher.findAll().then(dataTeachers =>{
    res.render('teachers/teachers', {dataTeachers:dataTeachers})
  })
})




module.exports = router;
