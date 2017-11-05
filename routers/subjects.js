const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Subject.findAll({
    include: [{
    model: Model.Teacher
    }],
    order: [['id']]
  }).then(subjects => {
    res.render('subjects', {title:'Subjects', subjects:subjects})
    // res.send(subjects)
  })
})

router.get('/add', (req, res) => {
  res.render('subjects/add', {title:'Add Subject'})
})

router.post('/add', (req, res) => {
  Model.Subject.create(req.body).then(() => {
    res.redirect('/subjects')
  })
})

router.get('/edit/:id', (req, res) => {
  Model.Subject.findById(req.params.id).then(subject => {
    res.render('subjects/edit', {title:'Edit Subject', subject:subject})
  })
})

router.post('/edit/:id', (req, res) => {
  Model.Subject.update(req.body, {where:req.params}).then(() => {
    res.redirect('/subjects')
  })
})

router.get('/delete/:id', (req, res) => {
  Model.Subject.destroy({where:req.params}).then(() => {
    res.redirect('/subjects')
  })
})

router.get('/:id/enrolledstudents', (req, res) => {
  Model.Subject.findById(req.params.id, {
    include: [{
    model: Model.Student,
    order: [['first_name']]
  }],
  }).then(subject => {
    // res.send(subject)
    res.render('subjects/enrolledstudents',{title:'Enrolled Students', subject:subject})
  })
})

router.get('/:SubjectId/:StudentId/givescore', (req, res) => {
  Promise.all([
    Model.Student.findById(req.params.StudentId),
    Model.Subject.findById(req.params.SubjectId)
  ]).then(rows => {
    res.render('subjects/givescore', {title:'Give Score', student:rows[0], subject:rows[1]})
  })
})

router.post('/:SubjectId/:StudentId/givescore', (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  Model.StudentSubject.update(req.body, {where:req.params}).then(() => {
    res.redirect(`/subjects/${req.params.SubjectId}/enrolledstudents`)
  })
})

module.exports = router;
