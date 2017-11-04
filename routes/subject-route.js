const express = require('express');
const router = express.Router();
const Model = require('../models');


router.get('/', function (req, res) {
	Model.Subject.findAll({include: [Model.Teacher]})
		.then((allSubjects) => {


		
			// res.send(allSubjects)
			res.render('subject', {subjects: allSubjects});
		})
		.catch(err => res.send(err.message));
})

module.exports = router;