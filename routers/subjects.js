const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
	Model.Subject.findAll({
		include : [{
			model : Model.Teacher
		}],
		order : [['id']]
	}).then(subjects =>{
		res.render('subjects/list', {subjects})
	})

})

router.get('/:id/enrolledstudents', (req, res)=> {
	Model.Subject.findById(req.params.id, {
		include : [{ 
			model : Model.Student,
			order : [['first_name']]
		}],
	}).then(subjects =>{
		console.log(subjects.Students[0].StudentSubject.score)


			res.render('subjects/enrolled_students', {subjects})
		})
})

router.get('/:SubjectId/:StudentId/givescore', (req, res)=>{
	Promise.all([
		Model.Student.findById(req.params.StudentId),
		Model.Subject.findById(req.params.SubjectId)
	]).then(hasil => {
		res.render('subjects/give_score', {student : hasil[0], subject : hasil[1]})
	})
})

router.post('/:SubjectId/:StudentId/givescore', (req, res)=>{
	Model.StudentSubject.update(req.body, {where : req.params}).then(()=> {
		res.redirect(`/subjects/${req.params.SubjectId}/enrolledstudents`)
	})

})


module.exports = router