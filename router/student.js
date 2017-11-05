const express = require('express');
const router = express.Router();

const db = require('../models')

router.get('/', function(req, res){
  db.Student.findAll().then(function (studData){
    res.render('student', {studData:studData})
    // res.send(studData)
  }).catch(function(err){
    console.log(err);
  })
})

router.get('/add', function(req, res){
  //buat add student form
  res.render('studentAdd')
  // res.send('Ini add')
})

router.post('/add', function(req, res){
  db.Student.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }).then(function(berhasil){
    res.redirect('/students')
  }).catch(function(err){
    res.render('studentAdd', {err:err.message}) //buat tampilan validasi error
    console.log(err.message);
  })
})

router.get('/edit/:id', function(req, res){
  // res.send('GET Edit ID coy ' + req.params)
  db.Student.findById(req.params.id).then(function(studData){
    res.render('studentEdit', {studData:studData})
  }).catch(function(err){
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res){
  db.Student.findById(req.params.id).then(function(studData){
    studData.update(req.body).then(function(berhasil){
      // res.send('POST Edit ID coy')
      res.redirect('/students')
    }).catch(function(err){
      console.log(err);
    })
  }).catch(function(err){
    console.log(err);
  })
})

router.get('/delete/:id', function(req, res){
  db.Student.destroy({
    where : {id: req.params.id}
  }).then(function(deleted){
    res.redirect('/students')
  }).catch(function(err){
    console.log(err);
  })
})

module.exports = router