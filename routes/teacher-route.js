const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function (req, res) {
  Model.Teacher.findAll()
  	.then(allTeachers => {
  		res.render('teacher', {teachers: allTeachers});
  	})
  	.catch(err => res.send(err));

  
})

module.exports = router;