const express = require('express');
const db = require(`../models`);
const router = express.Router();


router.get('/', (req,res) => {
  db.Teacher.findAll({
    include: [db.Subject]
  }).then((results) => {
    res.render('teachers', {results});
  }).catch((err) => {
    res.send(err);
  })
})

router.get('/add', (req, res) => {
  res.render('addTeacher');
})

router.post('/add', (req, res) => {
  db.Teacher.create(req.body).then(success => {
    res.redirect('/teachers');
  }).then(err => {
    console.log(err);
  })
})



// router.get('/get', (req, res) => {
//   db.Teacher.findById(1).then(result => {
//     result.getSubject().then(hasil => {
//       console.log(hasil);
//     })
//   }).catch(err => {
//     console.log(err);
//   })
// })



module.exports = router;