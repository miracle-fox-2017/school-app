const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res)=>{
	Model.Teacher.findAll().then(teachers=>{
		// res.send(teachers)
		res.render('teacher', {teachers})
	})
})

module.exports = router