const express = require('express');
const db = require(`../models`);
const router = express.Router();


router.get('/', (req,res) => {
  db.Teacher.findAll().then((results) => {
    res.render('teachers', {results});
  }).catch((err) => {
    res.send(err);
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