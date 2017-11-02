const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
	Model.Subject.findAll().then(subjects =>{
		// console.log(subject)
		res.render('subjects/list', {subjects})
	})
})


module.exports = router