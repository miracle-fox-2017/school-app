const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/teachers', (req,res) => {
  model.Teachers.findAll( {include: [ {model: model.Subjects, as: 'Subject' } ] } ).then( (dataTeacher) => {
    let status = 'tampil'
    res.render( 'teacher', { dataTeacher, status } )
  }).catch( (err)=>{
    console.log(err)
  })
})

router.get('/teachers/add', (req,res) => {
    let msg = ''
    let status = 'add'
    model.Subjects.findAll().then( (dataSubject) => {
      res.render('teacher', { dataSubject, status, msg })
    }).catch( (err) => {
      console.log(err)
    })

})

router.post('/teachers/add', (req,res) => {
  let object = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email,
              subjectId:req.body.subjectid}
  model.Teachers.create(object).then((dataTeacher)=> {
    console.log(object)
    res.redirect('/teachers')
  }).catch( (err) => {
    console.log(object)
  })
})


router.get('/teachers/edit/:id', (req,res) => {
  let status = 'edit'
  let msg = ""
  let id = req.params.id
  model.Teachers.findById(id).then( (dataTeacher) => {
    model.Subjects.findAll().then( (dataSubject) => {
      res.render('teacher', { dataTeacher, dataSubject, status, msg})
    })
  })
})

router.post('/teachers/edit/:id',(req,res)=>{
  let idEdit = req.params.id
  let object = { first_name:req.body.first_name,
              last_name:req.body.last_name,
              email:req.body.email,
              subjectId:req.body.subjectid
            }
  let option = { where: { id: idEdit }}
  model.Teachers.update(object, option).then((success)=>{
    res.redirect('/teachers')
  })
})


module.exports = router
