const express = require('express')
const router = express.Router()
const model = require('../models');

router.get('/', function (req, res) {
  model.Teacher.findAll()
    .then(dataTeachers=>{
      res.render('teachers', {dataTeachers:dataTeachers})
    })
      .catch(err=>{
        console.log(err);
        res.send(err)
      })
})


module.exports = router
