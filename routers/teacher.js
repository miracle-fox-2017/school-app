const express = require('express')
const router = express.Router();
const model = require("../models");

router.get('/', function (req, res) {
  model.Teacher.findAll().then((rows)=>{
    res.render('teacher' , {rows})
    console.log(rows);
  }).catch((err)=>{
    console.log(err);
  })
})

module.exports = router;
