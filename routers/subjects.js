const express = require('express')
const router = express.Router()
const model = require('../models');

router.get('/', function (req, res) {
  model.Subject.findAll()
    .then(dataSubjects=>{
      let newDataSubjects = dataSubjects.map(subject=>{
        return new Promise(function(resolve, reject) {
          subject.getTeachers()
            .then(teachers=>{
              subject.teacherName = teachers
              resolve(subject)
            })
        });
      })
      Promise.all(newDataSubjects)
        .then(allSubjectTeacher=>{
          res.render('subjects', {dataSubjects:allSubjectTeacher,error:''})
        })
    })
    .catch(err=>{
        console.log(err);
        res.send(err)
      })
})

router.post('/add', (req, res)=>{
  let input = req.body
  console.log(input);
  model.Subject.create(
    {
      subject_name: input.subject_name
    })
      .then(()=>{
        res.redirect('/subjects')
      })
      .catch(err=>{
          let error = err.message.split(',');
          res.render('subjects', {error:error[0]})
        })
})
router.get('/edit/:id', (req, res)=>{
  model.Subject.findById(req.params.id)
    .then(dataSubject=>{
      res.render('editSubject', {dataSubject:dataSubject})
    })
    .catch(err=>{
        res.send(err)
      })
})
 router.post('/edit/:id', (req, res)=>{
   let edit = req.body
   model.Subject.update(
     {
       subject_name: edit.subject_name,
       id: req.params.id
     },
     {
       where:{ id: req.params.id}
     })
      .then(()=>{
        res.redirect('/subjects')
      })
      .catch(err=>{
          res.send(err)
        })
 })

 router.get('/delete/:id', (req, res)=>{
   model.Subject.destroy(
     {
       where: {id: req.params.id}
     })
      .then(()=>{
        res.redirect('/subjects')
      })
      .catch(err=>{
          res.send(err)
        })
 })

module.exports = router
