const express = require('express')
const router = express.Router()
const model = require('../models')


router.get('/', (req, res) =>{
  model.Student.findAll().then(dataStudents =>{
    res.render('students/students', {dataStudents:dataStudents})
  })
})


router.get('/add', (req, res) =>{
  res.render('students/add',{error:null})
})

router.post('/add', (req, res) =>{
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email

  model.Student.create(
    {
      first_name:first_name,
      last_name:last_name,
      email:email
    }).then(() =>{
      res.redirect('/students')
    }).catch(err =>{
      if(err){
      let msg = model.Student.emailError()
      res.render('students/add',{error:msg})
      }
    })
})




router.get('/edit/:id', (req, res) =>{
  model.Student.findOne({where:{id:req.params.id}}).then(dataStudent =>{
    res.render('students/edit',{dataStudent:dataStudent})
  })
})


router.post('/edit/:id', (req,res) =>{
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email

  model.Student.update(
    {
      first_name:first_name,
      last_name:last_name,
      email:email
    }, {where: {id:req.params.id}}).then(() =>{
      res.redirect('/students')
    }).catch(err =>{

    })
})



router.get('/delete/:id', (req, res) =>{
  model.Student.destroy({where: {id:req.params.id}}).then(() =>{
    res.redirect('/students')
  })
})

















module.exports = router;
