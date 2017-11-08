const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Teacher.findAll({
    include: [{
    model: Model.Subject
    }],
    order: [['first_name']]
  }).then(teachers => {
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
  Promise.all([
    Model.Teacher.findById(req.params.id),
    Model.Subject.findAll()
  ]).then(rows => {
    res.render('teachers/edit', {title:'Edit Teacher', teacher:rows[0], subjects:rows[1]})
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
