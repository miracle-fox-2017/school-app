const express = require('express');
const router = express.Router();

const Model = require('../models');


router.get('/', function (req, res) {
  Model.Teachers.findAll()
  .then(data=>{
    // console.log(data[0].dataValues);
    res.render('teachers', {teachers: data})
    // res.send(data)
  }).catch(err=>{
    console.log(err);
  })
})

module.exports = router;