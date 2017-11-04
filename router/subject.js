const express = require('express');
const router = express.Router();

const db = require('../models')

router.get('/', function (req, res){
  db.Subject.findAll().then(function (subjData){
    res.render('subject',{subjData:subjData})
    // res.send(subjData)
  }).catch(function(err){
      console.log(err);
  })
})

module.exports = router