const express = require('express')
const router = express.Router()
const model = require('../models');

router.get('/', function (req, res) {
  model.Subject.findAll()
    .then(dataSubjects=>{
      res.render('subjects', {dataSubjects:dataSubjects})
    })
      .catch(err=>{
        console.log(err);
        res.send(err)
      })
})


module.exports = router
