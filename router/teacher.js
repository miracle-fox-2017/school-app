const express = require('express');
const router = express.Router();
const model = require('../models')

//menampilkan teacher
router.get('/teachers', (req,res) => {
  model.Teachers.findAll( {include: [ {model: model.Subjects, as: 'Subject' } ] } ).then( (teachersRows) => {
    //console.log(teachersRows[0].Subject.dataValues);
    let status = 'tampil'
    res.render( 'teacher', { teachersRows, status } )
  }).catch( (err)=>{
    console.log(err)
  })
})

//form menambah teacher
router.get('/teachers/add', (req,res) => {
    let msg = ''
    let status = 'add'
    model.Subjects.findAll().then( (subjectsRows) => {
      res.render('teacher', { subjectsRows, status, msg })
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
  model.Teachers.create(obj).then((teachersRows)=> {
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
  model.Teachers.findById(id).then( (teachersRows) => {
    model.Subjects.findAll().then( (subjectsRows) => {
      res.render('teacher', { teachersRows, subjectsRows, status, msg})
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
  model.Teachers.update(obj, option).then((success)=>{
    res.redirect('/teachers')
  })
})

//delete teacher
router.get('/teachers/delete/:id',(req,res)=>{
  let idDelete = req.params.id
  let option = { where: { id: idDelete }}
  model.Teachers.destroy(option).then((teachersRows)=>{
    res.redirect('/teachers')
  }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router
