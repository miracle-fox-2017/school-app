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


	model.Subject.findById(req.params.id,{
		include: [ { model : model.Student}]
	}).then(subject => {
		// console.log(subject.id)
		// console.log(subject.Students)
		model.StudentSubject.findAll({
			attributes : ['id', 'StudentId', 'SubjectId', 'score'],
			include : [model.Subject,model.Student],
			where : {SubjectId : subject.id},
		})
		.then(data => {
			// console.log(data[0].Subject)
			// console.log(data[0].Subject)
			res.render('enrolledstudents', {subject : data})
		})
	})
	.catch(err => {
		res.send(err);
	})

	// model.Subject.findById(req.params.id,{
	// 	include: [ { model : model.Student}]
	// }).then(subject => {
	// 	console.log(subject.Students[0].StudentSubject)
	// 	res.render('enrolledstudents', {subject : subject})
	// })
	// .catch(err => {
	// 	res.send(err);
	// })
})

router.get('/:id/givescore', function(req,res) {
	// model.StudentSubject.findById(req.params.id, {
	// 	include : [model.Subject,model.Student],
	// }).then(inputScore => {
	// 	console.log(inputScore)
	// 	res.render('insertScore', {student : inputScore})
	// })
	// .catch(err => {
	// 	res.send(err)
	// })
	model.StudentSubject.findOne({
		attributes : ['id', 'StudentId', 'SubjectId', 'score'],
		include : [model.Subject,model.Student],
		where : {id : req.params.id},
	}).then(data => {
		console.log(data)
		res.render('insertScore', {student : data})
	})	
	.catch(err => {
		res.send(err)
	})		
})

router.post('/:id/givescore', function(req,res) {
	console.log(req.body)
	// console.log(req.params.id)
	model.StudentSubject.update( {score : req.body.score}, {
		attributes : ['id', 'StudentId', 'SubjectId', 'score'],
		where : {
			id : req.params.id
		}}).then(data => {
			res.redirect('/subjects')
		})
})

module.exports = router;