const express = require('express');
const router = express.Router();
const model = require('../models')

//menampilkan student
router.get('/students', (req,res)=> {
  let status = 'tampil'
  model.Student.findAll({order:[['id','ASC']]}).then((dataStudent)=> {
    dataStudent.forEach((student)=> {
      student.fullName = student.getFullName()
    })
    res.render('students', {dataStudent, status})
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
  model.Student.create(obj).then((dataStudent)=> {
    res.redirect('/students')
  }).catch((err)=> {
    if( err.errors[0].message == "validation email valid" ) {
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
  model.Student.findById(id).then((dataStudent)=>{
    //console.log(dataStudent.first_name)
    res.render('student',{dataStudent, status, msg})
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
  model.Student.update(obj, option).then((dataStudent)=>{
    res.redirect('/students')
  }).catch((err)=>{
    if( err.errors[0].message == "Validation isEmail on email failed" ) {
      let status = 'edit'
      let msg = "Email is not valid"
      model.Student.findById(idEdit).then((dataStudent)=>{
        res.render('student',{dataStudent, status, msg})
      })
    }else if( err.errors[0].message == "email must be unique" ) {
      let status = 'edit'
      let msg = "Email is already taken"
      model.Student.findById(idEdit).then((dataStudent)=>{
        res.render('student',{dataStudent, status, msg})
      })
    }
  })
});

//menampilkan form add subject
router.get('/students/:id/addsubject',(req,res) => {
    let id = req.params.id
    let msg = ''
    let status = 'subject'
    model.Student.findById(id).then((dataStudent) => {
      //console.log(dataStudent)
      model.Subject.findAll({ attributes: ['subject_name', 'id'] }).then((dataSubject)=>{
        res.render('student',{dataStudent, dataSubject, status, msg})
      }).catch((err)=>{
        console.log(err)
      })
    })
  })

//delete student
router.get('/students/delete/:id',(req,res)=>{
  let idDelete = req.params.id
  let option = { where: { id: idDelete }}
  model.Student.destroy(option).then((dataStudent)=>{
    res.redirect('/students')
  }).catch((err)=>{
    console.log(err)
  })
})


//menambah subject
router.post('/students/:id/addsubject', (req,res) => {
  let obj = { subjectId: req.body.subject_id,
              studentId: req.params.id }
  model.SubStudent.create(obj).then( (success) => {
    console.log(obj)
    res.redirect('/students')
  }).catch((err)=>{
    console.log(err);
  })
})

module.exports = router
