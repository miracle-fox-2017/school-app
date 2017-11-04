const express = require ('express');
const router  = express.Router();

const Model   = require('../models')


router.get('/', function(req,res){
	Model.Student.findAll()
	.then(allStudents =>{
		res.render('students', {allStudents : allStudents})	
	})
	.catch(err =>{
		res.send(err);
	})
})

router.get('/add', function(req,res){
	res.render('add', {message : null})	
})

router.post('/add', function(req,res){
	Model.Student.create(req.body)
	.then(allStudents =>{
		res.redirect('/students')
	})
	.catch(err =>{
		res.render('add', {message : err.message})	
	})
})

router.get('/edit/:id', function(req,res){
	Model.Student.findById(req.params.id)
	.then(student =>{
		res.render('edit', {edit : student, message: null})
	})
})

router.post('/edit/:id', function(req,res){
	Model.Student.update( { id : req.body.id,
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email}, {where : {
			id : req.params.id } 
		})
	.then(() =>{
		res.redirect('/students')
	})
	.catch(err =>{
		Model.Student.findById(req.params.id)
		.then(student =>{
			res.render('edit', {edit : student, message: err})
		})			
	})
})

router.get('/delete/:id', function(req,res){
	Model.Student.destroy({where : {
		id : req.params.id
	}})
	.then(() =>{
		res.redirect('/students')
	})
	.catch(err =>{
		res.send(err);
	})
})

module.exports = router;