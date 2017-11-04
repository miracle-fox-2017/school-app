const express = require('express')
const router = express.Router()
const model = require('../models')





router.get('/', (req, res) =>{
  model.Teacher.findAll().then(dataTeachers => {
    let newData = dataTeachers.map(teachers => {
      return new Promise((resolve, reject) => {
        teachers.getSubject().then(dataFull => {
          teachers.subject_name = dataFull
          resolve(teachers)
        })
      })
    })
    Promise.all(newData).then(data =>{
      console.log(data[7].subject_name.subject_name)
      res.render('teachers/teachers', {dataTeachers:data})
    })
  })
})

router.get('/add', (req,res) =>{
  model.Subject.findAll().then(dataSubjects =>{
    res.render('teachers/add', {dataSubjects:dataSubjects})
  })
})

router.post('/add', (req,res) =>{
  model.Teacher.create(
    {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      SubjectId:req.body.SubjectId
    }
  ).then(() =>{
    res.redirect('/teachers')
  })
})

router.get('/edit/:id', (req, res) => {
  model.Teacher.findOne({where:{id : req.params.id}}).then(dataTeachers => {
    model.Subject.findAll().then(dataSubjects =>{
      res.render('teachers/edit', {dataTeachers:dataTeachers, dataSubjects:dataSubjects})
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





// router.get('/', (req, res) =>{
//   model.Teacher.findAll({
//     include: [
//       {model: model.Subject}
//     ]
//   }).then(teachers => {
//      res.render('teachers/teachers', {dataTeachers:teachers})
//   })
// })


module.exports = router;
