const express = require('express')
const router = express.Router();
const model = require("../models");

router.get('/', function (req, res) {
  model.Teachers.findAll().then((rows)=>{
    res.render('subjects' , {rows})
    console.log(rows);
  }).catch((err)=>{
    console.log(err);
  })
})

module.exports = router;
