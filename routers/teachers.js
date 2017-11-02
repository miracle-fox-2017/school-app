const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
	Model.Teacher.findAll().then(teachers =>{
		console.log(teachers)
		res.render('teachers/list', {teachers})
	})
})


module.exports = router