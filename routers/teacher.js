const express = require('express');
const router = express.Router();

const Model = require('../models/');

router.get('/', (req, res)=>{
  Model.Teacher.findAll()
  .then(dataTeacher=>{
    let dataT = {
      title : "Teacher",
      rows : dataTeacher

    }
    res.render('teachers', dataT)
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
