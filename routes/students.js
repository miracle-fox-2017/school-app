const express = require('express')
const router = express.Router()
const model = require('../models')


router.get('/', (req, res) =>{
  model.Student.findAll({order:[['first_name', 'ASC']]}).then(dataStudents =>{
    res.render('students/students', {dataStudents:dataStudents, title:'Students'})
  })
})


router.get('/add', (req, res) =>{
  res.render('students/add',{error:null, title:'add-student'})
})

router.post('/add', (req, res) =>{
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email

  model.Student.create(
    {
      id: '',
      first_name:first_name,
      last_name:last_name,
      email:email
    }).then(() =>{
      res.redirect('/students')
    }).catch(err =>{
      console.log(err);
      if(err){
      res.render('students/add',{error:err.errors[0], title:'add-student'})
      }
    })
})

router.get('/edit/:id', (req, res) =>{
  model.Student.findOne({where:{id:req.params.id}}).then(dataStudent =>{
    res.render('students/edit',{dataStudent:dataStudent, title:'edit-student'})
  })
})


router.post('/edit/:id', (req,res) =>{
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email

  model.Student.update(
  {
    id:req.params.id,
    first_name:first_name,
    last_name:last_name,
    email:email
  }, {where: {id:req.params.id}}).then(() =>{
    res.redirect('/students')
  })
  .catch(err => {
    console.log(err);
  })
})



router.get('/delete/:id', (req, res) =>{
  model.Student.destroy({where: {id:req.params.id}}).then(() =>{
    res.redirect('/students')
  })
})



router.get('/:id/addsubject', (req, res) => {
  model.Student.findOne({where:{id:req.params.id}}).then(dataStudent => {
    model.Subject.findAll().then(dataSubjects => {
      res.render('students/addsubject', {dataStudent:dataStudent, dataSubjects:dataSubjects, title:'add_subject-student'})
    })
  })
})

router.post('/:id/addsubject', (req, res) => {
  model.StudentSubject.create(
    {
      StudentId:req.params.id,
      SubjectId:req.body.SubjectId
    }
  ).then(() => {
    res.redirect('/students')
  })
})














module.exports = router;
