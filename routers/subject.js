const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) => {
  model.Subject.findAll().then((subject) => {
    res.render('subject', {subject: subject})
  })
})


module.exports = router
