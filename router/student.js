const express = require('express');
const router = express.Router();
const model = require('../models')


router.get('/students', (req,res)=> {
  let status = 'tampil'
  model.Students.findAll({order:[['id','ASC']]}).then((dataStudent)=> {
    dataStudent.forEach((student)=> {
      student.fullName = student.getFullName()
    })
    res.render('student', {dataStudent, status})
  }).catch((err)=> {
    console.log(err)
  })
})

router.get('/students/add', (req,res)=> {
  let status = 'add'
  let msg = ""
  res.render('student', {status, msg})
})

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

router.post('/students/add', (req,res)=> {
  let obj = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email}
  model.Students.create(obj).then((dataStudent)=> {
    res.redirect('/students')
  }).catch((err)=> {
    if( err.errors[0].message == "Validation email failed" ) {
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

router.get('/students/edit/:id',(req,res)=> {
  let status = 'edit'
  let msg = ""
  let id = req.params.id
  model.Students.findById(id).then((dataStudent)=>{
    res.render('student',{dataStudent, status, msg})
  }).catch((err)=>{
    console.log(err.errors[0].message)
  })
})

router.post('/students/edit/:id',(req,res)=>{
  let idEdit = req.params.id
  let obj = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email}
  let option = { where: { id: idEdit }}
  model.Students.update(obj, option).then((dataStudent)=>{
    res.redirect('/students')
  }).catch((err)=>{
    if( err.errors[0].message == "Validation isEmail on email failed" ) {
      let status = 'edit'
      let msg = "Email is not valid"
      model.Students.findById(idEdit).then((dataStudent)=>{
        res.render('student',{dataStudent, status, msg})
      })
    }else if( err.errors[0].message == "email must be unique" ) {
      let status = 'edit'
      let msg = "Email is already taken"
      model.Students.findById(idEdit).then((dataStudent)=>{
        res.render('student',{dataStudent, status, msg})
      })
    }
  })
});

router.get('/students/delete/:id',(req,res)=>{
  let idDelete = req.params.id
  let option = { where: { id: idDelete }}
  model.Students.destroy(option).then((dataStudent)=>{
    res.redirect('/students')
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/students/:id/addsubject',(req,res) => {
  let id = req.params.id
  let msg = ''
  let status = 'subject'
  model.Students.findById(id).then((dataStudent) => {
    model.Subjects.findAll({ attributes: ['subject_name', 'id'] }).then((dataSubject)=>{
      res.render('student',{dataStudent, dataSubject, status, msg})
    }).catch((err)=>{
      console.log(err)
    })
  })
})



module.exports = router
