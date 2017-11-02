const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res)=>{
	Model.Subject.findAll().then(subjects=>{
		res.render('subject', {subjects})
	})
})

module.exports = router