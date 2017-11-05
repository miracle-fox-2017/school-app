const express = require('express');
const router = express.Router();
const Model = require('../models');


router.get('/', function (req, res) {
	Model.Subject.findAll({include: [Model.Teacher]})
		.then((allSubjects) => {

			res.render('subject', {subjects: allSubjects});
		})
		.catch(err => res.send(err.message));
})

router.get('/:id/enrolledstudents', function (req, res) {
	Model.Subject.findById(req.params.id).then(foundSubject => {

		Model.StudentSubject.findAll(
		{
			include: [{
				model: Model.Student,
				order: [ [Model.Student.first_name, 'ASC'] ],
			}],
			where: {
				SubjectId: req.params.id
			}
		}).then(allStudentSubjectData => {
			res.render('enrolled-student', {foundSubject: foundSubject, students: allStudentSubjectData});
		}).catch(err => res.send(err.message));

	}).catch(err => res.send(err.message));
})

router.get('/:studentId/givescore', function (req, res) {
	Model.StudentSubject.findOne({
		include: [Model.Student, Model.Subject],
		where: { id: req.params.studentId }
	}).then(foundStudentSubject => {
		res.render('give-score', { foundStudentSubject: foundStudentSubject})

	}).catch(err => res.send(err));

})

router.post('/:id/givescore', function(req, res) {

	Model.StudentSubject.update(
		{
			Score: req.body.Score
		},
		{
			where: {
				StudentId: req.body.StudentId
			}
		})
		.then(allModelData => {
			res.redirect('/subjects')
		}).catch(err => res.send(err));
})

module.exports = router;