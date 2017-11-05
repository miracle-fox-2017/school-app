const express = require('express');
const router = express.Router();

const db = require('../models')

router.get('/', function (req, res){
  db.Subject.findAll({include: [db.Teacher]}).then(function (subjData){
    console.log(subjData[0].Teachers);
    res.render('subject',{subjData:subjData})
    // res.send(subjData)
  }).catch(function(err){
      console.log(err);
  })
})

module.exports = router