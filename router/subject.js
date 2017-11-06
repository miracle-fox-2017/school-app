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
		model.StudentSubject.findAll({
			attributes : ['id', 'StudentId', 'SubjectId', 'score'],
			include : [model.Subject,model.Student],
			where : {SubjectId : subject.id},
			order : [[{model : model.Student}, 'first_name', 'ASC']]	
		})
		.then(data => {
			res.render('enrolledstudents', {subject : data})
		})
	})
	.catch(err => {
		res.send(err);
	})
})

// router.get('/test', function (req,res) {
	
// 	model.Subject.findAll({
// 		include: [{model : model.Student}, {model : model.StudentSubject, attributes: ['id']} ]
// 	}).then(subject => {
// 		console.log(subject[0].StudentSubjects)
// 		res.send("masuk")
// 	})
// 	.catch(err => {
// 		console.log(err)
// 		res.send(err);
// 	})
// })

router.get('/:id/givescore', function(req,res) {
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
	model.StudentSubject.update( {score : req.body.score}, {
		attributes : ['id', 'StudentId', 'SubjectId', 'score'],
		where : {
			id : req.params.id
		}}).then(data => {
			res.redirect('/subjects')
		})
})

module.exports = router;