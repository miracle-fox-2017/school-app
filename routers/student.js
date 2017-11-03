const express = require('express')
const router = express.Router();
const model = require("../models");

router.get('/', function (req, res) {

  model.Student.findAll().then((rows)=>{
    // res.send(rows)
    res.render('students' , {rows})
    console.log(rows);
  }).catch((err)=>{
    console.log(err);
  })
})

router.get('/add', function(req,res){
  // res.send('masuk add')
  res.render('add', {rows: null});
})



router.post('/add', function (req, res){
  model.Student.create(req.body).then(allStudents => {
    res.redirect('/students')
  }).catch(err => {
    console.log(err);
    res.render('add', {rows : err.rows})
  })
})

module.exports = router;
