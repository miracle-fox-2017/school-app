const express = require('express')
const router = express.Router();
const model = require("../models");

router.get('/', function (req, res) {

  model.Student.findAll().then((rows)=>{
    res.render('students' , {rows})
    console.log(rows);
  }).catch((err)=>{
    console.log(err);
  })
})

router.get('/add', function(req,res){
  res.send('masuk add')
  res.render('add', {rows: null});
})

router.post('/add', function (req, res){
  model.Student.create( {first_name: req.body.first_name,
    last_name: req.body.last_name,
    email : req.body.email})
    .then(allStudents => {
    res.redirect('/students')
  }).catch(err => {
    console.log(err);
    res.render('add', {rows : err})
  })
})

router.get('/edit/:id', function(req,res) {
  model.Student.findById(req.params.id).then(rows => {
    res.render('edits', {rows : rows, message : null})
  })
})

router.post('/edit/:id', function(req, res) {
  model.Student.update( {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email},
    {where : { id : req.params.id}
  }).then(()=> {
      res.redirect('/students')
  }).catch(err => {
      model.Student.findById(req.params.id)
        .then(student => {
          res.render('edits', {rows : student, message : err})
    })
  })
})
//students.prototype.getfullname


router.get('/delete/:id', function(req, res) {
  model.Student.destroy ( { where : { id : req.params.id}
  })
  .then(()=> {
    res.redirect('/students')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
