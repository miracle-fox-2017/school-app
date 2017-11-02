const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res)=>{
	Model.Student.findAll().then(function(students){
		res.render('student', {students})
	})
})

router.get('/add', (req, res)=>{
	let error = ""
	res.render('addStudent', {error})
})

router.post('/add', (req, res)=>{
	Model.Student.create({first_name : req.body.first_name, last_name : req.body.last_name, email : req.body.email}).then(()=>{
		res.redirect('/students')	
	}).catch(err=>{ 
		// res.send(err)
		// res.send(err.errors[0].message)
		res.render('addStudent', {error : err.errors[0].message})
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.Student.findById(req.params.id).then(siswa=>{
		// res.send(siswa)
		res.render('editStudent', {siswa})
	}).catch(err=>{
		console.log(err);
	})
})

router.post('/edit/:id', (req, res)=>{
	Model.Student.update({first_name : req.body.first_name, last_name : req.body.last_name, email : req.body.email},
		{where :{id : req.params.id}}).then(()=>{
			res.redirect('/students')}).catch(err=>{
			console.log(err);
		})
})

router.get('/delete/:id', (req, res)=>{
	Model.Student.destroy({where :{id : req.params.id}}).then(()=>{
		res.redirect('/students')
	}).catch(err=>{
		console.log(err);
	})
})

module.exports = router