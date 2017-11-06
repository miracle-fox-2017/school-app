const express = require('express');
const router = express.Router();
const model = require('../models')

//menampilkan student
router.get('/students', (req,res)=> {
  let status = 'tampil'
  model.Students.findAll({order:[['id','ASC']]}).then((studentsRows)=> {
    studentsRows.forEach((student)=> {
      student.fullName = student.getFullName()
    })
    res.render('student', {studentsRows, status})
  }).catch((err)=> {
    console.log(err)
  })
})
//form tambah student
router.get('/students/add', (req,res)=> {
  let status = 'add'
  let msg = ""
  res.render('student', {status, msg})
})
//menambah student
router.post('/students/add', (req,res)=> {
  let obj = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email}
  model.Students.create(obj).then((studentsRows)=> {
    res.redirect('/students')
  }).catch((err)=> {
    //console.log(err.errors[0].message)
    if( err.errors[0].message == "Validation isEmail on email failed" ) {
      let status = 'add'
      let msg = 'Email is not Valid'
      res.render('student', {status, msg})
    }else if( err.errors[0].message == "email must be unique" ) {
      let status = 'add'
      let msg = 'Email is already taken'
      res.render('student', {status, msg})
    }
  })
})
//form untuk edit student
router.get('/students/edit/:id',(req,res)=> {
  let status = 'edit'
  let msg = ""
  let id = req.params.id
  model.Students.findById(id).then((studentsRows)=>{
    //console.log(studentsRows.first_name)
    res.render('student',{studentsRows, status, msg})
  }).catch((err)=>{
    console.log(err.errors[0].message)
  })
})
//mengedit student
router.post('/students/edit/:id',(req,res)=>{
  let idEdit = req.params.id
  let obj = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email}
  let option = { where: { id: idEdit }}
  model.Students.update(obj, option).then((studentsRows)=>{
    res.redirect('/students')
  }).catch((err)=>{
    //console.log(err.errors[0].message)
    if( err.errors[0].message == "Validation isEmail on email failed" ) {
      let status = 'edit'
      let msg = "Email is not valid"
      model.Students.findById(idEdit).then((studentsRows)=>{
        //console.log(studentsRows.first_name)
        res.render('student',{studentsRows, status, msg})
      })
    }else if( err.errors[0].message == "email must be unique" ) {
      let status = 'edit'
      let msg = "Email is already taken"
      model.Students.findById(idEdit).then((studentsRows)=>{
        //console.log(studentsRows.first_name)
        res.render('student',{studentsRows, status, msg})
      })
    }
  })
});

//delete student
router.get('/students/delete/:id',(req,res)=>{
  let idDelete = req.params.id
  let option = { where: { id: idDelete }}
  model.Students.destroy(option).then((studentsRows)=>{
    res.redirect('/students')
  }).catch((err)=>{
    console.log(err)
  })
})

//menampilkan form add subject
router.get('/students/:id/addsubject',(req,res) => {
  let id = req.params.id
  let msg = ''
  let status = 'subject'
  model.Students.findById(id).then((studentsRows) => {
    //console.log(studentsRows)
    model.Subjects.findAll({ attributes: ['subject_name', 'id'] }).then((subjectsRows)=>{
      res.render('student',{studentsRows, subjectsRows, status, msg})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
//menambah subject
router.post('/students/:id/addsubject', (req,res) => {
  let obj = { subjectId: req.body.subject_id,
              studentId: req.params.id }
  model.SubStudents.create(obj).then( (success) => {
    console.log(obj)
    res.redirect('/students')
  }).catch((err)=>{
    console.log(err);
  })
})

module.exports = router
