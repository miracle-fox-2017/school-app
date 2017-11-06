const express = require('express')
const router = express.Router();
const model = require("../models");

router.get('/', function (req, res) {
  model.Teacher.findAll({order: [['first_name', 'ASC']]}).then(teachers => {
    let newTeacher = teachers.map(teacher => {
      // res.send(teacher)
      return new Promise((resolve, reject) => {
        teacher.getSubject().then(subjectWith => {
          teacher.subject = subjectWith;
          resolve(teacher)
          console.log('===========', teachers);
        })
      })
    })
    Promise.all(newTeacher).then(newSubject => {
      console.log('===========', teachers);
      res.render('teacher', {rows : newSubject})
    })
  }).catch(err => {
      console.log(err);
  })
  // model.Teacher.findAll().then((rows)=>{
  //   res.render('teacher' , {rows})
  //   console.log(rows);
  // }).catch((err)=>{
  //   console.log(err);
  // })
})

router.get('/add', function(req,res){
  res.render('addTeacher', {rows: null});
})

router.post('/add', function (req, res){
  model.Teacher.create( {first_name: req.body.first_name,
    last_name: req.body.last_name,
    email : req.body.email})
    .then(allTeacher => {
    res.redirect('/teacher')
  }).catch(err => {
    console.log(err);
    res.render('addTeacher', {rows : err})
  })
})

router.get('/edit/:id', function(req,res) {
  model.Teacher.findById(req.params.id).then(data => {
    model.Subject.findAll().then(subjects => {
      res.render('editsTeacher', {teacher : data, subjects : subjects})
    })
  })
})

router.post('/edit/:id', function(req, res) {
  model.Teacher.update( {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    SubjectId : req.body.SubjectId,
  },
    {where : { id : req.params.id}
  }).then(()=> {
      res.redirect('/teacher')
  }).catch(err => {
      model.Teacher.findById(req.params.id)
        .then(teacher => {
          res.render('editsTeacher', {rows : teacher, message : err})
    })
  })
})

router.get('/delete/:id', function(req, res) {
  model.Teacher.destroy ( { where : { id : req.params.id}
  })
  .then(()=> {
    res.redirect('/teacher')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
