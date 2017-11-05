const express = require('express');
const router  = express.Router();

const model = require('../models');

router.get('/', function(req,res){
	model.Subject.findAll({
		include : [ {model: model.Teacher}]
	})	
	.then(allSubject =>{
		res.render('subjects', {allSubject})
	})
	.catch(err =>{
		res.send(err);
	})
})

router.get('/:id/enrolledstudents', function(req,res) {
	model.Subject.findById(req.params.id, {
		include: [ { model : model.Student}]
	}).then(subject => {
		// console.log(subject.dataValues.Students.length)
		res.render('enrolledstudents', {subject : subject})
	})
	.catch(err => {
		res.send(err);
	})
		
})

module.exports = router;