const express = require('express')
const router = express.Router()
const model = require('../models');

router.get('/', (req, res) => {
  model.Teacher.findAll().then((teacher) => {
    res.render('teacher', {teacher: teacher})
  })
})

module.exports = router
