const express = require('express');
const router = express.Router();

const db = require('../models')

router.get('/', function (req, res){
  db.Teacher.findAll().then(function (teachData){
    res.render('teacher',{teachData:teachData})
    // res.send(hasil)
  }).catch(function(err){
      console.log(err);
  })
})

module.exports = router