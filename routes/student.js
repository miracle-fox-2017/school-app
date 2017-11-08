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
		res.render('addStudent', {error : err.errors[0].message})
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.Student.findById(req.params.id).then(siswa=>{
		// res.send(siswa)
		let err = ""
		res.render('editStudent', {siswa})
	}).catch(err=>{
		console.log(err);
	})
})

router.post('/edit/:id', (req, res)=>{
	Model.Student.update({id : req.params.id, first_name : req.body.first_name, last_name : req.body.last_name, email : req.body.email},
		{where :{id : req.params.id}}).then(()=>{
			res.redirect('/students')
		}).catch(err=>{
				Model.Student.findById(req.params.id).then(siswa=>{
					res.render('editStudent', {siswa, err})
				})
			})
})

router.get('/delete/:id', (req, res)=>{
	Model.Student.destroy({where :{id : req.params.id}}).then(()=>{
		res.redirect('/students')
	}).catch(err=>{
		console.log(err);
	})
})

router.get('/:id/addsubject', (req, res)=> {
	Model.Student.findById(req.params.id).then(student=> {
		Model.Subject.findAll().then(subjects=>{
			// res.send(subjects)
			res.render('addSubjectStudent', {student, subjects})
		})
	})
})

router.post('/:id/addsubject', (req, res)=> {
	Model.School.create({StudentId : req.params.id, SubjectId : req.body.subject}).then(()=> {
		res.redirect('/students')
	}).catch(err=> {
		console.log(err);
	})
})

module.exports = router