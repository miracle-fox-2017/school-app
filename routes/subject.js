const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res)=>{
	Model.Subject.findAll().then(subjects=>{
		let result = subjects.map(subject=> {
			subject.teacher = []
			return new Promise((resolve, reject) => {
				Model.Teacher.find({where: {SubjectId: subject.id}}).then(allteacher=> {
					// res.send(allteacher)
					if(allteacher){
						subject.teacher.push(allteacher.first_name+' '+allteacher.last_name)
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

module.exports = router