const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) =>{
  model.Subject.findAll().then(dataSubjects =>{
    res.render('subjects/subjects',{dataSubjects:dataSubjects})
  })
})







module.exports = router;
