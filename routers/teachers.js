const express = require('express')
const router = express.Router()
const model = require('../models');

router.get('/', function (req, res) {
  model.Teacher.findAll()
    .then(dataTeachers=>{
      let newDataTeacher = dataTeachers.map(dataTeacher=>{
        return new Promise(function(resolve, reject) {
          dataTeacher.getSubject()
            .then(subject=>{
              dataTeacher.subject_name = subject
              resolve(dataTeacher)
            })
        });
      })
      Promise.all(newDataTeacher)
        .then(dataTeacherSubject=>{
          console.log(dataTeacherSubject);
          res.render('teachers', {dataTeachers:dataTeacherSubject})
        })
    })
    .catch(err=>{
        console.log(err);
        res.send(err)
      })
})
router.get('/add', (req, res)=>{
  model.Subject.findAll()
    .then(dataSubjects=>{
      res.render('addTeacher', {error:'',dataSubjects:dataSubjects})
    })
    .catch(err=>{
      res.send(err)
    })
})

router.post('/add', (req, res)=>{
  let input = req.body
  model.Teacher.create(
    {
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      SubjectId: input.SubjectId
    })
      .then(()=>{
        res.redirect('/teachers')
      })
      .catch(err=>{
          let error = err.message.split(',');
          res.render('addTeacher', {error:error[0]})
        })
})

router.get('/edit/:id', (req, res)=>{
  model.Teacher.findById(req.params.id)
    .then(dataTeacher=>{
      model.Subject.findAll()
        .then(dataSubjects=>{
          res.render('editTeacher', {dataTeacher:dataTeacher, dataSubjects:dataSubjects})
        })
    })
    .catch(err=>{
        res.send(err)
      })
})
 router.post('/edit/:id', (req, res)=>{
   let edit = req.body
   model.Teacher.update(
     {
       first_name: edit.first_name,
       last_name: edit.last_name,
       email: edit.email,
       SubjectId: edit.SubjectId,
       id: req.params.id
     },
     {
       where:{ id: req.params.id}
     })
      .then(()=>{
        res.redirect('/teachers')
      })
      .catch(err=>{
          res.send(err)
        })
 })

 router.get('/delete/:id', (req, res)=>{
   model.Teacher.destroy(
     {
       where: {id: req.params.id}
     })
      .then(()=>{
        res.redirect('/teachers')
      })
      .catch(err=>{
          res.send(err)
        })
 })

module.exports = router
