const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Subject.findAll().then(subjects => {
    res.render('subjects', {title:'Subjects', subjects:subjects})
  })
})

router.get('/add', (req, res) => {
  res.render('subjects/add', {title:'Add Subject'})
})

router.post('/add', (req, res) => {
  Model.Subject.create(req.body).then(() => {
    res.redirect('/subjects')
  })
})

router.get('/edit/:id', (req, res) => {
  Model.Subject.findById(req.params.id).then(subject => {
    res.render('subjects/edit', {title:'Edit Subject', subject:subject})
  })
})

router.post('/edit/:id', (req, res) => {
  Model.Subject.update(req.body, {where:req.params}).then(() => {
    res.redirect('/subjects')
  })
})

router.get('/delete/:id', (req, res) => {
  Model.Subject.destroy({where:req.params}).then(() => {
    res.redirect('/subjects')
  })
})

module.exports = router;
