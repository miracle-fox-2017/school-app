const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
	Model.Teacher.findAll({
		include : [{
			model : Model.Subject
		}],
		order : [['first_name']] 
	}).then(teachers =>{
		res.render('teachers/list', {teachers})
	})

})

router.get('/edit/:id', (req, res) =>{
	Promise.all([
		Model.Teacher.findById(req.params.id),
		Model.Subject.findAll()
	]).then(hasil =>{
		// res.send(hasil[0])
		res.render('teachers/edit', {teacher : hasil[0], subjects: hasil[1]})
	})

})

router.post('/edit/:id', (req, res)=> {

	Model.Teacher.update({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		SubjectId : req.body.SubjectId},
		{where : {id : req.params.id }
	})
	.then(hasil => {
		res.redirect('/teachers')
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.Teacher.destroy({
		where : {id : req.params.id}
	}).then(hasil => {
		res.redirect('/teachers')
	})
	.catch(error =>{
		res.send(error)
	})
})

router.get('/add', (req, res)=> {
	res.render('teachers/add', {err : false})
})

router.post('/add', (req, res) =>{
	Model.Teacher.create({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		createdAt : new Date(),
		updatedAt : new Date()

	}).then(hasil =>{

		res.redirect('/teachers')
	})
	.catch(error =>{
		// res.send(error)
		res.render('teachers/add', {err : error.errors})
	})
})


module.exports = router