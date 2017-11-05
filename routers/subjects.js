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

		console.log(subjects.Students)

			res.render('subjects/enrolled_students', {students : subjects.Students})
		})

})


module.exports = router