const express = require('express');
const db = require(`../models`);
const router = express.Router();


router.get('/', (req,res) => {
  db.Subject.findAll().then((results) => {
    res.render('subjects', {results});
  }).catch((err) => {
  })
});

// router.get('/get', (req,res) => {
//   db.Subject.findById(1).then(result => {
//     result.getTeachers().then(results => {
//       console.log(results);
//     })
//   })
// });

module.exports = router;