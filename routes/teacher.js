const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res)=>{
	Model.Teacher.findAll().then(teachers=>{
		let result = teachers.map(teacher=> {
			return new Promise((resolve, reject) => {
				Model.Subject.findOne({where: {id : teacher.SubjectId}}).then(subject=> {
					if(subject){
						teacher.subject = subject.subject_name
						resolve(teacher)	
					}else{
						teacher.subject = ""
						resolve(teacher)
					}
				})
			});
		})

		Promise.all(result).then(allTeacher=> {
			res.render('teacher', {teachers : allTeacher})
		})
	})
})

router.get('/add', (req, res)=> {
	Model.Subject.findAll().then(subjects=> {
		let error = ""
		res.render('addTeacher', {subjects, error})
	})
})

router.post('/add', (req, res)=> {
	Model.Teacher.create({first_name : req.body.first_name, last_name : req.body.last_name, email : req.body.email, SubjectId : req.body.subject}).then(()=> {
		res.redirect('/teachers')
	}).catch(err=> {
		console.log(err);
	})
})

router.get('/edit/:id', (req, res)=> {
	Model.Teacher.findById(req.params.id).then(teacher=> {
		Model.Subject.findAll().then(subjects=> {
			res.render('editTeacher', {teacher, subjects})
		})
	})
})

router.post('/edit/:id', (req, res)=> {
	Model.Teacher.update({first_name : req.body.first_name, last_name : req.body.last_name, email : req.body.email, SubjectId : req.body.subject},
		{where: {id : req.params.id}}).then(()=> {
			res.redirect('/teachers')
		}).catch(err=> {
			console.log(err);
		})
})

router.get('/delete/:id', (req, res)=> {
	Model.Teacher.destroy({where: {id: req.params.id}}).then(()=>{
		res.redirect('/teachers')
	}).catch(err=> {
		console.log(err);
	})
})

module.exports = router