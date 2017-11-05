const express = require('express')
const router = express.Router()
const Model = require('../models') 

router.get('/', (req, res) => {
	Model.Student.findAll().then(students => {
		res.render('students/list', {students})
	})
	.catch(error =>{
		res.send(error)
	})
})

router.get('/add', (req, res)=> {
	res.render('students/add', {err : false})
})

router.post('/add', (req, res) =>{
	Model.Student.create({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		createdAt : new Date(),
		updatedAt : new Date()

	}).then(hasil =>{

		res.redirect('/students')
	})
	.catch(error =>{
		// res.send(error)
		res.render('students/add', {err : error.errors})
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.Student.destroy({
		where : {id : req.params.id}
	}).then(hasil => {
		res.redirect('/students')
	})
	.catch(error =>{
		res.send(error)
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.Student.findOne({
		id : req.params.id
	})
	.then(student => {
		res.render('students/edit', {student})
	})
	.catch(error => {
		res.send(error)
	})
})

router.post('/edit/:id', (req, res)=> {
	Model.Student.update({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email},
		{where : {id : req.params.id }
	})
	.then(hasil => {
		res.redirect('/students')
	})
})

router.get('/:id/add_subject', (req, res)=> {
	Promise.all([
		Model.Student.findById(req.params.id),
		Model.Subject.findAll(),
	]).then(hasil => {
		res.render('students/add_subject', {student : hasil[0], subjects : hasil[1]})
	})
})

router.post('/:id/add_subject', (req, res)=> {
	req.body.StudentId = req.params.id
	Model.StudentSubject.create(req.body).then(()=>{
		res.redirect('/students')
	})
})

module.exports = router


