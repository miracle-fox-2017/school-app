const express = require('express');
const db = require(`../models`);
const router = express.Router();

router.get('/', (req,res) => {
  db.Student.findAll().then((results) => {
    res.render('students', {results});
  }).catch((err) => {
    console.log(err);
  })
})

router.get('/add', (req,res) => {
  res.render('addStudent');
});

router.post('/add', (req,res) => {
  db.Student.create(req.body).then(success => {
    res.redirect('/students');
  }).catch(err => {
    console.log(err);
  })
})

router.get('/edit/:id', (req, res) => {
  db.Student.findById(req.params.id).then(result => {
    console.log(result.getFullName());
    res.render('editStudent', {result});
  })
})

router.post('/edit/:id', (req, res) => {
  db.Student.findById(req.params.id).then(result => {
    result.update({first_name:req.body.first_name, last_name:req.body.last_name, email:req.body.email}).then(success => {
      res.redirect('/students');
    })
  }).catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id', (req, res) => {
  db.Student.destroy({where : {
    id : req.params.id
  }}).then(result => {
    console.log(`deleted rows = ${result}`);
    res.redirect('/students');
  }).catch(err => {
    console.log(err);
  })
})

module.exports = router;