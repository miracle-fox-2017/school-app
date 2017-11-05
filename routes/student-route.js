const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
	Model.Student.findAll({ order: [ ['first_name', 'ASC']] })
		.then(allStudents => {
			res.render('student', {students: allStudents});
			console.log(allStudents[0].full_name())
		})
		.catch(err => res.send(err));
})

router.get('/add', (req, res) => {
	res.render('add-student', {message: req.query.err});
})

router.post('/add', (req, res) => {
	Model.Student.create(req.body)
		.then(success => {
			res.redirect('/students');
		})
		.catch(err => {
			console.log(err);
			var msg = encodeURIComponent(err.message);
  			res.redirect('/students/add/?err=' + msg);
		});
})

router.get('/edit/:id', (req, res) => {
	Model.Student.findById(req.params.id)
		.then((studentEditFound) => {
			res.render('add-student', {studentFound: studentEditFound, message: req.query.err});
		})
		.catch(err => res.send(err));
})

router.post('/edit/', (req, res) => {
	Model.Student.update(req.body,{
		where: {
			id: req.body.id
		}
	}).then(success =>{
		res.redirect('/students');
	}).catch(err => {
		var msg = encodeURIComponent(err.message);
		res.redirect(`/students/edit/${req.body.id}/?err=`+msg);
	});
})

router.get('/delete/:id', (req, res) => {
	Model.Student.destroy({
		where: {
			id: req.params.id
		}
	}).then(success =>{
		res.redirect('/students');
	}).catch(err => res.send(err));
})

router.get('/:id/addsubject', (req, res) => {
	// res.send(req.params.id);
	let arrModel = [
		Model.Student.findById(req.params.id),
		Model.Subject.findAll()
	];

	Promise.all(arrModel)
		.then(allModelData => {
			let studentFound = allModelData[0];
			let allSubject = allModelData[1];

			res.render('add-subject', {studentFound: studentFound, subjects: allSubject});
		}).catch(err => res.send(err));
})

router.post('/:id/addsubject', (req, res) => {

	Model.StudentSubject.create({
		StudentId : req.body.id,
		SubjectId: (req.body.SubjectId !== '') ? req.body.SubjectId : null,
		Score: null
	}).then(allModelData => {
			res.redirect('/students');
		}).catch(err => res.send(err));
})

module.exports = router;