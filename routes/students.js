const express = require('express');
const router = express.Router();
const Model = require('../models');

//tampilin
router.get('/', (req, res)=> {
  Model.Student.findAll().then((results) => {
    res.render('students.ejs', { error: null, dataContacts: results });
  });
});

//add
router.get('/add', (req, res) => {
  res.render('addStudent.ejs');
});

router.post('/add', (req, res) => {
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  Model.Student.create({
    first_name: first_name,
    last_name: last_name,
    email: email
  })
  .then(function(dataContacts) {
    res.redirect('../students');
  }).catch((err) => {
    // res.send(err.errors[0].message)
    res.render('addStudent', {
      errorMsg: 'The email you entered is invalid'
    })
  })
})

// delete
router.get('/delete/:id', function(req, res) {
  Model.Student.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dataContacts) {
    res.redirect('../../students');
  })
})

// edit
router.get('/edit/:id', (req, res) => {
  Model.Student.findById(req.params.id).then(data => {
    res.render('editStudent', {
      title: 'Student Edit - School App',
      data: data
    });
  });
});

// update post
router.post('/edit/:id', (req, res) => {
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  Model.Student.update({
      first_name: first_name,
      last_name: last_name,
      email: email
    }, {where: {id:req.params.id}})
    .then(function(data) {
      res.redirect('../../students');
    })
})

module.exports = router;
