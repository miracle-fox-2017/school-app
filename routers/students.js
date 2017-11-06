const express = require('express');
const router = express.Router();

const Model = require('../models');

const getFullName = require('../helper/fullname')

router.get('/', function (req, res) {
  // res.send('di students')
  Model.Students.findAll({order: [['first_name','ASC']]})
  .then(datas=>{
      datas.forEach(data=>{
        data.full_name = getFullName(data)
      })
      res.render('students', {students: datas, title:"Students"})
    }
  ).catch(err=>{
      console.log(err);
    })
  })

router.get('/add', function (req, res) {
  // res.send('di students add')
  res.render('students_add',{msg: '', title:"Students"})
})

router.post('/add', function (req, res) {
  // console.log(req.body);
  let dataInsert = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  // console.log(dataInsert);
  Model.Students.create(dataInsert)
  .then(()=>{
    res.redirect('/students')
  }).catch(err=>{
    if(err.errors[0].type == 'Validation error' && err.errors[0].path == 'email'){
      res.render('students_add',{msg: `${err.errors[0].type}: ${err.errors[0].path} format is incorect`})
    } else if (err.errors[0].type == 'unique violation' && err.errors[0].path == 'email') {
      res.render('students_add',{msg: `Validation error: ${err.errors[0].message}`})    
    } else{
      res.send(err)
    }
    // console.log(err);
  })
})

router.get('/edit/:id', function (req, res){
  Model.Students.findOne({where: {id: req.params.id} })
  .then(data=>{
    res.render('students_edit', {student: data, title:"Students"})
    // console.log(data);
    // res.send(req.params.id)
  }).catch(err=>{
    console.log(err);
  })
})

router.post('/edit/:id', function (req, res){
  // console.log(req.body);
  let updated = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  Model.Students.update(updated, {where: {id: req.params.id }})
  .then(()=>{
    res.redirect(`/students/`)
    // res.redirect(`/students/edit/${req.params.id}`)
  }).catch(err=>{
    console.log(err);
  })
})

router.get('/delete/:id', function (req, res){
  Model.Students.destroy({where: {id: req.params.id }})
  .then(()=>{
    res.redirect(`/students/`)
  }).catch(err=>{
    console.log(err);
  })
})

router.get('/:id/addsubject', function (req, res){
  // res.send(req.params.id)
  Model.Students.findOne({where: {id: req.params.id} })
  .then(students=>{
    Model.Subjects.findAll()
    .then(subjects=>{
      res.render('students_assign', {students: students, subjects: subjects, title:"Students"})
      
    })
  }).catch(err=>{
    console.log(err);
  })
})

router.post('/:id/addsubject', function (req, res){
  req.body.StudentId = req.params.id;
  // Model.StudentSubjects.findAll()
  Model.StudentSubjects.create(req.body)
  .then(()=>{
    // console.log(req.body);
    res.redirect('/students')
  })
})



module.exports = router;