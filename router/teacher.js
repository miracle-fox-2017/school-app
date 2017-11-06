const express = require('express');
const router = express.Router();
const model = require('../models')

//menampilkan teacher
router.get('/teachers', (req,res) => {
  model.Teacher.findAll( {include: [ {model: model.Subjects, as: 'Subject' } ] } ).then( (dataTeacher) => {
    //console.log(dataTeacher[0].Subject.dataValues);
    let status = 'tampil'
    res.render( 'teacher', { dataTeacher, status } )
  }).catch( (err)=>{
    console.log(err)
  })
})

//form menambah teacher
router.get('/teachers/add', (req,res) => {
    let msg = ''
    let status = 'add'
    model.Subject.findAll().then( (dataSubject) => {
      res.render('teacher', { dataSubject, status, msg })
    }).catch( (err) => {
      console.log(err)
    })

})

//menambah teacher
router.post('/teachers/add', (req,res) => {
  let obj = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email,
              subjectId:req.body.subjectid}
  model.Teacher.create(obj).then((dataTeacher)=> {
    console.log(obj)
    res.redirect('/teachers')
  }).catch( (err) => {
    console.log(obj)
  })
})

//form edit teacher
router.get('/teachers/edit/:id', (req,res) => {
  let status = 'edit'
  let msg = ""
  let id = req.params.id
  model.Teacher.findById(id).then( (dataTeacher) => {
    model.Subject.findAll().then( (dataSubject) => {
      res.render('teacher', { dataTeacher, dataSubject, status, msg})
    })
  })
})

//mengedit teacher
router.post('/teachers/edit/:id',(req,res)=>{
  let idEdit = req.params.id
  let obj = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email,
              subjectId:req.body.subjectid
            }
  let option = { where: { id: idEdit }}
  model.Teacher.update(obj, option).then((success)=>{
    res.redirect('/teachers')
  })
})

//delete teacher
router.get('/teachers/delete/:id',(req,res)=>{
  let idDelete = req.params.id
  let option = { where: { id: idDelete }}
  model.Teacher.destroy(option).then((dataTeacher)=>{
    res.redirect('/teachers')
  }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router
