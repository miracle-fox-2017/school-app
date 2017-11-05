const express = require('express');
const router = express.Router();

const Model = require('../models');

router.get('/', function (req, res) {
  Model.Subjects.findAll()
  .then(subjects=>{
    let reverseJoin = subjects.map(subject=>{
      return new Promise((resolve,reject)=>{
        Model.Teachers.findAll({where: {SubjectId: subject.id} })
        .then(result=>{
          // console.log(result);
          subject.teachers = result
          // console.log(subjects);
          resolve(subject)
        })
      })
    })
    // console.log(reverseJoin);
    Promise.all(reverseJoin)
    .then(data=>{
      // console.log(data[0].teachers[0].first_name);
      res.render('subjects', {subjects: data})
    })
  }).catch(err=>{
    console.log(err);
  })
})

router.get('/add', function (req, res) {
  // res.send('di students add')
  res.render('subjects_add',{msg: ''})
})

router.post('/add', function (req, res) {
  // console.log(req.body);
  let dataInsert = {
    subject_name: req.body.subject_name
  }
  Model.Subjects.create(dataInsert)
  .then(()=>{
    res.redirect('/subjects')
  }).catch(err=>{
      res.send(err)
  })
})

router.get('/edit/:id', function (req, res){
  Model.Subjects.findOne({where: {id: req.params.id} })
  .then(data=>{
    res.render('subjects_edit', {subject: data})
    // console.log(data);
    // res.send(req.params.id)
  }).catch(err=>{
    console.log(err);
  })
})

router.post('/edit/:id', function (req, res){
  // console.log(req.body);
  let updated = {
    subject_name: req.body.subject_name
  }
  Model.Subjects.update(updated, {where: {id: req.params.id }})
  .then(()=>{
    res.redirect(`/subjects/`)
    // res.redirect(`/students/edit/${req.params.id}`)
  }).catch(err=>{
    console.log(err);
  })
})

router.get('/delete/:id', function (req, res){
  Model.Subjects.destroy({where: {id: req.params.id }})
  .then(()=>{
    res.redirect(`/subjects/`)
  }).catch(err=>{
    console.log(err);
  })
})

router.get('/:id/enrolledstudents', function (req, res){
  Model.StudentSubjects.findAll({
    where: {SubjectId: req.params.id},
    include: [ {model: Model.Students } ],
    order: [ [ Model.Students, 'first_name' ] ]
  })
  .then(studentsubjects=>{
    Model.Subjects.findOne({where: {id: studentsubjects[0].SubjectId} })
    .then(subject=>{
      res.render('enrolled_students', {data:studentsubjects, subject:subject})
    })
    // console.log(studentsubjects);
  }).catch(err=>{
    res.render('header_msg', {
      msg:'Belum ada siswa terdaftar, masukkan siswa ke subject. Jika sudah silahkan kembali ke halaman ini.'
    })
  })
})

router.get('/:id/givescore', function (req, res){
  Model.StudentSubjects.findOne({where: {id: req.params.id} })
  .then(data=>{
    // console.log(data.StudentId);
    Model.Students.findOne({where: {id: data.StudentId} })
    .then(student=>{
      Model.Subjects.findOne({where: {id: data.SubjectId} })
      .then(subject=>{
        res.render('give-score',{student:student, subject:subject})
      })
    })
  })
})

router.post('/:id/givescore', function (req, res){
  let updated = {
    StudentId: req.body.StudentId,
    SubjectId: req.body.SubjectId,
    score: req.body.score
  }
  // console.log(updated);
  Model.StudentSubjects.update(updated, {where: {id: req.params.id }})
  .then(()=>{
    res.redirect(`/subjects/${req.body.SubjectId}/enrolledstudents`)
  }).catch(err=>{
    console.log(err);
  })
})

module.exports = router;