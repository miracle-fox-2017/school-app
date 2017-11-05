const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
	Model.Subject.findAll({
		include : [{
			model : Model.Teacher
		}],
		order : [['id']]
	}).then(subjects =>{
		res.render('subjects/list', {subjects})
	})

})


module.exports = router