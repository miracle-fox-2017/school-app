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

		// res.render('enrolled-student', {foundSubject: foundSubject});

		Model.StudentSubject.findAll(
		{
			include: [Model.Student],
			where: {
				SubjectId: req.params.id
			}
		}
		).then(allStudentSubjectData => {
			// res.send(allStudentSubjectData);
			// console.log(allStudentSubjectData);
			res.render('enrolled-student', {foundSubject: foundSubject, students: allStudentSubjectData});
		}).catch(err => res.send(err.message));

	}).catch(err => res.send(err.message));


})

module.exports = router;