const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Teacher.findAll({order: [['id']]}).then(teachers => {
    res.render('teachers', {title:'Teachers', teachers:teachers})
  })
})

router.get('/add', (req, res) => {
  res.render('teachers/add', {title:'Add Teacher'})
})

router.post('/add', (req, res) => {
  Model.Teacher.create(req.body).then(() => {
    res.redirect('/teachers')
  })
})

router.get('/edit/:id', (req, res) => {
  Model.Teacher.findById(req.params.id).then(teacher => {
    res.render('teachers/edit', {title:'Edit Teacher', teacher:teacher})
  })
})

router.post('/edit/:id', (req, res) => {
  Model.Teacher.update(req.body, {where:req.params}).then(() => {
    res.redirect('/teachers')
  })
})

router.get('/delete/:id', (req, res) => {
  Model.Teacher.destroy({where:req.params}).then(() => {
    res.redirect('/teachers')
  })
})

module.exports = router;
