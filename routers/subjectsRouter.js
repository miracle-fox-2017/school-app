const express = require('express');
const db = require(`../models`);
const router = express.Router();


router.get('/', (req,res) => {
  db.Subject.findAll({
    include: [db.Teacher]
  })
  .then((results) => {
    res.render('subjects', {results, pageTitle:"Subjects"});
  })
  .catch((err) => {
  })
});

router.get('/:id/enrolledstudents', (req, res) => {
  db.Subject.findById(req.params.id, {
    include: [{
      model:db.Students_Subject,
      include:[{
        model:db.Student,
        order: [[db.Student, 'first_name', 'ASC']]
        }]
    }]
  })
  .then(results => {
    res.render('enrolledstudents', {results, pageTitle:"Enrolled Students"})
  })
})

router.get('/:id/givescore', (req, res) => {
  db.Students_Subject.findById(req.params.id)
  .then(result => {
    result.getSubject().then(subject => {
      result.getStudent().then(student => {
        res.render('givescore', {student:student, subject:subject, result:result, pageTitle:`Give Score to ${student.first_name}`})
      })
    })
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/:id/givescore', (req, res) => {
  db.Students_Subject.findById(req.params.id)
  .then(result => {
    result.update({
      score:req.body.score
    })
  .then(report => {
    res.redirect(`/subjects/${req.body.SubjectId}/enrolledstudents`);
  })
  })
  .catch(err => {
    console.log(err);
  })
})

// router.get('/:id/enrolledstudents', (req, res) => {
//   db.Subject.findById(req.params.id)
//   .then(subject => {
//     subject.getStudents()
//     .then(students => {
//       res.render('enrolledstudents', {subject, students})
//     })
//   })
// })


// router.get('/get', (req,res) => {
//   db.Subject.findById(1).then(result => {
//     result.getTeachers().then(results => {
//       console.log(results);
//     })
//   })
// });

module.exports = router;