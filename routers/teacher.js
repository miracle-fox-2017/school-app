const express = require('express');
const router = express.Router();

const Model = require('../models/');

router.get('/', (req, res)=>{
  Model.Teacher.findAll({order: [['first_name', 'ASC']] , include: [Model.Subject]})
  .then(dataTeacher=>{
    let dataT = {
      title : 'Teacher',
      rows : dataTeacher
    }
    // res.send(dataTeacher)
    res.render('teachers', dataT)
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  Model.Subject.findAll({order : [['subject_name', 'ASC']]})
  .then(dataSubject=>{
    let dataS = {
      rows : dataSubject,
      title: 'Teacher Add'
    }
    res.render('teachers-add', dataS)
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req, res)=>{
  Model.Teacher.create(req.body)
  .then(dataTeacher=>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req, res)=>{
  Model.Teacher.findById(req.params.id).then(dataTeacher=>{
    Model.Subject.findAll({order : [['subject_name', 'ASC']]})
    .then(dataSubject=>{
      let dataT = {
        rows : dataTeacher,
        data : dataSubject,
        title : 'Teacher Edit'
      }
      res.render('teachers-edit', dataT)
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  Model.Teacher.update(req.body, {
    where:{
      id: req.body.id
    }
  }).then(dataTeacher=>{
    res.redirect('/teachers')
  })
})

router.get('/delete/:id', (req, res)=>{
  Model.Teacher.destroy({
    where : {id : req.params.id}
  }).then(dataTeacher =>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
