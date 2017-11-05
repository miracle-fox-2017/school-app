const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/',function(req, res){
  db.Subject.findAll({include:
  [db.Teacher]}).then(function(rows){
    // res.send(rows)
    res.render('subject', {rowsSubject : rows})
  }).catch(function(err){
    console.log(err);
  })
})

module.exports = router
