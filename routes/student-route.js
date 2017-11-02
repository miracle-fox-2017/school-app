const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
	Model.Student.findAll()
		.then(allStudents => {
			res.render('student', {students: allStudents});
		})
		.catch(err => res.send(err));
})

module.exports = router;