const express = require('express')
const router = express.Router()
const model = require('../models')





router.get('/', (req, res) =>{
  model.Teacher.findAll({order:[['first_name', 'ASC']]}).then(dataTeachers => {
    let newData = dataTeachers.map(teachers => {
      return new Promise((resolve, reject) => {
        teachers.getSubject().then(dataSubjects => {
          teachers.subject = dataSubjects
          console.log(teachers);
          resolve(teachers)
        })
      })
    })
    Promise.all(newData).then(data =>{
      res.render('teachers/teachers', {dataTeachers:data, title:'teachers'})
    })
  })
})

router.get('/add', (req,res) =>{
  model.Subject.findAll().then(dataSubjects =>{
    res.render('teachers/add', {dataSubjects:dataSubjects, err:null, title:'add-teachers'})
  })
})

router.post('/add', (req,res) =>{
  console.log(req.body);
  model.Teacher.create(
    {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      SubjectId:req.body.SubjectId
    }
  ).then(() =>{
    res.redirect('/teachers')
  }).catch(err => {
    model.Subject.findAll().then(dataSubjects =>{
      res.render('teachers/add', {dataSubjects:dataSubjects, err:err, title:'add-teachers'})
    })
  })
})

router.get('/edit/:id', (req, res) => {
  model.Teacher.findOne({where:{id : req.params.id}}).then(dataTeachers => {
    model.Subject.findAll().then(dataSubjects =>{
      res.render('teachers/edit', {dataTeachers:dataTeachers, dataSubjects:dataSubjects, title:'edit-teacher'})
    })
  })
})


router.post('/edit/:id', (req, res) => {
  model.Teacher.update(
    {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      SubjectId:req.body.SubjectId
    },{where:{id:req.params.id}}
  ).then(() =>{
    res.redirect('/teachers')
  })
})


router.get('/delete/:id', (req, res) => {
  model.Teacher.destroy({where:{id:req.params.id}})
  .then(() => {
    res.redirect('/teachers')
  })
})




module.exports = router;
