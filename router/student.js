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
    res.render('student', {studentsRows,status})
  }).catch((err)=> {
    console.log(err)
  })
})
//form tambah student
router.get('/students/add', (req,res)=> {
  let status = 'add'
  res.render('student', {status})
})
//menambah student
router.post('/students/add', (req,res)=> {
  let obj = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email}
  model.Students.create(obj).then((studentsRows)=> {
    res.redirect('/students')
  }).catch((err)=> {
    console.log(err.errors[0].message)
    if( err.errors[0].message == "Validation isEmail on email failed" ) {
      res.send('email is not valid')
    }else if( err.errors[0].message == "email must be unique" ) {
      res.send('email already taken')
    }
  })
})
//form untuk edit student
router.get('/students/edit/:id',(req,res)=> {
  let status = 'edit'
  let id = req.params.id
  model.Students.findById(id).then((studentsRows)=>{
    //console.log(studentsRows.first_name)
    res.render('student',{studentsRows,status})
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
    console.log(err.errors[0].message)
    if( err.errors[0].message == "Validation isEmail on email failed" ) {
      res.send('email is not valid')
    }else if( err.errors[0].message == "email must be unique" ) {
      res.send('email already taken')
    }
  })
})
module.exports = router

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
