const express = require('express');
const router = express.Router();
const Model = require('../models');


router.get('/', function (req, res) {
	Model.Subject.findAll()
	.then((allSubjects) => {
		res.render('subject', {subjects: allSubjects});
	})
	.catch(err => res.send(err));
})

module.exports = router;