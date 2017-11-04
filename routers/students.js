const express = require('express')
const router = express.Router()
const model = require('../models');

router.get('/', function (req, res) {
  model.Student.findAll()
    .then(dataStudents=>{
      res.render('students', {dataStudents:dataStudents})
    })
    .catch(err=>{
        res.send(err)
      })
})

router.get('/add', (req, res)=>{
  res.render('addStudent', {error:''})
})

router.post('/add', (req, res)=>{
  let input = req.body
  model.Student.create(
    {
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email
    })
      .then(()=>{
        res.redirect('/students')
      })
      .catch(err=>{
          let error = err.message.split(',');
          res.render('addStudent', {error:error[0]})
        })
})

router.get('/edit/:id', (req, res)=>{
  model.Student.findById(req.params.id)
    .then(dataStudent=>{
      res.render('editStudent', {dataStudent:dataStudent})
    })
    .catch(err=>{
        res.send(err)
      })
})
 router.post('/edit/:id', (req, res)=>{
   let edit = req.body
   model.Student.update(
     {
       first_name: edit.first_name,
       last_name: edit.last_name,
       email: edit.email,
       id: req.params.id
     },
     {
       where:{ id: req.params.id}
     })
      .then(()=>{
        res.redirect('/students')
      })
      .catch(err=>{
          res.send(err)
        })
 })

 router.get('/delete/:id', (req, res)=>{
   model.Student.destroy(
     {
       where: {id: req.params.id}
     })
      .then(()=>{
        res.redirect('/students')
      })
      .catch(err=>{
          res.send(err)
        })
 })

 router.get('/:id/addsubject', (req, res)=>{
   model.Student.findById(req.params.id)
    .then(dataStudent=>{
      model.Subject.findAll()
        .then(dataSubjects=>{
          res.render('assignSubject', {dataSubjects:dataSubjects,dataStudent:dataStudent})
        })
    })
    .catch(err=>{
      res.send(err)
    })
 })
 router.post('/:id/addsubject', (req, res)=>{
   model.Student_Subject.create(
     {
       SubjectId: req.body.SubjectId,
       StudentId: req.params.id
     })
      .then(()=>{
        res.redirect('/students')
      })
      .catch(err=>{
        res.send(err)
      })
 })
module.exports = router
