const express = require('express')
const router  = express.Router()
const Model   = require('../models')
const helper  = require('../helper/scoreLetter')

router.get('/', (req, res)=>{
	Model.Subject.findAll().then(subjects=>{
		let result = subjects.map(subject=> {
			subject.teacher = []
			return new Promise((resolve, reject) => {
				subject.getTeachers().then(allteacher=> {
					if(allteacher){
						allteacher.forEach(guru=> {
							subject.teacher.push(guru.first_name+' '+guru.last_name)	
						})
					}else{
						subject.teacher.push("")
					}
					resolve(subject)
				}).catch(err=> {
					console.log(err);
				})
			})
		})

		Promise.all(result).then(allsubject=> {
			res.render('subject', {subjects : allsubject})
		})
	})
})

router.get('/:id/enrolledstudents', (req, res)=> {
	Model.Subject.findOne({include : [{
		model : Model.School,
		attributes : ['id', 'StudentId', 'SubjectId', 'Score']}], where: {id: req.params.id}}).then(function(subject) {
		let result = subject.Schools.map(subjectStudent=> {
			return new Promise((resolve, reject) => {
				subjectStudent.getStudent().then(student=> {
					subjectStudent.scoreLetter = helper(subjectStudent.Score)
					subjectStudent.name = student.getFullName()
					resolve(subjectStudent)
				})
			}) 
		})

		Promise.all(result).then(studentSubject=> {
			// res.send(studentSubject)
			res.render('enrolledStudent', {students :studentSubject, subject : subject})
		})
	})
})

router.get('/:id/givescore', (req, res)=> {
	console.log(req.params.id);
	Model.School.findOne({ where: {id: req.params.id} }).then(result=>{
		// console.log(req.params.id);
		// res.send(result)
		result.getStudent().then(student=>{
			result.student = student.getFullName()
			result.getSubject().then(subject=> {
				result.subject = subject.subject_name
				result.idkon = req.params.id
				console.log(result);
		// 		console.log(result);
		// 		// result.idkon = req.params.id
		// 		console.log(result.id);
		// 		res.send(result)
				res.render('givescore', {studentsubject : result })
			})
		})
	})
})

router.post('/:id/givescore', (req, res)=> {
	Model.School.update({Score : req.body.score},{where: {id: req.params.id}}).then(()=> {
		Model.School.findOne({where: {id : req.params.id}}).then(konj=>{
			res.redirect(`/subjects/${konj.SubjectId}/enrolledstudents`)
		})
	}).catch(err=>{
		console.log(err);
	}) 
})

module.exports = router