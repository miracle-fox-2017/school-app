const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res)=>{
	Model.Subject.findAll().then(subjects=>{
		let result = subjects.map(subject=> {
			subject.teacher = []
			return new Promise((resolve, reject) => {
				Model.Teacher.findAll({where: {SubjectId: subject.id}}).then(allteacher=> {
					// res.send(allteacher)
					if(allteacher){
						allteacher.forEach(guru=> {
							subject.teacher.push(guru.first_name+' '+guru.last_name)	
						})
					}else{
						subject.teacher.push("")
					}
					resolve(subject)
				})
			})
		})

		Promise.all(result).then(allsubject=> {
			// res.send(allsubject)
			res.render('subject', {subjects : allsubject})
		})
	})
})

router.get('/:id/enrolledstudents', (req, res)=> {
	Model.School.findAll({where: {SubjectId: req.params.id}}).then(konjungsi=> {
		let result = konjungsi.map(student=> {
			return new Promise((resolve, reject) => {
				Model.Student.findById(student.StudentId).then(result=> {
					student.student = result.first_name+' '+result.last_name
					resolve(student)
				})
			})
		})

		Promise.all(result).then(SubjectStudent=> {
			// console.log(SubjectStudent);
			// res.send(SubjectStudent)
			res.render('enrolledStudent', {subjects : SubjectStudent})
		})
	})
})

module.exports = router