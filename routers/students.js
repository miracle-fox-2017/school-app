const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Student.findAll().then(students => {
    res.render('students', {title:'Students',students:students})
  })
})

router.get('/add', (req, res) => {
  res.render('students/add', {title:'Add Student', err:''})
})

router.post('/add', (req, res) => {
  Model.Student.create(req.body).then(() => {
    res.redirect('/students')
  }).catch(err => {
    res.render('students/add', {title:'Add Student', err:err.message})
  })
})

function editRender(req,res,id,err) {
  Model.Student.findById(id).then(student => {
    res.render('students/edit', {title:'Edit Student', student:student, err:err})
  })
}

router.get('/edit/:id', (req, res) => {
  editRender(req,res,req.params.id)
})

router.post('/edit/:id', (req, res) => {
  Model.Student.update(req.body, {where:req.params}).then(() => {
    res.redirect('/students')
  }).catch(err => {
    editRender(req,res,req.params.id,err.message)
  })
})

router.get('/delete/:id', (req, res) => {
  Model.Student.destroy({where:req.params}).then(() => {
    res.redirect('/students')
  })
})

module.exports = router;
