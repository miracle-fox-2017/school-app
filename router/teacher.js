const express = require('express');
const router  = express.Router();

const model = require('../models')

router.get('/', function(req,res){
	model.Teacher.findAll().then(teachers => {
		let newTeacher = teachers.map(teacher => {	
			return new Promise((resolve, reject) => {	
				if(teacher.dataValues.SubjectId != null){			
					teacher.getSubject().then(withSubject => {
						teacher.subject = withSubject.dataValues.subject_name;
						resolve(teacher);
					})	
				}else {
					teacher.subject = "unassigned";
					resolve(teacher);
				}	
			})
		})
		Promise.all(newTeacher).then(allTeacher => {
			res.render('teachers', {allTeacher : allTeacher, message : null})
		})
	})
})

router.get('/add', function(req,res){
	model.Teacher.findAll().then(teachers => {
		res.render('addTeacher', {message : null})
	})
})

router.post('/add', function(req,res) {
	if(req.body.SubjectId == ''){
		req.body.SubjectId = null;
	}
	model.Teacher.create(req.body).then(()=>{
		res.redirect('/teachers')
	}) 
	.catch(err =>{
		res.render('addTeacher', {message : err.message})				
	})
})

router.get('/delete/:id', function(req,res) {
	model.Teacher.destroy({
		where : {
			id : req.params.id
		}})
	.then(() => {
		res.redirect('/teachers')	
		.catch(err => {
			res.send(err)
		})
	})
})

router.get('/edit/:id', function(req,res) {
	model.Subject.findAll().then(allSubject => {
		model.Teacher.findById(req.params.id, {
			include : [ {model : model.Subject}]
		})
		.then(edit => {
			res.render('editTeacher', {edit : edit, allSubject: allSubject, message : undefined})
		})
		.catch(err => {
			res.send(err)
		})
	})
})

router.post('/edit/:id', function(req,res) {
	if(req.body.SubjectId == ''){
		req.body.SubjectId = null;
	}
	model.Teacher.update(req.body, { where : {
		id : req.params.id}})
	.then(() => {
		res.redirect('/teachers')
	})
	.catch(err => {
		model.Teacher.findById(req.params.id)
		.then(edit => {
			res.render('editTeacher', {edit : edit, message : err.message})
		})
	})			
})


module.exports = router