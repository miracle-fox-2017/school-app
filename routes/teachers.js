const express = require('express');
const router = express.Router();
const Model = require('../models');

//tampilin
router.get('/', (req, res)=> {
  Model.Teacher.findAll({ include: [Model.Subject] }).then((results) => {
    res.render('teachers.ejs', { error: null, dataContacts: results });
  });
});

// delete
router.get('/delete/:id', function (req, res) {
  Model.Teacher.destroy({
    where: {
      id: req.params.id
    },
  }).then(function (dataContacts) {
    res.redirect('../../teachers');
  });
});

//add
router.get('/add', (req, res) => {
  Model.Subject.findAll().then(function (subjectsData) {
    res.render('addTeacher.ejs', { Subjects: subjectsData });
  });
});

router.post('/add', (req, res) => {
  Model.Teacher.create({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    SubjectId:req.body.SubjectId
  })
  .then(function () {
    res.redirect('../teachers');
  }).catch((err) => {
    res.render('addTeacher', { error: err });
  });
});

//edit
router.get('/edit/:id', (req, res) => {
  Model.Teacher.findById(req.params.id).then(data => {
    Model.Subject.findAll().then(function (subjectsData) {
      res.render('editTeacher', { data: data, Subjects: subjectsData });
    });
  });
});

// update post
router.post('/edit/:id', (req, res) => {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  Model.Teacher.update({
    first_name: first_name,
    last_name: last_name,
    email: email,
    SubjectId: req.body.SubjectId
  }, { where: { id: req.params.id } })
  .then(function (data) {
    res.redirect('../../teachers');
  });
});


module.exports = router;
