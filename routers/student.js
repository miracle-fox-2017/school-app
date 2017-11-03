const express = require('express');
const router = express.Router();
const Model = require('../models/');

router.get('/', function (req, res) {
  Model.Student.findAll()
  .then(dataStudent=>{
    let dataS = {
      title : "Students",
      rows : dataStudent

    }
    res.render('students', dataS)
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;
