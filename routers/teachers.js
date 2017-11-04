const express = require('express');
const router = express.Router();

const Model = require('../models');


router.get('/', function (req, res) {
  Model.Teachers.findAll({order: [['first_name','ASC']]})
  .then(teachers=>{
    let teacherJoin = teachers.map(teacher=>{
      return new Promise ((resolve, reject)=>{
        teacher.getSubject()
        .then(result=>{
          teacher.subject = result
          resolve(teacher)
        })
      })
    })
    // console.log(teacherJoin);
    Promise.all(teacherJoin)
    .then(teachersJoin=>{
      // console.log(teachersJoin[4].subject_name);
      res.render('teachers', {teachers: teachersJoin})
    })
  }).catch(err=>{
    console.log(err);
  })
})

router.get('/add', function (req, res) {
  // res.send('di students add')
  res.render('teachers_add',{msg: ''})
})

router.post('/add', function (req, res) {
  // console.log(req.body);
  let dataInsert = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  // console.log(dataInsert);
  Model.Teachers.create(dataInsert)
  .then(()=>{
    res.redirect('/teachers')
  }).catch(err=>{
    if(err.errors[0].type == 'Validation error' && err.errors[0].path == 'email'){
      res.render('teachers_add',{msg: `${err.errors[0].type}: ${err.errors[0].path} format is incorect`})
    } else if (err.errors[0].type == 'unique violation' && err.errors[0].path == 'email') {
      res.render('teachers_add',{msg: `Validation error: ${err.errors[0].message}`})    
    } else{
      res.send(err)
    }
    // console.log(err);
  })
})

router.get('/edit/:id', function (req, res){
  Model.Teachers.findOne({where: {id: req.params.id} })
  .then(data=>{
    Model.Subjects.findAll()
    .then(subjects=>{
      res.render('teachers_edit', {teacher: data, subjects: subjects})
    })
  }).catch(err=>{
    console.log(err);
  })
})

router.post('/edit/:id', function (req, res){
  // console.log(req.body);
  let updated = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  }
  Model.Teachers.update(updated, {where: {id: req.params.id }})
  .then(()=>{
    res.redirect(`/teachers/`)
    // res.redirect(`/students/edit/${req.params.id}`)
  }).catch(err=>{
    console.log(err);
  })
})

router.get('/delete/:id', function (req, res){
  Model.Teachers.destroy({where: {id: req.params.id }})
  .then(()=>{
    res.redirect(`/teachers/`)
  }).catch(err=>{
    console.log(err);
  })
})

module.exports = router;